import { CommandHandler } from "../Infrastructure/Command";
import { Construire } from "../Command/Construire";

export class ConstruireSousLePionHandler implements CommandHandler
{
    execute (command: Construire) {
        command.caze.construireSousLePion();
        command.jeu.sendServer('construireSousLePion', command.caze.export());
    }
}