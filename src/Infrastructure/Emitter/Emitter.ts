export interface EmitterListener {
    (...vars: any[]): void;
}

export interface ListenerCollection {
    [key: string]: Array<EmitterListener>;
}

export interface EmitterInterface {
    on (event: string, f: EmitterListener): EmitterListener;
    emit (event: string, ...vars: any[]): void;
}

export class Emitter implements EmitterInterface
{
    private listeners: ListenerCollection = {};

    on (event: string, f: EmitterListener): EmitterListener {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(f);

        return f;
    }

    off (event: string, f: EmitterListener): void {
        if (this.listeners[event] === undefined) {
            return;
        }
        
        this.listeners[event].forEach((fn, i) => {
            if (f === fn) {
                delete this.listeners[event][i];
            }
        });
    }

    emit (event: string, ...vars: any[]): void {
        if (this.listeners[event]) {
            this.listeners[event].forEach(f => f(...vars));
        }
    }

    flush (): void {
        this.listeners = {};
    }
}