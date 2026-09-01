import * as orderForm from "./order-handler.js";
import * as priceCalculator from './price-calculator.js';

// Stores all orders placed during the current session.
const orders = [];

// Reference to the order form.
const orderFormElement = document.getElementById('order-form');

// Reference to the order summary div.
const orderSummary = document.getElementById('order-summary');

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

    // console.log(orderData);

// Adds the new order to the orders array.
orders.push(newOrder);

// Displays the full orders array in the console.
console.log(orders);
// Creates the order summary message.
let message = `Ordered ${orderData.qty} ${orderData.size} T-Shirts`;

// Only displays gift wrapped if the user selected Gift Wrap.
if (orderData.giftWrap) {
    message += ' - gift wrapped';
}

// Displays the order details on the page.
orderSummary.textContent = message;
};
// Initializes the app and attaches the submit event listener.
const init = function() {
    console.log('App Initialized');
    orderFormElement.addEventListener('submit', handleOrderSubmit);
};
// Runs the init function after the DOM has loaded.
document.addEventListener('DOMContentLoaded', init);