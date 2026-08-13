/******************************************************************************
 * File Name : AudioManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Central Audio Controller
 * Version   : 5.0.0
 * Author    : Jibril Bulama & ChatGPT
 ******************************************************************************/

export default class AudioManager {

    constructor() {

        /**********************************************************************
         * AUDIO LIBRARY
         **********************************************************************/

        this.audio = {

            /*
             * Countdown + Celebration
             *
             * IMPORTANT:
             * Make sure this file exists:
             *
             * ./assets/audio/music/countdownCelebrationMusic.mp3
             */
            countdownCelebrationMusic:
                new Audio("./assets/audio/music/countdownCelebrationMusic.mp3"),

            /*
             * Birthday Screen Music
             */
            birthdayMusic:
                new Audio("./assets/audio/music/happy-birthday.mp3"),

            /*
             * Final 10 Seconds
             *
             * This is YOUR recording:
             *
             * 10
             * 9
             * 8
             * ...
             * 1
             */
            tick:
                new Audio("./assets/audio/effects/tick.mp3"),

            /*
             * Celebration
             */
            countdownBoom:
                new Audio("./assets/audio/effects/countdown-boom.mp3"),

            fireworks:
                new Audio("./assets/audio/celebration/fireworks.mp3"),

            fireworks2:
                new Audio("./assets/audio/celebration/fireworks2.mp3"),

            /*
             * Birthday Voice
             */
            myVoice:
                new Audio("./assets/audio/recordings/happy-birthday-my-deedah.mp3"),

            /*
             * Other effects
             */
            heartbeat:
                new Audio("./assets/audio/effects/heartbeat.mp3")

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

        this.initialise();

    }


    /**********************************************************************
     * INITIALISE AUDIO
     **********************************************************************/

    initialise() {

        Object.entries(this.audio).forEach(([name, sound]) => {

            sound.preload = "auto";

            sound.addEventListener("canplaythrough", () => {

                console.log(`✅ Loaded: ${name}`);

            });

            sound.addEventListener("error", () => {

                console.error(`❌ Failed to load: ${name}`);

            });

        });


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
     * GENERIC PLAY
     **********************************************************************/

    play(name) {

        const sound = this.audio[name];

        if (!sound) {

            console.warn(`⚠️ Audio "${name}" does not exist.`);

            return;

        }


        /*
         * Never automatically restart background music.
         *
         * This is important because countdown music must continue
         * smoothly when moving to the celebration screen.
         */

        if (
            name !== "birthdayMusic" &&
            name !== "countdownCelebrationMusic"
        ) {

            sound.currentTime = 0;

        }


        sound.play().catch(error => {

            console.warn(`⚠️ Could not play ${name}:`, error);

        });

    }


    /**********************************************************************
     * PLAY COUNTDOWN + CELEBRATION MUSIC
     **********************************************************************/

    playCountdownCelebrationMusic() {

        const music =
            this.audio.countdownCelebrationMusic;

        if (!music) return;


        /*
         * If already playing, DO NOTHING.
         *
         * This prevents the music from restarting when
         * countdown changes to celebration.
         */

        if (!music.paused) {

            return;

        }


        music.volume =
            this.countdownMusicVolume;

        music.play().catch(error => {

            console.warn(
                "⚠️ Countdown/Celebration music could not play:",
                error
            );

        });

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
         * Make sure countdown/celebration music is gone.
         */

        this.stopCountdownCelebrationMusic();


        /*
         * If already playing, don't restart it.
         */

        if (!music.paused) {

            return;

        }


        music.volume = 0;

        music.play().catch(error => {

            console.warn(
                "⚠️ Birthday music could not play:",
                error
            );

        });


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
                Math.min(elapsed / duration, 1);


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
                    requestAnimationFrame(animate);

            } else {

                music.volume =
                    targetVolume;

                this.fadeAnimation = null;

            }

        };


        this.fadeAnimation =
            requestAnimationFrame(animate);

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

        if (!music || music.paused) return;

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

        if (!music || music.paused) return;

        this.fadeToBirthdayMusic(
            this.musicVolume,
            duration
        );

    }


    /**********************************************************************
     * UNLOCK BROWSER AUDIO
     **********************************************************************/

    async unlockAudio() {

        if (this.audioUnlocked) {

            return;

        }


        const promises = [];


        Object.entries(this.audio).forEach(
            ([name, sound]) => {

                /*
                 * Don't actually start looping music during unlock.
                 */

                const wasLooping =
                    sound.loop;

                sound.loop = false;


                const promise =
                    sound.play()

                    .then(() => {

                        sound.pause();

                        sound.currentTime = 0;

                    })

                    .catch(() => {})

                    .finally(() => {

                        sound.loop =
                            wasLooping;

                    });


                promises.push(promise);

            }
        );


        await Promise.all(promises);


        this.audioUnlocked = true;

        console.log(
            "🔊 Audio Successfully Unlocked"
        );

    }


    /**********************************************************************
     * SET BIRTHDAY MUSIC VOLUME
     **********************************************************************/

    setMusicVolume(volume) {

        this.musicVolume =
            Math.max(
                0,
                Math.min(volume, 1)
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

        this.audio.birthdayMusic.muted = true;

    }


    /**********************************************************************
     * UNMUTE BIRTHDAY MUSIC
     **********************************************************************/

    unmuteMusic() {

        this.audio.birthdayMusic.muted = false;

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


        Object.values(this.audio).forEach(
            sound => {

                sound.pause();

                sound.currentTime = 0;

            }
        );


        this.audio.birthdayMusic.volume = 0;

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