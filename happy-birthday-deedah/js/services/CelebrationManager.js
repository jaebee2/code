/******************************************************************************
 * File Name : CelebrationManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Controls the complete cinematic celebration sequence.
 * Author    : Jibril Bulama & ChatGPT
 * Version   : 5.0.0
 ******************************************************************************/

import TimelineManager from "./TimelineManager.js";

export default class CelebrationManager {

    constructor(
        screenManager,
        fireworksManager,
        audioManager
    ) {

        this.screenManager =
            screenManager;

        this.fireworksManager =
            fireworksManager;

        this.audioManager =
            audioManager;

        this.timeline =
            new TimelineManager();


        /*
         * This is assigned by app.js.
         *
         * We DO NOT create another BirthdayPageManager here.
         */

        this.birthdayPageManager = null;

    }


    /**********************************************************************
     * START CELEBRATION
     **********************************************************************/

    start() {

        console.log(
            "🎉 Celebration Started"
        );


        this.screenManager.show(
            "celebration"
        );


        this.timeline.clear();


        /******************************************************************
         * Countdown music continues.
         *
         * DO NOT restart it.
         ******************************************************************/


        /******************************************************************
         * 0.2 SECONDS
         ******************************************************************/

        this.timeline.add(
            200,
            () => {

                this.playCountdownBoom();

            }
        );


        /******************************************************************
         * 0.5 SECONDS
         ******************************************************************/

        this.timeline.add(
            500,
            () => {

                this.whiteFlash();

            }
        );


        /******************************************************************
         * 0.8 SECONDS
         ******************************************************************/

        this.timeline.add(
            800,
            () => {

                this.playIntroVideo();

            }
        );


        /******************************************************************
         * STOP FIREWORKS
         ******************************************************************/

        this.timeline.add(
            64500,
            () => {

                this.stopFireworks();

            }
        );


        /******************************************************************
         * SHOW BIRTHDAY PAGE
         ******************************************************************/

        this.timeline.add(
            67500,
            () => {

                this.showBirthdayPage();

            }
        );


        this.timeline.start();

    }


    /**********************************************************************
     * COUNTDOWN BOOM
     **********************************************************************/

    playCountdownBoom() {

        console.log(
            "💥 Countdown Boom"
        );


        this.audioManager.play(
            "countdownBoom"
        );

    }


    /**********************************************************************
     * WHITE FLASH
     **********************************************************************/

    whiteFlash() {

        const flash =
            document.getElementById(
                "flash-overlay"
            );


        if (!flash) return;


        flash.classList.add(
            "show"
        );


        setTimeout(
            () => {

                flash.classList.remove(
                    "show"
                );

            },
            200
        );

    }


    /**********************************************************************
     * INTRO VIDEO
     **********************************************************************/

    playIntroVideo() {

        console.log(
            "🎬 Playing Intro Video"
        );


        const video =
            document.getElementById(
                "intro-video"
            );


        if (!video) {

            console.warn(
                "Intro video not found."
            );


            this.afterVideo();

            return;

        }


        video.classList.add(
            "show"
        );


        video.currentTime = 0;


        video.play().catch(
            error => {

                console.warn(
                    "⚠️ Intro video could not play:",
                    error
                );

            }
        );


        video.onended = () => {

            video.classList.remove(
                "show"
            );


            this.afterVideo();

        };

    }


    /**********************************************************************
     * AFTER VIDEO
     **********************************************************************/

    afterVideo() {

        /*
         * Play recorded birthday voice.
         */

        this.playVoice();


        /*
         * Start fireworks after voice begins.
         */

        setTimeout(
            () => {

                this.startFireworks();

                this.startConfetti();

            },
            3500
        );


        /*
         * Show title.
         */

        setTimeout(
            () => {

                this.showTitle();

            },
            4000
        );

    }


    /**********************************************************************
     * PLAY BIRTHDAY VOICE
     **********************************************************************/

    playVoice() {

        console.log(
            "🎤 Playing Birthday Voice"
        );


        this.audioManager.play(
            "myVoice"
        );

    }


    /**********************************************************************
     * START FIREWORKS
     **********************************************************************/

    startFireworks() {

        console.log(
            "🎆 Fireworks Started"
        );


        this.fireworksManager.start();


        /*
         * IMPORTANT:
         *
         * We DO NOT start birthday music here.
         *
         * Countdown/celebration music is already playing.
         */

        this.audioManager.play(
            "fireworks"
        );


        this.audioManager.play(
            "fireworks2"
        );

    }


    /**********************************************************************
     * START CONFETTI
     **********************************************************************/

    startConfetti() {

        console.log(
            "🎊 Confetti Started"
        );

        /*
         * ConfettiManager can be added here later.
         *
         * No confetti audio is loaded because there is currently
         * no confetti.mp3 file.
         */

    }


    /**********************************************************************
     * SHOW TITLE
     **********************************************************************/

    showTitle() {

        const title =
            document.getElementById(
                "birthday-title"
            );


        if (!title) return;


        title.classList.add(
            "show"
        );

    }


    /**********************************************************************
     * STOP FIREWORKS
     **********************************************************************/

    stopFireworks() {

        console.log(
            "🛑 Fireworks Finished"
        );


        this.fireworksManager.stop();


        this.audioManager.stop(
            "fireworks"
        );


        this.audioManager.stop(
            "fireworks2"
        );


        /*
         * Countdown/celebration music continues.
         */

    }


    /**********************************************************************
     * SHOW BIRTHDAY PAGE
     **********************************************************************/

    showBirthdayPage() {

        console.log(
            "🎂 Showing Birthday Page"
        );


        /*
         * STOP COUNTDOWN + CELEBRATION MUSIC
         */

        this.audioManager
            .stopCountdownCelebrationMusic();


        /*
         * Show birthday page.
         */

        if (
            this.birthdayPageManager
        ) {

            this.birthdayPageManager.show();

        }

    }

}