document.addEventListener("DOMContentLoaded",function(){  
//the javascript file and its corresponding functions will fire only after the entire HTML content has been parsed and the adjoined CSS scripts has been executed.

  //get references to elements in producer.html based off their ID's and classes
  const audioPlayer = document.getElementById("audio-player");
  const playAndPauseButton = document.getElementById("play-Pause");
  const nextSongButton = document.getElementById("nextSong");
  const prevSongButton = document.getElementById("prevSong");
  const dropdownButton = document.querySelector('.dropbtn');
  
  //function controls tha play and pause functionaity of the audio player. Used upon clicking the play/pause button
  function togglePlayPause(){
    //uses 'paused' instance property of HTMLMediaElement DOM API to dtermine whether or not the audio player is playing music
    if(audioPlayer.paused){
      audioPlayer.play(); //use the play() instance method of the API to start the player if paused
      playAndPauseButton.innerHTML = '<i class="fas fa-pause"></i>';  //font awesome icons. Link in the HTML document
    } else{
      audioPlayer.pause();  //if !paused, pause()
      playAndPauseButton.innerHTML = '<i class="fas fa-play"></i>';
      
    }
  }

  //array of few sample songs with their paths
  const songs = [
    "../audio/50 Cent - In Da Club.mp3",
    "../audio/Anatol Ugorski - Beethoven Bagatelle in A Minor, WoO 59 -Für Elise-.mp3",
    "../audio/Hozier - Movement.mp3",
    "../audio/Selena Gomez - Come & Get It.mp3"];
    
    let currentSong = 0;
    
    //function plays the next song in the array
    function playNextSong(){
      if(songs.length === 0){   //in case there are no songs in the array
        return;
      }
      
      currentSong++;  //increment currentSong index to the next song
      
      if(currentSong >= songs.length){    //in case we go over the limit of the array, start from the beginning
        currentSong = 0;
      }
      
      //set src of audioPlayer to play the song at currentSong index and use the play() method to start playing the song.
      audioPlayer.src = songs[currentSong];
      audioPlayer.play();
    }
    
    //function plays the previous song in the array
    function playPreviousSong(){
      if(songs.length === 0){
        return;
      }
      
      currentSong--;  //decrements currentSong index to the previous song in the array
      
      if(currentSong < 0){    //in case the index was at the first element, wrap the decrement around to the last song
        currentSong = songs.length - 1;
      }
      audioPlayer.src = songs[currentSong];
      audioPlayer.play();  
    }
    
    //use the fnctions defined above to add event listeners to the previous song, play/pause and next song buttons to add functionality on clicking
    playAndPauseButton.addEventListener("click",togglePlayPause);
    nextSongButton.addEventListener("click",playNextSong);
    prevSongButton.addEventListener("click",playPreviousSong);

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
    
    //function to navigate to different pages based on button attributes. Activated when user clicks on the buttons in the 3 main sections which would take them to their respective HTML pages
    function buttonNavigationToDiffPages(button){
      //each button in the 3 main section has a target and directory attribute attached to it.
      //the target attribute points to which file that button needs to redirect the user to and the directory attribute indicates the directory the .html file is in
      const targetPage = button.getAttribute('target');
      const targetDirectory = button.getAttribute('directory');
      const pagePath = `${targetDirectory}/${targetPage}`;    //create a path based on the attributes of the buttons 
      window.location.href = pagePath;  //href to that page
    }
    
    //since all buttons in the 3 main sections are defined under the .card-wrapper class, I can easily asign a similar functionality of redirecting to different pages to each button
    const buttons = document.querySelectorAll('.card-wrapper button');
    //add an event listener for each button in the .card-wrapper class that fires the navigation function defined above when the button is clicked.
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        buttonNavigationToDiffPages(button);
      });
    });

    function validateSearchBar(){
      let input = document.forms["search"]["search-music"].value;
      if(input == ""){
        alert("Cannot search an empty song field. Please input a song name in the search bar.");
        return false;
      }
    }
    
  });
  