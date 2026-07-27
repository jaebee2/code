/******************************************************************************
 * File Name : BackgroundManager.js
 * Project   : Happy Birthday My Deedah ❤️
 * Purpose   : Creates the animated background.
 ******************************************************************************/

export default class BackgroundManager {

    /**
     * Constructor.
     */
    constructor() {

        // Store the background layer.
      this.container = document.getElementById("background-layer");

    }

    /**
     * Build every background effect.
     */
    create() {

        this.createStars();

        this.createHearts();

        this.createParticles();

    }

    /**
     * Create stars.
     */
    createStars() {

        for(let i = 0; i < 120; i++){

            const star = document.createElement("div");

            star.className = "star";

            star.style.left = Math.random() * 100 + "%";

            star.style.top = Math.random() * 100 + "%";

            const size = Math.random() * 3 + 1;

            star.style.width = size + "px";

            star.style.height = size + "px";

            star.style.animationDelay = Math.random() * 4 + "s";

            this.container.appendChild(star);

        }

    }

    /**
     * Create floating hearts.
     */
    createHearts(){

        for(let i = 0; i < 20; i++){

            const heart = document.createElement("div");

            heart.className = "floating-heart";

            heart.innerHTML = "❤";

            heart.style.left = Math.random() * 100 + "%";

            heart.style.bottom = (-20 - Math.random() * 50) + "px";

            heart.style.fontSize = (18 + Math.random() * 20) + "px";

            heart.style.animationDelay = Math.random() * 15 + "s";

            this.container.appendChild(heart);

        }

    }

    /**
     * Create particles.
     */
    createParticles(){

        for(let i = 0; i < 80; i++){

            const particle = document.createElement("div");

            particle.className = "particle";

            particle.style.left = Math.random() * 100 + "%";

            particle.style.top = Math.random() * 100 + "%";

            particle.style.animationDelay = Math.random() * 8 + "s";

            this.container.appendChild(particle);

        }

    }

}