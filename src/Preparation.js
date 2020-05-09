import { Interface } from "./ihm/Interface";

export class Preparation
{
    /**
     * 
     * @param {Interface} ihm  
     */
    constructor(ihm) {
        this.ihm = ihm;
    }

    launch() {
        this.ihm.unsplash();
        this.ihm.show('main-menu');
    }
}