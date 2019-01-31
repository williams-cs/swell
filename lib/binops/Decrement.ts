import {BinaryOp} from './BinaryOp';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import {NumberNode} from '../prims/NumberNode';
import {FloatNode} from '../prims/FloatNode';
import { Dimensions } from '../structural/Dimensions';
import { MinusOp } from './MinusOp';
import { AssignOp } from './AssignOp';
import { VariableNode } from '../vars/VariableNode';

export class Decrement implements Expression<any>{
    private innerRep: Expression<any>;
    private expr: Expression<any>;
    private _ws: string;

    /**
     * Constructor for the decrement operation
     * @param variable The expression to be decremented
     * @param ws Preceding whitespace
     */
    constructor(variable: Expression<any>, ws?: string){
        this.expr = variable;
        if(variable instanceof VariableNode){
            this.innerRep= new AssignOp(variable, new MinusOp(variable, new NumberNode(1)));
        }
        else {
            this.innerRep = new MinusOp(variable, new NumberNode(1));
        }
        this._ws = ws;
        if (ws == undefined){
            this._ws= "";
        }
    }

    /**
     * Evaluates the decrement op to a NumberNode
     * @param context The current program context
     */
    eval(context: Scope): NumberNode|FloatNode {
        return this.innerRep.eval(context);
    }

    /**
     * Returns a string representation of the decrement op
     */
    toString(): string {
        return this._ws + this.expr.toString() + "--";
    }

    /**
     * Decrement ops can't be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    /**
     * Equals can't be called directly on decrement
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
