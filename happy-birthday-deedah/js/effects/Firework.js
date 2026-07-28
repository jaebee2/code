/******************************************************************************
 * File Name : Firework.js
 * Project   : Happy Birthday My Deedah ❤️
 * Author    : Jibril Bulama
 * Purpose   : Represents one firework rocket.
 ******************************************************************************/

// Import the particle.
import Particle from "./Particle.js";

/**
 * Firework
 */
export default class Firework{

    /**
     * Constructor.
     */
    constructor(canvasWidth,canvasHeight){

        /**********************************************************************
         * START POSITION
         *********************************************************************/

        this.x=Math.random()*canvasWidth;

        this.y=canvasHeight+20;
       

        /**********************************************************************
         * TARGET
         *********************************************************************/

        this.targetY=Math.random()*(canvasHeight*0.45)+80;

        /**********************************************************************
         * SPEED
         *********************************************************************/

        this.speed=6+Math.random()*4;

        /**********************************************************************
         * STATE
         *********************************************************************/

        this.exploded=false;
        /**********************************************************************
        * ROCKET TRAIL
        *********************************************************************/

        this.trail = [];

        /**********************************************************************
         * PARTICLES
         *********************************************************************/

        this.particles=[];

        /**********************************************************************
         * COLOUR
         *********************************************************************/

        const colours=[
            "#FFD700",
            "#ff4d6d",
            "#00e5ff",
            "#ffffff",
            "#ff8c00",
            "#ff00ff",
            "#7CFC00"
        ];

        this.color=colours[Math.floor(Math.random()*colours.length)];
        /**********************************************************************
 * FIREWORK TYPE
 *********************************************************************/

const random = Math.random();

if (random < 0.70) {

    this.type = "normal";

}
else if (random < 0.90) {

    this.type = "willow";

}
else {

    this.type = "heart";

}

    }

    /**
     * Update.
     */
    update(){

        /**********************************************************************
         * ROCKET ASCENDING
         *********************************************************************/

        if(!this.exploded){
            /**********************************************************************
 * SAVE TRAIL POSITION
 *********************************************************************/

this.trail.push({

    x: this.x,

    y: this.y

});

/**********************************************************************
 * LIMIT TRAIL LENGTH
 *********************************************************************/

if (this.trail.length > 15) {

    this.trail.shift();

}

            this.y-=this.speed;

            if(this.y<=this.targetY){

                this.explode();

            }

        }

        /**********************************************************************
         * UPDATE PARTICLES
         *********************************************************************/

        this.particles=this.particles.filter((particle)=>{

            particle.update();

            return particle.alpha>0;

        });

    }

    /**
     * Explosion.
     */
   /**
 * Explosion.
 */
explode(){

    this.exploded = true;

    switch(this.type){

        case "heart":

            this.createHeartExplosion();
            break;

        case "willow":

            this.createWillowExplosion();
            break;

        default:

            this.createNormalExplosion();

    }

}
/**
 * Standard Firework Explosion.
 */
createNormalExplosion(){

    const count = 180 + Math.floor(Math.random()*120);

    for(let i = 0; i < count; i++){

        this.particles.push(

            new Particle(

                this.x,

                this.y,

                this.color

            )

        );

    }

}
/**
 * Heart Explosion.
 */
createHeartExplosion(){

    const count = 220;

    for(let i = 0; i < count; i++){

        const t = (Math.PI * 2 * i) / count;

        const x = 16 * Math.pow(Math.sin(t),3);

        const y =
            13*Math.cos(t)
            -5*Math.cos(2*t)
            -2*Math.cos(3*t)
            -Math.cos(4*t);

        const particle = new Particle(

            this.x,

            this.y,

            "#ff4d88"

        );

        particle.vx = x * 0.35;

        particle.vy = -y * 0.35;

        particle.radius = 3;

        this.particles.push(particle);

    }

}
/**
 * Golden Willow Firework.
 */
createWillowExplosion(){

    const count = 260;

    for(let i = 0; i < count; i++){

        const particle = new Particle(

            this.x,

            this.y,

            "#FFD700"

        );

        particle.speed *= 0.6;

        particle.gravity = 0.03;

        particle.fade = 0.006;

        particle.radius = 3;

        this.particles.push(particle);

    }

}
    /**
     * Draw.
     */
    draw(ctx){
        /**********************************************************************
 * DRAW ROCKET TRAIL
 *********************************************************************/

for (let i = 0; i < this.trail.length; i++) {

    const point = this.trail[i];

    const alpha = i / this.trail.length;

    ctx.save();

    ctx.globalAlpha = alpha * 0.6;

    ctx.beginPath();

    ctx.arc(

        point.x,

        point.y,

        2,

        0,

        Math.PI * 2

    );

    ctx.fillStyle = this.color;

    ctx.shadowColor = this.color;

    ctx.shadowBlur = 10;

    ctx.fill();

    ctx.restore();

}

        /**********************************************************************
         * DRAW ROCKET
         *********************************************************************/

        if(!this.exploded){

            ctx.beginPath();

            ctx.arc(

                this.x,

                this.y,

                4,

                0,

                Math.PI*2

            );

            ctx.fillStyle=this.color;

            ctx.shadowColor=this.color;

            ctx.shadowBlur=35;

            ctx.fill();

        }

        /**********************************************************************
         * DRAW PARTICLES
         *********************************************************************/

        this.particles.forEach((particle)=>{

            particle.draw(ctx);

        });

    }

    /**
     * Finished?
     */
    isFinished(){

        return this.exploded && this.particles.length===0;

    }

}