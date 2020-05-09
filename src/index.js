import {
    Engine,
    Scene,
    Camera,
    Vector3,
    HemisphericLight,
    Color3,
    MeshBuilder,
    FlyCamera,
    Mesh,
    DynamicTexture,
    StandardMaterial,
    Color4,
    DirectionalLight,
    Animation,
    PointerEventTypes,
    KeyboardEventTypes,
    ArcRotateCamera,
    ShadowGenerator,
    SpotLight,
    PointLight,
    SceneLoader
} from "@babylonjs/core";

import '../public/css/style.scss';

import {
    NormalMaterial
} from "@babylonjs/materials";

import { SantoriniScene } from "./SantoriniScene";
import { Santorini } from "./Santorini";

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

export function info(string) {
    document.getElementById('info').textContent = string;
}

try {
    const santorini = new Santorini();

    santorini.ignition();
} catch (e) {
    console.error(e);
}