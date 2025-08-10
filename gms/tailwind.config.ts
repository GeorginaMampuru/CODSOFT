import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#d80001',
          white: '#ffffff',
          black: '#000000',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
export default config