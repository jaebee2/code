/******************************************************************************
 * File Name : AudioManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Central Audio Controller
 * Version   : 6.0.0 - iPhone / Safari Compatible
 * Author    : Jibril Bulama & ChatGPT
 ******************************************************************************/

export default class AudioManager {

    constructor() {

        /**********************************************************************
         * AUDIO LIBRARY
         **********************************************************************/

        this.audio = {

            countdownCelebrationMusic:
                new Audio(
                    "./assets/audio/music/countdownCelebrationMusic.mp3"
                ),

            birthdayMusic:
                new Audio(
                    "./assets/audio/music/happy-birthday.mp3"
                ),

            tick:
                new Audio(
                    "./assets/audio/effects/tick.mp3"
                ),

            countdownBoom:
                new Audio(
                    "./assets/audio/effects/countdown-boom.mp3"
                ),

            fireworks:
                new Audio(
                    "./assets/audio/celebration/fireworks.mp3"
                ),

            fireworks2:
                new Audio(
                    "./assets/audio/celebration/fireworks2.mp3"
                ),

            myVoice:
                new Audio(
                    "./assets/audio/recordings/happy-birthday-my-deedah.mp3"
                ),

            heartbeat:
                new Audio(
                    "./assets/audio/effects/heartbeat.mp3"
                )

        };


        /**********************************************************************
         * VOLUME SETTINGS
         **********************************************************************/

        this.musicVolume = 0.45;

        this.countdownMusicVolume = 0.35;

        this.duckVolume = 0.12;


        /**********************************************************************
         * STATE
         **********************************************************************/

        this.fadeAnimation = null;

        this.audioUnlocked = false;

        this.unlocking = false;


        /**********************************************************************
         * INITIALISE
         **********************************************************************/

        this.initialise();


        /**********************************************************************
         * IMPORTANT FOR IPHONE / SAFARI
         *
         * Listen for the FIRST real user interaction.
         *
         * Safari allows media playback when it originates from
         * a user gesture such as:
         *
         * - touchstart
         * - pointerdown
         * - click
         *
         **********************************************************************/

        this.setupMobileUnlock();

    }


    /**********************************************************************
     * INITIALISE AUDIO
     **********************************************************************/

    initialise() {

        Object.entries(this.audio).forEach(
            ([name, sound]) => {

                /*
                 * Mobile Safari works better when the audio elements
                 * are explicitly configured.
                 */

                sound.preload = "auto";

                sound.setAttribute(
                    "playsinline",
                    ""
                );

                sound.setAttribute(
                    "webkit-playsinline",
                    ""
                );


                sound.addEventListener(
                    "canplaythrough",
                    () => {

                        console.log(
                            `✅ Loaded: ${name}`
                        );

                    }
                );


                sound.addEventListener(
                    "error",
                    () => {

                        console.error(
                            `❌ Failed to load: ${name}`,
                            sound.src
                        );

                    }
                );

            }
        );


        /******************************************************************
         * COUNTDOWN + CELEBRATION MUSIC
         ******************************************************************/

        const countdownMusic =
            this.audio.countdownCelebrationMusic;

        countdownMusic.loop = true;

        countdownMusic.volume =
            this.countdownMusicVolume;


        /******************************************************************
         * BIRTHDAY MUSIC
         ******************************************************************/

        const birthdayMusic =
            this.audio.birthdayMusic;

        birthdayMusic.loop = true;

        birthdayMusic.volume = 0;


        /******************************************************************
         * FIREWORKS
         ******************************************************************/

        this.audio.fireworks.loop = true;

        this.audio.fireworks.volume = 0.50;


        this.audio.fireworks2.loop = true;

        this.audio.fireworks2.volume = 0.35;


        /******************************************************************
         * EFFECTS
         ******************************************************************/

        this.audio.tick.loop = false;

        this.audio.tick.volume = 0.30;


        this.audio.countdownBoom.loop = false;

        this.audio.countdownBoom.volume = 1;


        this.audio.heartbeat.loop = false;

        this.audio.heartbeat.volume = 1;


        this.audio.myVoice.loop = false;

        this.audio.myVoice.volume = 1;

    }


    /**********************************************************************
     * MOBILE / IPHONE AUDIO UNLOCK
     **********************************************************************/

    setupMobileUnlock() {

        const unlock = () => {

            if (this.audioUnlocked) {

                this.removeUnlockListeners();

                return;

            }


            if (this.unlocking) {

                return;

            }


            console.log(
                "📱 User interaction detected - unlocking audio..."
            );


            this.unlockAudio();

        };


        this._unlockHandler = unlock;


        /*
         * pointerdown works well for modern iPhones,
         * while touchstart provides an additional Safari fallback.
         */

        document.addEventListener(
            "pointerdown",
            unlock,
            {
                once: false,
                passive: true
            }
        );


        document.addEventListener(
            "touchstart",
            unlock,
            {
                once: false,
                passive: true
            }
        );


        document.addEventListener(
            "click",
            unlock,
            {
                once: false,
                passive: true
            }
        );

    }


    /**********************************************************************
     * REMOVE UNLOCK LISTENERS
     **********************************************************************/

    removeUnlockListeners() {

        if (!this._unlockHandler) {

            return;

        }


        document.removeEventListener(
            "pointerdown",
            this._unlockHandler
        );


        document.removeEventListener(
            "touchstart",
            this._unlockHandler
        );


        document.removeEventListener(
            "click",
            this._unlockHandler
        );


        this._unlockHandler = null;

    }


    /**********************************************************************
     * GENERIC PLAY
     **********************************************************************/

    play(name) {

        const sound =
            this.audio[name];


        if (!sound) {

            console.warn(
                `⚠️ Audio "${name}" does not exist.`
            );

            return Promise.resolve();

        }


        /*
         * Never restart background music automatically.
         */

        if (
            name !== "birthdayMusic" &&
            name !== "countdownCelebrationMusic"
        ) {

            try {

                sound.currentTime = 0;

            } catch (error) {

                console.warn(
                    `Could not reset ${name}:`,
                    error
                );

            }

        }


        const promise =
            sound.play();


        if (promise !== undefined) {

            return promise.catch(
                error => {

                    console.warn(
                        `⚠️ Could not play ${name}:`,
                        error
                    );

                }
            );

        }


        return Promise.resolve();

    }


    /**********************************************************************
     * PLAY COUNTDOWN + CELEBRATION MUSIC
     **********************************************************************/

    playCountdownCelebrationMusic() {

        const music =
            this.audio.countdownCelebrationMusic;


        if (!music) {

            return Promise.resolve();

        }


        /*
         * Already playing.
         */

        if (!music.paused) {

            return Promise.resolve();

        }


        music.volume =
            this.countdownMusicVolume;


        const promise =
            music.play();


        if (promise !== undefined) {

            return promise.catch(
                error => {

                    console.warn(
                        "⚠️ Countdown/Celebration music could not play:",
                        error
                    );

                }
            );

        }


        return Promise.resolve();

    }


    /**********************************************************************
     * STOP COUNTDOWN + CELEBRATION MUSIC
     **********************************************************************/

    stopCountdownCelebrationMusic() {

        const music =
            this.audio.countdownCelebrationMusic;


        if (!music) return;


        music.pause();

        music.currentTime = 0;

    }


    /**********************************************************************
     * START BIRTHDAY MUSIC
     **********************************************************************/

    startBirthdayMusic() {

        const music =
            this.audio.birthdayMusic;


        if (!music) return;


        /*
         * Stop countdown/celebration music.
         */

        this.stopCountdownCelebrationMusic();


        /*
         * Don't restart if already playing.
         */

        if (!music.paused) {

            return;

        }


        music.volume = 0;


        const promise =
            music.play();


        if (promise !== undefined) {

            promise.catch(
                error => {

                    console.warn(
                        "⚠️ Birthday music could not play:",
                        error
                    );

                }
            );

        }


        this.fadeToBirthdayMusic(
            this.musicVolume,
            4000
        );

    }


    /**********************************************************************
     * STOP BIRTHDAY MUSIC
     **********************************************************************/

    stopBirthdayMusic() {

        const music =
            this.audio.birthdayMusic;


        if (!music) return;


        this.stopFade();


        music.pause();

        music.currentTime = 0;

        music.volume = 0;

    }


    /**********************************************************************
     * BIRTHDAY MUSIC FADE
     **********************************************************************/

    fadeToBirthdayMusic(
        targetVolume,
        duration = 1000
    ) {

        const music =
            this.audio.birthdayMusic;


        if (!music) return;


        this.stopFade();


        const startVolume =
            music.volume;


        const difference =
            targetVolume - startVolume;


        const startTime =
            performance.now();


        const animate = currentTime => {

            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const ease =
                progress < 0.5
                    ? 2 * progress * progress
                    : 1 -
                      Math.pow(
                          -2 * progress + 2,
                          2
                      ) / 2;


            music.volume =
                startVolume +
                difference * ease;


            if (progress < 1) {

                this.fadeAnimation =
                    requestAnimationFrame(
                        animate
                    );

            } else {

                music.volume =
                    targetVolume;

                this.fadeAnimation = null;

            }

        };


        this.fadeAnimation =
            requestAnimationFrame(
                animate
            );

    }


    /**********************************************************************
     * GENERIC PAUSE
     **********************************************************************/

    pause(name) {

        const sound =
            this.audio[name];


        if (!sound) return;


        sound.pause();

    }


    /**********************************************************************
     * GENERIC STOP
     **********************************************************************/

    stop(name) {

        const sound =
            this.audio[name];


        if (!sound) return;


        sound.pause();

        sound.currentTime = 0;

    }


    /**********************************************************************
     * STOP FADE
     **********************************************************************/

    stopFade() {

        if (this.fadeAnimation) {

            cancelAnimationFrame(
                this.fadeAnimation
            );

            this.fadeAnimation = null;

        }

    }


    /**********************************************************************
     * DUCK BIRTHDAY MUSIC
     **********************************************************************/

    duckMusic(duration = 700) {

        const music =
            this.audio.birthdayMusic;


        if (!music || music.paused) {

            return;

        }


        this.fadeToBirthdayMusic(
            this.duckVolume,
            duration
        );

    }


    /**********************************************************************
     * RESTORE BIRTHDAY MUSIC
     **********************************************************************/

    restoreMusic(duration = 700) {

        const music =
            this.audio.birthdayMusic;


        if (!music || music.paused) {

            return;

        }


        this.fadeToBirthdayMusic(
            this.musicVolume,
            duration
        );

    }


    /**********************************************************************
     * UNLOCK BROWSER AUDIO
     *
     * IMPORTANT:
     *
     * This function should be triggered by a real user gesture.
     **********************************************************************/

    async unlockAudio() {

        if (this.audioUnlocked) {

            return true;

        }


        if (this.unlocking) {

            return false;

        }


        this.unlocking = true;


        console.log(
            "🔓 Attempting to unlock audio..."
        );


        const unlockPromises = [];


        Object.entries(this.audio).forEach(
            ([name, sound]) => {

                /*
                 * Save original settings.
                 */

                const originalVolume =
                    sound.volume;

                const originalLoop =
                    sound.loop;


                /*
                 * Mute during unlock so the user doesn't hear
                 * all audio files playing at once.
                 */

                sound.volume = 0;

                sound.loop = false;


                /*
                 * Reset audio.
                 */

                try {

                    sound.currentTime = 0;

                } catch (error) {}


                const promise =
                    sound.play();


                if (promise !== undefined) {

                    unlockPromises.push(

                        promise
                            .then(() => {

                                sound.pause();

                                try {

                                    sound.currentTime = 0;

                                } catch (error) {}

                            })
                            .catch(error => {

                                console.warn(
                                    `⚠️ Could not unlock ${name}`,
                                    error
                                );

                            })
                            .finally(() => {

                                sound.volume =
                                    originalVolume;

                                sound.loop =
                                    originalLoop;

                            })

                    );

                } else {

                    sound.volume =
                        originalVolume;

                    sound.loop =
                        originalLoop;

                }

            }
        );


        await Promise.all(
            unlockPromises
        );


        this.audioUnlocked = true;

        this.unlocking = false;


        this.removeUnlockListeners();


        console.log(
            "🔊 Audio Successfully Unlocked"
        );


        return true;

    }


    /**********************************************************************
     * SET BIRTHDAY MUSIC VOLUME
     **********************************************************************/

    setMusicVolume(volume) {

        this.musicVolume =
            Math.max(
                0,
                Math.min(
                    volume,
                    1
                )
            );


        const music =
            this.audio.birthdayMusic;


        if (!music.paused) {

            music.volume =
                this.musicVolume;

        }

    }


    /**********************************************************************
     * MUTE BIRTHDAY MUSIC
     **********************************************************************/

    muteMusic() {

        this.audio.birthdayMusic.muted =
            true;

    }


    /**********************************************************************
     * UNMUTE BIRTHDAY MUSIC
     **********************************************************************/

    unmuteMusic() {

        this.audio.birthdayMusic.muted =
            false;

    }


    /**********************************************************************
     * RESUME BIRTHDAY MUSIC
     **********************************************************************/

    resumeMusic() {

        this.startBirthdayMusic();

    }


    /**********************************************************************
     * STOP EVERYTHING
     **********************************************************************/

    stopAll() {

        this.stopFade();


        Object.values(
            this.audio
        ).forEach(
            sound => {

                sound.pause();

                try {

                    sound.currentTime = 0;

                } catch (error) {}

            }
        );


        this.audio.birthdayMusic.volume =
            0;


        this.audio.countdownCelebrationMusic.volume =
            this.countdownMusicVolume;

    }


    /**********************************************************************
     * IS PLAYING
     **********************************************************************/

    isPlaying(name) {

        const sound =
            this.audio[name];


        if (!sound) {

            return false;

        }


        return !sound.paused;

    }

}