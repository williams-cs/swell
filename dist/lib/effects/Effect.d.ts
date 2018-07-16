import { Expression, Scope } from "../..";
export interface Effect<T> {
    draw(context: Scope, x: number, y: number): void;
    ast(): Expression<T>;
    updateAST(): Expression<T>;
}
