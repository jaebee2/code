/******************************************************************************
 * File Name : CountdownManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Main countdown controller.
 * Version   : 5.0.0
 ******************************************************************************/

import CONFIG from "../config.js";

export default class CountdownManager {

    constructor(onComplete, audioManager) {

        this.onComplete = onComplete;

        this.audioManager = audioManager;

        this.timer = null;


        /******************************************************************
         * TEST MODE
         ******************************************************************/

        if (CONFIG.TEST_MODE) {

            this.unlockDate =
                new Date(
                    Date.now() +
                    (CONFIG.TEST_COUNTDOWN * 1000)
                );


            console.log(
                "🧪 TEST MODE"
            );

            console.log(
                "Unlock Date:",
                this.unlockDate
            );

        }


        /******************************************************************
         * PRODUCTION MODE
         ******************************************************************/

        else {

            this.unlockDate =
                CONFIG.UNLOCK_DATE;


            console.log(
                "🎂 PRODUCTION MODE"
            );

            console.log(
                "Unlock Date:",
                this.unlockDate
            );

        }

    }


    /**********************************************************************
     * START
     **********************************************************************/

    start() {

        /*
         * Start countdown/celebration background music.
         *
         * It will continue playing when the countdown changes
         * to the celebration screen.
         */

        if (this.audioManager) {

            this.audioManager
                .playCountdownCelebrationMusic();

        }


        this.update();


        this.timer =
            setInterval(
                () => {

                    this.update();

                },
                1000
            );

    }


    /**********************************************************************
     * STOP
     **********************************************************************/

    stop() {

        if (this.timer) {

            clearInterval(
                this.timer
            );

            this.timer = null;

        }

    }


    /**********************************************************************
     * UPDATE
     **********************************************************************/

    update() {

        const now =
            new Date();


        const difference =
            this.unlockDate - now;


        /******************************************************************
         * COUNTDOWN FINISHED
         ******************************************************************/

        if (difference <= 0) {

            this.stop();


            /*
             * Stop the final 10-second voice.
             */

            if (
                window.finalTenManager
            ) {

                window.finalTenManager.stop();

            }


            /*
             * Render zero.
             */

            this.render(
                0,
                0,
                0,
                0
            );


            console.log(
                "🎉 Countdown Finished"
            );


            /*
             * Celebration begins.
             *
             * Countdown/celebration music is NOT stopped here.
             *
             * It continues into the celebration screen.
             */

            this.onComplete();

            return;

        }


        /******************************************************************
         * CALCULATE TIME
         ******************************************************************/

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (
                    difference %
                    (1000 * 60)
                ) /
                1000
            );


        /******************************************************************
         * RENDER
         ******************************************************************/

        this.render(
            days,
            hours,
            minutes,
            seconds
        );


        /******************************************************************
         * FINAL 10 SECONDS
         ******************************************************************/

        if (
            window.finalTenManager
        ) {

            window.finalTenManager.update(
                days,
                hours,
                minutes,
                seconds
            );

        }

    }


    /**********************************************************************
     * RENDER
     **********************************************************************/

    render(
        days,
        hours,
        minutes,
        seconds
    ) {

        this.setValue(
            "days",
            days
        );

        this.setValue(
            "hours",
            hours
        );

        this.setValue(
            "minutes",
            minutes
        );

        this.setValue(
            "seconds",
            seconds
        );

    }


    /**********************************************************************
     * SET VALUE
     **********************************************************************/

    setValue(
        id,
        value
    ) {

        const element =
            document.getElementById(id);


        if (!element) return;


        const formatted =
            String(value)
                .padStart(2, "0");


        if (
            element.textContent !==
            formatted
        ) {

            element.textContent =
                formatted;


            element.classList.remove(
                "beat"
            );


            void element.offsetWidth;


            element.classList.add(
                "beat"
            );

        }

    }

}