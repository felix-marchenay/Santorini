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
}