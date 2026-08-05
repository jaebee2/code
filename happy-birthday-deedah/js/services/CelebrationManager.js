/******************************************************************************
 * File Name : CelebrationManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Version   : 5.0.0
 ******************************************************************************/

import TimelineManager from "./TimelineManager.js";

export default class CelebrationManager {

    constructor(

        screenManager,
        fireworksManager,
        audioManager,
        birthdayPageManager

    ) {

        this.screenManager = screenManager;
        this.fireworksManager = fireworksManager;
        this.audioManager = audioManager;
        this.birthdayPageManager = birthdayPageManager;

        this.timeline = new TimelineManager();

    }

    /******************************************************************
     * Start Celebration
     ******************************************************************/

    start() {

        console.log("🎉 Celebration Started");

        this.screenManager.show("celebration");

        this.timeline.clear();

        /**************************************************************
         * Timeline
         **************************************************************/

        this.timeline.add(200, () => {

            this.playCountdownBoom();

        });

        this.timeline.add(500, () => {

            this.whiteFlash();

        });

        this.timeline.add(800, () => {

            this.playIntroVideo();

        });

        this.timeline.start();

    }

    /******************************************************************
     * Countdown Boom
     ******************************************************************/

    playCountdownBoom() {

        this.audioManager.play("countdownBoom");

    }

    /******************************************************************
     * Flash
     ******************************************************************/

    whiteFlash() {

        const flash = document.getElementById("flash-overlay");

        if (!flash) return;

        flash.classList.add("show");

        setTimeout(() => {

            flash.classList.remove("show");

        }, 250);

    }

    /******************************************************************
     * Intro Video
     ******************************************************************/

    playIntroVideo() {

        const video = document.getElementById("intro-video");

        if (!video) {

            this.afterVideo();

            return;

        }

        video.currentTime = 0;

        video.classList.add("show");

        video.play().catch(() => {

            this.afterVideo();

        });

        video.onended = () => {

            video.classList.remove("show");

            this.afterVideo();

        };

    }

    /******************************************************************
     * After Intro Video
     ******************************************************************/

    afterVideo() {

        this.startFireworks();

        this.showTitle();

        setTimeout(() => {

            this.stopFireworks();

            this.showBirthdayPage();

        }, 10000);

    }

    /******************************************************************
     * Fireworks
     ******************************************************************/

    startFireworks() {

        console.log("🎆 Fireworks Started");

        this.fireworksManager.start();

        this.audioManager.fadeInMusic();

        this.audioManager.play("fireworks");

        this.audioManager.play("fireworks2");

    }

    /******************************************************************
     * Stop Fireworks
     ******************************************************************/

    stopFireworks() {

        console.log("🛑 Fireworks Finished");

        this.fireworksManager.stop();

        this.audioManager.stop("fireworks");

        this.audioManager.stop("fireworks2");

    }

    /******************************************************************
     * Celebration Title
     ******************************************************************/

    showTitle() {

        const title = document.getElementById("birthday-title");

        if (!title) return;

        title.classList.add("show");

    }

    /******************************************************************
     * Birthday Page
     ******************************************************************/

    showBirthdayPage() {

        console.log("🎂 Showing Birthday Page");

        this.screenManager.show("birthday");

        this.birthdayPageManager.show();

    }

}