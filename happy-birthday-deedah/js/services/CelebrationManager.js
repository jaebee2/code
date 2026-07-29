/******************************************************************************
 * File Name : CelebrationManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Controls the complete cinematic celebration sequence.
 * Author    : Jibril Bulama
 * Version   : 3.0.0
 ******************************************************************************/

import TimelineManager from "./TimelineManager.js";

export default class CelebrationManager {

    constructor(screenManager, fireworksManager, audioManager) {

        this.screenManager = screenManager;
        this.fireworksManager = fireworksManager;
        this.audioManager = audioManager;

        this.timeline = new TimelineManager();

    }

    /**
     * Start Celebration
     */
    start() {

        console.log("🎉 Celebration Started");

        this.screenManager.show("celebration");

        this.timeline.clear();

        /************************************************************
         * TIMELINE
         ************************************************************/

        // 0.2 seconds
        this.timeline.add(200, () => {

            this.playCountdownBoom();

        });

        // 0.5 seconds
        this.timeline.add(500, () => {

            this.whiteFlash();

        });

        // 0.8 seconds
        this.timeline.add(800, () => {

            this.playIntroVideo();

        });

        // Fireworks stop after 60 seconds
        this.timeline.add(64500, () => {

            this.stopFireworks();

        });

        // Birthday page
        this.timeline.add(67500, () => {

            this.showBirthdayPage();

        });

        this.timeline.start();

    }

    /**
     * Countdown Boom
     */
    playCountdownBoom() {

        console.log("💥 Countdown Boom");

        this.audioManager.play("countdownBoom");

    }

    /**
     * White Flash
     */
    whiteFlash() {

        const flash = document.getElementById("flash-overlay");

        if (!flash) return;

        flash.classList.add("show");

        setTimeout(() => {

            flash.classList.remove("show");

        }, 200);

    }

    /**
     * Intro Video
     */
    playIntroVideo() {

        console.log("🎬 Playing Intro Video");

        const video = document.getElementById("intro-video");

        if (!video) {

            console.warn("Intro video not found.");

            this.afterVideo();

            return;

        }

        video.classList.add("show");

        video.currentTime = 0;

        video.play();

        video.onended = () => {

            video.classList.remove("show");

            this.afterVideo();

        };

    }

    /**
     * Continue after video finishes
     */
    afterVideo() {

        // Play your recorded message
        this.playVoice();

        // Wait for voice to finish
        setTimeout(() => {

            this.startFireworks();

            this.startConfetti();

        }, 3500);

        // Show title
        setTimeout(() => {

            this.showTitle();

        }, 4000);

    }

    /**
     * Play Birthday Voice
     */
    playVoice() {

        console.log("🎤 Playing Birthday Voice");

        this.audioManager.play("myVoice");

    }

    /**
     * Fireworks
     */
    startFireworks() {

        console.log("🎆 Fireworks Started");

        this.fireworksManager.start();

        // Background music
        this.audioManager.fadeInMusic(6000);

        // Fireworks ambience
        this.audioManager.play("fireworks");

        this.audioManager.play("fireworks2");

    }

    /**
     * Confetti
     */
    startConfetti() {

        console.log("🎊 Confetti Started");

        // Confetti manager will be added later.

    }

    /**
     * Birthday Title
     */
    showTitle() {

        const title = document.getElementById("birthday-title");

        if (!title) return;

        title.classList.add("show");

    }

    /**
     * Stop Fireworks
     */
    stopFireworks() {

        console.log("🛑 Fireworks Finished");

        this.fireworksManager.stop();

        this.audioManager.stop("fireworks");

        this.audioManager.stop("fireworks2");

        // Birthday music keeps playing

    }

    /**
     * Birthday Page
     */
    showBirthdayPage() {

        console.log("🎂 Showing Birthday Page");

        this.screenManager.show("birthday");

    }

}