// Get a reference to the table body.
const orderTableBody = document.getElementById('order-table-body');

// Render all saved orders in the table.
export const renderOrders = function(orders) {

    // Clear the table before rendering to prevent duplicates.
    orderTableBody.innerHTML = '';

    // Loop through each order.
    for (const order of orders) {

        // Create a new table row.
        const row = document.createElement('tr');

        // Add the order information to the row.
        row.innerHTML = `
            <td>${new Date(order.timestamp).toLocaleDateString()}</td>
            <td>${order.qty}</td>
            <td>${order.size}</td>
            <td>$${order.totalPrice}</td>
            <td></td>
        `;

        // Add the row to the table.
        orderTableBody.appendChild(row);
    }
};