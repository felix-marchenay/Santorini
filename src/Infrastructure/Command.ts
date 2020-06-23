import { DéplacerPionHandler } from "../CommandHandler/DéplacerPionHandler";

export interface Command {}

export interface CommandHandler {
    execute (command: Command): void;
}

export class CommandBus {

    private commands: Map<string, CommandHandler> = new Map;

    constructor () {
        this.commands.set('DéplacerPion', new DéplacerPionHandler);
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