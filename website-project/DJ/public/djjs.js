
function five_sec(){
	console.log('wp');
}

var modal = document.getElementById('signForm');

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

function signData(){
	const day2 = document.getElementById(myday).innerHTML;
	const han = document.getElementById(handle).innerHTML;
	const emADD = document.getElementById(email).innerHTML;
	const choice = document.getElementById(timeslotForm).innerHTML;
	fetch('./signUp', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			date: "10/" +day2+ "/2023",
			slot: choice,
			handle: han,
			email: emADD
		}),
	})
}

function remName(playNum){
	const remNameV = document.getElementById(playNum).innerHTML
	console.log(remNameV);
	fetch('/remName', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			name: remNameV
		}),
	})
}

function addName(playNam){
	const playNamV = document.getElementById(playNam).innerHTML
	fetch('/playadd', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			name: playNamV
		}),
	})
}

function songFetch(){
	fetch('/songChange', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			name: 'text 1',
			data: 'test3',
		}),
	})
}

function setDay(myday){
	const day = document.getElementById(myday).innerHTML;
	document.getElementById(t1).innerHTML = "<%=sign_ups[" + day + "].timeslot[0]%>";
	document.getElementById(t2).innerHTML = "<%=sign_ups[" + day + "].timeslot[1]%>";
	document.getElementById(t3).innerHTML = "<%=sign_ups[" + day + "].timeslot[2]%>";
}

setInterval(time, 200);

function time() {
	let time = new Date();
	let hour = time.getHours();
	let min = time.getMinutes();
	let am_pm = "AM";
	
	if (hour >= 12) {
        if (hour > 12) hour -= 12;
        am_pm = "PM";
    } else if (hour == 0) {
        hour = 12;
        am_pm = "AM";
    }
	
	hour = hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;
	
	let curTime = hour + ":" + min + am_pm;
	
	document.getElementById("clock").innerHTML = curTime;
}

time();

setInterval(calcPlayTime, 200);

function onAir(){
	document.getElementById("off").innerHTML = "ON-AIR";
}

function calcPlayTime(){
	let time = new Date();
	let duration = 0;
	let hour = time.getHours() + Math.trunc(duration / 3600);
	let mins = time.getMinutes() + Math.trunc((duration % 3600) / 60);
	var sec = time.getSeconds() + duration % 60;
	let ap = "AM";
	if(sec >= 60){
		sec -= 60;
		min++;
	}
	if(mins >= 60){
		mins -= 60;
		hour++;
	}
	if (hour >= 24) {
		hour -= 24;
	}
	else if (hour >= 12) {
        if (hour > 12) hour -= 12;
        ap = "PM";
    } else if (hour == 0) {
        hour = 12;
        ap = "AM";
    }

	hour = hour < 10 ? "0" + hour : hour;
	mins = mins < 10 ? "0" + mins : mins;
	sec = sec < 10 ? "0" + sec : sec;

	let comTime = "EST completion time " + hour + ":" + mins + ":" + sec + " " + ap;
	document.getElementById("compTime").innerHTML = comTime;

}

calcPlayTime();



//clock design adapted from https://www.geeksforgeeks.org/how-to-design-digital-clock-using-javascript/

