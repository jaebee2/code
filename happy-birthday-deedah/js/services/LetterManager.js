/******************************************************************************
 * File Name : LetterManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama & ChatGPT
 * Version   : 1.0.0
 ******************************************************************************/

import TypewriterManager from "./TypewriterManager.js";

export default class LetterManager {

    constructor(audioManager) {

        this.audioManager = audioManager;

        this.typewriter = new TypewriterManager();

        this.overlay = document.getElementById("letter-overlay");

        this.envelope = document.getElementById("envelope");

        this.title = document.getElementById("letter-title");

        this.text = document.getElementById("letter-text");

        this.closeBtn = document.getElementById("close-letter");

    }

    /******************************************************************
     * Show Letter
     ******************************************************************/

    show() {

        if (!this.overlay) return;

        this.overlay.classList.add("show");

        this.envelope.classList.add("show");

        this.startAnimation();

    }

    /******************************************************************
     * Hide Letter
     ******************************************************************/

    hide() {

        this.overlay.classList.remove("show");

        this.envelope.classList.remove("show");

        this.typewriter.stop();

    }

    /******************************************************************
     * Complete Animation
     ******************************************************************/

    startAnimation() {

        setTimeout(() => {

            this.envelope.classList.add("open");

        }, 800);

        setTimeout(() => {

            this.startTyping();

        }, 1800);

    }

    /******************************************************************
     * Typing
     ******************************************************************/

    startTyping() {

        this.title.textContent = "My Deedah ❤️";

        this.typewriter.type(

            this.text,

            `Happy Birthday, my love ❤️

Today is your special day.

May Allah continue to protect you,
guide you,
bless you,
and fill your life with endless happiness.

Thank you for being the most beautiful gift in my life.

I love you more than words can ever describe.

Happy Birthday, My Deedah ❤️`,

            40

        );

    }

}