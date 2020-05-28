import { Stepper } from "../src/Infrastructure/Stepper";
import { WaitStep } from "./Mocks/WaitStep";

describe("Stepper", () => {
    describe("Création du stepper", () => {
        let stepper = new Stepper;

        stepper.addSteps(new WaitStep);
        stepper.addSteps(new WaitStep);

        it ("doit attendre", async () => {
            const date = new Date();
            await stepper.run();

            expect((new Date).getTime() - date.getTime()).toBeGreaterThan(120);
        });
    });
});