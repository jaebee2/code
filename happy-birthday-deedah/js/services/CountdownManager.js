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

        // Cache the countdown elements.
        this.daysElement = document.getElementById("days");
        this.hoursElement = document.getElementById("hours");
        this.minutesElement = document.getElementById("minutes");
        this.secondsElement = document.getElementById("seconds");

    }

    /**
     * Create the unlock date.
     *
     * @returns {Date}
     */
    createUnlockDate() {

        // Check whether developer mode is enabled.
        if (CONFIG.developer.testMode) {

            // Create today's date.
            const date = new Date();

            // Add the configured test seconds.
            date.setSeconds(date.getSeconds() + CONFIG.developer.testSeconds);

            // Return the test date.
            return date;

        }

        // Return the real birthday date.
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

        }, 1000);

    }

    /**
     * Update the countdown.
     */
    update() {

        // Get the current time.
        const now = new Date();

        // Calculate the remaining time.
        const difference = this.unlockDate - now;

        // Check whether the countdown has finished.
        if (difference <= 0) {

            // Stop the timer.
            clearInterval(this.timer);

            // Display zero.
            this.render(0, 0, 0, 0);

            // Notify the application.
            this.onComplete();

            return;

        }

        // Calculate remaining days.
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        // Calculate remaining hours.
        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        // Calculate remaining minutes.
        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        // Calculate remaining seconds.
        const seconds = Math.floor(
            (difference % (1000 * 60)) /
            1000
        );

        // Update the countdown.
        this.render(days, hours, minutes, seconds);

        // Notify the Final 10 Seconds Manager.
        if (window.finalTenManager) {

            window.finalTenManager.update(seconds);

        }

    }

    /**
     * Animate a countdown value.
     *
     * @param {HTMLElement} element
     * @param {number} value
     */
    animateValue(element, value) {

        // Format the value.
        const formattedValue = String(value).padStart(2, "0");

        // Skip if the value hasn't changed.
        if (element.textContent === formattedValue) {

            return;

        }

        // Add the change animation.
        element.classList.add("change");

        // Wait before updating.
        setTimeout(() => {

            // Update the displayed value.
            element.textContent = formattedValue;

            // Remove the glow animation.
            element.classList.remove("change");

            // Add the heartbeat animation.
            element.classList.add("beat");

            // Remove the heartbeat class.
            setTimeout(() => {

                element.classList.remove("beat");

            }, 500);

        }, 150);

    }

    /**
     * Render the countdown.
     *
     * @param {number} days
     * @param {number} hours
     * @param {number} minutes
     * @param {number} seconds
     */
    render(days, hours, minutes, seconds) {

        // Animate the days.
        this.animateValue(this.daysElement, days);

        // Animate the hours.
        this.animateValue(this.hoursElement, hours);

        // Animate the minutes.
        this.animateValue(this.minutesElement, minutes);

        // Animate the seconds.
        this.animateValue(this.secondsElement, seconds);

    }

}