import { Jeu } from "../Model/Jeu";
import { Case } from "../Model/Case";

export class Construire
{
    constructor (
        public readonly jeu: Jeu,
        public readonly caze: Case
    ) {}
}