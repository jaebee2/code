/******************************************************************************
 * File Name : FinalTenSecondsManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Controls everything during the final 10 seconds.
 ******************************************************************************/

// Export the class.
export default class FinalTenSecondsManager {

    /**
     * Constructor.
     *
     * @param {AudioManager} audioManager
     */
    constructor(audioManager) {

        // Store the audio manager.
        this.audioManager = audioManager;

        // Prevent events from running twice.
        this.alreadyTriggered = [];

    }

    /**
     * Runs every second.
     *
     * @param {Number} secondsRemaining
     */
    update(secondsRemaining) {

        // Ignore if not in the final 10 seconds.
        if (secondsRemaining > 10) {

            return;

        }

        // Ignore duplicates.
        if (this.alreadyTriggered.includes(secondsRemaining)) {

            return;

        }

        // Remember this second.
        this.alreadyTriggered.push(secondsRemaining);

        // Run effects.
        this.triggerEffects(secondsRemaining);

    }

    /**
     * Trigger all effects.
     */
    triggerEffects(secondsRemaining) {

        // Log the second.
        console.log("Final Second:", secondsRemaining);

        // Play heartbeat.
        this.audioManager.play("heartbeat");

        // Play tick.
        this.audioManager.play("tick");

        // Pulse countdown.
        document.body.classList.add("heartbeat");

        // Remove animation afterwards.
        setTimeout(() => {

            document.body.classList.remove("heartbeat");

        },500);

        // Vibrate on supported devices.
        if (navigator.vibrate) {

            navigator.vibrate(120);

        }

    }

}