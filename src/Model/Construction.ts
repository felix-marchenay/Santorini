import { EmitterInterface } from "../Infrastructure/Emitter/Emitter";

export interface Construction extends EmitterInterface
{
    niveau: number;
    prochainNiveau: number;
    estUnDome(): boolean;
    minimumY: number;
}