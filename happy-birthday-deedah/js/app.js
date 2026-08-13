/******************************************************************************
 * File Name : app.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama & ChatGPT
 * Version   : 5.0.0
 ******************************************************************************/

import ScreenManager
    from "./services/ScreenManager.js";

import CountdownManager
    from "./services/CountdownManager.js";

import AudioManager
    from "./services/AudioManager.js";

import FinalTenSecondsManager
    from "./services/FinalTenSecondsManager.js";

import BackgroundManager
    from "./services/BackgroundManager.js";

import FireworksManager
    from "./services/FireworksManager.js";

import CelebrationManager
    from "./services/CelebrationManager.js";

import BirthdayPageManager
    from "./services/BirthdayPageManager.js";

import LetterManager
    from "./services/LetterManager.js";


/**********************************************************************
 * AUDIO
 **********************************************************************/

const audioManager =
    new AudioManager();

window.audioManager =
    audioManager;


/**********************************************************************
 * FINAL TEN SECONDS
 **********************************************************************/

const finalTenManager =
    new FinalTenSecondsManager(
        audioManager
    );

window.finalTenManager =
    finalTenManager;


/**********************************************************************
 * SCREEN MANAGER
 **********************************************************************/

const screenManager =
    new ScreenManager();


/**********************************************************************
 * SCREENS
 **********************************************************************/

const loadingScreen =
    document.getElementById(
        "loading-screen"
    );

const countdownScreen =
    document.getElementById(
        "countdown-screen"
    );

const celebrationScreen =
    document.getElementById(
        "celebration-screen"
    );

const birthdayScreen =
    document.getElementById(
        "birthday-screen"
    );


screenManager.register(
    "loading",
    loadingScreen
);

screenManager.register(
    "countdown",
    countdownScreen
);

screenManager.register(
    "celebration",
    celebrationScreen
);

screenManager.register(
    "birthday",
    birthdayScreen
);


/**********************************************************************
 * BACKGROUND
 **********************************************************************/

const backgroundManager =
    new BackgroundManager();

backgroundManager.create();


/**********************************************************************
 * FIREWORKS
 **********************************************************************/

const fireworksManager =
    new FireworksManager();


/**********************************************************************
 * BIRTHDAY PAGE
 **********************************************************************/

const birthdayPageManager =
    new BirthdayPageManager(
        screenManager,
        audioManager
    );

window.birthdayPageManager =
    birthdayPageManager;


/**********************************************************************
 * LETTER MANAGER
 **********************************************************************/

const letterManager =
    new LetterManager(
        audioManager
    );

window.letterManager =
    letterManager;


/**********************************************************************
 * CELEBRATION MANAGER
 **********************************************************************/

const celebrationManager =
    new CelebrationManager(
        screenManager,
        fireworksManager,
        audioManager
    );


/*
 * Give CelebrationManager the SAME BirthdayPageManager.
 */

celebrationManager.birthdayPageManager =
    birthdayPageManager;


/**********************************************************************
 * LETTER BUTTON
 **********************************************************************/

const letterButton =
    document.getElementById(
        "open-letter-btn"
    );


if (letterButton) {

    letterButton.addEventListener(
        "click",
        () => {

            letterManager.show();

        }
    );

}


/**********************************************************************
 * CLOSE LETTER
 **********************************************************************/

const closeButton =
    document.getElementById(
        "close-letter"
    );


if (closeButton) {

    closeButton.addEventListener(
        "click",
        () => {

            letterManager.hide();

        }
    );

}


/**********************************************************************
 * LOADING SCREEN
 **********************************************************************/

screenManager.show(
    "loading"
);


/**********************************************************************
 * START APP
 **********************************************************************/

setTimeout(
    () => {

        /*
         * Go to countdown.
         */

        screenManager.show(
            "countdown"
        );


        /*
         * Create countdown.
         */

        const countdown =
            new CountdownManager(

                () => {

                    console.log(
                        "🎉 Countdown Finished"
                    );


                    /*
                     * Start celebration.
                     *
                     * Countdown/celebration music
                     * continues automatically.
                     */

                    celebrationManager.start();

                },

                audioManager

            );


        window.countdown =
            countdown;


        /*
         * Start countdown.
         */

        countdown.start();

    },
    3000
);


/**********************************************************************
 * BROWSER AUDIO UNLOCK BUTTON
 **********************************************************************/

const unlockButton =
    document.getElementById(
        "unlock-audio-btn"
    );


if (unlockButton) {

    unlockButton.addEventListener(
        "click",
        async () => {

            await audioManager.unlockAudio();


            unlockButton.innerHTML =
                "✅ Audio Ready";


            unlockButton.disabled =
                true;


            unlockButton.style.opacity =
                ".7";

        }
    );

}


/**********************************************************************
 * INITIALIZED
 **********************************************************************/

console.log(
    "✅ Birthday App Initialized"
);