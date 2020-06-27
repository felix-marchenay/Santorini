import { Jeu } from "../Model/Jeu";
import { Case } from "../Model/Case";

export class ConstruireSousLePion
{
    constructor (
        public readonly jeu: Jeu,
        public readonly caze: Case
    ) {}
}