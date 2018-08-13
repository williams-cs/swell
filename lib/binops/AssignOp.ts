import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { VariableNode } from '../vars/VariableNode';
import { Dimensions } from '../structural/Dimensions';

// left side is variable, right side is val
// Reassign new value to var

export class AssignOp<T> extends BinaryOperation<T>{
    private _ws: string; // preceding whitespace

    /**
     * Constructor for an assignment operation
     * @param left The left side of the assignment (the var)
     * @param right The right side of the assignment (the value)
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
     * Evaluates assign op by assigning value to var
     * @param context The current context
     */
    eval(context: Scope): T{
        if(this.left instanceof VariableNode){
            let r = this.right.eval(context);
            context.assign(this.left.name,r);
            return r;
        }
        throw new Error("HALP (in AssignOp)");
    }
    
    /**
     * Returns a string representation of the AssignOp
     */
    toString(): string {
        return this._ws + this.left.toString() + ' = ' + this.right.toString();
    }

    /**
     * AssignOps can't be drawn directly
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    /**
     * Equals can't be called directly on AssignOp
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