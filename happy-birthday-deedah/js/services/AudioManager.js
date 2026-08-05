/******************************************************************************
 * File Name : AudioManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Version   : 5.0.0
 ******************************************************************************/

export default class AudioManager {

    constructor() {

        this.audio = {

            birthdayMusic: new Audio("./assets/audio/music/birthday-theme.mp3"),

            tick: new Audio("./assets/audio/effects/tick.mp3"),

            countdownBoom: new Audio("./assets/audio/effects/countdown-boom.mp3"),

            heartbeat: new Audio("./assets/audio/effects/heartbeat.mp3"),

            fireworks: new Audio("./assets/audio/celebration/fireworks.mp3"),

            fireworks2: new Audio("./assets/audio/celebration/fireworks2.mp3"),

            confetti: new Audio("./assets/audio/celebration/confetti.mp3")

        };

        this.musicVolume = 0.45;

        this.initialise();

    }

    /******************************************************************
     * Configure Audio
     ******************************************************************/

    initialise() {

        Object.entries(this.audio).forEach(([name, sound]) => {

            sound.preload = "auto";

            sound.addEventListener("canplaythrough", () => {

                console.log(`✅ Loaded: ${name}`);

            });

            sound.addEventListener("error", () => {

                console.error(`❌ Failed: ${name}`);

            });

        });

        this.audio.birthdayMusic.loop = true;
        this.audio.birthdayMusic.volume = this.musicVolume;

        this.audio.fireworks.loop = true;
        this.audio.fireworks.volume = 0.45;

        this.audio.fireworks2.loop = true;
        this.audio.fireworks2.volume = 0.35;

        this.audio.tick.volume = 0.3;
        this.audio.countdownBoom.volume = 1;
        this.audio.heartbeat.volume = 1;
        this.audio.confetti.volume = 0.5;

    }

    /******************************************************************
     * Play
     ******************************************************************/

    play(name) {

        const sound = this.audio[name];

        if (!sound) return;

        if (name === "birthdayMusic") {

            if (!sound.paused) return;

        } else {

            sound.currentTime = 0;

        }

        sound.play().catch(console.error);

    }

    /******************************************************************
     * Stop
     ******************************************************************/

    stop(name) {

        const sound = this.audio[name];

        if (!sound) return;

        sound.pause();

        sound.currentTime = 0;

    }

    /******************************************************************
     * Pause
     ******************************************************************/

    pause(name) {

        const sound = this.audio[name];

        if (!sound) return;

        sound.pause();

    }

    /******************************************************************
     * Resume
     ******************************************************************/

    resume(name) {

        const sound = this.audio[name];

        if (!sound) return;

        sound.play().catch(console.error);

    }

    /******************************************************************
     * Fade In Music
     ******************************************************************/

    fadeInMusic(duration = 4000) {

        const music = this.audio.birthdayMusic;

        if (!music.paused) return;

        music.volume = 0;

        music.play().catch(console.error);

        const interval = 100;

        const step = this.musicVolume / (duration / interval);

        const fade = setInterval(() => {

            music.volume += step;

            if (music.volume >= this.musicVolume) {

                music.volume = this.musicVolume;

                clearInterval(fade);

            }

        }, interval);

    }

    /******************************************************************
     * Fade Out Music
     ******************************************************************/

    fadeOutMusic(duration = 2500) {

        const music = this.audio.birthdayMusic;

        const interval = 100;

        const step = music.volume / (duration / interval);

        const fade = setInterval(() => {

            music.volume -= step;

            if (music.volume <= 0) {

                music.pause();

                music.currentTime = 0;

                music.volume = this.musicVolume;

                clearInterval(fade);

            }

        }, interval);

    }

    /******************************************************************
     * Duck Music
     ******************************************************************/

    duckMusic() {

        const music = this.audio.birthdayMusic;

        if (music.paused) return;

        music.volume = 0.15;

    }

    /******************************************************************
     * Restore Music
     ******************************************************************/

    restoreMusic() {

        const music = this.audio.birthdayMusic;

        if (music.paused) {

            music.play().catch(console.error);

        }

        music.volume = this.musicVolume;

    }

    /******************************************************************
     * Stop Everything
     ******************************************************************/

    stopAll() {

        Object.values(this.audio).forEach(sound => {

            sound.pause();

            sound.currentTime = 0;

        });

    }

}