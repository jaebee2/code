/******************************************************************************
 * File Name : app.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama & ChatGPT
 * Version   : 6.1.0 - iPhone / Safari Compatible
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
 * BLOCK MOBILE DEVICES
 **********************************************************************/

const isMobileDevice = () => {

    const mobileUA =
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
            navigator.userAgent
        );

    const smallScreen =
        window.innerWidth <= 768;

    return mobileUA || smallScreen;

};

if (isMobileDevice()) {

    document.body.innerHTML = `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            text-align:center;
            font-family:Arial,sans-serif;
            padding:30px;
            background:#000;
            color:#fff;
        ">
            <div>
                <h1>💻 Desktop Only</h1>
                <p>
                    This is only available on a laptop or desktop computer.
                </p>
            </div>
        </div>
    `;

    throw new Error(
        "Mobile devices are not supported."
    );

}
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

celebrationManager.birthdayPageManager =
    birthdayPageManager;


/**********************************************************************
 * IPHONE / SAFARI USER-GESTURE UNLOCK
 *
 * IMPORTANT:
 *
 * iPhone Safari does not allow an audio/video element to suddenly
 * start with sound after a completely unrelated timer event.
 *
 * The user must interact with the page at least once.
 *
 * This listener unlocks the audio files on the first real gesture.
 **********************************************************************/

let mediaUnlockStarted = false;

const unlockFromUserInteraction = async () => {

    if (mediaUnlockStarted) {
        return;
    }

    mediaUnlockStarted = true;

    console.log(
        "📱 User interaction detected - unlocking media..."
    );

    try {

        await audioManager.unlockAudio();

        /*
         * If the countdown has already been created and its
         * background music was blocked before the tap, try again
         * now that Safari has granted media playback.
         */

        if (
            window.countdown &&
            !window.countdownFinished
        ) {

            await audioManager
                .playCountdownCelebrationMusic();

        }

        updateAudioUnlockUI(true);

        console.log(
            "🔊 iPhone audio is ready."
        );

    } catch (error) {

        console.warn(
            "⚠️ Media unlock failed:",
            error
        );

        mediaUnlockStarted = false;

        updateAudioUnlockUI(false);

    }

};


/*
 * pointerdown is preferred because it works for mouse, touch and
 * stylus on modern browsers.
 */
document.addEventListener(
    "pointerdown",
    unlockFromUserInteraction,
    {
        passive: true,
        once: true
    }
);


/*
 * touchstart is kept as an iPhone Safari fallback.
 */
document.addEventListener(
    "touchstart",
    unlockFromUserInteraction,
    {
        passive: true,
        once: true
    }
);


/**********************************************************************
 * AUDIO UNLOCK UI
 **********************************************************************/

function updateAudioUnlockUI(unlocked) {

    const button =
        document.getElementById(
            "unlock-audio-btn"
        );

    const message =
        document.querySelector(
            ".audio-unlock p"
        );

    if (button) {

        if (unlocked) {

            button.textContent =
                "✅ Sound Enabled";

            button.disabled = true;

            button.style.opacity =
                "0.7";

        } else {

            button.textContent =
                "🔊 Tap to Enable Sound";

        }

    }

    if (message) {

        message.textContent =
            unlocked
                ? "Sound is ready ❤️"
                : "Tap once to enable sound on iPhone.";

    }

}


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

        console.log(
            "🚀 Starting countdown..."
        );

        screenManager.show(
            "countdown"
        );

        const countdown =
            new CountdownManager(

                () => {

                    window.countdownFinished =
                        true;

                    console.log(
                        "🎉 Countdown Finished"
                    );

                    celebrationManager.start();

                },

                audioManager

            );

        window.countdown =
            countdown;

        window.countdownFinished =
            false;

        countdown.start();

    },
    3000
);


/**********************************************************************
 * OPTIONAL EXPLICIT AUDIO BUTTON
 **********************************************************************/

const unlockButton =
    document.getElementById(
        "unlock-audio-btn"
    );

if (unlockButton) {

    unlockButton.addEventListener(
        "pointerdown",
        async event => {

            event.stopPropagation();

            mediaUnlockStarted = true;

            try {

                await audioManager.unlockAudio();

                if (
                    window.countdown &&
                    !window.countdownFinished
                ) {

                    await audioManager
                        .playCountdownCelebrationMusic();

                }

                updateAudioUnlockUI(true);

            } catch (error) {

                mediaUnlockStarted = false;

                updateAudioUnlockUI(false);

                console.warn(
                    "⚠️ Audio button unlock failed:",
                    error
                );

            }

        }
    );

}


/**********************************************************************
 * INITIALIZED
 **********************************************************************/

console.log(
    "✅ Birthday App Initialized"
);

console.log(
    "📱 iPhone/Safari media support enabled."
);
