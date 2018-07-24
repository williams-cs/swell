import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { Dimensions } from "../structural/Dimensions";
export declare class NOP implements Expression<NOP> {
    eval(context: Scope): NOP;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
}
