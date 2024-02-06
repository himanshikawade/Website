const display = document.getElementById('clock');
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;
var alHours = '';
 var alMinutes = '';
let count =0;
function updateTime() {
    const date = new Date();

    const hour = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());



    display.innerText=`${hour} : ${minutes} : ${seconds}`
}

function formatTime(time) {
    if ( time < 10 ) {
        return '0' + time;
    }
    return time;
}

function setAlarmTime(value) {
    alarmTime = value;
}

function setAlarm() {
    if(alarmTime) {
        const current = new Date();
        const timeToAlarm = new Date(alarmTime);

        if (timeToAlarm > current) {
            const timeout = timeToAlarm.getTime() - current.getTime();
           console.log(timeout,"timeout");
            alarmTimeout = setTimeout(() => audio.play(), timeout);
            alert('Alarm set');
        }
    }
     var timeString = String(document.getElementById("alarmTimeSelect").value);
  console.log(timeString)
    alHours = timeString.split("-").[2].charAt(3) + timeString.split("-").[2].charAt(4);
  console.log(alHours);
    alMinutes = timeString.split("-").[2].charAt(6) + timeString.split("-").[2].charAt(7);
  console.log(alMinutes);
    document.getElementById("alarm").innerHTML = 'Alarm: ' + alHours + ':' + alMinutes;   
}

function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}
function snooze() {
  ++count;
  if(count <=3){
    if (alMinutes != '' || alHours != ''){
      //set snooze time below
        var snoozMinutes = 5;
        if  (Number(alMinutes) < 50)  {
            snoozMinutes += Number(alMinutes);
            alMinutes = String(snoozMinutes);
            alHours = alHours;

        } else if (Number(alMinutes) >= 50) {
            snoozMinutes = (Number(alMinutes)+snoozMinutes) - 60;
            if (snoozMinutes === 0 ){
                alMinutes = '00';            
            }else {
                alMinutes = '0' + String(snoozMinutes);
            }
                    
            alHours = Number(alHours) +1;
            String(alHours);
        }
       let Alarmhours=alHours;
       let Alramminutes=alMinutes;
      console.log(alarmTime);
      let sHours = alarmTime.split("-").[2].charAt(3) + alarmTime.split("-").[2].charAt(4);
  console.log(alHours);
    let sMinutes = alarmTime.split("-").[2].charAt(6) + alarmTime.split("-").[2].charAt(7);
      if((sHours - Alarmhours) === 0 || (sMinutes-Alramminutes) === 5 || (sHours - Alarmhours) === 1 || (Alramminutes - Alramminutes) === 5 || (Alarmhours - sHours  ) === 5  ){
        audio.play()
      }
        document.getElementById("alarm").innerHTML = 'Alarm: ' + alHours + ':' + alMinutes;

    }   
  }
}

setInterval(updateTime, 1000);