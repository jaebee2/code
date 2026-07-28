/******************************************************************************
 * File Name : FinalTenSecondsManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Controls the final ten seconds countdown.
 ******************************************************************************/

export default class FinalTenSecondsManager {

    constructor(audioManager) {

        this.audioManager = audioManager;

        this.lastSecond = -1;

    }

    /**
     * Update countdown.
     */
    update(seconds) {

        // Ignore anything above 10.
        if (seconds > 10) {

            return;

        }

        // Prevent duplicate playback.
        if (seconds === this.lastSecond) {

            return;

        }

        this.lastSecond = seconds;

        console.log(`⏳ ${seconds}`);

        // Play tick.
        this.audioManager.play("tick");

    }

    /**
     * Stop final countdown.
     */
    stop() {

        this.audioManager.stop("tick");

        this.lastSecond = -1;

    }

}