import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { PrintNode } from "../structural/PrintNode";

export interface Effect<T>{
    draw(context: Scope, x: number, y: number, dims: Dimensions, ast: PrintNode): void; // draws object
    ast(): Expression<T>; // returns expression that created obj
    updateAST(): Expression<T>; // returns a new expression after manipulation
    //log(): string;
    x(): number;
    y(): number;
}