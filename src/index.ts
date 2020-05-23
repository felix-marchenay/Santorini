import { Mesh, Scene, Engine } from 'babylonjs';
import vue from 'vue';
import App from './template/App.vue';

const engine: Engine = new Engine(<HTMLCanvasElement>document.getElementById('render'));
const scene: Scene = new Scene(engine);
const mesh: Mesh = new Mesh("lol");

console.log(mesh);

const Vue: vue = new vue({
    render: h => h(App),
}).$mount('#gui');