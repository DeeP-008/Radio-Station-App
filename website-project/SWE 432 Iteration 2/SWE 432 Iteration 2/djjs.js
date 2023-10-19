//const {songs} = require('./songs.json');

function valRes(){
	let ser = document.forms["ser"]["search"].value;
	if (ser == "") {
		alert("You didn't enter anything to search");
		return false;
	}
}

function songDef(){
	document.getElementById('song-cover').src="./PlaceholderLC.png";
}

function signUpInfo(){
	let signDate = {
		genre: "hip-hop",
		timeSlot: "12:00 p.m. - 3:00 p.m.",
		status: "Not Filled"
	}
	let toString = "Genre: " + signDate.genre + " Timeslot: " + signDate.genre + " Status: " + signDate.status;
	alert(toString);
	
}

window.onload = function changeSong() {
	let popS = document.getElementById("pop");
	let songSel = popS.options[popS.selectedIndex].text;
	let pSong = "";
	if (songSel == "Taylor Swift") {
		pSong = "Bad Blood";
	}
	else if (songSel == "Coldplay") {
		pSong = "Viva la Vida";
	}
	else if (songSel == "Post Malone") {
		pSong = "Sunflower";
	}
	else if (songSel == "Pitbull") {
		pSong = "Feel This Moment";
	}
	document.getElementById("sb1").innerText = pSong;
	return false;
} 

changeSong();

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
        hr = 12;
        am_pm = "AM";
    }
	
	hour = hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;
	
	let curTime = hour + ":" + min + am_pm;
	
	document.getElementById("clock").innerHTML = curTime;
}

time();



//clock is weird, doesn't seem to like certain other JS functions but works when isolated.
//clock design adapted from https://www.geeksforgeeks.org/how-to-design-digital-clock-using-javascript/

