/******************************************************************************
 * File Name : TimelineManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama
 * Purpose   : Executes timed events in sequence.
 * Version   : 1.0.0
 ******************************************************************************/

export default class TimelineManager {

    /**
     * Constructor.
     */
    constructor() {

        // Store every scheduled event.
        this.events = [];

    }

    /**
     * Add a timeline event.
     *
     * @param {Number} delay
     * Delay in milliseconds.
     *
     * @param {Function} callback
     * Function to execute.
     */
    add(delay, callback) {

        this.events.push({

            delay,

            callback

        });

    }

    /**
     * Start timeline.
     */
    start() {

        this.events.forEach(event => {

            setTimeout(() => {

                event.callback();

            }, event.delay);

        });

    }

    /**
     * Remove every event.
     */
    clear() {

        this.events = [];

    }

}