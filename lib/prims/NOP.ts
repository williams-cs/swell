import { Expression } from "../Expression"; 
import {Scope} from '../structural/Scope'; 
import { Dimensions } from "../structural/Dimensions";

export class NOP implements Expression<NOP>{
    /* A NOP is a placeholder operation that evaluates to nothing */

    private _newLine : boolean = true;

    /**
     * Returns the NOP
     * @param context 
     */
    eval(context: Scope): NOP {
        return this;
    }

    /**
     * NOPs cannot be drawn directly
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("NOPs cannot be drawn.");
    }

    /**
     * Returns a string representation of the NOP
     */
    toString(): string {
        return "";
    }

    /**
     * Returns whether this NOP equals another (spoiler: it doesn't)
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        return false;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}