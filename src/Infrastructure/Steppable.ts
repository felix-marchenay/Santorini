export interface Steppable {
    run (): Promise<void>;
    before (): void;
    after (): void;
}