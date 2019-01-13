import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import {NumberNode} from '../prims/NumberNode';
import {FloatNode} from '../prims/FloatNode';
import { Dimensions } from '../structural/Dimensions';
import { PlusOp } from './PlusOp';
import { AssignOp } from './AssignOp';
import { VariableNode } from '../vars/VariableNode';

export class Increment implements Expression<any>{
    private innerRep: Expression<any>;
    private expr: Expression<any>;
    private _ws: string;

    /**
     * Constructor for Increment
     * @param variable The expression to increment
     * @param ws Tracks preceding whitespace
     */
    constructor(variable: Expression<any>, ws?: string){
        this.expr = variable;
        if(variable instanceof VariableNode){
            this.innerRep= new AssignOp(variable, new PlusOp(variable, new NumberNode(1)));
        }
        else {
            this.innerRep = new PlusOp(variable, new NumberNode(1, ""));
        }
        this._ws = ws;
        if (ws == undefined){
            this._ws= "";
        }
    }

    /**
     * Evaluates increment into a number node
     * @param context The function scope
     */
    eval(context: Scope): NumberNode | FloatNode {
        return this.innerRep.eval(context);
    }

    /**
     * Increments cannot be drawn
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    /**
     * Cannot call equals directly on binops
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals directly on binary operations");
    }
    
    /**
     * Returns a string representation of the increment expression
     */
    toString(): string {
        return this._ws + this.expr.toString() + "++";
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return false;
    }
}