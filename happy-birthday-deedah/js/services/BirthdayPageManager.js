/******************************************************************************
 * File Name : BirthdayPageManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama & ChatGPT
 * Version   : 5.0.0
 ******************************************************************************/

import TypewriterManager from "./TypewriterManager.js";

export default class BirthdayPageManager {

    constructor(
        screenManager,
        audioManager
    ) {

        this.screenManager =
            screenManager;

        this.audioManager =
            audioManager;


        this.typewriter =
            new TypewriterManager();


        /******************************************************************
         * HERO
         ******************************************************************/

        this.heroCard =
            document.querySelector(
                ".hero-card"
            );


        /******************************************************************
         * TITLES
         ******************************************************************/

        this.mainTitle =
            document.getElementById(
                "birthday-main-title"
            );

        this.secondTitle =
            document.getElementById(
                "birthday-second-title"
            );

        this.nameTitle =
            document.getElementById(
                "birthday-name"
            );

        this.dateTitle =
            document.getElementById(
                "birthday-date"
            );


        /******************************************************************
         * BUTTON
         ******************************************************************/

        this.button =
            document.getElementById(
                "open-letter-btn"
            );


        /******************************************************************
         * DECORATION
         ******************************************************************/

        this.heartsContainer =
            document.querySelector(
                ".floating-hearts"
            );

        this.starsContainer =
            document.querySelector(
                ".floating-stars"
            );


        this.heartsStarted = false;

        this.starsStarted = false;

    }


    /**********************************************************************
     * SHOW BIRTHDAY PAGE
     **********************************************************************/

    show() {

        console.log(
            "🎂 Birthday Screen Active"
        );


        /*
         * Switch screen.
         */

        this.screenManager.show(
            "birthday"
        );


        /*
         * Reset page.
         */

        this.reset();


        /*
         * START BIRTHDAY MUSIC.
         *
         * This automatically stops countdown/celebration music.
         */

        if (this.audioManager) {

            this.audioManager
                .startBirthdayMusic();

        }


        /*
         * Hero animation.
         */

        this.startHeroAnimation();


        /******************************************************************
         * STARS
         ******************************************************************/

        if (!this.starsStarted) {

            this.createStars();

            this.starsStarted = true;

        }


        /******************************************************************
         * HEARTS
         ******************************************************************/

        if (!this.heartsStarted) {

            this.createFloatingHearts();

            this.heartsStarted = true;

        }

    }


    /**********************************************************************
     * RESET SCREEN
     **********************************************************************/

    reset() {

        if (this.heroCard) {

            this.heroCard.classList.remove(
                "show"
            );

        }


        if (this.button) {

            this.button.classList.remove(
                "show"
            );

        }


        if (this.mainTitle) {

            this.mainTitle.textContent = "";

        }


        if (this.secondTitle) {

            this.secondTitle.textContent = "";

        }


        if (this.nameTitle) {

            this.nameTitle.textContent = "";

        }


        if (this.dateTitle) {

            this.dateTitle.textContent = "";

        }

    }


    /**********************************************************************
     * HERO ANIMATION
     **********************************************************************/

    startHeroAnimation() {

        if (!this.heroCard) return;


        requestAnimationFrame(
            () => {

                this.heroCard.classList.add(
                    "show"
                );

            }
        );


        setTimeout(
            () => {

                this.typeMainTitle();

            },
            1000
        );

    }


    /**********************************************************************
     * HAPPY
     **********************************************************************/

    typeMainTitle() {

        if (!this.mainTitle) return;


        this.typewriter.type(

            this.mainTitle,

            "🥳HBD🥳",

            100,

            () => {

                this.typeSecondTitle();

            }

        );

    }


    /**********************************************************************
     * BIRTHDAY
     **********************************************************************/

    typeSecondTitle() {

        if (!this.secondTitle) return;


        this.typewriter.type(

            this.secondTitle,

            "🎂MY DEEDAH 🎂",

            100,

            () => {

                this.typeName();

            }

        );

    }


    /**********************************************************************
     * NAME
     **********************************************************************/

    typeName() {

        if (!this.nameTitle) return;


        this.typewriter.type(

            this.nameTitle,

            "💘💍👪🏽",

            90,

            () => {

                this.typeDate();

            }

        );

    }


    /**********************************************************************
     * BUTTON
     **********************************************************************/

    showButton() {

        if (!this.button) return;


        this.button.classList.add(
            "show"
        );

    }


    /**********************************************************************
     * FLOATING HEARTS
     **********************************************************************/

    createFloatingHearts() {

        if (!this.heartsContainer) return;


        setInterval(
            () => {

                const heart =
                    document.createElement(
                        "div"
                    );


                heart.className =
                    "floating-heart";


                heart.innerHTML =
                    "❤️";


                heart.style.left =
                    Math.random() * 100 + "%";


                heart.style.fontSize =
                    (18 +
                    Math.random() * 24) +
                    "px";


                heart.style.animationDuration =
                    (6 +
                    Math.random() * 5) +
                    "s";


                this.heartsContainer
                    .appendChild(
                        heart
                    );


                setTimeout(
                    () => {

                        heart.remove();

                    },
                    12000
                );

            },
            350
        );

    }


    /**********************************************************************
     * STARS
     **********************************************************************/

    createStars() {

        if (!this.starsContainer) return;


        for (
            let i = 0;
            i < 40;
            i++
        ) {

            const star =
                document.createElement(
                    "div"
                );


            star.className =
                "star";


            star.style.left =
                Math.random() * 100 + "%";


            star.style.top =
                Math.random() * 100 + "%";


            star.style.animationDelay =
                Math.random() * 4 + "s";


            this.starsContainer
                .appendChild(
                    star
                );

        }

    }

}