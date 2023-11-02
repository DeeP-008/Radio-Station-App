//A page for each playlist
var playlistButton = document.querySelectorAll(".playlistButton");
playlistButton.forEach(function(button){
  button.addEventListener("click",function(){
    var playlistNumber = button.classList[1].replace("playlist", "");
    var playlistURL = "playlist" + playlistNumber + ".html";
    window.location.href = "../html/listenerFiles/" + playlistURL;
  });
});

//A page for each DJs
var DJButton = document.querySelectorAll(".DJButton");
DJButton.forEach(function(button){
  button.addEventListener("click",function(){
    var djNumber = button.classList[1].replace("DJ", "");
    var djURL = "dj" + djNumber + ".html";
    window.location.href = "../html/djFiles/" + djURL;
  });
});


function validateSearch(){
  let x = document.forms["searchBarForm"]["search"].value;
  if(x == ""){
    alert("Please Enter A Song");
    return false;
  }
}


const para = document.createElement("li");
const node = document.createTextNode("NEW RELEASE: Song 9");
para.appendChild(node);
const element = document.querySelector(".songsList");
element.appendChild(para);



const userInfo = {
  firstName:"Adam",
  lastName:"Smith",
  username:"POWERRANGER45",
  age:25,
  yearsSinceInitalSignUp:2
}

console.log(userInfo.username);
userInfo.yearsSinceInitalSignUp = 3;
userInfo.favGenre = "Pop";


