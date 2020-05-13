import { Divinite } from "./Divinite";

export class NoDivinite extends Divinite
{
    constructor() {
        super();
        this.name = 'Sans divinité';
        this.slug = 'no';
    }
}