import {UnaryOperation} from './UnaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';

export class NegOp extends UnaryOperation<NumberNode>{
    private _ws: string;

    /**
     * Constructor for a NegationOperation
     * @param val The value to be negated (must be a NumberNode)
     * @param ws Preceding whitespace
     */
    constructor(val: Expression<NumberNode>, ws?: string){
        super(val);
        this._ws = ws;
        if (ws == undefined){
            this._ws= "";
        }
    }

    /**
     * Evaluates the value into the negative version
     * @param context The current program context
     */
    eval(context: Scope): NumberNode{
        let v = this.val.eval(context);
        return new NumberNode(-v.val, "");
    }

    /**
     * NegOps cannot be drawn directly
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Negation ops cannot be drawn directly");
    }

    /**
     * Equals cannot be called directly on a NegOp
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on NegOp");
    }

    /**
     * Returns a string representation of the NegOp
     */
    toString(): string {
        return this._ws + "-" + this.val;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return false;
    }
}