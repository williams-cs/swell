import { Scope } from './Scope';
export interface Expression<T> {
    eval(parent: Scope): T;
    draw(context: Scope): void;
}
