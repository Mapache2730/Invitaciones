// ================================================
//  SISTEMA DE GESTIÓN DE INVITADOS
//  Lee desde Google Sheets y personaliza la invitación
// ================================================

// ── CONFIGURACIÓN ─────────────────────────────
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQEZRELR9-GLL41bwzZRi_lfapbCmz8089sROm5eO86v16uLsCapbM6dpP5ryG8nxgImwI4qpe7dksC/pub?gid=0&single=true&output=csv";

const WHATSAPP_NUMBER = "522229278227";


// ── LEER PARÁMETRO DEL LINK ───────────────────
// Si el link es: mapache2730.github.io/Invitaciones/?invite=juan
// esto lee "juan"
function obtenerClave() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("invite") || "").toLowerCase().trim();
}


// ── PARSEAR CSV DE GOOGLE SHEETS ─────────────
function parsearCSV(texto) {
  const filas = texto.trim().split("\n");
  const encabezados = filas[0].split(",").map(h => h.trim().toLowerCase());
  const datos = [];

  for (let i = 1; i < filas.length; i++) {
    // Manejo correcto de comas dentro de comillas (nombres con coma)
    const valores = [];
    let actual = "";
    let dentroComillas = false;

    for (let c = 0; c < filas[i].length; c++) {
      const char = filas[i][c];
      if (char === '"') {
        dentroComillas = !dentroComillas;
      } else if (char === "," && !dentroComillas) {
        valores.push(actual.trim());
        actual = "";
      } else {
        actual += char;
      }
    }
    valores.push(actual.trim());

    const fila = {};
    encabezados.forEach((h, idx) => {
      fila[h] = (valores[idx] || "").trim();
    });
    datos.push(fila);
  }
  return datos;
}


// ── BUSCAR INVITADO POR CLAVE ─────────────────
function buscarInvitado(datos, clave) {
  return datos.find(fila => fila.clave === clave) || null;
}


// ── PERSONALIZAR LA PÁGINA ────────────────────
function personalizarPagina(invitado) {

  // Muestra el nombre en la pantalla de la rana
  const textoRana = document.querySelector(".frog-text");
  if (textoRana) {
    textoRana.textContent =
      "Toca el sapo, " + invitado.nombre + " \uD83D\uDC38";
  }

  // Agrega la sección de pases al contenido principal
  const main = document.getElementById("contenido");
  if (!main) return;

  const esSingular = invitado.pases === "1";

  const seccionPases = document.createElement("section");
  seccionPases.className = "pases-section";
  seccionPases.innerHTML =
    "<h2>Tu invitaci\u00F3n</h2>" +
    "<div class=\"pases-card\">" +
      "<p class=\"pases-nombre\">\uD83D\uDC51 " + invitado.nombre + "</p>" +
      "<p class=\"pases-cantidad\">Esta invitaci\u00F3n es v\u00E1lida para</p>" +
      "<div class=\"pases-numero\">" + invitado.pases + "</div>" +
      "<p class=\"pases-label\">" + (esSingular ? "persona" : "personas") + "</p>" +
    "</div>";

  // Insertar justo después del header (imagen XV)
  const header = main.querySelector(".hero");
  if (header && header.nextSibling) {
    main.insertBefore(seccionPases, header.nextSibling);
  } else {
    main.prepend(seccionPases);
  }

  // Rellena y bloquea el campo nombre en el formulario
  const inputNombre = document.getElementById("nombre");
  if (inputNombre) {
    inputNombre.value = invitado.nombre;
    inputNombre.setAttribute("readonly", true);
    inputNombre.style.opacity = "0.7";
    inputNombre.style.cursor  = "not-allowed";
  }
}


// ── INVITACIÓN GENÉRICA (sin ?invite=) ───────
function mostrarGenerica() {
  console.log("Invitaci\u00F3n gen\u00E9rica \u2014 sin clave de invitado");
}


// ── CLAVE NO ENCONTRADA EN EL SHEET ──────────
function mostrarError(clave) {
  console.warn("Clave \"" + clave + "\" no encontrada en el Sheet");
  // Falla silenciosa — el invitado ve la página normal sin pases
}


// ── INICIALIZAR ───────────────────────────────
async function inicializar() {
  const clave = obtenerClave();

  // Sin ?invite= en el link → invitación genérica normal
  if (!clave) {
    mostrarGenerica();
    return;
  }

  try {
    const respuesta = await fetch(SHEET_URL);

    if (!respuesta.ok) {
      throw new Error("HTTP " + respuesta.status);
    }

    const csv      = await respuesta.text();
    const datos    = parsearCSV(csv);
    const invitado = buscarInvitado(datos, clave);

    if (invitado) {
      personalizarPagina(invitado);
    } else {
      mostrarError(clave);
    }

  } catch (error) {
    console.error("Error al cargar invitados:", error.message);
    mostrarGenerica(); // falla silenciosa — la página sigue funcionando
  }
}

document.addEventListener("DOMContentLoaded", inicializar);