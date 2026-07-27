/******************************************************************************
 * File Name : AudioManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama & ChatGPT
 * Purpose   : Controls every sound used throughout the application.
 * Version   : 1.0.0
 ******************************************************************************/

/**
 * AudioManager Class
 *
 * This class loads and controls all audio used in the project.
 */
export default class AudioManager {

    /**
     * Constructor
     * This runs automatically whenever a new AudioManager is created.
     */
    constructor() {

        // Store every audio object inside one collection.
        this.audio = {

            // Background music.
            birthdayMusic: new Audio("./assets/audio/music/birthday-theme.mp3"),

            // Heartbeat sound.
            heartbeat: new Audio("./assets/audio/effects/heartbeat.mp3"),

            // Countdown tick.
            tick: new Audio("./assets/audio/effects/tick.mp3"),

            // Fireworks.
            fireworks: new Audio("./assets/audio/celebration/fireworks.mp3"),

            // Confetti.
            confetti: new Audio("./assets/audio/celebration/confetti.mp3"),

            // Your recorded voice.
            myVoice: new Audio("./assets/audio/recordings/happy-birthday-my-deedah.mp3")

        };

        // Configure every audio file.
        this.initialise();

    }

    /**
     * Configure all sounds.
     */
    initialise() {

        // Allow the background music to repeat forever.
        this.audio.birthdayMusic.loop = true;

        // Set a comfortable music volume.
        this.audio.birthdayMusic.volume = 0;

        // Set heartbeat volume.
        this.audio.heartbeat.volume = 1;

        // Set tick volume.
        this.audio.tick.volume = 0.35;

        // Fireworks volume.
        this.audio.fireworks.volume = 1;

        // Confetti volume.
        this.audio.confetti.volume = 0.8;

        // Voice volume.
        this.audio.myVoice.volume = 1;

    }

    /**
     * Play a sound.
     *
     * @param {String} name
     * Name of the sound.
     */
    play(name) {

        // Check that the sound exists.
        if (!this.audio[name]) {

            return;

        }

        // Restart the sound.
        this.audio[name].currentTime = 0;

        // Play the sound.
        this.audio[name].play().catch(() => {});

    }

    /**
     * Stop a sound.
     *
     * @param {String} name
     */
    stop(name) {

        // Check that the sound exists.
        if (!this.audio[name]) {

            return;

        }

        // Pause playback.
        this.audio[name].pause();

        // Reset playback position.
        this.audio[name].currentTime = 0;

    }

    /**
     * Fade in the background music.
     *
     * @param {Number} duration
     * Duration in milliseconds.
     */
    fadeInMusic(duration = 5000) {

        // Play the music.
        this.audio.birthdayMusic.play().catch(() => {});

        // Calculate the volume increase.
        const step = 0.4 / (duration / 100);

        // Gradually increase the volume.
        const interval = setInterval(() => {

            // Increase the volume.
            this.audio.birthdayMusic.volume += step;

            // Stop when the target volume is reached.
            if (this.audio.birthdayMusic.volume >= 0.4) {

                this.audio.birthdayMusic.volume = 0.4;

                clearInterval(interval);

            }

        }, 100);

    }

}