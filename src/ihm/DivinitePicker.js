import { Emitter } from "../infrastructure/emitter";

export class DivinitePicker
{
    constructor() {
        this.divinites = {
            athena: {
                name: 'Athéna',
                image: 'image/divinite/athena.jpg'
            },
            demeter: {
                name: 'Demeter',
                image: 'image/divinite/demeter.jpg'
            },
            atlas: {
                name: 'Atlas',
                image: 'image/divinite/atlas.jpg'
            },
            no: {
                name: 'Aucune',
                image: 'image/divinite/no.jpg'
            },
            pan: {
                name: 'Pan',
                image: 'image/divinite/pan.jpg'
            },
            poseidon: {
                name: 'Athéna',
                image: 'image/divinite/demeter.jpg'
            }
        };

        this.emitter = new Emitter;

        document.querySelectorAll('.players .player').forEach(el => {
            el.querySelector('.divinite > img').addEventListener('click', () => {
                this.open(el);
            });

            el.querySelectorAll('.pick-divinite .proposal').forEach(elDivinite => {
                elDivinite.addEventListener('click', () => this.select(elDivinite));
            });
        });
    }

    open(el) {
        el.querySelector('.pick-divinite').classList.add('active');
    }

    close() {
        document.querySelectorAll('.pick-divinite').forEach(el => el.classList.remove('active'));
    }

    select(divinite) {
        this.emitter.emit('picked', this.divinites[divinite.getAttribute('name')]);
        
        this.close();
    }
}