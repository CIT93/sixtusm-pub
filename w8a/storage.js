// This module handles all interactions with localStorage for our carbon footprint entries.

// A unique key to identify our data in localStorage.
// SCREAMING_SNAKE_CASE - This naming convention is typically reserved for global constants whose value should never change throughout the lifetime of the application.

const LOCAL_STORAGE_KEY = 'carbonFootprintEntries';

// Let's learn about localStorage
// localStorage.setItem(LOCAL_STORAGE_KEY, "Sixtus");
// localStorage.setItem(LOCAL_STORAGE_KEY, 12);
// localStorage.setItem(LOCAL_STORAGE_KEY, [1, 2, 3]);
// localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([1, 2, 3]));
// const localStorageValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
// console.log(`Local Storage value: ${typeof localStorageValue} ${localStorageValue}`);


// PROMPT: What are the most common uses of local storage?
// ANSWER: Local storage is commonly used to save small amounts of data in the browser,
// such as user preferences, settings, and form data that should remain after a page refresh.


// PROMPT: Persistent vs In memory data
// ANSWER: In-memory data only lasts while the application is running and can be lost
// when the page is refreshed. Persistent data saved in localStorage remains available
// even after the page is refreshed or the browser is closed.


// PROMPT: Why is it important to learn CRUD functions when learning to code JS or any language?
// ANSWER: CRUD stands for Create, Read, Update, and Delete. These are important because
// they are the basic operations used to manage data in most applications.


// PROMPT: Why naming conventions are important in learning to code
// ANSWER: Naming conventions make code easier to read and understand. They also help
// keep the code organized and consistent, especially when working with other developers.


// Saves the given array of entries to localStorage.
// This is the primary function for persisting the current state of our entries.
// @param {Array} entries - The array of carbon footprint entry objects to save.

export const saveEntries = function(entries) {

    // localStorage can only store strings. We must convert our JavaScript array of objects
    // into a JSON string using JSON.stringify() before saving.
    // Try Catch Block - Error Checking
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
        console.log('Data saved to localStorage Successfully!');
    } catch (error) {
        console.error(`Error saving data to localStorage: ${error}`);
    }

};


// Generates a simple, unique ID for a new entry based on the current timestamp.
// This function is now part of the storage module as it's related to data management.
// @returns {string} A unique ID string.

export const generateUniqueId = function() {
    return Date.now().toString();
};


// PROMPT: Explain what a try catch block
// ANSWER: A try catch block allows JavaScript to try running code and catch an error
// if something goes wrong instead of stopping the application.

// PROMPT: How does new Date().toISOString differ from Date.now().toString()?
// ANSWER: new Date().toISOString() gives the current date and time in ISO format.
// Date.now().toString() gives the current timestamp as a string.


// Loads all carbon footprint entries from localStorage.
// @returns {Array} An array of carbon footprint entry objects. Returns an empty array if no data is found or if parsing fails.

export const loadEntries = function() {
    try {
        const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (dataString) {
            // If data exists, parse the JSON string back into a JavaScript array/object.
            return JSON.parse(dataString);
        }

        // If no data is found in localStorage, return an empty array.
        return [];

    } catch (e) {
        // In case of corrupted data, it's good practice to clear it to prevent continuous errors.
        console.error(`Error loading entries from localStorage: ${e}`);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
};


// PROMPT: Why do we need to convert localStorage into something JS can handle?
// ANSWER: localStorage stores data as strings, so we use JSON.parse() to convert
// the stored string back into a JavaScript array or object that our code can use.

// PROMPT: What error can occur when retrieving localStorage data?
// ANSWER: An error can happen if the stored data is corrupted or is not valid JSON.
// JSON.parse() may fail, so a try catch block can handle the error and keep the app running.


// Clear all data from localStorage for our app.
// This function removes the specific key used by our app from localStorage.

export const clearAllEntries = function() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log('All entries clear from localStorage');
};