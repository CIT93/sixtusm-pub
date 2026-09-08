import * as orderForm from "./order-handler.js";
import * as priceCalculator from './price-calculator.js';
import * as resultsDisplay from './results-display.js';

// Stores all orders placed during the current session.
const orders = [];

// Reference to the order form.
const orderFormElement = document.getElementById('order-form');

// Handles the order form submission.
const handleOrderSubmit = function(event) {
    // Prevents the form from reloading the page.
    event.preventDefault();

    // Gets the order data object from order-handler.js.
    const orderData = orderForm.getOrderInputs();

    // Calculates the price using the price calculator module.
    const calculatedPrice = priceCalculator.calculateTotal(orderData);

    // Combines the order data and calculated price into one new order object.
    const newOrder = {
        ...orderData,
        ...calculatedPrice,
        timestamp: new Date().toISOString()
    };

    // Adds the new order to the orders array.
    orders.push(newOrder);

    // Displays the current order results on the page.
    resultsDisplay.displayOrder(newOrder);
};

// Initializes the app and attaches the submit event listener.
const init = function() {
    console.log('App Initialized');
    orderFormElement.addEventListener('submit', handleOrderSubmit);
};

// Runs the init function after the DOM has loaded.
document.addEventListener('DOMContentLoaded', init);