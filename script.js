var myTitlePlayer = document.querySelector(".playing-title");
var myPlaylistInfo = document.querySelector(".header-info");
var mySinger = document.querySelector(".playing-singer");
var myPlayButton = document.querySelector(".play-icon");
var myShuffleButton = document.querySelector(".first-icon");
var myLoopButton = document.querySelector(".last-icon");
var mySongTitle = document.querySelectorAll(".music-player__song")[1];
var list = document.querySelector("music-player__list");
var vol = document.querySelector("#vol");
var volIcon = document.querySelector("#vol-icon");
var currTime = document.querySelector("#current-time");
var durationTime = document.querySelector("#duration");
var timeLine = document.querySelector("#timeline");
var list = document.querySelector(".music-player__list");
var playIcon = document.querySelector(".play-icon");
var nextIcon = document.querySelector("#next-icon");
var preIcon = document.querySelector("#pre-icon");
var widthScroll = 0;
var currentSong = document.createElement("audio");
var isPaused = false;
var indexSong = 0;
var myList = [
  {
    name: "Crying Over You",
    singer: "JayTee ft Binz",
    duration: "5:39",
    path: "./music/Crying Over You - JustaTee_ Binz.mp3",
  },
  {
    name: "Bad Habits",
    singer: "Ed Sheeran",
    duration: "3:51",
    path: "./music/Bad Habits - Ed Sheeran.mp3",
  },
  {
    name: "Let Her Go",
    singer: "Passenger",
    duration: "4:12",
    path: "./music/Let Her Go - Passenger.mp3",
  },
];
currentSong.volume = 0.5;
function loadMusic() {
  myList.forEach((song, index) => {
    let x = document.createElement("div");
    x.classList.add("music-player__song");
    let xTitles = document.createElement("h4");
    xTitles.innerHTML = song.name;
    xTitles.classList.add("song-title");
    x.appendChild(xTitles);
    let xSinger = document.createElement("span");
    xSinger.innerHTML = song.singer;
    xSinger.classList.add("song-singer");
    x.appendChild(xSinger);
    let xDuration = document.createElement("span");
    xDuration.classList.add("song-duration");
    xDuration.innerHTML = song.duration;
    x.appendChild(xDuration);
    x.addEventListener("click", function () {
      currentSong.setAttribute("src", song.path);
      currentSong.play();
      playSong();
      indexSong = index;
      setSong(song.name, song.singer, song.duration);
    });
    list.appendChild(x);
  });
}
loadMusic();
myPlaylistInfo.innerHTML = "vodoanhuy301 - total " + myList.length + " songs";
function setSong(name, singer, duration) {
  myTitlePlayer.innerHTML = name;
  mySinger.innerHTML = singer;
  durationTime.innerHTML = duration;
  timeLine.setAttribute("max", changeTime(duration));
}
function playASong(name,singer, duration,index) {
  currentSong.setAttribute("src",myList[index].path);
  setSong(name,singer,duration);
  currentSong.play();
}
function formatTime(t) {
  let min = Math.floor(t / 60);
  let sec = (t % 60).toFixed(0);
  if (min < 10) {
    if (sec < 10) {
      return "0" + min + ":0" + sec;
    }
    return "0" + min + ":" + sec;
  }
  if (min > 10) {
    if (sec < 10) {
      return min + ":0" + sec;
    }
    return min + ":" + sec;
  }
}
function changeTime(duration) {
  let tmp = duration.split(":");

  return tmp[0] * 60 + Number(tmp[1]);
}
setInterval(function () {
  if (currentSong.getAttribute("src") && currentSong.currentTime < currentSong.duration) {
    changeTimeline(currentSong.currentTime);
  } else if (currentSong.getAttribute("src")&& currentSong.currentTime == currentSong.duration) nextSong();
}, 900);
function changeTimeline(currentTime) {
  currTime.innerHTML = formatTime(currentTime);
  timeLine.value = currentTime.toFixed(0);
}

vol.addEventListener("change", function () {
  currentSong.volume = vol.value / 100;
});
volIcon.addEventListener("click", function () {
  muteVolume();
});

function muteVolume() {
  if (volIcon.classList.value.includes("fa-volume-up")) {
    volIcon.classList.remove("fa-volume-up");
    volIcon.classList.add("fa-volume-mute");
    currentSong.volume = 0;
    vol.value = 0;
  } else {
    volIcon.classList.remove("fa-volume-mute");
    volIcon.classList.add("fa-volume-up");
    currentSong.volume = 0.5;
    vol.value = 50;
  }
}
function nextSong() {
  if (indexSong < myList.length - 1) {
    currentSong.setAttribute("src", myList[indexSong + 1].path);
    setSong(
      myList[indexSong + 1].name,
      myList[indexSong + 1].singer,
      myList[indexSong + 1].duration
    );
    currentSong.play();
    playSong();
    indexSong++;
  } else {
    currentSong.setAttribute("src", myList[0].path);
    setSong(myList[0].name, myList[0].singer, myList[0].duration);
    currentSong.play();
    playSong();
    indexSong = 0;
  }
}
function preSong() {
  if (indexSong >= 1) {
    currentSong.setAttribute("src", myList[indexSong - 1].path);
    setSong(
      myList[indexSong - 1].name,
      myList[indexSong - 1].singer,
      myList[indexSong - 1].duration
    );
    indexSong--;
    currentSong.play();
    playSong();
  } else {
    currentSong.setAttribute("src", myList[myList.length - 1].path);
    setSong(
      myList[myList.length - 1].name,
      myList[myList.length - 1].singer,
      myList[myList.length - 1].duration
    );
    indexSong = myList.length - 1;
    currentSong.play();
    playSong();
  }
}
function playSong() {
  myPlayButton.classList.remove("fa-play-circle");
  myPlayButton.classList.add("fa-pause-circle");
}
myPlayButton.addEventListener("click", function () {
  if (myPlayButton.classList.value.includes("fa-pause-circle")) {
    myPlayButton.classList.remove("fa-pause-circle");
    myPlayButton.classList.add("fa-play-circle");
    currentSong.pause();
  } else if (myPlayButton.classList.value.includes("fa-play-circle")) {
    myPlayButton.classList.remove("fa-play-circle");
    myPlayButton.classList.add("fa-pause-circle");
    currentSong.play();
  }
});
nextIcon.addEventListener("click", function () {
  nextSong();
});
preIcon.addEventListener("click", function () {
  preSong();
});
myShuffleButton.addEventListener("click", function () {
  if (
    myShuffleButton.classList[myShuffleButton.classList.length - 1] ==
    "first-icon"
  ) {
    myShuffleButton.classList.remove("first-icon");
    myShuffleButton.classList.add("first-icon--pressed");
  } else {
    myShuffleButton.classList.remove("first-icon--pressed");
    myShuffleButton.classList.add("first-icon");
  }
});
myLoopButton.addEventListener("click", function () {
  if (
    myLoopButton.classList[myLoopButton.classList.length - 1] == "last-icon"
  ) {
    myLoopButton.classList.remove("last-icon");
    myLoopButton.classList.add("last-icon--pressed");
  } else {
    myLoopButton.classList.remove("last-icon--pressed");
    myLoopButton.classList.add("last-icon");
  }
});
