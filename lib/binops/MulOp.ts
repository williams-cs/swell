import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';

export class MulOp extends BinaryOperation<NumberNode>{
    private _ws: string;

    /**
     * Constructor for the multiplication operation
     * @param left The multiplicand
     * @param right The multiplier
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>, ws?: string){
        super(left,right);
        this._ws = ws;
        if(ws == undefined){
            this._ws = "";
        }
    }
    
    /**
     * Performs the multiplication and returns a single NumberNode
     * @param context The current program context
     */
    eval(context: Scope): NumberNode {
        return new NumberNode(this.left.eval(new Scope(context)).eval(context).val * this.right.eval(new Scope(context)).eval(context).val);
    }

    /**
     * Returns a string representation of the multiplication op
     */
    toString(): string {
        return this._ws + this.left.toString() + ' * ' + this.right.toString();
    }

    /**
     * Multiplication ops cannot be directly drawn
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    /**
     * Equals cannot be called directly on a multiplicaiton operation
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals directly on binary operations");
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return false;
    }
}