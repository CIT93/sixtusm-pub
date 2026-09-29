let moduleCallbacks = {};

// Get a reference to the table body.
const orderTableBody = document.getElementById('order-table-body');

const tableBody = document.getElementById('order-table-body');

tableBody.addEventListener('click', function (event) {
    const target = event.target;

    // 1. Get the ID from the button that was clicked
    const id = target.dataset.id;

    // 2. Guard Clause: If they clicked a row (white space) but NOT a button, 
    // there will be no ID. So we stop the function immediately.
    if (!id) return;

    if (target.classList.contains('delete-btn') && moduleCallbacks.onDelete) {
        moduleCallbacks.onDelete(id);
    }

    if (target.classList.contains('edit-btn') && moduleCallbacks.onEdit) {
        moduleCallbacks.onEdit(id);
    }
});

// Render all saved orders in the table.
export const renderOrders = function (orders, callbacks) {
    // Save the callbacks for later
    moduleCallbacks = callbacks;

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
            <td>
                <button class="edit-btn" data-id="${order.id}">Edit</button>
                <button class="delete-btn" data-id="${order.id}">Delete</button>
            </td>
        `;

        // Add the row to the table.
        orderTableBody.appendChild(row);
    }
};