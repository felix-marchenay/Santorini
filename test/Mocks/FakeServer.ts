import { EmitterListener, Emitter } from "../../src/Infrastructure/Emitter/Emitter";
import { ServerInterface } from "../../src/ServerInterface";

export class FakeServer implements ServerInterface {

    private emitter = new Emitter;

    action (ev: string, ...data: any): void {
        // if (ev === '')
        ev; data;
    }

    connect () {
        return new Promise<null>(resolve => resolve());
    }

    /**
     * Emitter
     */
    emit(event: string, data: any) {
        this.emitter.emit(event, data);    
    }

    on (event: string, f: EmitterListener): EmitterListener {
        return this.emitter.on(event, f);
    }

    off (event: string, f: EmitterListener): void {
        return this.emitter.off(event, f);
    }

    flush (): void {
        this.emitter.flush();
    }
}