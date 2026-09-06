"use strict";

const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

let currentInput = "";
let firstNumber = null;
let operator = null;
let justCalculated = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error";
  } else return a / b;
}

function operate(operator, a, b) {
  let result;
  if (operator === "+") {
    result = add(a, b);
  } else if (operator === "-") {
    result = subtract(a, b);
  } else if (operator === "×") {
    result = multiply(a, b);
  } else if (operator === "÷") {
    result = divide(a, b);
  }
  if (typeof result === "number") {
    return Number(result.toFixed(10));
  }
  return result;
}

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (justCalculated) {
      currentInput = "";
      justCalculated = false;
    }
    currentInput += button.textContent;
    display.textContent = currentInput;
  });
});

operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (firstNumber === null) {
      firstNumber = Number(currentInput);
    } else if (currentInput !== "") {
      const secondNumber = Number(currentInput);
      const result = operate(operator, firstNumber, secondNumber);

      display.textContent = result;
      firstNumber = result;
    }

    operator = button.textContent;
    currentInput = "";
    justCalculated = false;
  });
});

equalsButton.addEventListener("click", function () {
  if (firstNumber === null || operator === null || currentInput === "") {
    return;
  }
  const secondNumber = Number(currentInput);
  const result = operate(operator, firstNumber, secondNumber);

  display.textContent = result;
  currentInput = String(result);
  firstNumber = null;
  operator = null;
  justCalculated = true;
});

clearButton.addEventListener("click", function () {
  currentInput = "";
  firstNumber = null;
  operator = null;
  display.textContent = "0";
});

decimalButton.addEventListener("click", function () {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    display.textContent = currentInput;
  }
});
