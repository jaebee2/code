/******************************************************************************
 * File Name : TypewriterManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama & ChatGPT
 * Version   : 1.0.0
 ******************************************************************************/

export default class TypewriterManager {

    constructor() {

        this.timer = null;

    }

    /**
     * Type text inside an element
     *
     * @param {HTMLElement} element
     * @param {String} text
     * @param {Number} speed
     * @param {Function} callback
     */

    type(element, text, speed = 80, callback = null) {

        if (!element) return;

        clearInterval(this.timer);

        element.textContent = "";

        let index = 0;

        this.timer = setInterval(() => {

            element.textContent += text[index];

            index++;

            if (index >= text.length) {

                clearInterval(this.timer);

                if (callback) {

                    callback();

                }

            }

        }, speed);

    }

    /**
     * Instantly show text
     */

    instant(element, text) {

        if (!element) return;

        element.textContent = text;

    }

    /**
     * Stop typing
     */

    stop() {

        clearInterval(this.timer);

    }

}