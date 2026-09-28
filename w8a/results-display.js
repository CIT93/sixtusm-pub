// This module handles displaying and hiding the calculated carbon footprint results on the page.

// Get references to the HTML elements where we will display the results.

const resultsContainer = document.getElementById('results');

// Now, we use resultsContainer.querySelector() to get elements inside the resultsContainer.

const totalFootprintDisplay = resultsContainer.querySelector('#totalFootprint');
const householdFootprintDisplay = resultsContainer.querySelector('#householdFootprint');
const homeSizeFootprintDisplay = resultsContainer.querySelector('#homeSizeFootprint');
const foodDietFootprintDisplay = resultsContainer.querySelector('#foodDietFootprint');
const foodPackagingFootprintDisplay = resultsContainer.querySelector('#foodPackagingFootprint');

// Displays the calculated carbon footprint results in the results section.
// @param {Object} results - An object containing the calculated footprint values (points).
// Update the text content of each display element with the calculated points
export const displayResults = function(results) {

    // Older testing console.log commented out for Week 4.2 Part 2
    // console.log('inside the displayResults function');

    totalFootprintDisplay.textContent = `${results.totalFootprint.toFixed(0)} Points`;

    householdFootprintDisplay.textContent = `Household Size: ${results.householdFootprint.toFixed(0)} Points`;

    homeSizeFootprintDisplay.textContent = `Home Size: ${results.homeSizeFootprint.toFixed(0)} Points`;

    foodDietFootprintDisplay.textContent = `Food Diet: ${results.dietTypeFootprint.toFixed(0)} Points`;

    foodPackagingFootprintDisplay.textContent = `Food Packaging: ${results.foodPackagingFootprint.toFixed(0)} Points`;

    // Make the entire results section visible
    resultsContainer.style.display = 'block';
};

// Hides the entire results section.
export const hideResults = function() {
    resultsContainer.style.display = 'none';
};

// Prompt Notes:

// Prompt: What is the toFixed method and how should I use it when writing JS?

// toFixed Method:
// The toFixed() method formats a number to a specific number of decimal places.
// For example, toFixed(0) displays the number with no decimal places.
// This is useful in this project because the carbon footprint points
// should be displayed as whole numbers.

// Example:
// const points = 14.75;
// console.log(points.toFixed(0)); // Displays 15
// console.log(points.toFixed(2)); // Displays 14.75