import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
export interface Effect<T> {
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    ast(): Expression<T>;
    updateAST(): Expression<T>;
    x: number;
    y: number;
    dims: Dimensions;
}
