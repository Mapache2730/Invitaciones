// ================================
// 🐸 ELEMENTOS PRINCIPALES
// ================================

const frog = document.getElementById("frog"); // contenedor clickeable
const pantalla = document.getElementById("pantalla-inicial");
const contenido = document.getElementById("contenido");

// ================================
// 🎵 AUDIO
// ================================

const audio = new Audio("assets/images/icons/music/song.mp3");

// ================================
// 🐸 EVENTO CLICK (SAPO)
// ================================

frog.addEventListener("click", () => {

  // reproducir música (permitido porque hay interacción)
  audio.play();

  // animación de salto
  frog.classList.add("jump");

  // transición a contenido
  setTimeout(() => {
    pantalla.classList.add("hide"); // oculta pantalla inicial
    contenido.classList.remove("oculto");
    contenido.classList.add("show");
  }, 500);

});