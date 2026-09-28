console.log('Hello from app.js! Your JavaScript is connected and running!!');

// Week 5.1: Now save entries to localStorage after submission.
import * as formHandler from './form-handler.js';
import * as calculator from './calculator.js';
import * as resultsDisplay from './results-display.js';
import * as storage from './storage.js';
import * as tableRenderer from './table-renderer.js';

// 6.1 We will modify the handleFormSubmit function to trigger the table update after a new entry.
// We will modify the init function to render the table immediately on page load with any loaded data.

// Declare a 'const' array to hold all submitted carbon footprint entries in memory.
// We use 'const' because the 'carbonFootprintEntries' variable will always refer
// to the same array, even though the array's contents will change (items added).
const carbonFootprintEntries = []; // Empty Array Literal - Global Variable

// References the main Carbon Footprint form.
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// References the Household Members input inside the form.
const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// References the Clear Form button.
const clearFormButton = document.getElementById('clearFormButton');

// Get reference to Clear All Data button
const clearAllDataButton = document.getElementById('clearAllDataButton');

// State variables for in-line confirmation of "Clear All Data" button.
let isConfirmingClearAll = false; // Tracks if the button is in a "confirming" state.
let clearAllTimeoutId = null; // Stores the ID returned by setTimeout, so we can cancel it.

// New function for resetClearAllButton
// Resets the "Clear All Data" button to its original text and appearance.
const resetClearAllButton = function() {

    // Clears any pending confirmation timeout.
    if (clearAllTimeoutId) {

        // If a timeout is active (meaning the button is in a confirming state), clear it.
        clearTimeout(clearAllTimeoutId);
    }

    // Reset the confirmation state
    isConfirmingClearAll = false;

    // Restore original button text and remove any special styling class.
    clearAllDataButton.textContent = 'Clear All Saved Data';
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirm-state');

    // Re-add danger-button if it was removed (it's part of initial styling)
    clearAllDataButton.classList.add('danger-button');
};

// New Function resetAllUIStates
// Resets all UI-related confirmation states across the application.
const resetAllUIStates = function() {

    // This function is called when major actions (like form submit, clear, delete) occur,
    // add to any function that updates DOM
    // This will be expanded in later weeks to include table row confirmations

    resetClearAllButton();
};

// Handles the form submission event, preventing default page reload.
const handleFormSubmit = function(event) {
    event.preventDefault();

    const formData = formHandler.getFormInputs();
    const calculatedResults = calculator.calculateFootprint(formData);

    const newEntry = {
        ...formData,
        ...calculatedResults,
        id: storage.generateUniqueId(),
        timestamp: new Date().toISOString()
    };

    carbonFootprintEntries.push(newEntry);
    console.log(carbonFootprintEntries);

    storage.saveEntries(carbonFootprintEntries);

    // console.log(calculatedResults);

    // Display the calculated results for the current entry on the page.
    resultsDisplay.displayResults(calculatedResults);

    // !Update app.js calls to renderTable to include callback functions
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });

    resetAllUIStates();
};

// New function to perform the actual clearing of all saved data.
const performClearAllData = function() {

    // Clear the in-memory array.
    // Setting length to 0 efficiently clears the array while keeping its const reference.
    carbonFootprintEntries.length = 0;

    // console.log("In-memory array cleared:", carbonFootprintEntries);

    // Clear all saved entries from localStorage.
    storage.clearAllEntries();

    // Update the UI to reflect the cleared state.

    // Re-render table (will show "No entries")
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });

    // Clear the form inputs
    formHandler.clearForm();

    // Hide the results section
    resultsDisplay.hideResults();

    resetAllUIStates();
};

// Handles the clear form button click, resetting form fields.
const handleClearForm = function() {
    formHandler.clearForm();
    resultsDisplay.hideResults();
    console.log('Clear button clicked');
    resetAllUIStates();
};

// Handles the "Delete" action for a specific entry.
const handleDeleteEntry = function(id) {
    console.log(`Delete button clicked for ID: ${id} functionality added in Week 7`);

    // 1. Find the index of the entry to delete in our in-memory array.
    const indexToDelete = carbonFootprintEntries.findIndex(function(entry) {
        return entry.id === id;
    });

    if (indexToDelete !== -1) {

        // 2. Remove the entry from the in-memory array using splice().
        carbonFootprintEntries.splice(indexToDelete, 1);
        console.log('Entry removed from memory');

        // 3. Save the modified (smaller) array back to localStorage.
        storage.saveEntries(carbonFootprintEntries);

        // 4. Re-render the table to reflect the deletion.
        tableRenderer.renderTable(carbonFootprintEntries, {
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry
        });

        // 5. If the table is now empty, hide the results section and clear the form.
        if (carbonFootprintEntries.length === 0) {
            resultsDisplay.hideResults();
            formHandler.clearForm();
        }
        // Reset states even if entry not found (e.g., error case)
        resetAllUIStates();
    } else {
        console.log('Did not find index');
        resetAllUIStates();
    }

};

// Handles the "Edit" button click for a specific entry.
const handleEditEntry = function(id) {
    console.log(`Edit button clicked for ID: ${id} functionality added in Week 7`);

    resetAllUIStates();
};

// Initializes the application and attaches the form and button event listeners.
const init = function() {
    // console.log('App initialized: DOM is ready! Try submitting the form or clearing it.');

    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);

    // Hide the results when the page first loads.
    resultsDisplay.hideResults();

    // On startup, attempt to load any previously saved entries from localStorage.
    const loadedEntries = storage.loadEntries();

    if (loadedEntries.length > 0) {
        carbonFootprintEntries.push(...loadedEntries);
        console.log('Entries loaded from LocalStorage');
    } else {
        console.log('No entries found in LocalStorage Starting fresh');
    }

    // Render the table immediately on page load with any loaded data.
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });

    // init function - Event listener for "Clear All Data"
    clearAllDataButton.addEventListener('click', function(event) {

        // Prevents this click from potentially triggering other global click listeners.
        event.stopPropagation();

        if (isConfirmingClearAll) {

            // Second click: User confirms, so perform the action.
            performClearAllData();

        } else {

            // First click: Ask for confirmation by changing button text and state.
            isConfirmingClearAll = true;
            clearAllDataButton.textContent = 'Are you sure? Click again';

            // Add a class to change its appearance (defined in style.css).
            clearAllDataButton.classList.add('confirm-state');

            // Set a timeout to automatically revert the button state if the user doesn't click again.
            clearAllTimeoutId = setTimeout(function() {
                resetClearAllButton();
                console.log('Clear All confirmation timed out');
            }, 3000); // 3 seconds
        }
    });

    // Global click listener to reset the "Clear All Data" button state
    // if the user clicks anywhere else on the page while confirmation is pending.
    // Only reset if we are in a confirming state AND the click was outside the button itself.
    document.addEventListener('click', function(event) {
        // console.log(event.target);

        if (isConfirmingClearAll && event.target !== clearAllDataButton) {
            resetClearAllButton();
        }
    });
};

// Runs the initialization function after the DOM has loaded.
document.addEventListener('DOMContentLoaded', init);


// PART 7.1 PROMPT

// PROMPT: What do we need to use callbacks in modules?
// ANSWER: We use callbacks to allow one module to run a function from another
// module without tightly connecting the modules together.

// PROMPT: What is event delegation?
// ANSWER: Event delegation is when we add one event listener to a parent element
// and use event.target to determine which child element was clicked.

// PART 2 PROMPTS

// PROMPT: What do we need to use callbacks in modules?
// ANSWER: We use callbacks to allow one module to run a function from another
// module without tightly connecting the modules together.

// PROMPT: What is event delegation?
// ANSWER: Event delegation is when we add one event listener to a parent element
// and use event.target to determine which child element was clicked.