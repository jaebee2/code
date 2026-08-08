/******************************************************************************
 * File Name : BirthdayPageManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama & ChatGPT
 * Version   : 3.0.0
 ******************************************************************************/

import TypewriterManager from "./TypewriterManager.js";

export default class BirthdayPageManager {

    constructor(screenManager) {

        this.screenManager = screenManager;

        this.typewriter = new TypewriterManager();

        // Hero
        this.heroCard = document.querySelector(".hero-card");

        // Titles
        this.mainTitle = document.getElementById("birthday-main-title");
        this.secondTitle = document.getElementById("birthday-second-title");
        this.nameTitle = document.getElementById("birthday-name");
        this.dateTitle = document.getElementById("birthday-date");

        // Button
        this.button = document.getElementById("open-letter-btn");

        // Decoration Containers
        this.heartsContainer = document.querySelector(".floating-hearts");
        this.starsContainer = document.querySelector(".floating-stars");

        this.heartsStarted = false;
        this.starsStarted = false;

    }

    /**********************************************************************
     * Show Birthday Page
     **********************************************************************/

    show() {

        this.screenManager.show("birthday");

        this.reset();

        this.startHeroAnimation();

        if (!this.starsStarted) {

            this.createStars();

            this.starsStarted = true;

        }

        if (!this.heartsStarted) {

            this.createFloatingHearts();

            this.heartsStarted = true;

        }

    }

    /**********************************************************************
     * Reset Screen
     **********************************************************************/

    reset() {

        this.heroCard.classList.remove("show");

        this.button.classList.remove("show");

        this.mainTitle.textContent = "";
        this.secondTitle.textContent = "";
        this.nameTitle.textContent = "";
        this.dateTitle.textContent = "";

    }

    /**********************************************************************
     * Hero Animation
     **********************************************************************/

    startHeroAnimation() {

        requestAnimationFrame(() => {

            this.heroCard.classList.add("show");

        });

        setTimeout(() => {

            this.typeMainTitle();

        },1000);

    }

    /**********************************************************************
     * HAPPY
     **********************************************************************/

    typeMainTitle(){

        this.typewriter.type(

            this.mainTitle,

            "🥳HBD🥳",

            100,

            ()=>{

                this.typeSecondTitle();

            }

        );

    }

    /**********************************************************************
     * BIRTHDAY
     **********************************************************************/

    typeSecondTitle(){

        this.typewriter.type(

            this.secondTitle,

            "MY DEEDAH ",

            100,

            ()=>{

                this.typeName();

            }

        );

    }

    /**********************************************************************
     * NAME
     **********************************************************************/

    typeName(){

        this.typewriter.type(

            this.nameTitle,

            " ❤️❤️❤️",

            90,

            ()=>{

                this.typeDate();

            }

        );

    }

  

    /**********************************************************************
     * Button
     **********************************************************************/

    showButton(){

        this.button.classList.add("show");

    }

    /**********************************************************************
     * Floating Hearts
     **********************************************************************/

    createFloatingHearts(){

        if(!this.heartsContainer) return;

        setInterval(()=>{

            const heart=document.createElement("div");

            heart.className="floating-heart";

            heart.innerHTML="❤️";

            heart.style.left=Math.random()*100+"%";

            heart.style.fontSize=
            (18+Math.random()*24)+"px";

            heart.style.animationDuration=
            (6+Math.random()*5)+"s";

            this.heartsContainer.appendChild(heart);

            setTimeout(()=>{

                heart.remove();

            },12000);

        },350);

    }

    /**********************************************************************
     * Stars
     **********************************************************************/

    createStars(){

        if(!this.starsContainer) return;

        for(let i=0;i<40;i++){

            const star=document.createElement("div");

            star.className="star";

            star.style.left=Math.random()*100+"%";

            star.style.top=Math.random()*100+"%";

            star.style.animationDelay=
            Math.random()*4+"s";

            this.starsContainer.appendChild(star);

        }

    }

}