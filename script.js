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
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "×") {
    return multiply(a, b);
  } else if (operator === "÷") {
    return divide(a, b);
  }
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
    firstNumber = Number(currentInput);
    operator = button.textContent;
    currentInput = "";
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
