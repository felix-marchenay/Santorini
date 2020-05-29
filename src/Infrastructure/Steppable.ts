export interface Steppable {
    run (): Promise<void>;

    after (): void;
}