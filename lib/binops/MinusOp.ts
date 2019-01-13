import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import {FloatNode} from '../prims/FloatNode';
import { Dimensions } from '../structural/Dimensions';

export class MinusOp extends BinaryOperation<NumberNode | FloatNode>{
    private _ws: string;

    /**
     * The constructor for the subtraction operation
     * @param left The minuend
     * @param right The subrahend
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<NumberNode|FloatNode>, right: Expression<NumberNode|FloatNode>, ws?: string){
        super(left,right);
        this._ws = ws;
        if(ws == undefined){
            this._ws = "";
        }
    }
    
    /**
     * Performs the subtraction and evaluates to a single NumberNode
     * @param context The current program context
     */
    eval(context: Scope): NumberNode | FloatNode{
        return new NumberNode(this.left.eval(new Scope(context)).eval(context).val - this.right.eval(new Scope(context)).eval(context).val);
    }

    /**
     * Subtraction ops can't be directly drawn
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    /**
     * Equals can't be called directly on subtraction
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals directly on binary operations");
    }

    /**
     * Returns a string representation of the subtraction op
     */
    toString(): string {
        return this._ws + this.left.toString() + ' - ' + this.right.toString();
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return false;
    }
}