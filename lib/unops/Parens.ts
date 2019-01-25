import {UnaryOperation} from './UnaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { FloatNode } from "../prims/FloatNode";
import { Dimensions } from '../structural/Dimensions';

export class Parens extends UnaryOperation<NumberNode|FloatNode>{
    private _ws: string;

    /**
     * Constructor for a NegationOperation
     * @param val The value to be negated (must be a NumberNode)
     * @param ws Preceding whitespace
     */
    constructor(val: Expression<NumberNode|FloatNode>, ws?: string){
        super(val);
        this._ws = ws;
        if (ws == undefined){
            this._ws= "";
        }
    }

    /**
     * Evaluates the value of the contained expression
     * @param context The current program context
     */
    eval(context: Scope): NumberNode|FloatNode{
        let v = this.val.eval(context);
        if(v instanceof FloatNode){
        return new FloatNode(v.val, "");
        }
        else{
            return new NumberNode(v.val, "");
        }
    }

    /**
     * Parens cannot be drawn directly
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Negation ops cannot be drawn directly");
    }

    /**
     * Equals cannot be called directly on Parens
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on Parens");
    }

    /**
     * Returns a string representation of the Parens
     */
    toString(): string {
        return this._ws + "(" + this.val + ")";
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return false;
    }
}