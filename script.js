let songs = [
  {
    title: "Dola Re Dola",
    artist: "Paro & Dev",
    file: "dola_ry_dola.mp3"
  },
  {
    title: "Shararat",
    artist: "Dhurandar",
    file: "shararat.mp3"
  },
  {
    title: "Kajra Re",
    artist: "Aishwarya",
    file: "Kajra_Re.mp3"
  }
];

let index = 0;

let audio = document.getElementById("audio");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let progress = document.getElementById("progress");
let volume = document.getElementById("volume");
let playlist = document.getElementById("playlist");

// Load song
function loadSong(i){
  audio.src = songs[i].file;
  title.innerText = songs[i].title;
  artist.innerText = songs[i].artist;
}

// Play / Pause
function togglePlay(){
  if(audio.paused){
    audio.play();
  } else {
    audio.pause();
  }
}

// Next song
function nextSong(){
  index = (index + 1) % songs.length;
  loadSong(index);
  audio.play();
}

// Previous song
function prevSong(){
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  audio.play();
}

// Progress update
audio.addEventListener("timeupdate", () => {
  if(audio.duration){
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Autoplay next
audio.addEventListener("ended", () => {
  nextSong();
});

// Playlist
function loadPlaylist(){
  songs.forEach((song, i) => {
    let li = document.createElement("li");
    li.innerText = song.title;
    li.onclick = () => {
      index = i;
      loadSong(index);
      audio.play();
    };
    playlist.appendChild(li);
  });
}

// Init
window.onload = function(){
  loadSong(index);
  loadPlaylist();
  audio.volume = 0.5;
};