/******************************************************************************
 * File Name : config.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Stores all project configuration values.
 ******************************************************************************/

/**
 * Configuration object.
 * Every important setting for the application lives here.
 */
const CONFIG = {

    // Birthday settings.
    birthday: {

        // Unlock year.
        year: 2026,

        // Month (JavaScript starts counting months from zero).
        month: 7,

        // Day of the month.
        day: 31,

        // Hour.
        hour: 12,

        // Minute.
        minute: 0,

        // Second.
        second: 0

    },

    // Enable developer testing.
    developer: {

       testMode: true,

        // Number of seconds before the countdown ends in test mode.
        testSeconds: 20

    }

};

// Export the configuration.
export default CONFIG;  