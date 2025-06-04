
const palabras = ["ecuador", "volcan", "quito", "amazonas", "andes"];
const palabra = palabras[Math.floor(Math.random() * palabras.length)];
let palabraOculta = Array(palabra.length).fill("_");
let intentos = 6;

document.getElementById("palabra").textContent = palabraOculta.join(" ");

function adivinarLetra() {
  const letraInput = document.getElementById("letra");
  const letra = letraInput.value.toLowerCase();
  letraInput.value = "";

  if (!letra || letra.length !== 1 || !/[a-zñ]/.test(letra)) {
    document.getElementById("mensaje").textContent = "Ingresa una letra válida.";
    return;
  }

  let acierto = false;
  for (let i = 0; i < palabra.length; i++) {
    if (palabra[i] === letra && palabraOculta[i] === "_") {
      palabraOculta[i] = letra;
      acierto = true;
    }
  }

  if (!acierto) {
    intentos--;
    document.getElementById("intentos").textContent = intentos;
  }

  document.getElementById("palabra").textContent = palabraOculta.join(" ");

  if (palabraOculta.join("") === palabra) {
    document.getElementById("mensaje").textContent = "¡Ganaste! 🎉";
  } else if (intentos === 0) {
    document.getElementById("mensaje").textContent = `Perdiste 😢. La palabra era: ${palabra}`;
  }
}
