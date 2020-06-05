import { Construction } from "./Construction";
import { EmitterListener } from "../Infrastructure/Emitter/Emitter";
import { EtageHint } from "./EtageHint";
import { DomeHint } from "./DomeHint";

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

    get complet (): boolean {
        return this.elements.length === 4;
    }

    get aUnDome (): boolean {
        return this.elements.find(el => el.estUnDome === true) !== undefined;
    }

    private getNiveau (niveau: number): Construction | undefined {
        return this.elements.find(construction => construction.niveau === niveau);
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

    addHint (construction: EtageHint | DomeHint): void {
        this.elements.push(construction);
    }

    has (niveau: number): boolean {
        return this.elements.filter(construction => construction.niveau === niveau).length > 0;
    }

    enable (niveau: number): void {
        this.getNiveau(niveau)?.enable();
    }

    disableAll (): void {
        this.elements.forEach(construction => construction.disable);
    }

    removeLast () {
        if (!this.dernierEtage) {
            return;
        }

        this.dernierEtage.dispose();
        this.elements = [...this.elements.filter(el => el !== this.dernierEtage)];
    }

    removeAll () {
        this.elements.forEach(el => el.dispose());
        this.elements = []; 
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

    on (event: string, f: EmitterListener): Array<EventListener> {
        return this.elements.map(etage => etage.on(event, f));
    }
    
    off (event: string, f: Array<EmitterListener>): void {
        this.elements.forEach((etage, index) => {
            etage.off(event, f[index]);
        });
    }

    flush (): void {
        this.elements.forEach(el => el.flush());
    }
}