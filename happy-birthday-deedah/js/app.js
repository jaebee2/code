// Import the countdown manager.
import CountdownManager from "./services/CountdownManager.js";
// Import the audio manager.
import AudioManager from "./services/AudioManager.js";
/******************************************************************************
 * File Name : app.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama 
 * Purpose   : Main entry point of the application.
 * Version   : 1.0.0
 ******************************************************************************/

// Import the Screen Manager class.
import ScreenManager from "./services/ScreenManager.js";
// Create one global audio manager.
const audioManager = new AudioManager();
// Get a reference to the loading screen.
const loadingScreen = document.getElementById("loading-screen");

// Get a reference to the countdown screen.
const countdownScreen = document.getElementById("countdown-screen");

// Get a reference to the celebration screen.
const celebrationScreen = document.getElementById("celebration-screen");

// Get a reference to the birthday screen.
const birthdayScreen = document.getElementById("birthday-screen");

// Create a new Screen Manager.
const screenManager = new ScreenManager();

// Register every application screen.
screenManager.register("loading", loadingScreen);
screenManager.register("countdown", countdownScreen);
screenManager.register("celebration", celebrationScreen);
screenManager.register("birthday", birthdayScreen);

// Display only the loading screen.
screenManager.show("loading");
/******************************************************************************
 * LOADING SCREEN TIMER
 *
 * Keep the loading screen visible for three seconds before moving to the
 * countdown screen.
 ******************************************************************************/

// Wait for three seconds before changing screens.
/******************************************************************************
 * LOADING SCREEN TIMER
 ******************************************************************************/

// Wait three seconds.
setTimeout(() => {

    // Display the countdown screen.
    screenManager.show("countdown");

    // Remove the loading screen.
    document.getElementById("loading-screen").remove();

    // Create a countdown manager.
    const countdown = new CountdownManager(() => {

        // Display a confirmation message.
        console.log("🎉 Countdown Finished");

        // Play the heartbeat sound.
        audioManager.play("heartbeat");

    });

    // Start the countdown.
    countdown.start();

},3000);