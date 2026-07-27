/******************************************************************************
 * File Name : CountdownManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Handles the birthday countdown.
 ******************************************************************************/

// Import the configuration.
import CONFIG from "../config.js";

/**
 * Countdown Manager
 */
export default class CountdownManager {

    /**
     * Constructor.
     *
     * @param {Function} onComplete
     * Function to call when the countdown finishes.
     */
    constructor(onComplete) {

        // Save the callback.
        this.onComplete = onComplete;

        // Create the unlock date.
        this.unlockDate = this.createUnlockDate();

        // Store the timer ID.
        this.timer = null;

    }

    /**
     * Create the unlock date.
     */
    createUnlockDate() {

        // Check if developer mode is enabled.
        if (CONFIG.developer.testMode) {

            // Create today's date.
            const date = new Date();

            // Add the configured test seconds.
            date.setSeconds(date.getSeconds() + CONFIG.developer.testSeconds);

            // Return the new date.
            return date;

        }

        // Return the real birthday.
        return new Date(

            CONFIG.birthday.year,
            CONFIG.birthday.month,
            CONFIG.birthday.day,
            CONFIG.birthday.hour,
            CONFIG.birthday.minute,
            CONFIG.birthday.second

        );

    }

    /**
     * Start the countdown.
     */
    start() {

        // Update immediately.
        this.update();

        // Update every second.
        this.timer = setInterval(() => {

            this.update();

        },1000);

    }

    /**
     * Update countdown.
     */
    update() {

        // Get the current time.
        const now = new Date();

        // Calculate the remaining milliseconds.
        const difference = this.unlockDate - now;

        // Check whether time has finished.
        if(difference <= 0){

            // Stop the timer.
            clearInterval(this.timer);

            // Display zero.
            this.render(0,0,0,0);

            // Notify the application.
            this.onComplete();

            return;

        }

        // Calculate days.
        const days = Math.floor(difference / (1000*60*60*24));

        // Calculate hours.
        const hours = Math.floor((difference%(1000*60*60*24))/(1000*60*60));

        // Calculate minutes.
        const minutes = Math.floor((difference%(1000*60*60))/(1000*60));

        // Calculate seconds.
        const seconds = Math.floor((difference%(1000*60))/1000);

        // Display the values.
        this.render(days,hours,minutes,seconds);

    }

    /**
     * Display countdown values.
     */
    render(days,hours,minutes,seconds){

        // Update days.
        document.getElementById("days").textContent = String(days).padStart(2,"0");

        // Update hours.
        document.getElementById("hours").textContent = String(hours).padStart(2,"0");

        // Update minutes.
        document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");

        // Update seconds.
        document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");

    }

}