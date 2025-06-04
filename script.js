
const palabras = [
  { palabra: "inocuidad", pista: "Condición que garantiza que un alimento no cause daño al consumidor" },
  { palabra: "bpm", pista: "Conjunto de normas que aseguran la higiene y seguridad en el procesamiento de alimentos." },
  { palabra: "limpieza", pista: "Primer paso clave para evitar la contaminación de alimentos en casa o en la industria." },
  { palabra: "contaminacion", pista: "Presencia de agentes dañinos en alimentos, como bacterias o productos químicos." },
  { palabra: "desinfeccion", pista: "Proceso que elimina microorganismos patógenos de superficies de contacto con alimentos." },
  { palabra: "trazabilidad", pista: "Capacidad para seguir el recorrido de un alimento desde su origen hasta el consumidor." },
  { palabra: "alergenos", pista: "Sustancias en alimentos que pueden causar reacciones adversas en personas sensibles." },
  { palabra: "etiquetado", pista: "Permite al consumidor saber si el producto tiene exceso de grasa, azúcar o sal." },
  { palabra: "cruzada", pista: "Tipo de contaminación que ocurre cuando se mezclan alimentos crudos con cocidos." }
];

let palabraActual = "";
let pistaActual = "";
let palabraOculta = [];
let intentos = 6;
let palabrasUsadas = [];

function iniciarJuego() {
  if (palabrasUsadas.length === palabras.length) {
    palabrasUsadas = [];
  }

  let indice;
  do {
    indice = Math.floor(Math.random() * palabras.length);
  } while (palabrasUsadas.includes(indice));

  palabrasUsadas.push(indice);
  palabraActual = palabras[indice].palabra;
  pistaActual = palabras[indice].pista;
  palabraOculta = Array(palabraActual.length).fill("_");
  intentos = 6;

  document.getElementById("pista").textContent = `Pista: ${pistaActual}`;
  document.getElementById("palabra").textContent = palabraOculta.join(" ");
  document.getElementById("intentos").textContent = intentos;
  document.getElementById("mensaje").textContent = "";
  document.getElementById("letra").value = "";
  dibujarAhorcado();
}

function adivinarLetra() {
  const letraInput = document.getElementById("letra");
  const letra = letraInput.value.toLowerCase();
  letraInput.value = "";

  if (!letra || letra.length !== 1 || !/[a-zñ]/.test(letra)) {
    document.getElementById("mensaje").textContent = "Ingresa una letra válida.";
    return;
  }

  let acierto = false;
  for (let i = 0; i < palabraActual.length; i++) {
    if (palabraActual[i] === letra && palabraOculta[i] === "_") {
      palabraOculta[i] = letra;
      acierto = true;
    }
  }

  if (!acierto) {
    intentos--;
    document.getElementById("intentos").textContent = intentos;
    dibujarAhorcado();
  }

  document.getElementById("palabra").textContent = palabraOculta.join(" ");

  if (palabraOculta.join("") === palabraActual) {
    document.getElementById("mensaje").textContent = "¡Ganaste! 🎉";
    setTimeout(iniciarJuego, 2000);
  } else if (intentos === 0) {
    document.getElementById("mensaje").textContent = `Perdiste 😢. La palabra era: ${palabraActual}`;
    setTimeout(iniciarJuego, 3000);
  }
}

function dibujarAhorcado() {
  const canvas = document.getElementById("ahorcado");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;

  if (intentos <= 5) {
    ctx.beginPath();
    ctx.moveTo(10, 190);
    ctx.lineTo(190, 190);
    ctx.stroke();
  }

  if (intentos <= 4) {
    ctx.beginPath();
    ctx.moveTo(50, 190);
    ctx.lineTo(50, 10);
    ctx.stroke();
  }

  if (intentos <= 3) {
    ctx.beginPath();
    ctx.moveTo(50, 10);
    ctx.lineTo(150, 10);
    ctx.stroke();
  }

  if (intentos <= 2) {
    ctx.beginPath();
    ctx.moveTo(150, 10);
    ctx.lineTo(150, 30);
    ctx.stroke();
  }

  if (intentos <= 1) {
    ctx.beginPath();
    ctx.arc(150, 50, 20, 0, Math.PI * 2, true);
    ctx.stroke();
  }

  if (intentos === 0) {
    ctx.beginPath();
    ctx.moveTo(150, 70);
    ctx.lineTo(150, 130);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(150, 90);
    ctx.lineTo(130, 110);
    ctx.moveTo(150, 90);
    ctx.lineTo(170, 110);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(150, 130);
    ctx.lineTo(130, 170);
    ctx.moveTo(150, 130);
    ctx.lineTo(170, 170);
    ctx.stroke();
  }
}

window.onload = iniciarJuego;
