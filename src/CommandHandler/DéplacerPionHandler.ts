import { CommandHandler } from "../Infrastructure/Command";
import { DéplacerPion } from "../Command/DéplacerPion";

export class DéplacerPionHandler implements CommandHandler
{
    execute (command: DéplacerPion) {
        command.joueur.posePion(command.pion, command.caze);
        command.jeu.sendServer('deplacerPion', command.pion.export());
    }
}