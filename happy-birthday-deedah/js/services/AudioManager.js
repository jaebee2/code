/******************************************************************************
 * File Name : AudioManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Central Audio Controller
 * Version   : 6.1.0 - iPhone / Safari Compatible
 * Author    : Jibril Bulama & ChatGPT
 ******************************************************************************/

export default class AudioManager {

    constructor() {

        this.audio = {

            countdownCelebrationMusic:
                new Audio("./assets/audio/music/countdownCelebrationMusic.mp3"),

            birthdayMusic:
                new Audio("./assets/audio/music/happy-birthday.mp3"),

            tick:
                new Audio("./assets/audio/effects/tick.mp3"),

            countdownBoom:
                new Audio("./assets/audio/effects/countdown-boom.mp3"),

            fireworks:
                new Audio("./assets/audio/celebration/fireworks.mp3"),

            fireworks2:
                new Audio("./assets/audio/celebration/fireworks2.mp3"),

            myVoice:
                new Audio("./assets/audio/recordings/happy-birthday-my-deedah.mp3"),

            heartbeat:
                new Audio("./assets/audio/effects/heartbeat.mp3")

        };

        this.musicVolume = 0.45;
        this.countdownMusicVolume = 0.35;
        this.duckVolume = 0.12;

        this.fadeAnimation = null;
        this.audioUnlocked = false;
        this.unlocking = false;

        this.initialise();

    }


    initialise() {

        Object.entries(this.audio).forEach(([name, sound]) => {

            sound.preload = "auto";

            sound.setAttribute("playsinline", "");
            sound.setAttribute("webkit-playsinline", "");

            sound.addEventListener("canplaythrough", () => {
                console.log(`✅ Loaded: ${name}`);
            });

            sound.addEventListener("error", () => {
                console.error(`❌ Failed to load: ${name}`, sound.src);
            });

        });


        const countdownMusic =
            this.audio.countdownCelebrationMusic;

        countdownMusic.loop = true;
        countdownMusic.volume = this.countdownMusicVolume;


        const birthdayMusic =
            this.audio.birthdayMusic;

        birthdayMusic.loop = true;
        birthdayMusic.volume = 0;


        this.audio.fireworks.loop = true;
        this.audio.fireworks.volume = 0.50;

        this.audio.fireworks2.loop = true;
        this.audio.fireworks2.volume = 0.35;


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
     * PLAY
     **********************************************************************/

    play(name) {

        const sound = this.audio[name];

        if (!sound) {
            console.warn(`⚠️ Audio "${name}" does not exist.`);
            return Promise.resolve(false);
        }

        if (
            name !== "birthdayMusic" &&
            name !== "countdownCelebrationMusic"
        ) {
            try {
                sound.currentTime = 0;
            } catch (error) {}
        }

        const promise = sound.play();

        if (promise !== undefined) {

            return promise
                .then(() => true)
                .catch(error => {

                    console.warn(
                        `⚠️ Could not play ${name}:`,
                        error
                    );

                    return false;

                });

        }

        return Promise.resolve(true);

    }


    /**********************************************************************
     * COUNTDOWN + CELEBRATION MUSIC
     **********************************************************************/

    playCountdownCelebrationMusic() {

        const music =
            this.audio.countdownCelebrationMusic;

        if (!music) {
            return Promise.resolve(false);
        }

        if (!music.paused) {
            return Promise.resolve(true);
        }

        music.volume =
            this.countdownMusicVolume;

        const promise =
            music.play();

        if (promise !== undefined) {

            return promise
                .then(() => true)
                .catch(error => {

                    console.warn(
                        "⚠️ Countdown/Celebration music could not play:",
                        error
                    );

                    return false;

                });

        }

        return Promise.resolve(true);

    }


    stopCountdownCelebrationMusic() {

        const music =
            this.audio.countdownCelebrationMusic;

        if (!music) return;

        music.pause();
        music.currentTime = 0;

    }


    /**********************************************************************
     * BIRTHDAY MUSIC
     **********************************************************************/

    startBirthdayMusic() {

        const music =
            this.audio.birthdayMusic;

        if (!music) return;

        this.stopCountdownCelebrationMusic();

        if (!music.paused) {
            return;
        }

        music.volume = 0;

        const promise =
            music.play();

        if (promise !== undefined) {

            promise.catch(error => {

                console.warn(
                    "⚠️ Birthday music could not play:",
                    error
                );

            });

        }

        this.fadeToBirthdayMusic(
            this.musicVolume,
            4000
        );

    }


    stopBirthdayMusic() {

        const music =
            this.audio.birthdayMusic;

        if (!music) return;

        this.stopFade();

        music.pause();
        music.currentTime = 0;
        music.volume = 0;

    }


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


    pause(name) {

        const sound =
            this.audio[name];

        if (!sound) return;

        sound.pause();

    }


    stop(name) {

        const sound =
            this.audio[name];

        if (!sound) return;

        sound.pause();
        sound.currentTime = 0;

    }


    stopFade() {

        if (this.fadeAnimation) {

            cancelAnimationFrame(
                this.fadeAnimation
            );

            this.fadeAnimation = null;

        }

    }


    duckMusic(duration = 700) {

        const music =
            this.audio.birthdayMusic;

        if (!music || music.paused) return;

        this.fadeToBirthdayMusic(
            this.duckVolume,
            duration
        );

    }


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
     * UNLOCK AUDIO FROM A REAL USER GESTURE
     *
     * This must be called by a touch/click/pointer event on iPhone.
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
            "🔓 Attempting to unlock browser audio..."
        );

        const promises = [];

        Object.entries(this.audio).forEach(
            ([name, sound]) => {

                const originalVolume =
                    sound.volume;

                const originalLoop =
                    sound.loop;

                sound.volume = 0;
                sound.loop = false;

                try {
                    sound.currentTime = 0;
                } catch (error) {}

                const promise =
                    sound.play();

                if (promise !== undefined) {

                    promises.push(

                        promise
                            .then(() => {

                                sound.pause();

                                try {
                                    sound.currentTime = 0;
                                } catch (error) {}

                            })
                            .catch(error => {

                                console.warn(
                                    `⚠️ Could not unlock ${name}:`,
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

        await Promise.all(promises);

        this.audioUnlocked = true;
        this.unlocking = false;

        console.log(
            "🔊 Audio Successfully Unlocked"
        );

        return true;

    }


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


    muteMusic() {

        this.audio.birthdayMusic.muted = true;

    }


    unmuteMusic() {

        this.audio.birthdayMusic.muted = false;

    }


    resumeMusic() {

        this.startBirthdayMusic();

    }


    stopAll() {

        this.stopFade();

        Object.values(this.audio).forEach(
            sound => {

                sound.pause();

                try {
                    sound.currentTime = 0;
                } catch (error) {}

            }
        );

        this.audio.birthdayMusic.volume = 0;

        this.audio.countdownCelebrationMusic.volume =
            this.countdownMusicVolume;

    }


    isPlaying(name) {

        const sound =
            this.audio[name];

        if (!sound) {
            return false;
        }

        return !sound.paused;

    }

}
