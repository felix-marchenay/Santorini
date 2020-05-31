import { Construction } from "./Construction";

export class ConstructionCollection
{
    private elements: Array<Construction> = [];

    get niveau (): number {
        return Math.max(0, ...this.elements.map(c => c.niveau));
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

    add (construction: Construction): void {
        if (!this.dernierEtage && construction.niveau !== 1) {
            throw "Il faut construire un etage 1 en premier";
        }

        if (this.dernierEtage && this.dernierEtage.prochainNiveau !== construction.niveau)  {
            throw "Il faut construire dans l'ordre";
        }

        if (this.dernierEtage && this.dernierEtage.estUnDome) {
            throw "Impossible de construire sur un dôme";
        }

        this.elements.push(construction);
    }

    removeLast () {
        if (!this.dernierEtage) {
            return;
        }

        this.dernierEtage.dispose();
        this.elements = [...this.elements.filter(el => el !== this.dernierEtage)];
    }

    get complet (): boolean {
        return this.elements.length === 4;
    }

    get aUnDome (): boolean {
        return this.elements.find(el => el.estUnDome === true) !== undefined;
    }

    enableClickable() {
        this.elements.forEach(etage => {
            etage.enableClickable();
        });
    }

    disableClickable() {
        this.elements.forEach(etage => {
            etage.disableClickable();
        });
    }
}