/******************************************************************************
 * File Name : FinalTenSecondsManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Controls the final 10-second voice countdown.
 * Version   : 5.0.0
 ******************************************************************************/

export default class FinalTenSecondsManager {

    constructor(audioManager) {

        this.audioManager = audioManager;

        this.started = false;

        this.finished = false;

    }


    /**********************************************************************
     * UPDATE
     *
     * Tick starts ONLY when:
     *
     * Days    = 0
     * Hours   = 0
     * Minutes = 0
     * Seconds = 10
     *
     **********************************************************************/

    update(days, hours, minutes, seconds) {

        /*
         * Final countdown must ONLY operate when
         * everything except seconds is ZERO.
         */

        const finalTen =
            days === 0 &&
            hours === 0 &&
            minutes === 0 &&
            seconds >= 1 &&
            seconds <= 10;


        /*
         * Outside final 10 seconds.
         */

        if (!finalTen) {

            return;

        }


        /******************************************************************
         * START AT EXACTLY 10
         ******************************************************************/

        if (
            seconds === 10 &&
            !this.started
        ) {

            this.started = true;

            this.finished = false;

            console.log(
                "🔊 FINAL COUNTDOWN VOICE STARTED: 10 → 1"
            );


            /*
             * Your tick.mp3 already contains:
             *
             * 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
             *
             * Therefore we play it ONLY ONCE.
             */

            this.audioManager.play("tick");

        }

    }


    /**********************************************************************
     * STOP
     *
     * Called when countdown reaches 00.
     **********************************************************************/

    stop() {

        if (this.started) {

            console.log(
                "🛑 FINAL COUNTDOWN VOICE STOPPED"
            );

        }


        this.audioManager.stop("tick");


        this.started = false;

        this.finished = true;

    }


    /**********************************************************************
     * RESET
     **********************************************************************/

    reset() {

        this.audioManager.stop("tick");

        this.started = false;

        this.finished = false;

    }

}