// fatching the html elements 
const currentTime = document.getElementById('clock');

// ringtone for the alarm clock 
const ringtone = new Audio('/ringtone/Alarm.mp3');
// this will run the ringtone in loop unless it is stopped 
ringtone.loop = true;

const alarmList = document.querySelector('#alarm-list');
const setAlarm = document.querySelector('.set-alarm-form')

// array to store all the set alarms 
const alarmArray = [];

// function to update the time every second 
function runningTime() {
    // get the current data and time in string formate 
    var today = new Date();
    // get the hours, minutes and seconds 
    const hr = formatTime(today.getHours());
    const min = formatTime(today.getMinutes());
    const sec = formatTime(today.getSeconds());
    // current time 
    const curr = `${hr}:${min}:${sec}`;

    currentTime.innerText=`${hr}:${min}:${sec}`;

    // if the current time is equal to the alarm time then ring the alarm 
    if(alarmArray.includes(curr) ){
        ringing();
        alert(`Hey it's Timeup ${curr}`)
    } 
}

// function to play alarm ringtone 
function ringing(){
    ringtone.play();
}

// formating the time 
function formatTime(time) {
    if ( time < 10 && time.length != 2)return '0' + time;
    
    return time;
}

// remove the alarm if delete button clicked 
function removeAlarm() {
    // pause the ringtone 
    ringtone.pause();
}      

// remove the alarm from the array 
alarmList.addEventListener('click', e=> {
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})
// function to remove the alarm 
deleteAlarm = (value) => {
    let newList = alarmArray.filter((time) => time != value);
    alarmArray.length = 0;                  // Clear contents
    alarmArray.push.apply(alarmArray, newList);
}

// display the list of alarms on the website 
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time" id="time-span">${newAlarm} </span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "deleteAlarm(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    alarmList.innerHTML += html
};

// set the alarm 
setAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    let hr=formatTime(setAlarm.hour.value);
    if(hr === '0')hr = '00'
    
    let mins=formatTime(setAlarm.min.value);
    if(mins === '0')mins = '00'
    
    let secs=formatTime(setAlarm.sec.value);
    if(secs === '0')secs = '00'
    // alarm time 
    const newAlarm = `${hr}:${mins}:${secs}`

    // if the newAlarm is not null the set the new alarm 
    if(isNaN(newAlarm)){
        // check if the alarm is already set or not 
        if(!alarmArray.includes(newAlarm)){
            alarmArray.push(newAlarm);
            showNewAlarm(newAlarm);
            setAlarm.reset();
        } else{
            alert(`Alarm is already set for this time ${newAlarm}`);
        }
    } else{
        alert("Invalid Time, Please enter correct time")
    }        
})

// call the runningTime function every second 
setInterval(runningTime, 1000);

