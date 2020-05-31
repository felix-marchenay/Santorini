import { Normalizer } from "./Normalizer";
import { Joueur } from "../Model/Joueur";

export class JoueurNormalizer implements Normalizer
{
    normalize(joueur: Joueur) {
        return {
            name: joueur.name,
            id: joueur.id,
            divinite: {
                name: 'slug',
                slug: 'atlas',
                description: 'aze'
            }
        };
    }
}