document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const personas = document.getElementById("personas").value;
  const mensaje = document.getElementById("mensaje").value;

  const texto = `\u2728 Gehovana XV \u2728

\uD83D\uDC64 Nombre: ${nombre}
\uD83D\uDC65 Personas: ${personas}
\uD83D\uDC8C Mensaje: ${mensaje}

Nos vemos pronto! \uD83D\uDC9A`;

  const numero = "5212225236614";

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");
});