// ================================================
//  FORMULARIO → WHATSAPP
//  Encode correcto para emojis y caracteres especiales
// ================================================

const WHATSAPP_NUMBER = "522229278227"; // ← cambia por tu número con código de país (52 = México)

document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault(); // evita que recargue la página

  // ── Leer valores ──────────────────────────────
  const nombre  = document.getElementById("nombre").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  // ── Validación básica ─────────────────────────
  if (!nombre) {
    alert("Por favor escribe tu nombre 🌟");
    return;
  }

  // ── Construir el mensaje con emojis ───────────
  // encodeURIComponent convierte emojis y acentos correctamente
  const texto = encodeURIComponent(
    `\uD83D\uDC38\u2728 ¡Hola! Te confirmo mi asistencia a los XV años \uD83C\uDF89\uD83C\uDF89` +
    `\uD83D\uDC64 Nombre: ${nombre}\n` +
    (mensaje ? `\uD83D\uDC8C Mensaje: ${mensaje}\n` : "") +
    `\n\uD83C\uDFF0 ¡Nos vemos en la celebración! \uD83C\uDF19`
  );

  // ── Abrir WhatsApp ────────────────────────────
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
  window.open(url, "_blank", "noopener,noreferrer");

  // ── Limpiar el formulario después de enviar ───
  document.getElementById("rsvpForm").reset();
});