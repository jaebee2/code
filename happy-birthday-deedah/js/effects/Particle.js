/******************************************************************************
 * File Name : Particle.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama
 * Purpose   : Represents one firework particle.
 ******************************************************************************/

export default class Particle {

    /**
     * Constructor.
     */
    constructor(x, y, color) {

        // Starting position.
        this.x = x;
        this.y = y;

        // Explosion direction.
        this.angle = Math.random() * Math.PI * 2;

        // Explosion speed.
        this.speed = Math.random() * 8 + 2;

        // Velocity.
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;

        // Gravity.
        this.gravity = 0.08;

        // Friction.
        this.friction = 0.985;

        // Size.
        this.radius = Math.random() * 3 + 1;

        // Transparency.
        this.alpha = 1;

        // Fade speed.
        this.fade = Math.random() * 0.015 + 0.008;

        // Colour.
        this.color = color;

    }

    /**
     * Update particle.
     */
    update() {

        this.vx *= this.friction;

        this.vy *= this.friction;

        this.vy += this.gravity;

        this.x += this.vx;

        this.y += this.vy;

        this.alpha -= this.fade;

    }

    /**
     * Draw particle.
     */
    draw(ctx) {

        ctx.save();

        ctx.globalAlpha = this.alpha;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = this.color;

        ctx.shadowColor = this.color;

        ctx.shadowBlur = 12;

        ctx.fill();

        ctx.restore();

    }

}