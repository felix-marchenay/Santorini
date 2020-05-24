import { Emitter } from "./Emitter/Emitter";
import Vue from 'vue';
import App from '../Template/App.vue';

export class Interface
{
    public emitter: Emitter = new Emitter();
    private vue: Vue;
    private transitOutEvents: Array<string> = [
        'roomSearch', 'skip', 'refreshPlayer', 'switchAtlasMode',
        'replay', 'mainMenu', 'quitRoom'
    ];

    constructor() {
        this.vue = new Vue({
            render: h => h(App)
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
}