import { Expression } from "../Expression";
import { Scope } from "../Scope";

export interface Effect<T>{
    draw(context: Scope, x: number, y: number): void; // draws object
    ast(): Expression<T>; // returns expression that created obj
    updateAST(): Expression<T>; // returns a new expression after manipulation
}