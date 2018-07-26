import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import { BooleanNode } from "../prims/BooleanNode";

export class Or implements Expression<any>{
    private _left: Expression<any>;
    private _right: Expression<any>;
    private _newLine : boolean = false;

    constructor(left: Expression<any>, right: Expression<any>){
        this._left = left;
        this._right = right;
    }

    toString() :string {
        return "";
    }

    newLine() : boolean {
        return this._newLine;
    }

    eval(context: Scope): BooleanNode{
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);

        if (lhs instanceof BooleanNode && rhs instanceof BooleanNode) {
            return new BooleanNode(lhs.val || rhs.val);
        } else {
            throw new Error("The arguments to the 'or' operator must be booleans.");
        }
    }

    draw(){

    }

    get left(): Expression<any>{
        return this._left;
    }
    get right(): Expression<any>{
        return this._right;
    }
}