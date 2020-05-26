export class Joueur
{
    constructor (public name: string) {}

    public static fromInfos(infos: {name: string}): Joueur
    {
        return new Joueur(infos.name);
    }
}