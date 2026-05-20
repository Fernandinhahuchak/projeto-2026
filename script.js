const numero = document.getElementById("numero");
const botao = document.getElementById("btn");
const bloco = document.getElementById("blocoCor");

let contador = 0;

const cores = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "yellow"
];

botao.addEventListener("click", () => {
  contador++;
  numero.textContent = contador;

  const corAleatoria =
    cores[Math.floor(Math.random() * cores.length)];

  bloco.style.background = corAleatoria;
});