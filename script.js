// for hamberger menubar
function toggleMenu() {
    const menu = document.getElementById('menubar');
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
}

// // for song 

const playerBar = document.getElementById('playerBar');
const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");

function playSong(src, title, artist) {

    document.getElementById('songTitle').textContent = title;
    document.getElementById('songArtist').textContent = artist;

    playerBar.style.display = 'flex';
    audio.src = src;
    audio.play();
    playPauseIcon.src = 'assets/pause.svg';
    playPauseIcon.alt = 'Pause';

}

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseIcon.src = 'assets/pause.svg';
        playPauseIcon.alt = 'Pause';
    }
    else {
        audio.pause();
        playPauseIcon.src = 'assets/playM.svg';
        playPauseIcon.alt = 'Play';
    }
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${secs}`;
}
audio.addEventListener('loadedmetadata', () => {
    progressBar.max = audio.duration
    currentTimeEl.textContent = "0:00";
    totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalTimeEl.textContent = formatTime(audio.duration);
    progressBar.value = audio.currentTime;
});

progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
});

const muteBtn = document.getElementById('muteBtn');
const muteIcon = document.getElementById('muteIcon');
const volumeBar = document.getElementById('volumeBar');

let previousVolume = 1;

muteBtn.addEventListener('click', () => {
    if (audio.volume > 0) {
        previousVolume = audio.volume;
        audio.volume = 0;
        volumeBar.value = 0;
        muteIcon.src = 'assets/muted.svg';
        muteIcon.alt = 'Muted';
    }
    else {
        audio.volume = previousVolume || 1;
        volumeBar.value = previousVolume || 1;
        muteIcon.src = 'assets/volume.svg';
        muteIcon.alt = 'Volume';
    }
})

volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value;
    muteIcon.src = volumeBar.value == 0 ? 'assets/muted.svg' : 'assets/volume.svg';
});


function showPlaylist(playlistId) {
    document.getElementById("left-cont").style.display = "none";
    document.querySelectorAll(".playlistSongs").forEach(el => el.style.display = "none");

    // Show only selected playlist
    const selected = document.getElementById("playlist-" + playlistId);
    if (selected) selected.style.display = "block";
}

function goBack() {
    // Hide all playlist views
    document.querySelectorAll(".playlistSongs").forEach(el => el.style.display = "none");

    // Show the original left-cont content
    document.getElementById("left-cont").style.display = "block";
}



const playlists = {
  happy: [
    { src: "songs/Walking On Sunshine.mp3", title: "Walking on Sunshine", artist: "Katrina & The Waves" },
    { src: "songs/Happy.mp3", title: "Happy", artist: "Pharrell Williams" },
    { src: "songs/Dont_Worry_Be_Happy.mp3", title: "Don't Worry, Be Happy", artist: "Bobby McFerrin" },
    { src: "songs/Levitating.mp3", title: "Levitating", artist: "Dua Lipa" },
    { src: "songs/Uptown Funk.mp3", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" }
  ],

  sleep: [
    { src: "songs/Tum Hi Ho.mp3", title: "Tum Hi Ho", artist: "Arijit Singh" },
    { src: "songs/Re Mann.mp3", title: "Re Mann", artist: "Shreya Ghoshal, Swanand Kirkire" },
    { src: "songs/Khairiyat.mp3", title: "Khairiyat", artist: "Arijit Singh" },
    { src: "songs/MRYNR.mp3", title: "Main Rahoon Ya Na Rahoon", artist: "Armaan Malik" },
    { src: "songs/Hawayein.mp3", title: "Hawayein", artist: "Arijit Singh" }
  ]
};

let currentPlaylist = [];
let currentIndex = 0;

function loadSong(index) {
  const song = currentPlaylist[index];
  if (!song) return;
  audio.src = song.src;
  document.getElementById('songTitle').textContent = song.title;
  document.getElementById('songArtist').textContent = song.artist;
  audio.play();
  playPauseIcon.src = 'assets/pause.svg';
}

function playPlaylist(name, index = 0) {
showPlaylist(name)
  currentPlaylist = playlists[name];
  currentIndex = index;
  playerBar.style.display = 'flex';
  loadSong(currentIndex);
}

document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  loadSong(currentIndex);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentPlaylist.length;
  loadSong(currentIndex);
});

audio.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % currentPlaylist.length;
  loadSong(currentIndex);
});


