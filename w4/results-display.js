// This module handles displaying the order results on the page.

// Reference to the order summary container.
const orderSummary = document.getElementById('order-summary');

// References to the display elements inside the order summary.
const displayTotal = orderSummary.querySelector('#display-total');
const displayQty = orderSummary.querySelector('#display-qty');
const displaySize = orderSummary.querySelector('#display-size');
const displayGift = orderSummary.querySelector('#display-gift');

// Displays the order results on the page.
export const displayResults = function(order) {

    // Update the text content with the order information.
    displayTotal.textContent = order.totalPrice;
    displayQty.textContent = order.qty;
    displaySize.textContent = order.size;

    // Display Yes or No depending on gift wrap selection.
    if (order.giftWrap) {
        displayGift.textContent = 'Yes';
    } else {
        displayGift.textContent = 'No';
    }

    // Make the order summary visible.
    orderSummary.style.display = 'block';
};