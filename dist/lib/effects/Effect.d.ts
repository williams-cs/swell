import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { PrintNode } from "../structural/PrintNode";
export interface Effect<T> {
    draw(context: Scope, x: number, y: number, dims: Dimensions, ast: PrintNode): void;
    ast(): Expression<T>;
    updateAST(): Expression<T>;
    x(): number;
    y(): number;
}
