/******************************************************************************
 * File Name : AudioManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Professional audio controller.
 ******************************************************************************/

export default class AudioManager {

    constructor() {

        this.audio = {

            birthdayMusic: new Audio("assets/audio/music/birthday-theme.mp3"),

            heartbeat: new Audio("assets/audio/effects/heartbeat.mp3"),

            tick: new Audio("assets/audio/effects/tick.mp3"),

            fireworks: new Audio("assets/audio/celebration/fireworks.mp3"),

            confetti: new Audio("assets/audio/celebration/confetti.mp3"),

            myVoice: new Audio("assets/audio/recordings/happy-birthday-my-deedah.mp3")

        };

        this.initialise();

    }

    initialise() {

        Object.values(this.audio).forEach(sound => {

            sound.preload = "auto";

        });

        this.audio.birthdayMusic.loop = true;
        this.audio.birthdayMusic.volume = 0;

        this.audio.fireworks.loop = true;
        this.audio.fireworks.volume = 0.8;

        this.audio.heartbeat.volume = 1;

        this.audio.tick.volume = 0.3;

        this.audio.confetti.volume = 0.5;

        this.audio.myVoice.volume = 1;

    }

    play(name) {

        const sound = this.audio[name];

        if (!sound) {

            console.warn(`Sound "${name}" not found`);

            return;

        }

        sound.currentTime = 0;

        sound.play().catch(console.error);

    }

    stop(name) {

        const sound = this.audio[name];

        if (!sound) return;

        sound.pause();

        sound.currentTime = 0;

    }

    pause(name) {

        const sound = this.audio[name];

        if (!sound) return;

        sound.pause();

    }

    fadeInMusic(duration = 3000) {

        const music = this.audio.birthdayMusic;

        music.volume = 0;

        music.play().catch(console.error);

        const target = 0.45;

        const step = target / (duration / 100);

        const timer = setInterval(() => {

            music.volume += step;

            if (music.volume >= target) {

                music.volume = target;

                clearInterval(timer);

            }

        },100);

    }

    fadeOutMusic(duration = 2000) {

        const music = this.audio.birthdayMusic;

        const step = music.volume / (duration / 100);

        const timer = setInterval(() => {

            music.volume -= step;

            if (music.volume <= 0) {

                music.pause();

                music.currentTime = 0;

                music.volume = 0;

                clearInterval(timer);

            }

        },100);

    }

}