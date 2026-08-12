
/********************************************************************************
 * File Name : FinalTenSecondsManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Controls the final ten seconds countdown.
 * Author    : Jibril Bulama & ChatGPT
 * Version   : 4.1.0
 *
 * FINAL TEN SECOND RULE:
 *
 * The tick sound ONLY plays when:
 *
 *      Days    = 0
 *      Hours   = 0
 *      Minutes = 0
 *      Seconds = 10 → 1
 *
 * The tick sound ALWAYS stops at:
 *
 *      00 : 00 : 00 : 00
 *
 ********************************************************************************/

export default class FinalTenSecondsManager {

    constructor(audioManager) {

        this.audioManager = audioManager;

        /*
         * Stores the last second that triggered a tick.
         *
         * This prevents the same second from playing
         * multiple times if update() happens more than once.
         */

        this.lastSecond = -1;

        /*
         * Keeps track of whether we are currently
         * inside the final ten seconds.
         */

        this.active = false;

    }


    /* =============================================================
       UPDATE COUNTDOWN
       ============================================================= */

    update(
        days,
        hours,
        minutes,
        seconds
    ) {

        /*
         * =========================================================
         * ONLY ENTER FINAL TEN SECONDS WHEN:
         *
         * days    = 0
         * hours   = 0
         * minutes = 0
         * seconds = 10 → 1
         * =========================================================
         */

        const isFinalTenSeconds =
            days === 0 &&
            hours === 0 &&
            minutes === 0 &&
            seconds >= 1 &&
            seconds <= 10;


        /* =========================================================
           NOT FINAL TEN SECONDS
           ========================================================= */

        if (!isFinalTenSeconds) {

            /*
             * If countdown reaches zero or leaves the
             * final-ten-second window, stop the tick.
             */

            if (
                this.active ||
                seconds === 0
            ) {

                this.stop();

            }

            return;

        }


        /* =========================================================
           ENTER FINAL TEN SECONDS
           ========================================================= */

        this.active = true;


        /*
         * Prevent duplicate playback.
         *
         * The countdown normally updates once every second,
         * but this also protects against accidental duplicate
         * calls.
         */

        if (
            seconds === this.lastSecond
        ) {

            return;

        }


        this.lastSecond = seconds;


        console.log(
            `⏳ Final countdown: ${seconds}`
        );


        /* =========================================================
           PLAY TICK
           ========================================================= */

        this.audioManager.play(
            "tick"
        );

    }


    /* =============================================================
       STOP FINAL COUNTDOWN
       ============================================================= */

    stop() {

        /*
         * Stop the tick sound immediately.
         */

        this.audioManager.stop(
            "tick"
        );


        /*
         * Reset state so the manager can be used again.
         */

        this.lastSecond = -1;

        this.active = false;


        console.log(
            "🔇 Final countdown tick stopped"
        );

    }

}

