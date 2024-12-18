const display = document.getElementById("display")
const play = document.getElementById("start")
const pause = document.getElementById("stop")

let starttime = 0
let elapsedtime = 0
let timer = 0
let isrunning = false

let hour = 0
let min = 0
let sec = 0
let millsec
let lapTime =[]

function start(){
 if(!isrunning){
    starttime = Date.now() - elapsedtime
    timer = setInterval(counter,10)
    isrunning = true;
    pause.style.display = 'inline'
    play.style.display = 'none'
 }
}
function stop(){
   if(isrunning){
    clearInterval(timer)
    elapsedtime = Date.now() - starttime;
    isrunning = false
    play.style.display = 'inline'
    pause.style.display = 'none'
   }
}
function reset(){
   clearInterval(timer)
   starttime = 0
   elapsedtime = 0 
   isrunning = false
   display.textContent = `00:00:00.00`
   hour = 0
   min = 0
   sec = 0
   millsec = 0
   lapTime =[]
   const laps = document.querySelectorAll(".lap-container")
   laps.forEach(lap => lap.remove())
   play.style.display = 'inline'
   pause.style.display = 'none'
}

function counter(){
    elapsedtime = Date.now() - starttime;
    hour = Math.floor(elapsedtime/ (1000*60*60))
    min = Math.floor((elapsedtime/ (1000*60))%60)
    sec = Math.floor((elapsedtime/1000)%60)
    millsec = Math.floor((elapsedtime%1000)/10)

    hour = String(hour).padStart(2,"0")
    min = String(min).padStart(2,"0")
    sec = String(sec).padStart(2,"0")
    millsec = String(millsec).padStart(2,"0")
    
    display.textContent = `${hour}:${min}:${sec}.${millsec}`
 
}

function lap(){
    if(!isrunning) return ;
   let laps = document.createElement('li');
   let lapdiv = document.createElement('div')
   lapdiv.classList.add('lap-container')
   lapdiv.appendChild(laps)
   let ul = document.querySelector('ul')
   ul.insertBefore(lapdiv , ul.firstChild)
   laps.innerHTML = `${hour}:${min}:${sec}.${millsec}`

   console.log(`${hour}:${min}:${sec}.${millsec}`)//just fir debugging

   // lap +
   lapTime.push(elapsedtime);
   if(lapTime.length > 1){
   let newelapsedtime = lapTime[lapTime.length -1] - lapTime[lapTime.length-2]
   let newmin = Math.floor((newelapsedtime/ (1000*60))%60)
   let newsec = Math.floor((newelapsedtime/1000)%60)
   let newmillsec = Math.floor((newelapsedtime%1000)/10)
   newmin = String(newmin).padStart(2,"0")
   newsec = String(newsec).padStart(2,"0")
   newmillsec = String(newmillsec).padStart(2,"0")
   let lapss = document.createElement('li')
   lapdiv.appendChild(lapss)
   lapss.classList.add('lapadd')

   if (newmin > 1) {
      lapss.innerHTML = `+ ${newmin}:${newsec}.${newmillsec}`;
  }
  else {
      lapss.innerHTML = `+ ${newsec}.${newmillsec}`;
  }
}
}
//
const pointer = document.getElementById('pointer');
let angle = 270; 
let interval = null;
document.getElementById('start').addEventListener('click', () => {
    interval = setInterval(() => {
      angle = 270 + ((elapsedtime / 1000) * 6) % 360; 
      const radians = (angle * Math.PI) / 180;  
      const radius = 128;
        const x = radius * Math.cos(radians)
        const y = radius * Math.sin(radians )
        pointer.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    }, 350/60); 
});

document.getElementById('stop').addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
});
document.getElementById('reset').addEventListener('click', () => {
   clearInterval(interval);
   interval = null;
   angle = 270
   pointer.style.transform = `translate(0.7px, -128px) translate(-50%, -50%)`;
});
