import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import { BooleanNode } from "../prims/BooleanNode";
import { NumberNode } from "../prims/NumberNode";

export class LessThanEq implements Expression<BooleanNode>{
    private _left: Expression<any>;
    private _right: Expression<any>;
    private _newLine: boolean = false;
    private _ws: string;

    /**
     * Constructor for LessThanEq (less than or equal to, <=) operation
     * @param left The left side of the operation
     * @param right The right side of the operation
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
     * Performs the LessThanEq comparison and returns BooleanNode with result
     * @param context The current program context
     */
    eval(context: Scope): BooleanNode {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode && rhs instanceof NumberNode) {
            return (new BooleanNode(lhs.val <= rhs.val));
        } else {
            throw new Error("The arguments to the <= operator must be numeric.");
        }
    }

    /**
     * Returns a string representation of the operation
     */
    toString(): string {
        return this._ws + this._left.toString() + " <= " + this._right.toString();
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }

    /**
     * Equals cannot be called directly on LessThanEq op
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on logical ops");
    }

    /**
     * LessThanEq ops cannot be drawn directly
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