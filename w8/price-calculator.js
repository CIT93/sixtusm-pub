// --- Step 2: Create price-calculator.js ---

// Price for one T-Shirt.
const shirtPrice = 15;

// Price for gift wrap.
const giftWrapPrice = 2;

// Calculates the total price for the order.
export const calculateTotal = function(orderData) {

    let totalPrice = orderData.qty * shirtPrice;

    if (orderData.giftWrap) {
        totalPrice = totalPrice + giftWrapPrice;
    }

    return {
        totalPrice: totalPrice
    };
};