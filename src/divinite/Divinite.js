import { Deplacement } from "../steps/Deplacement";
import { Construction } from "../steps/Construction";

export class Divinite
{
    constructor(name) {
        this.name = name;
    }

    getDeplacementStep (game, joueur) {
        return new Deplacement(game, joueur);
    }

    getConstructionStep (game, joueur) {
        return new Construction(game, joueur);
    }

    isVictorious(pion) {
        return pion.case.niveau() == 3;
    }
}

Divinite.fromString = function(string) {
    console.log(window[string]);
    return '(';
    // return ({
    //     pan: new Pan,
    //     atlas: new Atlas,
    //     athena: new Athena
    // })[string];
};