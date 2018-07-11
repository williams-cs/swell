import { Expression } from "../Expression";
export interface Effect<T> {
    value: T;
    draw(): void;
    ast(): Expression<T>;
}
