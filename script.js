var myTitlePlayer = $(".playing-title");
var myPlaylistInfo = $(".header-info");
var mySinger = $(".playing-singer");
var myPlayButton = $(".play-icon");
var myShuffleButton = $(".first-icon");
var myLoopButton = $(".last-icon");
var mySongTitle = $(".music-player__song")[1];
var list = $("music-player__list");
var vol = $("#vol");
var volIcon = $("#vol-icon");
var currTime = $("#current-time");
var durationTime = $("#duration");
var timeLine = $("#timeline");
var list = $(".music-player__list");
var playIcon = $(".play-icon");
var nextIcon = $("#next-icon");
var preIcon = $("#pre-icon");
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
    list.append(x);
  });
}
loadMusic();
myPlaylistInfo.html("vodoanhuy301 - total " + myList.length + " songs");
function setSong(name, singer, duration) {
  myTitlePlayer.html(name);
  mySinger.html(singer);
  durationTime.html(duration);
  timeLine.attr("max", changeTime(duration));
}
function playASong(name, singer, duration, index) {
  currentSong.setAttribute("src", myList[index].path);
  setSong(name, singer, duration);
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
  if (
    currentSong.getAttribute("src") &&
    currentSong.currentTime < currentSong.duration
  ) {
    changeTimeline(currentSong.currentTime);
  } else if (currentSong.getAttribute("src") && currentSong.currentTime == currentSong.duration) nextSong();
}, 900);
function changeTimeline(currentTime) {
  currTime.html(formatTime(currentTime));
  timeLine.value = currentTime.toFixed(0);
}

vol.on("change", function () {
  currentSong.volume = vol.val() / 100;
});
volIcon.click(function () {
  muteVolume();
});

function muteVolume() {
  if (volIcon.hasClass("fa-volume-up")) {
    volIcon.removeClass("fa-volume-up");
    volIcon.addClass("fa-volume-mute");
    currentSong.volume = 0;
    vol.val(0);
  } else {
    volIcon.removeClass("fa-volume-mute");
    volIcon.addClass("fa-volume-up");
    currentSong.volume = 0.5;
    vol.val(50);
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
  myPlayButton.removeClass("fa-play-circle");
  myPlayButton.addClass("fa-pause-circle");
}
myPlayButton.click(function () {
  console.log(myPlayButton.attr("class"));
  if (myPlayButton.hasClass("fa-pause-circle")) {
    myPlayButton.removeClass("fa-pause-circle");
    myPlayButton.addClass("fa-play-circle");
    currentSong.pause();
  } else if (myPlayButton.hasClass("fa-play-circle")) {
    myPlayButton.removeClass("fa-play-circle");
    myPlayButton.addClass("fa-pause-circle");
    currentSong.play();
  }
});
nextIcon.click(function () {
  nextSong();
});
preIcon.click(function () {
  preSong();
});
myShuffleButton.click(function () {
  if (myShuffleButton.hasClass("first-icon")) {
    myShuffleButton.removeClass("first-icon");
    myShuffleButton.addClass("first-icon--pressed");
  } else {
    myShuffleButton.removeClass("first-icon--pressed");
    myShuffleButton.addClass("first-icon");
  }
});
myLoopButton.click(function () {
  if (
    myLoopButton.hasClass("last-icon")
  ) {
    myLoopButton.removeClass("last-icon");
    myLoopButton.addClass("last-icon--pressed");
  } else {
    myLoopButton.removeClass("last-icon--pressed");
    myLoopButton.addClass("last-icon");
  }
});
