import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
export interface Effect<T> {
    draw(context: Scope, x: number, y: number): void;
    ast(): Expression<T>;
    updateAST(): Expression<T>;
    x(): number;
    y(): number;
}
