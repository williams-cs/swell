import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import { BooleanNode } from "../prims/BooleanNode";
import { NumberNode } from "../prims/NumberNode";

export class LessThanEq implements Expression<BooleanNode>{
    private _left: Expression<any>;
    private _right: Expression<any>;
    private _newLine : boolean = false;

    constructor(left: Expression<any>, right: Expression<any>){
        this._left = left;
        this._right = right;
    }

    toString() :string {
        return this._left.toString() + " <= " + this._right.toString();
    }

    newLine() : boolean {
        return this._newLine;
    }

    eval(context: Scope): BooleanNode {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode && rhs instanceof NumberNode) {
            return (new BooleanNode(lhs.val <= rhs.val));
        } else {
            throw new Error("The arguments to the <= operator must be numeric.");
        }
    }

    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on logical ops");
    }

    draw(){
        throw new Error("Cannot call draw on logical ops");
    }

    get left(): Expression<any>{
        return this._left;
    }
    get right(): Expression<any>{
        return this._right;
    }
}