export class Emitter
{
    constructor() {
        this.listeners = [];
    }

    on (event, f) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(f);

        return f;
    }

    off (event, f) {
        if (this.listeners[event] === undefined) {
            return;
        }
        
        this.listeners[event].forEach((fn, i) => {
            if (f === fn) {
                delete this.listeners[event][i];
            }
        });
    }

    emit (event, ...vars) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(f => f(...vars));
        }
    }

    flush () {
        this.listeners = [];
    }
}