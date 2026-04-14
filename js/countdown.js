// ================================
// ⏳ CONTADOR REGRESIVO
// ================================

// obtenemos el elemento donde se mostrará el contador
const countdown = document.getElementById("countdown");

// ================================
// 📅 FECHA DEL EVENTO (IMPORTANTE)
// ================================
// Formato: "AÑO-MES-DÍA T HORA:MINUTO:SEGUNDO"
//
// 👉 TU EVENTO:
// 20 de junio de 2026 a las 6:00 PM
// (SÍ cae en sábado)
const eventDate = new Date("2026-06-20T18:00:00").getTime();


// ================================
// 🔢 FORMATO DE NÚMEROS
// ================================
// agrega un 0 si el número es menor a 10
// Ej: 5 → 05
function format(n) {
  return n < 10 ? "0" + n : n;
}


// ================================
// 🔄 FUNCIÓN PRINCIPAL DEL CONTADOR
// ================================
function updateCountdown() {

  // evita errores si el elemento no existe
  if (!countdown) return;

  // obtenemos el tiempo actual del dispositivo
  const now = new Date().getTime();

  // diferencia entre fecha del evento y ahora
  const diff = eventDate - now;

  // si ya llegó el día
  if (diff <= 0) {
    countdown.innerHTML = "¡Es hoy! 🎉";
    return;
  }

  // cálculos de tiempo
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // mostramos el resultado en pantalla
  countdown.innerHTML =
    `${days}d ${format(hours)}h ${format(minutes)}m ${format(seconds)}s`;
}


// ================================
// ⏱️ ACTUALIZACIÓN AUTOMÁTICA
// ================================

// se actualiza cada segundo
setInterval(updateCountdown, 1000);

// ejecución inmediata al cargar la página
updateCountdown();