import { Stepper } from "../src/Infrastructure/Stepper";
import { Deplacement } from "../src/Steps/no/Deplacement";

describe("Stepper", () => {
    describe("Création du stepper", () => {
        let stepper = new Stepper;

        stepper.addSteps(new Deplacement);
        stepper.addSteps(new Deplacement);

        it ("doit attendre", async () => {
            const date = new Date();
            await stepper.run();
            
        });
    });
});