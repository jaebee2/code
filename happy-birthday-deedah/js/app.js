/******************************************************************************
 * File Name : app.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama & ChatGPT
 * Version   : 4.0.0
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

/**********************************************************************
 * AUDIO
 **********************************************************************/

const audioManager = new AudioManager();

/**********************************************************************
 * Unlock Browser Audio
 **********************************************************************/

function unlockMedia() {

    if (!audioManager.audio) return;

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

/**********************************************************************
 * GLOBALS
 **********************************************************************/

window.audioManager = audioManager;

/**********************************************************************
 * Final Ten Seconds
 **********************************************************************/

const finalTenManager = new FinalTenSecondsManager(audioManager);

window.finalTenManager = finalTenManager;

/**********************************************************************
 * Screen Manager
 **********************************************************************/

const screenManager = new ScreenManager();

/**********************************************************************
 * Register Screens
 **********************************************************************/

const loadingScreen = document.getElementById("loading-screen");
const countdownScreen = document.getElementById("countdown-screen");
const celebrationScreen = document.getElementById("celebration-screen");
const birthdayScreen = document.getElementById("birthday-screen");

screenManager.register("loading", loadingScreen);
screenManager.register("countdown", countdownScreen);
screenManager.register("celebration", celebrationScreen);
screenManager.register("birthday", birthdayScreen);

/**********************************************************************
 * Background
 **********************************************************************/

const backgroundManager = new BackgroundManager();

backgroundManager.create();

/**********************************************************************
 * Fireworks
 **********************************************************************/

const fireworksManager = new FireworksManager();

/**********************************************************************
 * Birthday Page
 **********************************************************************/

const birthdayPageManager = new BirthdayPageManager(screenManager);

window.birthdayPageManager = birthdayPageManager;

/**********************************************************************
 * Letter Manager
 **********************************************************************/

const letterManager = new LetterManager(audioManager);

window.letterManager = letterManager;

/**********************************************************************
 * Celebration
 **********************************************************************/

const celebrationManager = new CelebrationManager(

    screenManager,
    fireworksManager,
    audioManager

);

/*
Pass BirthdayPageManager to CelebrationManager
*/

celebrationManager.birthdayPageManager = birthdayPageManager;

/**********************************************************************
 * Letter Button
 **********************************************************************/

const letterButton = document.getElementById("open-letter-btn");

if (letterButton) {

    letterButton.addEventListener("click", () => {

        letterManager.show();

    });

}

/**********************************************************************
 * Close Letter
 **********************************************************************/

const closeButton = document.getElementById("close-letter");

if (closeButton) {

    closeButton.addEventListener("click", () => {

        letterManager.hide();

    });

}

/**********************************************************************
 * Loading Screen
 **********************************************************************/

screenManager.show("loading");

/**********************************************************************
 * Start App
 **********************************************************************/

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

console.log("✅ Birthday App Initialized");