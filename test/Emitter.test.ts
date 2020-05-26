import { Emitter } from '../src/Infrastructure/Emitter/Emitter';

describe("Emitter", () => {
    describe("Emit", () => {
        it("Devrait enregistrer un évenement", () => {

            let emitter = new Emitter;

            let call = 0;
            let fn = function() {
                call++;
            }

            let result = emitter.on('eventz', fn);
            emitter.emit('eventz');
            expect(call).toEqual(1);
            expect(result).toEqual(fn);
        })
    });

    describe("Emit multiple", () => {
        it("Devrait enregistrer un évenement plusieurs fois", () => {
            let emitter = new Emitter;

            let call = 0;
            let fn = function() {
                call++;
            }

            emitter.on('eventz', fn);
            emitter.on('eventz', fn);

            emitter.emit('eventz');
            emitter.emit('eventz');
            emitter.emit('eventz');
            emitter.emit('eventz');
            emitter.emit('eventz');

            expect(call).toEqual(10);
        })
    });

    describe("Emit le mauvais", () => {
        it("Ne devrait pas appeller l'évenement", () => {
            let emitter = new Emitter;

            let call = 0;
            let fn = function() {
                call++;
            }
            
            emitter.on('eventz', fn);
            emitter.emit('Nope');

            expect(call).toBe(0);
        })
    });

    describe("Retirer un évenement", () => {
        it("L'évenement ne doit pas être appellé", () => {
            let emitter = new Emitter;

            let call = 0;
            let fn = function() {
                call++;
            }
            
            let result = emitter.on('click', fn);
            emitter.emit('click');

            emitter.off("click", result);

            emitter.emit('click');
            emitter.emit('click');

            expect(call).toBe(1);
        });
    });

    describe("Retirer tous les évenements", () => {
        it("L'évenement ne doit pas être appellé", () => {
            let emitter = new Emitter;

            let call = 0;
            let fn = function() {
                call++;
            }
            
            emitter.on('click', fn);
            emitter.on('clack', fn);

            emitter.flush();

            emitter.emit('click');
            emitter.emit('clack');

            expect(call).toBe(0);
        });
    });
});