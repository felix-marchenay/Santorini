import { Stepper } from "../src/Infrastructure/Stepper";
import { WaitStep } from "./Mocks/WaitStep";
import { StepGroup } from "../src/Infrastructure/StepGroup";
import { ErrorAfterN } from "./Mocks/ErrorAfterN";

describe("Stepper", () => {
    describe("Création du stepper", () => {
        let stepper = new Stepper;

        stepper.addSteps(new WaitStep);
        stepper.addSteps(new WaitStep);

        it ("doit attendre 2 x 60ms", async () => {
            const date = new Date();
            await stepper.run();

            expect((new Date).getTime() - date.getTime()).toBeGreaterThanOrEqual(118);
            expect((new Date).getTime() - date.getTime()).toBeLessThanOrEqual(130);
        });

        it ("doit attendre et opérer la collection", async () => {
            const date = new Date();

            stepper.addSteps(new StepGroup(
                [new WaitStep],
                false
            ));

            await stepper.run();

            expect((new Date).getTime() - date.getTime()).toBeGreaterThanOrEqual(178);
            expect((new Date).getTime() - date.getTime()).toBeLessThanOrEqual(190);
        });

        it ("doit tourner 3 fois avant de lacher une exception", async () => {
            stepper = new Stepper(
                [new StepGroup(
                    [new WaitStep, new WaitStep, new ErrorAfterN],
                    true
                )]
            );
            const date = new Date();

            try {
                await stepper.run();
            } catch (e) {
                expect(e).toBe('rejected');
            }

            expect((new Date).getTime() - date.getTime()).toBeGreaterThanOrEqual(358);
            expect((new Date).getTime() - date.getTime()).toBeLessThanOrEqual(380);
        });
    });
});