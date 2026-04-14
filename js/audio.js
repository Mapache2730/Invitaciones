// ================================
// 🎵 MEDIA PLAYER (1 CANCIÓN)
// ================================

// botones
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");

// audio
const audio = new Audio("assets/images/icons/music/song.mp3");

// eventos
if (playBtn && pauseBtn) {

  playBtn.addEventListener("click", () => {
    audio.play();
  });

  pauseBtn.addEventListener("click", () => {
    audio.pause();
  });

}