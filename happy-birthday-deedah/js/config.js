/******************************************************************************
 * File Name : config.js
 ******************************************************************************/

const CONFIG = {

    // Development
    TEST_MODE: true,

    // Countdown duration for testing
    TEST_COUNTDOWN: 20,

    // Real birthday
    UNLOCK_DATE: new Date(
        2026,   // Year
        7,      // August (0 = January)
        31,     // Day
        0,      // Hour
        0,      // Minute
        0       // Second
    )

};

export default CONFIG;