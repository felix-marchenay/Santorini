import { Stepper } from "../src/Infrastructure/Stepper";
import { StepGroup } from "../src/Infrastructure/StepGroup";
import { ErrorAfterN } from "./Mocks/ErrorAfterN";
import { FakeStep } from "./Mocks/FakeStep";

describe("Stepper", () => {
    describe("Création du stepper", () => {
        let stepper = new Stepper;
        let count = {count: 0};

        stepper.addSteps(new FakeStep(count));
        stepper.addSteps(new FakeStep(count));

        it ("doit attendre 2 x 60ms", async () => {
            await stepper.run();

            expect(count.count).toBe(2);
        });

        it ("doit attendre et opérer la collection", async () => {
            let count = {count: 0};

            stepper.addSteps(new StepGroup(
                [new FakeStep(count)],
                false
            ));

            await stepper.run();

            expect(count.count).toBe(1);
        });

        it ("doit tourner 3 fois avant de lacher une exception", async () => {
            let count = {count: 0};

            stepper = new Stepper(
                [new StepGroup(
                    [new FakeStep(count), new FakeStep(count), new ErrorAfterN],
                    true
                )]
            );

            try {
                await stepper.run();
            } catch (e) {
                expect(e).toBe('rejected');
            }
            
            expect(count.count).toBe(6);
        });
    });
});