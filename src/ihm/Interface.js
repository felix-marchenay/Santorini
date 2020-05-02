import { Emitter } from "../infrastructure/emitter";

export class Interface 
{
    constructor() {
        this.emitter = new Emitter;

        document.querySelector('[name=valider]').addEventListener('click', btn => {
            this.emitter.emit('namesPicked', [
                document.querySelector('[name=p1]').value,
                document.querySelector('[name=p2]').value
            ]);
        });
    }

    show(step) {
        document.querySelectorAll('[step]').forEach(elm => elm.style.display = "none");
        document.querySelector('[step='+step+']').style.display = 'block';
    }

    hide (step) {
        document.querySelector('[step='+step+']').style.display = "none";
    }

    resume(name, action) {
        document.querySelector('[step=tour] .name').innerHTML = name;
        document.querySelector('[step=tour] .action').innerHTML = action;
    }

    info(str) {
        document.querySelector('[step=info]').innerHTML = str;
    }

    victory(joueur) {
        document.querySelector('[step=victory] .name').innerHTML = joueur.name;
    }

    error(error) {
        document.querySelector('.errors').innerHTML = error;
        setTimeout(() => {
            document.querySelector('.errors').innerHTML = '';
        }, 2500);
    }
}
