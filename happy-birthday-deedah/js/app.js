/******************************************************************************
 * File Name : app.js
 ******************************************************************************/

import ScreenManager from "./services/ScreenManager.js";
import CountdownManager from "./services/CountdownManager.js";
import AudioManager from "./services/AudioManager.js";
import FinalTenSecondsManager from "./services/FinalTenSecondsManager.js";
import BackgroundManager from "./services/BackgroundManager.js";
import FireworksManager from "./services/FireworksManager.js";
import CelebrationManager from "./services/CelebrationManager.js";

const audioManager = new AudioManager();

const finalTenManager = new FinalTenSecondsManager(audioManager);

window.finalTenManager = finalTenManager;

const screenManager = new ScreenManager();

const backgroundManager = new BackgroundManager();

const fireworksManager = new FireworksManager();

const celebrationManager = new CelebrationManager(

    screenManager,
    fireworksManager,
    audioManager

);

const loadingScreen = document.getElementById("loading-screen");

const countdownScreen = document.getElementById("countdown-screen");

const celebrationScreen = document.getElementById("celebration-screen");

const birthdayScreen = document.getElementById("birthday-screen");

screenManager.register("loading",loadingScreen);

screenManager.register("countdown",countdownScreen);

screenManager.register("celebration",celebrationScreen);

screenManager.register("birthday",birthdayScreen);

screenManager.show("loading");

backgroundManager.create();

setTimeout(()=>{

    screenManager.show("countdown");

    loadingScreen.remove();

    const countdown=new CountdownManager(()=>{

        console.log("🎉 Countdown Finished");

        celebrationManager.start();

    });

    window.countdown = countdown;

    countdown.start();

},3000);