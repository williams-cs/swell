import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import { BooleanNode } from "../prims/BooleanNode";

export class Or implements Expression<any>{
    private _left: Expression<any>;
    private _right: Expression<any>;
    private _newLine: boolean = false;
    private _ws: string;

    /**
     * Constructor for logical 'or' (||) operation
     * @param left Left side of operation
     * @param right Right side of operation
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<any>, right: Expression<any>, ws?: string){
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined){
            this._ws = "";
        }
    }

    /**
     * Performs Or operation and returns BooleanNode with result
     * @param context Current program context
     */
    eval(context: Scope): BooleanNode{
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);

        if (lhs instanceof BooleanNode && rhs instanceof BooleanNode) {
            return new BooleanNode(lhs.val || rhs.val);
        } else {
            throw new Error("The arguments to the 'or' operator must be booleans.");
        }
    }

    /**
     * Returns string representation of operation
     */
    toString(): string {
        return this._ws + this._left.toString() + ' or ' + this._right.toString();
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }

    /**
     * Equals cannot be called directly on Or operation
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on logical ops");
    }

    /**
     * Or operations cannot be drawn directly
     */
    draw(){
        throw new Error("Cannot call draw on logical ops");
    }

    /**
     * Returns left side of operation
     */
    get left(): Expression<any>{
        return this._left;
    }
    /**
     * Returns right side of operation
     */
    get right(): Expression<any>{
        return this._right;
    }
}