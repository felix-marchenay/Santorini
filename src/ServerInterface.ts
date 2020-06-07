import { EmitterInterface } from "./Infrastructure/Emitter/Emitter";

export interface ServerInterface extends EmitterInterface {
    connect (): Promise<null>;
    action (event: string, data: any): void;
}