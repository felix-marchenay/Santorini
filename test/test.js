import Game from '../src/Game';
import { Scene } from '@babylonjs/core';
import { Engine } from 'babylonjs';
var assert = require("assert");

describe("Deplacement", function() {

    it("Construction de l'objet Game", function() {
        // assert.equal([1, 2, 3].indexOf(4), -1);

        const engine = new Engine();
        const scene = new Scene(engine);
        const game = new Game(scene);
    });

});
