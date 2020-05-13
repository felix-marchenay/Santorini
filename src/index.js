import { SantoriniScene } from "./SantoriniScene";
import { Santorini } from "./Santorini";

import { Vector3, Color4, MeshBuilder } from "babylonjs";

function drawAxis(scene) {
    MeshBuilder.CreateLines("axisX", {
        points: [
            new Vector3(-10, 0, 0), 
            new Vector3(20, 0, 0)
        ],
        colors: [
            new Color4(0.9, 0.2, 0.2), 
            new Color4(0.9, 0.2, 0.2)
        ]
    }, scene);
    MeshBuilder.CreateLines("axisY", {
        points: [
            new Vector3(0, -10, 0), 
            new Vector3(0, 20, 0)
        ],
        colors: [
            new Color4(0.1, 0.8, 0.2), 
            new Color4(0.2, 0.8, 0.2)
        ]
    }, scene);
    MeshBuilder.CreateLines("axisZ", {
        points: [
            new Vector3(0, 0, -10), 
            new Vector3(0, 0, 20)
        ],
        colors: [
            new Color4(0.2, 0.2, 0.9), 
            new Color4(0.2, 0.2, 0.9)
        ]
    }, scene);
    for (let i = 1; i <= 20; i++) {
        MeshBuilder.CreateLines("axisX", {
            points: [
                new Vector3(i, 0, -1), 
                new Vector3(i, 0, 1)
            ],
            colors: [
                new Color4(0.9, 0.2, 0.2), 
                new Color4(0.9, 0.2, 0.2)
            ]
        }, scene);
        MeshBuilder.CreateLines("axisY", {
            points: [
                new Vector3(-1, i, 0), 
                new Vector3(1, i, 0)
            ],
            colors: [
                new Color4(0.1, 0.8, 0.2), 
                new Color4(0.2, 0.8, 0.2)
            ]
        }, scene);
        MeshBuilder.CreateLines("axisZ", {
            points: [
                new Vector3(-1, 0, i), 
                new Vector3(1, 0, i)
            ],
            colors: [
                new Color4(0.2, 0.2, 0.9), 
                new Color4(0.2, 0.2, 0.9)
            ]
        }, scene);
    }
}

try {
    const santorini = new Santorini();

    santorini.emitter.on('ready', () => {
        santorini.ignition();
    });
} catch (e) {
    console.error(e);
}
