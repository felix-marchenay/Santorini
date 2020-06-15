import { Divinite } from "./Divinite";
import { Atlas } from "./Atlas";
import { No } from "./No";
import { Triton } from "./Triton";
import { Zeus } from "./Zeus";
import { Minotaur } from "./Minotaur";

export class DiviniteFactory {
    
    static build (slug: string): Divinite {
        switch (slug) {
            case 'atlas' :
                return new Atlas;
            case 'triton' :
                return new Triton;
            case 'zeus' :
                return new Zeus;
            case 'no' :
                return new No;
            case 'minotaur' :
                return new Minotaur;
            default :
                throw "Divinité "+ slug +" inconnue"
        }
    }
}