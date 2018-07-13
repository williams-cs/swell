import { Expression, Scope, NumberNode} from "..";
import { BooleanNode } from "../prims/BooleanNode";

export class And implements Expression<any>{
    private _left: Expression<any>;
    private _right: Expression<any>;

    constructor(left: Expression<any>, right: Expression<any>){
        this._left = left;
        this._right = right;
    }

    eval(context: Scope): BooleanNode{
        return new BooleanNode((this._left.eval(context) && this._right.eval(context)));
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