import { Divinite } from "./Divinite";
import { ApollonDeplacement } from "../steps/divinite/apollon/ApollonDeplacement";

export class Apollon extends Divinite
{
    constructor() {
        super();
        this.name = 'Apollon';
        this.slug = 'apollon';
        this.description = "Échangez la position d'un de vos Ouvriers avec celui d'un adversaire adjacent et au maximum à 1 niveau plus élevé que le vôtre.";
    }

    getDeplacementStep (game, joueur) {
        return [new ApollonDeplacement(game, joueur)];
    }
}