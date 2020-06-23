import { CommandHandler } from "../Infrastructure/Command";
import { Construire } from "../Command/Construire";

export class ConstruireHandler implements CommandHandler
{
    execute (command: Construire) {
        command.caze.construire();
        command.jeu.sendServer('construire', command.caze.export());
    }
}