import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import { BooleanNode } from "../prims/BooleanNode";
import { NumberNode } from "../prims/NumberNode";

export class Equals implements Expression<BooleanNode>{
    private _left: Expression<any>;
    private _right: Expression<any>;
    private _newLine: boolean = false;
    private _ws: string;

    /**
     * Constructor for equality (==) operation
     * @param left The left side of the equality
     * @param right The right side of the equality
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
     * Performs the comparison and evaluates to a BooleanNode
     * @param context 
     */
    eval(context: Scope): BooleanNode {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        return new BooleanNode(lhs.equalsVal(rhs));
    }

    /**
     * Returns a string representation of the equality op
     */
    toString(): string {
        return this._ws + this._left.toString() + ' equals ' + this._right.toString();
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }

    /**
     * Equals can't be called directly on an equality op
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("well this is meta");
    }

    /**
     * Equality ops can't be drawn directly
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