const display = document.getElementById('clock');


const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;


const myList = document.querySelector('#alarm-list');
const addAlarm = document.querySelector('.set-alarm-form')


const alarmList = [];

function ringing(now){
    audio.play();
}


function updateTime() {
    var today = new Date();
    const hr = formatTime(today.getHours());
    const min = formatTime(today.getMinutes());
    const sec = formatTime(today.getSeconds());
    const now = `${hr}:${min}:${sec}`;

    display.innerText=`${hr}:${min}:${sec}`;

    if(alarmList.includes(now) ){
        ringing(now);
    } 
}

function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}

function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}      

myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})

remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}

function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time" id="time-span">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    myList.innerHTML += html
};

addAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    let hr=formatTime(addAlarm.hour.value);
    if(hr === '0')hr = '00'
    
    let mins=formatTime(addAlarm.min.value);
    if(mins === '0')mins = '00'
    
    let secs=formatTime(addAlarm.sec.value);
    if(secs === '0')secs = '00'
    
    
    const newAlarm = `${hr}:${mins}:${secs}`

    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }        
})

setInterval(updateTime, 1000);

