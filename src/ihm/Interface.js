import { Emitter } from "../infrastructure/emitter";
import { DivinitePicker } from "./DivinitePicker";

export class Interface 
{
    constructor() {
        this.emitter = new Emitter;
        this.divinitePicker = new DivinitePicker;

        document.querySelector('[name=valider]').addEventListener('click', btn => {
            this.emitter.emit(
                'namesPicked', 
                [...document.querySelectorAll('[step=name] input.name')].map(el => {
                    return {
                        name: el.value
                    };
                })
            );
        });
    }

    show(step) {
        document.querySelectorAll('[step]').forEach(elm => elm.style.display = "none");
        document.querySelector('[step='+step+']').style.display = 'flex';
    }

    hide (step) {
        document.querySelector('[step='+step+']').style.display = "none";
    }

    resume(joueur, action) {
        document.querySelector('[step=tour] .name').innerHTML = joueur.name + ' ('+ joueur.divinite.name +')';
        document.querySelector('[step=tour] .action').innerHTML = action;
    }

    info(str) {
        document.querySelector('[step=info]').innerHTML = str;
    }

    hideAll() {
        document.querySelector('[step]').style.display = 'none';
    }

    victory(victoire) {
        this.hideAll();
        this.show('victory');
        document.querySelector('[step=victory] .name').innerHTML = victoire.joueur.name;
    }

    error(error) {
        document.querySelector('.errors').innerHTML = error;
        setTimeout(() => {
            document.querySelector('.errors').innerHTML = '';
        }, 2500);
    }
}
