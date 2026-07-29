/******************************************************************************
 * File Name : AudioManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Professional audio controller.
 * Author    : Jibril Bulama & ChatGPT
 * Version   : 2.1.0
 ******************************************************************************/

export default class AudioManager {

    constructor() {

        /**********************************************************************
         * Audio Library
         **********************************************************************/

        this.audio = {

            // Background Music
            birthdayMusic: new Audio("./assets/audio/music/birthday-theme.mp3"),

            // Countdown Tick
            tick: new Audio("./assets/audio/effects/tick.mp3"),

            // Countdown reaches zero
            countdownBoom: new Audio("./assets/audio/effects/countdown-boom.mp3"),

            // Heartbeat
            heartbeat: new Audio("./assets/audio/effects/heartbeat.mp3"),

            // Voice Recording
            myVoice: new Audio("./assets/audio/recordings/happy-birthday-my-deedah.mp3"),

            // Fireworks ambience
            fireworks: new Audio("./assets/audio/celebration/fireworks.mp3"),

            // Second fireworks ambience
            fireworks2: new Audio("./assets/audio/celebration/fireworks2.mp3"),

            // Confetti
            confetti: new Audio("./assets/audio/celebration/confetti.mp3")

        };

        this.initialise();

    }

    /**********************************************************************
     * Configure Audio
     **********************************************************************/

    initialise() {

        Object.entries(this.audio).forEach(([name, sound]) => {

            sound.preload = "auto";

            sound.addEventListener("canplaythrough", () => {

                console.log(`✅ Loaded: ${name}`);

            });

            sound.addEventListener("error", () => {

                console.error(`❌ Failed: ${name}`, sound.src);

            });

        });

        /* Background Music */

        this.audio.birthdayMusic.loop = true;
        this.audio.birthdayMusic.volume = 0;

        /* Fireworks */

        this.audio.fireworks.loop = true;
        this.audio.fireworks.volume = 0.55;

        this.audio.fireworks2.loop = true;
        this.audio.fireworks2.volume = 0.40;

        /* Effects */

        this.audio.tick.volume = 0.30;

        this.audio.countdownBoom.volume = 1;

        this.audio.heartbeat.volume = 1;

        this.audio.myVoice.volume = 1;

        this.audio.confetti.volume = 0.50;

    }

    /**********************************************************************
     * Play Sound
     **********************************************************************/

    play(name) {

        const sound = this.audio[name];

        if (!sound) {

            console.warn(`⚠️ Sound "${name}" not found.`);

            return;

        }

        // Don't restart music if already playing
        if (name === "birthdayMusic") {

            if (!sound.paused) {

                return;

            }

        } else {

            sound.currentTime = 0;

        }

        sound.play()

            .then(() => {

                console.log(`▶ Playing: ${name}`);

            })

            .catch(error => {

                console.error(`❌ Could not play "${name}"`, error);

            });

    }

    /**********************************************************************
     * Stop Sound
     **********************************************************************/

    stop(name) {

        const sound = this.audio[name];

        if (!sound) return;

        sound.pause();

        sound.currentTime = 0;

    }

    /**********************************************************************
     * Pause Sound
     **********************************************************************/

    pause(name) {

        const sound = this.audio[name];

        if (!sound) return;

        sound.pause();

    }

    /**********************************************************************
     * Fade In Background Music
     **********************************************************************/

    fadeInMusic(duration = 5000) {

        const music = this.audio.birthdayMusic;

        if (!music.paused) {

            return;

        }

        music.volume = 0;

        music.play().catch(console.error);

        const targetVolume = 0.45;

        const interval = 100;

        const step = targetVolume / (duration / interval);

        const fade = setInterval(() => {

            music.volume += step;

            if (music.volume >= targetVolume) {

                music.volume = targetVolume;

                clearInterval(fade);

            }

        }, interval);

    }

    /**********************************************************************
     * Fade Out Background Music
     **********************************************************************/

    fadeOutMusic(duration = 3000) {

        const music = this.audio.birthdayMusic;

        const interval = 100;

        const step = music.volume / (duration / interval);

        const fade = setInterval(() => {

            music.volume -= step;

            if (music.volume <= 0) {

                music.pause();

                music.currentTime = 0;

                music.volume = 0;

                clearInterval(fade);

            }

        }, interval);

    }

    /**********************************************************************
     * Stop Every Sound
     **********************************************************************/

    stopAll() {

        Object.values(this.audio).forEach(sound => {

            sound.pause();

            sound.currentTime = 0;

        });

    }

}