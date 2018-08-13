import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { VariableNode } from '../vars/VariableNode';
import { Dimensions } from '../structural/Dimensions';

// left side is variable, right side is val
// Declares new val
export class DeclareOp<T> extends BinaryOperation<T>{
    private _ws: string;

    /**
     * Constructor for the declare operation, which declares a variable for the first time
     * @param left The left side of the declare op (the variable)
     * @param right The right side of the op (the value)
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<T>, right: Expression<T>, ws?: string){
        super(left,right);
        if(!(left instanceof VariableNode)){
            throw new Error("The left hand side of the assignment must be a variable.");
        }
        this._ws = ws;
        if(ws == undefined){
            this._ws = "";
        }
    }

    /**
     * Evaluates the declaration by declaring the variable in the context and assigning the value
     * @param context The current program context
     */
    eval(context: Scope): T{
        if(this.left instanceof VariableNode){
            context.declare(this.left.name); 
            let r = this.right.eval(context);
            context.assign(this.left.name,r);
            return r;
        }
        throw new Error("HALP (in DeclareOp)");
    }

    /**
     * Returns a string representation of the declare op
     */
    toString(): string {
        return this._ws + "var " + this.left.toString() + ' = ' + this.right.toString();
    }

    /**
     * DeclareOps cannot be drawn directly
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }
    /**
     * Equals can't be called direcly on a DeclareOp
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