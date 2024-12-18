const display = document.getElementById("display")

function appendvalue(value){
    display.textContent = display.textContent + value
}
function cleardisplay(){
    display.textContent = ""
}
function deletelast(){
    display.textContent = display.textContent.slice(0,-1)
}

function calculate(){
   try{
    display.textContent = eval(display.textContent)
   }
   catch(error){
    display.textContent = "error"
   }
}
