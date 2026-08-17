console.log("Hello from app.js! Your JavaScript is connected and running!");
// --- Part 1: Select HTML Elements ----
// We use document.getElementById() to get a reference to an element by its unique ID.
// We store these references in 'const' variables because the elements themselves won't change.

const totalDisplayElement = document.getElementById("total-display");
const addItemButton = document.getElementById("add-item-btn");

// These variables will change as the user interacts with the page.
let totalCost = 0;
const itemPrice = 15;

// Prompt Notes:
// defer: Loads JavaScript without blocking the HTML and runs it after the HTML is parsed.
// Scope: Determines where variables and functions can be accessed in JavaScript.

// --- Part 2: Define a Function that Reacts to a Click---
// A function is a block of code designed to perform a particular task.
// Help me understand how arguments and parameters are used in functions

const handleButtonClick = function() {
    // clickCount = clickCount + 1;
    // Increase clickCount by 1 each time the button is clicked
   totalCost += itemPrice;

    // Template strings (literal) to easily combine our variables and text into one message
   let message = `Current Total: $${totalCost}`;

// This is basic decision-making in JavaScript!
// Use a simple 'if' statement to make our page react differently based on clickCount.
if (totalCost >= 60) {
    // We can even change the style of an HTML element directly with JavaScript!
    // Change text color
    message += ' (Over Budget!)';
    totalDisplayElement.style.color = 'red';
} else {
   totalDisplayElement.style.color = '#333';
}

// Prompt Notes:

// Decision-making: JavaScript uses if, else if, and else to run different code based on conditions.
// Colors in JavaScript: Colors can be represented using names, HEX, RGB, or HSL values.
// Examples: 'purple', '#333', 'rgb(128, 0, 128)'.

// Update the text content of our paragraph element on the page.
// This is how JavaScript makes changes visible on the web page!
totalDisplayElement.textContent = message;

    console.log(`Button Clicked! Current click count: ${totalCost}`);
};

// Prompt Notes:

// Functions: Reusable blocks of code that perform a specific task and help organize code.
// Functions can be defined with function declarations, expressions, or arrow functions.
// Parameters: Variables listed when defining a function.
// Arguments: Actual values passed to a function when it is called.

document.addEventListener('DOMContentLoaded', function() {
    // --- Part 3: Make the Button Clickable (Event Listener) ---
    // This part ensures our JavaScript code runs only AFTER the HTML is fully loaded and parsed.
    // The 'DOMContentLoaded' event is perfect for this. It fires when the HTML document is ready.

    console.log('DOM fully loaded and parsed, App is ready for interaction');

    // Attach an event listener to our 'updateButton.
    // When 'updateButton' receives a 'click' event, the 'handleButtonClick' function will execute.
    addItemButton.addEventListener('click', handleButtonClick);
});

// Prompt Notes:

// Event Listener: Waits for an event, such as a click, and then runs a function.
// Example: updateButton.addEventListener('click', handleButtonClick);
// Event listeners make web pages interactive by responding to user actions.

// DOM (Document Object Model): Represents the HTML page as objects that JavaScript can access and change.
// Example: document.getElementById("output-message") accesses an HTML element.
// JavaScript can use the DOM to change text, styles, and other HTML content.

