'use server'

import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { PDFDocument, StandardFonts } from 'pdf-lib'

function calculateTaxes(amount: number) {
  const paye = amount * 0.18
  const uif = amount * 0.01
  return { paye, uif, total: paye + uif }
}

export async function generatePayroll(formData: FormData) {
  const month = Number(formData.get('month'))
  const year = Number(formData.get('year'))
  const admin = createSupabaseAdminClient()

  const { data: employees } = await admin.from('employees').select('id, name, base_salary, auth_user_id')

  for (const emp of employees || []) {
    // Sum overtime hours for the month
    const { data: att } = await admin
      .from('attendance')
      .select('overtime_hours, hours_worked')
      .eq('employee_id', emp.id)
      .gte('date', `${year}-${String(month).padStart(2,'0')}-01`)
      .lte('date', `${year}-${String(month).padStart(2,'0')}-31`)

    const totalOvertime = (att || []).reduce((sum, r) => sum + Number(r.overtime_hours || 0), 0)
    const hourlyRate = Number(emp.base_salary) / (22 * 8) // approx: 22 work days, 8h/day
    const overtimePay = totalOvertime * hourlyRate * 1.5
    const gross = Number(emp.base_salary) + overtimePay
    const { total: taxes, paye, uif } = calculateTaxes(gross)
    const net = gross - taxes

    // Create PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 842])
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const draw = (text: string, x: number, y: number, size = 12) => {
      page.drawText(text, { x, y, size, font })
    }
    draw('Gadou Management System - Payslip', 50, 790, 16)
    draw(`Employee: ${emp.name}`, 50, 760)
    draw(`Month/Year: ${month}/${year}`, 50, 740)
    draw(`Base Salary: ${emp.base_salary.toFixed(2)}`, 50, 700)
    draw(`Overtime Hours: ${totalOvertime.toFixed(2)}`, 50, 680)
    draw(`Overtime Pay: ${overtimePay.toFixed(2)}`, 50, 660)
    draw(`PAYE: ${paye.toFixed(2)}`, 50, 640)
    draw(`UIF: ${uif.toFixed(2)}`, 50, 620)
    draw(`Net Pay: ${net.toFixed(2)}`, 50, 600, 14)

    const pdfBytes = await pdfDoc.save()

    const path = `${emp.id}/${year}-${String(month).padStart(2,'0')}.pdf`
    const { data: upload, error } = await admin.storage.from('payslips').upload(path, pdfBytes, {
      contentType: 'application/pdf',
      upsert: true,
    })

    let publicUrl: string | null = null
    if (!error) {
      const { data } = admin.storage.from('payslips').getPublicUrl(path)
      publicUrl = data.publicUrl
    }

    await admin.from('payslips').insert({
      employee_id: emp.id,
      month,
      year,
      base_salary: emp.base_salary,
      overtime_pay: overtimePay,
      deductions: taxes,
      net_pay: net,
      pdf_url: publicUrl,
    })
  }
}