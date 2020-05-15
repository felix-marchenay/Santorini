import { Divinite } from "./Divinite";

export class Demeter extends Divinite
{
    constructor() {
        super();
        this.name = 'Demeter';
        this.slug = 'demeter';
        this.description = "Peut construire une deuxième fois, mais pas sur la même case";
    }
}