var number ="";
var sum = 0;
var num1 = 0;
var numbers = [];
var sign = [];
var signChoosen = 0;
var increment = 0;

var setScreen = document.getElementById("screen_input") 


// Displaying numbers on screen function

function myNumberFunction(a) {

    number  = number + a + "";

   
    
    setScreen.value = number ;
    
  }


  function signFunction(si){

    numbers.push(number);
    sign.push(si);

  }


// Choosing Sign for math Operation

function mySignFunction(b) {



    // if Plus sign is choosen
  if (b==="P"){

    signFunction("P")
    }

      // if Minus sign is choosen
    else if ( b=== "S"){

      signFunction("S")
    }

      // if Division sign is choosen
    else if ( b=== "D"){

      signFunction("D")
   }

      // if Multiply sign is choosen
   else if ( b=== "M"){

    signFunction("D")
   }


        // if Equal sign is clicked

    else if (b==="E"){

            //add the last number to the array
            numbers.push(number)

             for(n=0; n < sign.length ; n++){

               signChoosen = sign[n];

               if(signChoosen==="P"){

                 sum = parseInt(numbers[n]) + parseInt(numbers[n+1]);
                 setScreen.value = sum;      

              }

              if(signChoosen==="S"){

               sum = parseInt(numbers[n]) - parseInt(numbers[n+1]);
               setScreen.value = sum;
         
            }

            if(signChoosen==="D"){

             sum = parseInt(numbers[n]) / parseInt(numbers[n+1]);
             setScreen.value = sum;
       
          }

          if(signChoosen==="M"){

            
           sum = parseInt(numbers[n]) * parseInt(numbers[n+1]);
           setScreen.value = sum;

          }

        }

    }

  number = "" ;
   
}




function myClearFunction() {

      location.reload();
  }