/******************************************************************************
 * File Name : CelebrationManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Controls the complete cinematic celebration sequence.
 * Version   : 6.1.0 - iPhone / Safari Compatible
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

        this.birthdayPageManager =
            null;

        this.fireworksAudioTimer =
            null;

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


        /*
         * Countdown music continues.
         */


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
     *
     * iPhone Safari may reject video.play() when it is triggered by
     * the timeline rather than directly by a user gesture.
     *
     * If that happens, we show a real "Tap to Play" button.
     **********************************************************************/

    async playIntroVideo() {

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


        video.setAttribute(
            "playsinline",
            ""
        );

        video.setAttribute(
            "webkit-playsinline",
            ""
        );

        video.controls = false;

        video.preload = "auto";

        video.currentTime = 0;


        /*
         * Keep the video unmuted because the MP4 contains its own
         * AAC audio track.
         */

        video.muted = false;


        video.onended = () => {

            video.classList.remove(
                "show"
            );

            this.removeVideoFallback();

            this.afterVideo();

        };


        try {

            await video.play();

            console.log(
                "▶️ Intro video started."
            );

        } catch (error) {

            console.warn(
                "⚠️ iPhone blocked intro video autoplay:",
                error
            );

            this.showVideoFallback(
                video
            );

        }

    }


    /**********************************************************************
     * VIDEO FALLBACK
     **********************************************************************/

    showVideoFallback(video) {

        this.removeVideoFallback();


        const overlay =
            document.createElement(
                "div"
            );

        overlay.id =
            "iphone-video-fallback";


        overlay.innerHTML = `
            <div class="iphone-video-fallback-card">
                <div class="iphone-video-fallback-icon">▶️</div>
                <h2>Tap to play</h2>
                <p>Tap once to start the birthday video with sound ❤️</p>
                <button type="button" id="iphone-video-play-btn">
                    ▶ Play Birthday Video
                </button>
            </div>
        `;


        document.body.appendChild(
            overlay
        );


        const button =
            document.getElementById(
                "iphone-video-play-btn"
            );


        button.addEventListener(
            "pointerdown",
            async event => {

                event.preventDefault();
                event.stopPropagation();


                try {

                    /*
                     * Unlock the normal audio library during the same
                     * user gesture.
                     */

                    await this.audioManager.unlockAudio();


                    video.muted = false;

                    video.currentTime = 0;


                    await video.play();


                    this.removeVideoFallback();


                    console.log(
                        "▶️ Intro video started from user gesture."
                    );

                } catch (error) {

                    console.error(
                        "❌ Video still could not play:",
                        error
                    );

                }

            },
            {
                passive: false
            }
        );

    }


    /**********************************************************************
     * REMOVE VIDEO FALLBACK
     **********************************************************************/

    removeVideoFallback() {

        const overlay =
            document.getElementById(
                "iphone-video-fallback"
            );

        if (overlay) {

            overlay.remove();

        }

    }


    /**********************************************************************
     * AFTER VIDEO
     **********************************************************************/

    afterVideo() {

        this.playVoice();


        /*
         * Start fireworks 3.5 seconds after the birthday voice begins.
         *
         * FireworksManager automatically stops the visual fireworks
         * after 10 seconds.
         */

        setTimeout(
            () => {

                this.startFireworks();

                this.startConfetti();

            },
            3500
        );


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
            "🎆 Fireworks Started - 10 seconds"
        );

        this.fireworksManager.start();


        this.audioManager.play(
            "fireworks"
        );


        this.audioManager.play(
            "fireworks2"
        );


        /*
         * Keep the fireworks audio duration synchronized with the
         * 10-second visual fireworks duration.
         */

        if (this.fireworksAudioTimer) {

            clearTimeout(
                this.fireworksAudioTimer
            );

        }


        this.fireworksAudioTimer =
            setTimeout(
                () => {

                    this.stopFireworks();

                },
                10000
            );

    }


    /**********************************************************************
     * START CONFETTI
     **********************************************************************/

    startConfetti() {

        console.log(
            "🎊 Confetti Started"
        );

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


        if (this.fireworksAudioTimer) {

            clearTimeout(
                this.fireworksAudioTimer
            );

            this.fireworksAudioTimer =
                null;

        }

    }


    /**********************************************************************
     * SHOW BIRTHDAY PAGE
     **********************************************************************/

    showBirthdayPage() {

        this.stopFireworks();

        window.location.href =
            "https://ourstory-eta.vercel.app/";

    }

}
