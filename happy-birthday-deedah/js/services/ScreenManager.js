/******************************************************************************
 * File Name : ScreenManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama 
 * Purpose   : Controls which screen is currently visible.
 * Version   : 1.0.0
 ******************************************************************************/

/**
 * ScreenManager Class
 *
 * This class is responsible for:
 * 1. Registering application screens.
 * 2. Hiding all screens.
 * 3. Displaying only the requested screen.
 */
export default class ScreenManager {

    /**
     * Constructor
     * This runs automatically whenever a new ScreenManager is created.
     */
    constructor() {

        // Create an empty object that will store every screen.
        this.screens = {};

    }

    /**
     * Register a screen.
     *
     * @param {String} name
     * The unique name of the screen.
     *
     * @param {HTMLElement} element
     * The HTML element that represents the screen.
     */
    register(name, element) {

        // Save the screen inside our collection.
        this.screens[name] = element;

    }

    /**
     * Hide every registered screen.
     */
    hideAll() {

        // Loop through every registered screen.
        Object.values(this.screens).forEach(screen => {

            // Hide the screen.
            screen.style.display = "none";

        });

    }

    /**
     * Show one screen.
     *
     * @param {String} name
     * The name of the screen to display.
     */
    show(name) {

        // Hide every screen first.
        this.hideAll();

        // Check whether the requested screen exists.
        if (this.screens[name]) {

            // Display the requested screen.
            this.screens[name].style.display = "flex";

        }

    }

}