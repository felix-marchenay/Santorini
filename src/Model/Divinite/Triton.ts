import { Divinite } from "./Divinite";
import { DeplacementTriton } from "../../Steps/Deplacement/DeplacementTriton";
import { Jeu } from "../Jeu";
import { Joueur } from "../Joueur";

export class Triton extends Divinite
{
    public readonly name = "Triton";
    public readonly slug = "triton";
    public readonly description = "À chaque fois que votre ouvrier se déplace sur une case du périmètre, il peut se déplacer à nouveau";

    getDeplacementStep(jeu: Jeu, joueur: Joueur) {
        return new DeplacementTriton(jeu, joueur);
    }
}