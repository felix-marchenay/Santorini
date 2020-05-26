import { Emitter, EmitterInterface, EmitterListener } from "./Infrastructure/Emitter/Emitter";
import Vue from 'vue';
import { VueConstructor } from "vue/types/umd";

export class Interface implements EmitterInterface
{
    public emitter: Emitter = new Emitter();
    private vue: Vue;
    private transitOutEvents: Array<string> = [
        'roomSearch', 'skip', 'refreshPlayer', 'switchAtlasMode',
        'replay', 'mainMenu', 'quitRoom', 'goSingleplayer'
    ];

    constructor(app: VueConstructor) {
        this.vue = new Vue({
            render: h => h(app)
        }).$mount('#gui');

        this.transitOutEvents.forEach((ev: string) => {
            this.vue.$on(ev, (data: any) => {
                this.emitter.emit(ev, data);
            });
        });
    }

    action (ev: string, ...data: any): void {
        this.vue.$emit(ev, ...data);
    }

    on (event: string, f: EmitterListener): EventListener {
        return this.emitter.on(event, f);
    }

    emit (event: string, ...vars: any[]) {
        this.emitter.emit(event, ...vars);
    }
}