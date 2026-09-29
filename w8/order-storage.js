// Key used to store the orders in localStorage.
const LOCAL_STORAGE_KEY = 'tshirt_orders_data';

// Saves the orders array to localStorage.
export const saveOrders = function(orders) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
};

// Loads the orders array from localStorage.
export const loadOrders = function() {
    const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (dataString) {
        return JSON.parse(dataString);
    }

    return [];
};