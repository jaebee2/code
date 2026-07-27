/******************************************************************************
 * File Name : app.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama
 * Purpose   : Main entry point of the application.
 * Version   : 1.0.0
 ******************************************************************************/

/******************************************************************************
 * IMPORTS
 ******************************************************************************/

// Import the Screen Manager.
import ScreenManager from "./services/ScreenManager.js";

// Import the Countdown Manager.
import CountdownManager from "./services/CountdownManager.js";

// Import the Audio Manager.
import AudioManager from "./services/AudioManager.js";

// Import the Final 10 Seconds Manager.
import FinalTenSecondsManager from "./services/FinalTenSecondsManager.js";
import BackgroundManager from "./services/BackgroundManager.js";

// Create the background manager.
const backgroundManager = new BackgroundManager();



/******************************************************************************
 * CREATE APPLICATION MANAGERS
 ******************************************************************************/

// Create the Audio Manager FIRST.
const audioManager = new AudioManager();

// Create the Final 10 Seconds Manager.
const finalTenManager = new FinalTenSecondsManager(audioManager);

// Make it globally available.
// (We will remove this later when we improve the architecture.)
window.finalTenManager = finalTenManager;

// Create the Screen Manager.
const screenManager = new ScreenManager();


/******************************************************************************
 * GET SCREEN ELEMENTS
 ******************************************************************************/

// Loading screen.
const loadingScreen = document.getElementById("loading-screen");

// Countdown screen.
const countdownScreen = document.getElementById("countdown-screen");

// Celebration screen.
const celebrationScreen = document.getElementById("celebration-screen");

// Birthday screen.
const birthdayScreen = document.getElementById("birthday-screen");


/******************************************************************************
 * REGISTER ALL APPLICATION SCREENS
 ******************************************************************************/

// Register every screen with the Screen Manager.
screenManager.register("loading", loadingScreen);
screenManager.register("countdown", countdownScreen);
screenManager.register("celebration", celebrationScreen);
screenManager.register("birthday", birthdayScreen);


/******************************************************************************
 * DISPLAY LOADING SCREEN
 ******************************************************************************/

// Show the loading screen first.
screenManager.show("loading");
// Create the animated background.
backgroundManager.create();

/******************************************************************************
 * LOADING TIMER
 ******************************************************************************/

// Wait three seconds before showing the countdown.
setTimeout(() => {

    // Show the countdown screen.
    screenManager.show("countdown");

    // Remove the loading screen from the page.
    loadingScreen.remove();

    /**************************************************************************
     * CREATE THE COUNTDOWN
     **************************************************************************/

    const countdown = new CountdownManager(() => {

        // Display a confirmation message.
        console.log("🎉 Countdown Finished");

        // Temporary test sound.
        audioManager.play("heartbeat");

    });

    // Start the countdown.
    countdown.start();

}, 3000);