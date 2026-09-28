// --- Part 3: Implement the form-handler.js module ---

// This module handles getting input values from the form and clearing it.
// Simplified: Only focuses on Household Size input for now.

// References the main carbon footprint form.
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// References the input field for the number of household members.
const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// Home Size reference
const homeSquareFootageInput = carbonFootprintForm.querySelector('#homeSquareFootage');

// Apartment Checkbox reference
const isApartmentInput = carbonFootprintForm.querySelector('#isApartment');

// Food Choices (radio buttons - we need to query for all with the same 'name')
// this returns a node list, which is array "like"
// An Array is a list of items array[index]
const dietTypeRadios = carbonFootprintForm.querySelectorAll('input[name="dietType"]');

// Food Packaging radio buttons
const foodPackagingRadios = carbonFootprintForm.querySelectorAll('input[name="foodPackaging"]');


// Dry - Don't Repeat Yourself
// Write a function to handle this and return the value
// @param {NodeList} radioButtons - A NodeList (like an array) of radio button elements.
// @returns {string} The 'value' attribute of the selected radio button.
const getSelectedRadioValue = function(radioButtons) {

    // How we "might" reference the radio buttons?

    // Loop over the node list to find the radio button checked (clicked)
    // for...of to loop over node list (array like)
    for (const radio of radioButtons) {

        // Code to be executed for each value
        if (radio.checked) {

            // Older testing console.log commented out for Week 4.2 Part 2
            // console.log(`${radio.value} was the attribute of ${radio.checked}`);

            return radio.value;
        }
    }
};


// --- Part 1: Code clearForm and getFormInputs ---

// Collects all relevant input values from the form for Household Size, Home Size, and Food Choices.
// @returns {Object} An object containing all the collected input values.
export const getFormInputs = function() {

    // Older testing console.log commented out for Week 4.2 Part 2
    // console.log('Get Form Inputs');

    // Read the 'value' from number inputs and convert to numbers.
    // Read the 'checked' property for checkboxes.

    // Refactor return to be an object literal
    return {
        householdMembers: parseInt(householdMembersInput.value) || 1,
        homeSquareFootage: parseInt(homeSquareFootageInput.value) || 0,
        isApartment: isApartmentInput.checked,
        dietType: getSelectedRadioValue(dietTypeRadios),
        foodPackaging: getSelectedRadioValue(foodPackagingRadios)
    };
};


// Clears all input fields in the form and resets default selections.
export const clearForm = function() {

    carbonFootprintForm.reset();
    householdMembersInput.value = 1;
    dietTypeRadios[0].checked = true;
    foodPackagingRadios[0].checked = true;

    // Older testing console.log commented out for Week 4.2 Part 2
    // console.log('Clear Form');
};