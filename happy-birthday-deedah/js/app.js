/******************************************************************************
 * File Name : app.js
 * Project   : Happy Birthday My Deedah ❤️
 * Version   : 5.0.0
 ******************************************************************************/

import ScreenManager from "./services/ScreenManager.js";
import CountdownManager from "./services/CountdownManager.js";
import AudioManager from "./services/AudioManager.js";
import FinalTenSecondsManager from "./services/FinalTenSecondsManager.js";
import BackgroundManager from "./services/BackgroundManager.js";
import FireworksManager from "./services/FireworksManager.js";
import CelebrationManager from "./services/CelebrationManager.js";
import BirthdayPageManager from "./services/BirthdayPageManager.js";
import LetterManager from "./services/LetterManager.js";

/******************************************************************
 * AUDIO
 ******************************************************************/

const audioManager = new AudioManager();

window.audioManager = audioManager;

/******************************************************************
 * Unlock Browser Audio
 ******************************************************************/

function unlockMedia() {

    Object.values(audioManager.audio).forEach(sound => {

        if (!sound) return;

        sound.play()

            .then(() => {

                sound.pause();

                sound.currentTime = 0;

            })

            .catch(() => {});

    });

    document.removeEventListener("click", unlockMedia);

    document.removeEventListener("touchstart", unlockMedia);

}

document.addEventListener("click", unlockMedia);

document.addEventListener("touchstart", unlockMedia);

/******************************************************************
 * FINAL TEN SECONDS
 ******************************************************************/

const finalTenManager = new FinalTenSecondsManager(audioManager);

window.finalTenManager = finalTenManager;

/******************************************************************
 * SCREEN MANAGER
 ******************************************************************/

const screenManager = new ScreenManager();

const loadingScreen = document.getElementById("loading-screen");

const countdownScreen = document.getElementById("countdown-screen");

const celebrationScreen = document.getElementById("celebration-screen");

const birthdayScreen = document.getElementById("birthday-screen");

screenManager.register("loading", loadingScreen);

screenManager.register("countdown", countdownScreen);

screenManager.register("celebration", celebrationScreen);

screenManager.register("birthday", birthdayScreen);

/******************************************************************
 * BACKGROUND
 ******************************************************************/

const backgroundManager = new BackgroundManager();

backgroundManager.create();

/******************************************************************
 * FIREWORKS
 ******************************************************************/

const fireworksManager = new FireworksManager();

/******************************************************************
 * LETTER
 ******************************************************************/

const letterManager = new LetterManager(audioManager);

window.letterManager = letterManager;

/******************************************************************
 * BIRTHDAY PAGE
 ******************************************************************/

const birthdayPageManager = new BirthdayPageManager(

    screenManager,

    letterManager

);

window.birthdayPageManager = birthdayPageManager;

/******************************************************************
 * CELEBRATION
 ******************************************************************/

const celebrationManager = new CelebrationManager(

    screenManager,

    fireworksManager,

    audioManager,

    birthdayPageManager

);

/******************************************************************
 * OPEN LETTER
 ******************************************************************/

const openLetterBtn = document.getElementById("open-letter-btn");

if (openLetterBtn) {

    openLetterBtn.addEventListener("click", () => {

        letterManager.show();

    });

}

/******************************************************************
 * LOADING
 ******************************************************************/

screenManager.show("loading");

/******************************************************************
 * START APP
 ******************************************************************/

setTimeout(() => {

    screenManager.show("countdown");

    if (loadingScreen) {

        loadingScreen.remove();

    }

    const countdown = new CountdownManager(() => {

        console.log("🎉 Countdown Finished");

        celebrationManager.start();

    });

    window.countdown = countdown;

    countdown.start();

}, 3000);

console.log("🎂 Birthday App Ready!");