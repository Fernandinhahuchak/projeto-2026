const historyElement = document.getElementById("history");
const outputElement = document.getElementById("output");
const keys = document.querySelectorAll(".key");

let currentValue = "0";
let previousValue = "";
let currentOperator = "";
let justEvaluated = false;

function updateDisplay() {
  historyElement.textContent = previousValue
    ? `${previousValue} ${currentOperator}`
    : "";
  outputElement.textContent = currentValue;
}

function appendNumber(number) {
  if (justEvaluated) {
    currentValue = "0";
    justEvaluated = false;
  }

  if (number === ".") {
    if (currentValue.includes(".")) return;
    currentValue += ".";
    return;
  }

  if (currentValue === "0") {
    currentValue = number;
  } else {
    currentValue += number;
  }
}

function chooseOperator(operator) {
  if (currentOperator && !justEvaluated) {
    calculate();
  }

  previousValue = currentValue;
  currentOperator = operator;
  currentValue = "0";
}

function calculate() {
  const first = parseFloat(previousValue.replace(",", "."));
  const second = parseFloat(currentValue.replace(",", "."));

  if (isNaN(first) || isNaN(second)) return;

  let result;
  switch (currentOperator) {
    case "+":
      result = first + second;
      break;
    case "-":
      result = first - second;
      break;
    case "*":
      result = first * second;
      break;
    case "/":
      result = second === 0 ? "Erro" : first / second;
      break;
    default:
      return;
  }

  currentValue = result === "Erro" ? result : String(result).replace(".", ",");
  previousValue = "";
  currentOperator = "";
  justEvaluated = true;
}

function clearCalculator() {
  currentValue = "0";
  previousValue = "";
  currentOperator = "";
  justEvaluated = false;
}

function deleteLast() {
  if (justEvaluated) {
    clearCalculator();
    return;
  }

  if (currentValue.length === 1) {
    currentValue = "0";
    return;
  }

  currentValue = currentValue.slice(0, -1);
}

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const number = key.dataset.number;
    const action = key.dataset.action;

    if (number) {
      appendNumber(number);
      updateDisplay();
      return;
    }

    if (action) {
      switch (action) {
        case "clear":
          clearCalculator();
          break;
        case "delete":
          deleteLast();
          break;
        case "add":
          chooseOperator("+");
          break;
        case "subtract":
          chooseOperator("-");
          break;
        case "multiply":
          chooseOperator("*");
          break;
        case "divide":
          chooseOperator("/");
          break;
        case "equals":
          calculate();
          break;
      }

      updateDisplay();
    }
  });
});

updateDisplay();