
import * as orderForm from "./order-handler.js";
import * as priceCalculator from './price-calculator.js';
import * as orderStorage from './order-storage.js';
import * as orderList from './order-list.js';

// Stores all orders placed during the current session.
const orders = [];

// Reference to the order form.
const orderFormElement = document.getElementById('order-form');

// Handles the order form submission.
const handleOrderSubmit = function (event) {
    // Prevents the form from reloading the page.
    event.preventDefault();

    // Gets the order data object from order-handler.js.
    const orderData = orderForm.getOrderInputs();

    // Calculates the price using the price calculator module.
    const calculatedPrice = priceCalculator.calculateTotal(orderData);

    // Gets the hidden ID to check if we are editing an order.
    const orderId = document.getElementById('order-id').value;

    if (orderId) {
        // Find the existing order.
        const index = orders.findIndex(order => order.id === orderId);

        if (index !== -1) {
            // Update the order while keeping its original ID and timestamp.
            orders[index] = {
                ...orders[index],
                ...orderData,
                ...calculatedPrice
            };
        }
    } else {
        // Create a new order.
        const newOrder = {
            id: Date.now().toString(),
            ...orderData,
            ...calculatedPrice,
            timestamp: new Date().toISOString()
        };

        // Add the new order to the orders array.
        orders.push(newOrder);
    }

    // Save the updated orders array to localStorage.
    orderStorage.saveOrders(orders);

    // Re-render the table.
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });

    // Clear the hidden ID and reset the form.
    document.getElementById('order-id').value = '';
    orderFormElement.reset();
};

const handleDelete = function (id) {
    // Find the index of the order to delete.
    const index = orders.findIndex(order => order.id === id);

    // Remove the order from the array.
    if (index !== -1) {
        orders.splice(index, 1);

        // Save the updated orders to localStorage.
        orderStorage.saveOrders(orders);

        // Re-render the table with the updated orders.
        orderList.renderOrders(orders, {
            onDelete: handleDelete,
            onEdit: handleEdit
        });
    }
};

const handleEdit = function (id) {
    // Find the order that matches the selected ID.
    const order = orders.find(order => order.id === id);

    if (order) {
        // Populate the quantity input.
        document.getElementById('qty').value = order.qty;

        // Select the correct size radio button.
        document.querySelector('input[name="size"][value="' + order.size + '"]').checked = true;

        // Set the gift wrap checkbox.
        document.getElementById('gift-wrap').checked = order.giftWrap;

        // Store the order ID in the hidden input.
        document.getElementById('order-id').value = order.id;
    }
};

// Initializes the app and attaches the submit event listener.
const init = function () {
    console.log('App Initialized');

    // Loads saved orders from localStorage.
    const loadedOrders = orderStorage.loadOrders();

    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);

        // Render the full list instead of just the last one.
        orderList.renderOrders(orders, {
            onDelete: handleDelete,
            onEdit: handleEdit
        });
    }

    orderFormElement.addEventListener('submit', handleOrderSubmit);
};

// Runs the init function after the DOM has loaded.
document.addEventListener('DOMContentLoaded', init);
