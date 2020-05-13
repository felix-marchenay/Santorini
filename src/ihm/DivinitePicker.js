import { Emitter } from "../infrastructure/Emitter";

export class DivinitePicker
{
    constructor(el) {
        this.el = el;
        
        this.emitter = new Emitter;

        this.el.querySelector('.picked.img-divinite').addEventListener('click', () => {
            this.open(el);
        });

        this.el.querySelectorAll('.pick-divinite .proposal').forEach(elDivinite => {
            elDivinite.addEventListener('click', () => this.select(elDivinite));
        });
    }

    open(el) {
        el.querySelector('.pick-divinite').classList.add('active');
    }

    close() {
        document.querySelectorAll('.pick-divinite').forEach(el => el.classList.remove('active'));
    }

    select(divinite) {
        this.emitter.emit('picked', divinite.getAttribute('name'));
        this.close();
    }
}