export class Stepper
{
    constructor(...steps) {
        this.steps = steps;
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
        for(let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            if (Array.isArray(step)) {
                if (step.isInfinite) {
                    while(1) {
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
    }

    async cycle (step) {
        console.log(step);
        await step.run();
        if (typeof step.after === 'function') {
            step.after();
        }
    }
}