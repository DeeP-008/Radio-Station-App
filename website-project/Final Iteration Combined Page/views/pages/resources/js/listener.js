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





    // the functions below control the behaviour of the dropdown menu when the cursor moves towards it. 
    //The menu will only be visible when the cursor hovers over the dropdown button post which it will showcase the options. 
    //As soon as the cursor leaves the vicinity of the dropdown button button or the menu options, the dropdown would close.
    
    let dropdownBoxOpen = false;    //boolean to check whether or not dropdown box is open
    let isMouseInDropdown = false;  //boolean value to check whether the mouse is in vicinity of the dropdown button or the menu options
    let dropdownTimeout;  //sets a timeout variable to keep the function running for a certain time
    const dropdownStuff = document.getElementById("myDropdown");

    //function to make the dropdown menu visible
    function openDropdown(){
      clearTimeout(dropdownTimeout);    //clears the timeout so that the function can be executed immediately
      dropdownBoxOpen = true;
      dropdownStuff.style.display = "block";    //maipulate CSS attribute to display the box in a block format
    }

    function closeDropdown(){
      dropdownTimeout = setTimeout(() => {    //set a timeout of 200 ms to allow the cursor to hover over the options.
        dropdownBoxOpen = false;
        dropdownStuff.style.display = "none";
      },200);
          }

    //function to decide whther or not to toggle dropdown box
    function dropdownBox(){
      dropdownBoxOpen = ! dropdownBoxOpen;
      if(dropdownBoxOpen){
        openDropdown();
      } else{
        closeDropdown();
      }
    }
    const dropdownButton = document.querySelector('.dropbtn');

    dropdownButton.addEventListener('mouseenter', openDropdown);
    dropdownButton.addEventListener('click',(event) => {
      event.preventDefault();
      dropdownBox();
    });
    dropdownButton.addEventListener('mouseleave',() => {
      if(!isMouseInDropdown){
        closeDropdown();
      }
    });

    //event listeners handle events for the contents of the dropdown box to allow for the dropdown to be visible when the mouse is over the contents
    dropdownStuff.addEventListener('mouseenter',() =>{    //mouseenter event fired when cursor is within the vicinity of the element dropdownStuff
      clearTimeout(dropdownTimeout);  //clear timeout to keep dropdown open when mouse enters the vicinity of the dropdown content
      isMouseInDropdown = true;
    });

    dropdownStuff.addEventListener('mouseleave', () => {  //mouseleave event fired when cursor leaves vicinity of element dropdownStuff
      isMouseInDropdown = false;  //close the dropdown when mosue leaves the vicinity of the dropdown content
      closeDropdown();
    });

    const dropdownBoxOptions = document.querySelectorAll('.dropdown-content a');
    dropdownBoxOptions.forEach((option) => {
      option.addEventListener('mouseenter', () => {
        clearTimeout(dropdownTimeout);
      });
    });