import * as chai from 'chai';
import { Emitter } from '../../src/Infrastructure/Emitter/Emitter';

describe("Emitter", () => {
    describe("Emit", () => {
        it("Devrait enregistrer un évenement", () => {
            chai.should();

            let emitter = new Emitter;

            let call = 0;
            let fn = function() {
                call++;
            }

            let result = emitter.on('eventz', fn);
            emitter.emit('eventz');

            chai.expect(call).to.equal(1);
            result.should.be.a('function');
        })
    });

    describe("Emit multiple", () => {
        it("Devrait enregistrer un évenement plusieurs fois", () => {
            chai.should();

            let emitter = new Emitter;

            let call = 0;
            let fn = function() {
                call++;
            }

            let result = emitter.on('eventz', fn);
            let result2 = emitter.on('eventz', fn);

            emitter.emit('eventz');
            emitter.emit('eventz');
            emitter.emit('eventz');
            emitter.emit('eventz');
            emitter.emit('eventz');

            chai.expect(call).to.equal(10);
            result.should.be.a('function');
            result2.should.be.a('function');

            result.should.equal(result2);
        })
    });

    describe("Emit le mauvais", () => {
        it("Ne devrait pas appeller l'évenement", () => {
            chai.should();

            let emitter = new Emitter;

            let call = 0;
            let fn = function() {
                call++;
            }
            
            let result = emitter.on('eventz', fn);
            emitter.emit('Nope');

            chai.expect(call).to.equal(0);
            result.should.be.a('function');
        })
    });

    describe("Retirer un évenement", () => {
        it("L'évenement ne doit pas être appellé", () => {
            chai.should();

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

            chai.expect(call).to.equal(1);
        });
    });

    describe("Retirer tous les évenements", () => {
        it("L'évenement ne doit pas être appellé", () => {
            chai.should();

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

            chai.expect(call).to.equal(0);
        });
    });
});