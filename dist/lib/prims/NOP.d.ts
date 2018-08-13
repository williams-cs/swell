import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { Dimensions } from "../structural/Dimensions";
export declare class NOP implements Expression<NOP> {
    private _newLine;
    /**
     * Returns the NOP
     * @param context
     */
    eval(context: Scope): NOP;
    /**
     * NOPs cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Returns a string representation of the NOP
     */
    toString(): string;
    /**
     * Returns whether this NOP equals another (spoiler: it doesn't)
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
