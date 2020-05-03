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

import {
    NormalMaterial
} from "@babylonjs/materials";

import { Game } from "./game";

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
    });
    MeshBuilder.CreateLines("axisY", {
        points: [
            new Vector3(0, -10, 0), 
            new Vector3(0, 20, 0)
        ],
        colors: [
            new Color4(0.1, 0.8, 0.2), 
            new Color4(0.2, 0.8, 0.2)
        ]
    });
    MeshBuilder.CreateLines("axisZ", {
        points: [
            new Vector3(0, 0, -10), 
            new Vector3(0, 0, 20)
        ],
        colors: [
            new Color4(0.2, 0.2, 0.9), 
            new Color4(0.2, 0.2, 0.9)
        ]
    });
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
        });
        MeshBuilder.CreateLines("axisY", {
            points: [
                new Vector3(-1, i, 0), 
                new Vector3(1, i, 0)
            ],
            colors: [
                new Color4(0.1, 0.8, 0.2), 
                new Color4(0.2, 0.8, 0.2)
            ]
        });
        MeshBuilder.CreateLines("axisZ", {
            points: [
                new Vector3(-1, 0, i), 
                new Vector3(1, 0, i)
            ],
            colors: [
                new Color4(0.2, 0.2, 0.9), 
                new Color4(0.2, 0.2, 0.9)
            ]
        });
    }
}

export function info(string) {
    document.getElementById('info').textContent = string;
}

const canvas = document.getElementById("render");
const engine = new Engine(canvas);
var scene = new Scene(engine);

SceneLoader.LoadAssetContainer("./models/", "santorini3.babylon", scene, function(container) {
    scene.container = container;
    
    var camera = new ArcRotateCamera("camera", .05, .7, 20, Vector3.Zero(), scene);
    
    camera.attachControl(canvas, true);
    
    const lightPosition1 = new Vector3(-6, 15, 15);
    var light1 = new HemisphericLight("light", lightPosition1, scene);
    light1.intensity = 0.45;
    const lightBox = MeshBuilder.CreateBox("lightBox", {}, scene);
    lightBox.position = lightPosition1;
    
    const lightPosition2 = new Vector3(20, 35, 4);
    var light2 = new HemisphericLight("light", lightPosition2, scene);
    light2.intensity = 0.33;
    const lightBox2 = MeshBuilder.CreateBox("lightBox", {}, scene);
    lightBox2.position = lightPosition2;
    
    const game = new Game(scene);
    
    game.play();
    
    // drawAxis(scene);
    
    // Render every frame
    engine.runRenderLoop(() => {
        scene.render();
    });
});