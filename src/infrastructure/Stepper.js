import { Victoire } from "../Victoire";

export class Stepper
{
    constructor(...steps) {
        this.steps = steps;
        this.nbTours = 0;
    }

    addSteps(...steps) {
        steps.forEach(step => {
            this.steps.push(step);
        });
    }

    addInfiniteSubsetSteps (...steps) {
        steps.isInfinite = true;
        this.steps.push(steps);
    }

    async run () {
        try {
            for(let i = 0; i < this.steps.length; i++) {
                const step = this.steps[i];
                if (Array.isArray(step)) {
                    if (step.isInfinite) {
                        while(1) {
                            this.nbTours++;
                            for(let si = 0; si < step.length; si++) {
                                await this.cycle(step[si]);
                            }
                        }
                    } else {
                        for(let si = 0; si < step.length; si++) {
                            await this.cycle(step[si]);
                        }
                    }
                } else {
                    if (step.isInfinite) {
                        while(1) {
                            await this.cycle(step);
                        }
                    } else {
                        await this.cycle(step);
                    }
                }
            };
        } catch (e) {
            if (e instanceof Victoire) {
                console.log('en : ', this.nbTours, ' pour ', e.joueur.name);
                throw new Victoire(e.joueur, this.nbTours);
            } else {
                console.error(e);
            }
        }
    }

    async cycle (step) {
        console.log(step);

        await step.run();
        if (typeof step.after === 'function') {
            step.after();
        }
    }
}