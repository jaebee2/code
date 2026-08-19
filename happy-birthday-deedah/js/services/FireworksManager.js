/******************************************************************************
 * File Name : FireworksManager.js
 ******************************************************************************/

import Firework from "../effects/Firework.js";

export default class FireworksManager {

    constructor() {

        this.canvas = document.getElementById("fireworks-canvas");

        this.ctx = this.canvas.getContext("2d");

        this.fireworks = [];

        this.running = false;

        this.stopTimer = null;

        this.resize();

        window.addEventListener(
            "resize",
            () => this.resize()
        );

    }

    /**
     * Resize canvas.
     */
    resize() {

        this.canvas.width = window.innerWidth;

        this.canvas.height = window.innerHeight;

    }

    /**
     * Start fireworks.
     * Fireworks automatically stop after 10 seconds.
     */
    start() {

        // Prevent starting multiple animation loops
        if (this.running) {
            return;
        }

        this.running = true;

        // Start launching fireworks
        this.launchLoop();

        // Start animation
        this.animate();

        // Automatically stop after 10 seconds
        this.stopTimer = setTimeout(() => {

            this.stop();

        }, 10000);

    }

    /**
     * Launch rockets.
     */
    launchLoop() {

        if (!this.running) {

            return;

        }

        this.fireworks.push(

            new Firework(
                this.canvas.width,
                this.canvas.height
            )

        );

        const delay = 250 + Math.random() * 700;

        setTimeout(

            () => this.launchLoop(),

            delay

        );

    }

    /**
     * Animation.
     */
    animate() {

        if (!this.running) {

            return;

        }

        this.ctx.clearRect(

            0,
            0,
            this.canvas.width,
            this.canvas.height

        );

        this.fireworks.forEach((firework) => {

            firework.update();

            firework.draw(this.ctx);

        });

        this.fireworks = this.fireworks.filter((firework) => {

            return !firework.isFinished();

        });

        requestAnimationFrame(

            () => this.animate()

        );

    }

    /**
     * Stop fireworks.
     */
    stop() {

        this.running = false;

        // Clear the automatic stop timer
        if (this.stopTimer) {

            clearTimeout(this.stopTimer);

            this.stopTimer = null;

        }

        // Clear remaining fireworks
        this.fireworks = [];

        // Clear canvas
        this.ctx.clearRect(

            0,
            0,
            this.canvas.width,
            this.canvas.height

        );

    }

}