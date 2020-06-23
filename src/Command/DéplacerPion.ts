import { Command } from "../Infrastructure/Command";
import { Pion } from "../Model/Pion";
import { Case } from "../Model/Case";
import { Joueur } from "../Model/Joueur";
import { Jeu } from "../Model/Jeu";

export class DéplacerPion implements Command
{
    constructor (
        public readonly pion: Pion,
        public readonly caze: Case,
        public readonly joueur: Joueur,
        public readonly jeu: Jeu
    ) {}
}