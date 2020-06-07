import { IHMInterface } from "../../src/IHMInterface";
import { EmitterListener} from '../../src/Infrastructure/Emitter/Emitter';

export class FakeInterface implements IHMInterface
{
    action (ev: string, ...data: any): void {
        ev; data;
    }

    on (event: string, f: EmitterListener): EmitterListener {
        event;
        return f;
    }

    off (event: string, f: EmitterListener): void {
        f(event);
    }
    
    emit (event: string, ...vars: any[]): void {
        event; vars;
    }

    flush (): void {

    }
}