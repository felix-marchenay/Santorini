import { EmitterInterface, Emitter, EmitterListener } from "./Infrastructure/Emitter/Emitter";

export class Server implements EmitterInterface
{
    private emitter: EmitterInterface = new Emitter;

    emit(event: string, data: any) {
        this.emitter.emit(event, data);    
    }

    on (event: string, f: EmitterListener): EmitterListener {
        return this.emitter.on(event, f);
    }
}