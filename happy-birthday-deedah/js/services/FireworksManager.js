/******************************************************************************
 * File Name : FireworksManager.js
 ******************************************************************************/

import Firework from "../effects/Firework.js";

export default class FireworksManager{

    constructor(){

        this.canvas=document.getElementById("fireworks-canvas");

        this.ctx=this.canvas.getContext("2d");

        this.fireworks=[];

        this.running=false;

        this.resize();

        window.addEventListener(

            "resize",

            ()=>this.resize()

        );

    }

    /**
     * Resize canvas.
     */
    resize(){

        this.canvas.width=window.innerWidth;

        this.canvas.height=window.innerHeight;

    }

    /**
     * Start.
     */
    start(){

        this.running=true;

        this.launchLoop();

        this.animate();

    }

    /**
     * Launch rockets.
     */
    launchLoop(){

        if(!this.running){

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

        ()=>this.launchLoop(),

        delay

    );

    }

    /**
     * Animation.
     */
    animate(){

        if(!this.running){

            return;

        }

        this.ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

        this.fireworks.forEach((firework)=>{

            firework.update();

            firework.draw(this.ctx);

        });

        this.fireworks=this.fireworks.filter((firework)=>{

            return !firework.isFinished();

        });

        requestAnimationFrame(

            ()=>this.animate()

        );

    }

    /**
     * Stop.
     */
    stop(){

        this.running=false;

    }

}