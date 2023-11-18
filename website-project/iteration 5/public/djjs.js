
/*function songSearch(search){
	let ser = document.forms["ser"]["search"].value;
	if (ser == "") {
		alert("You didn't enter anything to search");
		return false;
	}
	for(var i = 0; i < songs.length; i++){
		if (ser == songs[i].name){
			console.log("song found");
		}
	}

}



let showList = [];
function addSongToPlaylist(song){
	showList.push(song);
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

/*
function signUp(){}
*/

/*function loginCookie(){
	const d = new Date();
	d.setTime(d.getTime
}*/

/*async function songDef(){
	console.log((document.getElementById('playmusic').dataset.songs));
	console.log(typeof playlist);
	alert('whelp');
	let alb_cov = "../../images/PlaceholderLC.png";
	let mp3 = "../../songs/MELTY BLOOD";
	//let name = document.getElementByID("sb1").innerText;
	let name = "Bad Blood";
	const songQuer = music.find({ 'name': name});
	songQuer.select('name image mp3')
	const mySong = await songQuer.exec();
	for (let i = 0; i < 1; i++) {
		if (name == mySong.name){
			alb_cov = mySong.image;
			mp3 = mySong.mp3;
		}
	}
	document.getElementById('song-cover').src=alb_cov;
	document.getElementById('mp3s').src=mp3;
}*/

function five_sec(){
	console.log('wp');
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

//changeSong();

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

function calcPlayTime(){
	let time = new Date();
	var duration = 0;
	//for (var j = 0; j < playlist.length; j++){
	//	duration += playlist[j].
	//}
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

	let comTime = "EST completion time " + hour + ":" + mins + ":" + sec + " " + ap;
	document.getElementById("compTime").innerHTML = comTime;

}

calcPlayTime();



//clock design adapted from https://www.geeksforgeeks.org/how-to-design-digital-clock-using-javascript/

