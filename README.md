# Calculator

A compact, responsive four-function calculator built with plain HTML, CSS, and JavaScript. It runs directly in a browser and needs no build step or dependencies.

## Run it

Open `index.html` in a modern web browser. You can also serve this directory with any static file server.

## Use it

- Click the on-screen buttons or type numbers with your keyboard.
- Use `+`, `-`, `*`, and `/` for addition, subtraction, multiplication, and division.
- Press `Enter` (or `=`) to calculate, `.` for a decimal point, and `Escape` to clear.
- Chained operations calculate from left to right. Press `AC` to start over.
- Division by zero and results outside the finite number range display `Error`; enter a digit or clear to continue.

The calculator keeps up to 15 entered digits and rounds displayed results to 11 significant digits to avoid common floating point artifacts.
