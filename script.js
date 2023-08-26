const audioPlayer = document.getElementById("audio-player");
const audioSource = document.getElementById("audio-source");
const playlist = document.getElementById("playlist");
const playPauseBtn = document.getElementById("playPauseBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const songs = document.querySelectorAll(".song");
//const currentSongCover = document.getElementById("currentSongCover");
const currentSongTitle = document.getElementById("currentSongTitle");
let currentSongIndex = 0;

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  
  songs.forEach(song => {
    const songTitle = song.querySelector("span").textContent.toLowerCase();
    
    if (songTitle.includes(searchTerm)) {
      song.style.display = "flex";
    } else {
      song.style.display = "none";
    }
  });
});

function playSong(index) {
    const songSrc = playlist.children[index].getAttribute("data-src");
    //const songCover = playlist.children[index].getAttribute("data-cover");
    const songTitle = playlist.children[index].textContent;

    audioSource.src = songSrc;
    audioPlayer.load();
    audioPlayer.play();

    //currentSongCover.src = songCover;
    currentSongTitle.textContent = songTitle;

    // Supprimer la classe active de toutes les chansons
    for (const song of playlist.children) {
      song.classList.remove("active");
  }

  // Ajouter la classe active à la chanson en cours de lecture
  playlist.children[index].classList.add("active");

    updatePlayPauseIcon(true);
}

songs.forEach(song => {
  const songTitle = song.querySelector("span").textContent.toLowerCase();

  // Ajoutez un écouteur d'événement au clic sur l'image
  const songImage = song.querySelector("img");
  songImage.addEventListener("click", () => {
    currentSongIndex = Array.from(playlist.children).indexOf(song);
    playSong(currentSongIndex);
  });

  // Ajoutez un écouteur d'événement au clic sur le titre
  const songSpan = song.querySelector("span");
  songSpan.addEventListener("click", () => {
    currentSongIndex = Array.from(playlist.children).indexOf(song);
    playSong(currentSongIndex);
  });

  // Reste du code pour la recherche...
});


function updatePlayPauseIcon(isPlaying) {
  if (isPlaying) {
    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");
  } else {
    playPauseBtn.classList.remove("fa-pause");
    playPauseBtn.classList.add("fa-play");
  }
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.children.length;
  playSong(currentSongIndex);
}

playlist.addEventListener("click", (event) => {
  if (event.target && event.target.matches(".song")) {
    currentSongIndex = Array.from(playlist.children).indexOf(event.target);
    playSong(currentSongIndex);
  }
});

// playPauseBtn.addEventListener("click", () => {
//   if (audioPlayer.paused) {
//     audioPlayer.play();
//   } else {
//     audioPlayer.pause();
//   }
//   updatePlayPauseIcon(!audioPlayer.paused);
// });

previousBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.children.length) % playlist.children.length;
  playSong(currentSongIndex);
});

nextBtn.addEventListener("click", () => {
  playNextSong();
});

audioPlayer.addEventListener("ended", () => {
  playNextSong();
}
), "timeupdate", () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progress}%`;
};

// Attendre que la page soit complètement chargée
window.addEventListener("load", () => {
  const loadingOverlay = document.querySelector(".loading-overlay");
  loadingOverlay.style.display = "none"; // Masquer l'indicateur de chargement
});
