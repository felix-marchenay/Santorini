import { EmitterInterface } from "./Infrastructure/Emitter/Emitter";

export interface IHMInterface extends EmitterInterface
{
    action (ev: string, ...data: any): void;
}