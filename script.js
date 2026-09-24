"use strict";

const display = document.querySelector("#display");
const buttons = document.querySelector(".buttons");

let currentInput = "";
let storedValue = null;
let pendingOperator = null;
let replaceInput = false;

function render(value = currentInput || "0") {
  display.textContent = value;
}

function clear() {
  currentInput = "";
  storedValue = null;
  pendingOperator = null;
  replaceInput = false;
  render();
}

function enterDigit(digit) {
  if (replaceInput || currentInput === "Error") currentInput = "";
  replaceInput = false;
  if (currentInput.replace(".", "").length >= 15) return;
  currentInput = currentInput === "0" ? digit : currentInput + digit;
  render();
}

function enterDecimal() {
  if (replaceInput || currentInput === "Error") currentInput = "";
  replaceInput = false;
  if (!currentInput.includes(".")) currentInput = `${currentInput || "0"}.`;
  render();
}

function calculate(a, b, op) {
  if (op === "+") return a + b;
  if (op === "−") return a - b;
  if (op === "×") return a * b;
  if (op === "÷") return b === 0 ? null : a / b;
  return b;
}

function format(value) {
  if (!Number.isFinite(value)) return "Error";
  return String(Number(value.toPrecision(11)));
}

function showResult(value) {
  if (value === null || !Number.isFinite(value)) {
    currentInput = "Error";
    storedValue = null;
    pendingOperator = null;
    render("Error");
    replaceInput = true;
    return false;
  }
  currentInput = format(value);
  render(currentInput);
  return true;
}

function chooseOperator(op) {
  if (currentInput === "Error") return;
  const inputValue = currentInput === "" ? null : Number(currentInput);

  if (pendingOperator && inputValue !== null && !replaceInput) {
    const result = calculate(storedValue, inputValue, pendingOperator);
    if (!showResult(result)) return;
    storedValue = Number(currentInput);
  } else if (inputValue !== null && storedValue === null) {
    storedValue = inputValue;
  }

  pendingOperator = op;
  currentInput = "";
  replaceInput = false;
}

function equals() {
  if (!pendingOperator || storedValue === null) return;
  const right = currentInput === "" ? storedValue : Number(currentInput);
  const result = calculate(storedValue, right, pendingOperator);
  pendingOperator = null;
  storedValue = null;
  if (showResult(result)) replaceInput = true;
}

buttons.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.digit !== undefined) enterDigit(button.dataset.digit);
  else if (button.dataset.action === "decimal") enterDecimal();
  else if (button.dataset.operator) chooseOperator(button.dataset.operator);
  else if (button.dataset.action === "equals") equals();
  else if (button.dataset.action === "clear") clear();
});

document.addEventListener("keydown", (event) => {
  if (/^[0-9]$/.test(event.key)) enterDigit(event.key);
  else if (event.key === ".") enterDecimal();
  else if (["+", "-", "*", "/"].includes(event.key)) {
    event.preventDefault();
    chooseOperator({ "+": "+", "-": "−", "*": "×", "/": "÷" }[event.key]);
  } else if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    equals();
  } else if (event.key === "Escape" || event.key === "Backspace") clear();
});
