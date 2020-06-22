export interface Command {}

export interface CommandHandler {
    execute (command: Command): void;
    supports (command: Command): boolean;
}

export class CommandBus {

    private commands: Map<string, CommandHandler> = new Map;

    constructor () {
        
    }

    execute (command: Command) {
        this.commands.forEach(handler => {
            if (handler.supports(command)) {
                handler.execute(command);
            }
        });
    }
}