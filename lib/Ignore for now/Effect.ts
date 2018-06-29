import { Expression } from "../Expression";

export interface Effect<T>{
    value: T;
    draw(): void; // draws object
    ast(): Expression<T>; // returns expression that created obj
}