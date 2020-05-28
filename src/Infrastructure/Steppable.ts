export interface Steppable {
    run (): Promise<void>;
}