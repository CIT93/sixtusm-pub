// --- Step 2: Create the Module (order-handler.js) ---

// This module's job is to look at the order form and return the form data.

// Reference to the Quantity input.
const qtyInput = document.getElementById('qty');

// Reference to the Gift Wrap checkbox.
const giftWrapInput = document.getElementById('gift-wrap');

// Reference to all Size radio buttons.
// querySelectorAll returns a NodeList because there are multiple radio buttons with the same name.
const sizeRadios = document.querySelectorAll('input[name="size"]');
// Dry - Don't Repeat Yourself
// Write a function to handle this and return the value
// @param {NodeList} radioButtons - A NodeList (like an array) of radio button elements.
// @returns {string} The 'value' attribute of the selected radio button.
const getSelectedRadioValue = function(radioButtons) {

    // Loop over the node list to find the radio button checked (clicked)
    // for...of to loop over node list (array like)
    for (const radio of radioButtons) {

        // Code to be executed for each value
        if (radio.checked) {
            return radio.value;
        }
    }
};
// Export the main function that collects the order form values.
// @returns {Object} An object containing all the collected input values.
export const getOrderInputs = function() {

    // Return the form values as an object literal.
    return {
        qty: parseInt(qtyInput.value),
        size: getSelectedRadioValue(sizeRadios),
        giftWrap: giftWrapInput.checked
    };
};
// // TEMPORARY TEST:
// console.log(getOrderInputs());