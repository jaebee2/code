/******************************************************************************
 * File Name : AudioManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Professional Audio Controller
 * Version   : 4.0.0
 * Author    : Jibril Bulama & ChatGPT
 ******************************************************************************/

export default class AudioManager {

    constructor() {

        /**********************************************************************
         * Audio Library
         **********************************************************************/

        this.audio = {

            // Background Music
            birthdayMusic: new Audio("./assets/audio/music/happy-birthday.mp3"),

            // Countdown
            tick: new Audio("./assets/audio/effects/tick.mp3"),
            countdownBoom: new Audio("./assets/audio/effects/countdown-boom.mp3"),

            // Effects
            heartbeat: new Audio("./assets/audio/effects/heartbeat.mp3"),

            // Voice Recording
            myVoice: new Audio("./assets/audio/recordings/happy-birthday-my-deedah.mp3"),

            // Celebration
            fireworks: new Audio("./assets/audio/celebration/fireworks.mp3"),
            fireworks2: new Audio("./assets/audio/celebration/fireworks2.mp3"),
            confetti: new Audio("./assets/audio/celebration/confetti.mp3")

        };

        this.musicVolume = 0.45;

        this.duckVolume = 0.12;

        this.fadeAnimation = null;

        this.audioUnlocked = false;

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

                console.error(`❌ Failed: ${name}`);

            });

        });

        // Background Music

        this.audio.birthdayMusic.loop = true;
        this.audio.birthdayMusic.volume = 0;

        // Fireworks

        this.audio.fireworks.loop = true;
        this.audio.fireworks.volume = 0.50;

        this.audio.fireworks2.loop = true;
        this.audio.fireworks2.volume = 0.35;

        // Effects

        this.audio.tick.volume = 0.30;
        this.audio.countdownBoom.volume = 1;
        this.audio.heartbeat.volume = 1;
        this.audio.myVoice.volume = 1;
        this.audio.confetti.volume = 0.45;

    }

    /**********************************************************************
     * Generic Play
     **********************************************************************/

    play(name) {

        const sound = this.audio[name];

        if (!sound) {

            console.warn(`${name} does not exist.`);

            return;

        }

        if (name !== "birthdayMusic") {

            sound.currentTime = 0;

        }

        sound.play().catch(console.error);

    }

    /**********************************************************************
     * Pause
     **********************************************************************/

    pause(name) {

        const sound = this.audio[name];

        if (!sound) return;

        sound.pause();

    }

    /**********************************************************************
     * Stop
     **********************************************************************/

    stop(name) {

        const sound = this.audio[name];

        if (!sound) return;

        sound.pause();

        sound.currentTime = 0;

    }
        /**********************************************************************
     * Smooth Fade Engine
     **********************************************************************/

    fadeTo(targetVolume, duration = 1000) {

        const music = this.audio.birthdayMusic;

        if (this.fadeAnimation) {

            cancelAnimationFrame(this.fadeAnimation);

        }

        const startVolume = music.volume;

        const volumeDifference = targetVolume - startVolume;

        const startTime = performance.now();

        const animate = (currentTime) => {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            // Ease In Out
            const ease = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            music.volume = startVolume + (volumeDifference * ease);

            if (progress < 1) {

                this.fadeAnimation = requestAnimationFrame(animate);

            } else {

                music.volume = targetVolume;

                this.fadeAnimation = null;

                if (targetVolume === 0) {

                    music.pause();

                    music.currentTime = 0;

                }

            }

        };

        this.fadeAnimation = requestAnimationFrame(animate);

    }

    /**********************************************************************
     * Fade In Background Music
     **********************************************************************/

    fadeInMusic(duration = 4000) {

        const music = this.audio.birthdayMusic;

        music.volume = 0;

        music.play().catch(console.error);

        this.fadeTo(this.musicVolume, duration);

    }

    /**********************************************************************
     * Fade Out Background Music
     **********************************************************************/

    fadeOutMusic(duration = 2500) {

        this.fadeTo(0, duration);

    }

    /**********************************************************************
     * Duck Music
     **********************************************************************/

    duckMusic(duration = 700) {

        const music = this.audio.birthdayMusic;

        if (music.paused) return;

        this.fadeTo(this.duckVolume, duration);

    }

    /**********************************************************************
     * Restore Music
     **********************************************************************/

    restoreMusic(duration = 700) {

        const music = this.audio.birthdayMusic;

        if (music.paused) return;

        this.fadeTo(this.musicVolume, duration);

    }

    /**********************************************************************
     * Unlock Browser Audio
     **********************************************************************/

    async unlockAudio() {

        if (this.audioUnlocked) {

            return;

        }

        const promises = [];

        Object.values(this.audio).forEach(sound => {

            const promise = sound.play()

                .then(() => {

                    sound.pause();

                    sound.currentTime = 0;

                })

                .catch(() => {});

            promises.push(promise);

        });

        await Promise.all(promises);

        this.audioUnlocked = true;

        console.log("🔊 Audio Successfully Unlocked");

    }
        /**********************************************************************
     * Set Music Volume
     **********************************************************************/

    setMusicVolume(volume) {

        this.musicVolume = Math.max(0, Math.min(volume, 1));

        if (!this.audio.birthdayMusic.paused) {

            this.audio.birthdayMusic.volume = this.musicVolume;

        }

    }

    /**********************************************************************
     * Mute Music
     **********************************************************************/

    muteMusic() {

        this.audio.birthdayMusic.muted = true;

    }

    /**********************************************************************
     * Unmute Music
     **********************************************************************/

    unmuteMusic() {

        this.audio.birthdayMusic.muted = false;

    }

    /**********************************************************************
     * Resume Background Music
     **********************************************************************/

    resumeMusic() {

        const music = this.audio.birthdayMusic;

        if (music.paused) {

            music.play().catch(console.error);

            this.fadeTo(this.musicVolume, 1000);

        }

    }

    /**********************************************************************
     * Stop Everything
     **********************************************************************/

    stopAll() {

        if (this.fadeAnimation) {

            cancelAnimationFrame(this.fadeAnimation);

            this.fadeAnimation = null;

        }

        Object.values(this.audio).forEach(sound => {

            sound.pause();

            sound.currentTime = 0;

        });

    }

    /**********************************************************************
     * Is Playing?
     **********************************************************************/

    isPlaying(name) {

        const sound = this.audio[name];

        if (!sound) {

            return false;

        }

        return !sound.paused;

    }

}