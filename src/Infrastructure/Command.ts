import { DéplacerPionHandler } from "../CommandHandler/DéplacerPionHandler";
import { ConstruireHandler } from "../CommandHandler/ConstruireHandler";
import { ConstruireSousLePion } from "../Command/ConstruireSousLePion";
import { ConstruireSousLePionHandler } from "../CommandHandler/ConstruireSousLePionHandler";

export interface Command {}

export interface CommandHandler {
    execute (command: Command): void;
}

export class CommandBus {

    private commands: Map<string, CommandHandler> = new Map;

    constructor () {
        this.commands.set('DéplacerPion', new DéplacerPionHandler);
        this.commands.set('Construire', new ConstruireHandler);
        this.commands.set('ConstruireSousLePion', new ConstruireSousLePionHandler);
    }

    execute (...commands: Command[]) {
        commands.forEach(command => {
            this.commands.forEach((handler, key) => {
                if (command.constructor.name === key) {
                    handler.execute(command);
                }
            });
        })
    }
}