/******************************************************************************
 * File Name : LetterManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Version   : 5.0.0
 ******************************************************************************/

import TypewriterManager from "./TypewriterManager.js";

export default class LetterManager {

    constructor(audioManager) {

        this.audioManager = audioManager;

        this.typewriter = new TypewriterManager();

        // Elements
        this.overlay = document.getElementById("letter-overlay");
        this.envelope = document.getElementById("envelope");
        this.title = document.getElementById("letter-title");
        this.text = document.getElementById("letter-text");
        this.closeBtn = document.getElementById("close-letter");

        this.isOpen = false;

        this.registerEvents();

    }

    /******************************************************************
     * Register Events
     ******************************************************************/

    registerEvents() {

        if (this.closeBtn) {

            this.closeBtn.addEventListener("click", () => {

                this.hide();

            });

        }

        if (this.overlay) {

            this.overlay.addEventListener("click", (e) => {

                if (e.target === this.overlay) {

                    this.hide();

                }

            });

        }

    }

    /******************************************************************
     * Show Letter
     ******************************************************************/

    show() {

        if (this.isOpen) return;

        this.isOpen = true;

        // Lower the background music
        if (this.audioManager) {

            this.audioManager.duckMusic();

        }

        this.overlay.classList.add("show");

        this.envelope.classList.remove("open");

        this.text.textContent = "";

        setTimeout(() => {

            this.envelope.classList.add("open");

        }, 600);

        setTimeout(() => {

            this.startTyping();

        }, 1400);

    }

    /******************************************************************
     * Hide Letter
     ******************************************************************/

    hide() {

        if (!this.isOpen) return;

        this.isOpen = false;

        this.typewriter.stop();

        this.envelope.classList.remove("open");

        setTimeout(() => {

            this.overlay.classList.remove("show");

        }, 400);

        this.text.textContent = "";

        // Restore music
        if (this.audioManager) {

            this.audioManager.restoreMusic();

        }

    }

    /******************************************************************
     * Start Typing
     ******************************************************************/

    startTyping() {

        this.title.textContent = "My Deedah ❤️";

        const message = `Happy Birthday, my love ❤️

Today isn't just another day.

It's the day Allah chose to bless this world with someone incredibly special.

Every smile you give brightens my life.
Every prayer you make inspires me.

Thank you for loving me.
Thank you for believing in me.

I pray Allah grants you happiness,
good health,
long life,
barakah,
and Jannatul Firdaus.

May every dream in your heart come true.

No matter where life takes us...

You will always be my favourite person.

Happy Birthday My Deedah ❤️

Forever Yours,

Senior MM ❤️`;

        this.typewriter.type(

            this.text,

            message,

            35

        );

    }

}