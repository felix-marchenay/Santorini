export interface infosJoueur {
    name: string;
    order: number;
    divinite: string,
    type: 'ia' | 'humain' | 'distant',
    id: string,
    pionsIds: string[]
}