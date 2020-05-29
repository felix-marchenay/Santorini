import { Construction } from "./Construction";

export class ConstructionCollection
{
    private elements: Array<Construction> = [];

    add (construction: Construction): void {
        if (this.has(construction)) {
            throw construction.niveau + ' est déjà dedans';
        }

        this.elements.push(construction);
    }

    private has(construction: Construction): boolean {
        return this.elements.find(c => c.niveau === construction.niveau) !== undefined;
    }

    get niveau (): number {
        if (this.elements.length === 0) {
            return 0;
        }

        return Math.max(...this.elements.map(c => c.niveau));
    }

    get dernierEtage (): Construction | null {
        return this.elements.reduce((last: Construction | null, item: Construction) => {
            if (last === null || last.niveau < item.niveau) {
                last = item;
                return last;
            }

            return last;
        }, null);
    }

    complet (): boolean {
        return this.elements.length === 4;
    }

    aUnDome (): boolean {
        return this.elements.find(el => el.estUnDome() === true) !== undefined;
    }

    construire (construction: Construction): void {
        this.add(construction);
    }
}