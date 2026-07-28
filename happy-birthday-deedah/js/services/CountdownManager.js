/******************************************************************************
 * File Name : CountdownManager.js
 * Project   : Happy Birthday My Deedah ❤️
 ******************************************************************************/

import CONFIG from "../config.js";

export default class CountdownManager {

    constructor(onComplete) {

        this.onComplete = onComplete;

        // TEST MODE
        if (CONFIG.TEST_MODE) {

            this.unlockDate = new Date(
                Date.now() + (CONFIG.TEST_COUNTDOWN * 1000)
            );

            console.log("🧪 TEST MODE");
            console.log("Unlock Date:", this.unlockDate);

        }

        // PRODUCTION MODE
        else {

            this.unlockDate = CONFIG.UNLOCK_DATE;

            console.log("🎂 PRODUCTION MODE");

        }

        this.timer = null;

    }

    start() {

        this.update();

        this.timer = setInterval(() => {

            this.update();

        }, 1000);

    }

    stop() {

        clearInterval(this.timer);

    }

    update() {

        const now = new Date();

        const difference = this.unlockDate - now;

        if (difference <= 0) {

            clearInterval(this.timer);

            if (window.finalTenManager) {

                window.finalTenManager.stop();

            }

            this.render(0,0,0,0);

            this.onComplete();

            return;

        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (difference % (1000 * 60 * 60))
            / (1000 * 60)
        );

        const seconds = Math.floor(
            (difference % (1000 * 60))
            / 1000
        );

        this.render(
            days,
            hours,
            minutes,
            seconds
        );

        if (window.finalTenManager) {

            window.finalTenManager.update(seconds);

        }

    }

    render(days,hours,minutes,seconds){

        this.setValue("days",days);

        this.setValue("hours",hours);

        this.setValue("minutes",minutes);

        this.setValue("seconds",seconds);

    }

    setValue(id,value){

        const element=document.getElementById(id);

        if(!element)return;

        const formatted=String(value).padStart(2,"0");

        if(element.textContent!==formatted){

            element.textContent=formatted;

            element.classList.remove("beat");

            void element.offsetWidth;

            element.classList.add("beat");

        }

    }

}