import { Scope } from './structural/Scope';
export interface Expression<T> {
    eval(parent: Scope): T;
    draw(context: Scope, x: number, y: number): void;
}
