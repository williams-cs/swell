import { Scope } from '..';
export interface Expression<T> {
    eval(parent: Scope): T;
    draw(context: Scope, x: number, y: number): void;
}
