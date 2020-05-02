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

    emit (event, ...vars) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(f => f(...vars));
        }
    }

    flush () {
        this.listeners = [];
    }
}