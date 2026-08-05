/******************************************************************************
 * File Name : LetterManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Version   : 3.0.0
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

        this.isOpen = false;

        this.timers = [];

        this.addEvents();

    }

    /******************************************************************
     * Events
     ******************************************************************/

    addEvents() {

        if (this.closeBtn) {

            this.closeBtn.addEventListener("click", () => this.hide());

        }

        if (this.overlay) {

            this.overlay.addEventListener("click", (e) => {

                if (e.target === this.overlay) {

                    this.hide();

                }

            });

        }

        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape" && this.isOpen) {

                this.hide();

            }

        });

    }

    /******************************************************************
     * Show Letter
     ******************************************************************/

    show() {

        if (this.isOpen) return;

        this.isOpen = true;

        this.clearTimers();

        this.typewriter.stop();

        this.title.textContent = "";
        this.text.textContent = "";

        if (this.audioManager?.duckMusic) {

            this.audioManager.duckMusic();

        }

        this.overlay.classList.add("show");

        this.envelope.className = "";

        void this.envelope.offsetWidth;

        this.envelope.classList.add("drop");

        this.timers.push(setTimeout(() => {

            this.envelope.classList.add("bounce");

        }, 800));

        this.timers.push(setTimeout(() => {

            this.envelope.classList.add("glow");

        }, 1200));

        this.timers.push(setTimeout(() => {

            this.envelope.classList.add("open");

        }, 1800));

        this.timers.push(setTimeout(() => {

            this.envelope.classList.add("show-letter");

        }, 2400));

        this.timers.push(setTimeout(() => {

            this.startTyping();

        }, 3100));

    }

    /******************************************************************
     * Hide Letter
     ******************************************************************/

    hide() {

        if (!this.isOpen) return;

        this.isOpen = false;

        this.clearTimers();

        this.typewriter.stop();

        this.envelope.classList.remove(
            "show-letter",
            "open",
            "glow",
            "bounce",
            "drop"
        );

        this.timers.push(setTimeout(() => {

            this.overlay.classList.remove("show");

            this.title.textContent = "";
            this.text.textContent = "";

        }, 500));

        if (this.audioManager?.restoreMusic) {

            this.audioManager.restoreMusic();

        }

    }

    /******************************************************************
     * Start Typing
     ******************************************************************/

    startTyping() {

        this.title.textContent = "My Deedah ❤️";

        const message = `Happy Birthday, my love ❤️

Today is not just another day.

It is the day Allah blessed this world with someone truly special.

Every smile you give brightens my life.

Every prayer you make strengthens me.

Thank you for loving me.

Thank you for believing in me.

I pray Allah grants you happiness,
good health,
long life,
success,
and Jannatul Firdaus.

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

    /******************************************************************
     * Clear Timers
     ******************************************************************/

    clearTimers() {

        this.timers.forEach(timer => clearTimeout(timer));

        this.timers = [];

    }

}