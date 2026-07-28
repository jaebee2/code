/******************************************************************************
 * File Name : CelebrationManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Controls the complete cinematic celebration sequence.
 * Author    : Jibril Bulama
 * Version   : 2.0.0
 ******************************************************************************/

import TimelineManager from "./TimelineManager.js";

export default class CelebrationManager {

    /**
     * Constructor.
     */
    constructor(screenManager, fireworksManager, audioManager) {

        this.screenManager = screenManager;
        this.fireworksManager = fireworksManager;
        this.audioManager = audioManager;

        this.timeline = new TimelineManager();

    }

    /**
     * Start the celebration.
     */
    start() {

        console.log("🎉 Celebration Started");

        // Show celebration screen
        this.screenManager.show("celebration");

        // Clear any previous timeline
        this.timeline.clear();

        /**********************************************************************
         * CELEBRATION TIMELINE
         **********************************************************************/

        // 0.2s White Flash
        this.timeline.add(200, () => {

            this.whiteFlash();

        });

        // 0.4s Heartbeat
        this.timeline.add(400, () => {

            this.playHeartbeat();

        });

        // 0.8s Recorded Voice
        this.timeline.add(800, () => {

            this.playVoice();

        });

        // 4.4s Fireworks
        this.timeline.add(4400, () => {

            this.startFireworks();

        });

        // 4.4s Confetti
        this.timeline.add(4400, () => {

            this.startConfetti();

        });

        // 4.8s Birthday Title
        this.timeline.add(4800, () => {

            this.showTitle();

        });

        // 8s Background Music Starts
        this.timeline.add(8000, () => {

            this.startBirthdayMusic();

        });

        // 34.4s Stop Fireworks (30 seconds later)
        this.timeline.add(34400, () => {

            this.stopFireworks();

        });

        // 35.5s Show Birthday Page
        this.timeline.add(35500, () => {

            this.showBirthdayPage();

        });

        // Start Timeline
        this.timeline.start();

    }

    /**
     * White flash.
     */
    whiteFlash() {

        const flash = document.getElementById("flash-overlay");

        if (!flash) {

            console.warn("Flash overlay not found.");

            return;

        }

        flash.classList.add("show");

        setTimeout(() => {

            flash.classList.remove("show");

        }, 200);

    }

    /**
     * Heartbeat.
     */
    playHeartbeat() {

        console.log("❤️ Heartbeat");

        this.audioManager.play("heartbeat");

    }

    /**
     * Play recorded voice.
     */
    playVoice() {

        console.log("🎤 Playing Birthday Voice");

        this.audioManager.play("myVoice");

    }

    /**
     * Fireworks.
     */
    startFireworks() {

        console.log("🎆 Fireworks Started");

        this.fireworksManager.start();

        this.audioManager.play("fireworks");

    }

    /**
     * Confetti.
     */
    startConfetti() {

        console.log("🎊 Confetti Started");

        // Confetti manager will be added later.

    }

    /**
     * Birthday Title.
     */
    showTitle() {

        const title = document.getElementById("birthday-title");

        if (!title) {

            console.warn("birthday-title not found.");

            return;

        }

        title.classList.add("show");

    }

    /**
     * Stop Fireworks.
     */
    stopFireworks() {

        console.log("🛑 Fireworks Stopped");

        this.fireworksManager.stop();

        this.audioManager.stop("fireworks");

    }

    /**
     * Fade in Birthday Music.
     */
    startBirthdayMusic() {

        console.log("🎵 Birthday Music");

        this.audioManager.fadeInMusic(3000);

    }

    /**
     * Show Birthday Page.
     */
    showBirthdayPage() {

        console.log("🎂 Showing Birthday Page");

        this.screenManager.show("birthday");

    }

}