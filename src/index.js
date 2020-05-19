import { SantoriniScene } from "./SantoriniScene";
import { Santorini } from "./Santorini";

import { Vector3, Color4, MeshBuilder } from "babylonjs";

try {
    const santorini = new Santorini();

    santorini.emitter.on('ready', () => {
        santorini.ignition();
    });
} catch (e) {
    console.error(e);
}
