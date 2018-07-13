import { Expression, Scope } from "..";
import { BooleanNode } from "../prims/BooleanNode";
import { NumberNode } from "../prims/NumberNode";

export class LessThan implements Expression<BooleanNode>{
    private _left: Expression<any>;
    private _right: Expression<any>;

    constructor(left: Expression<any>, right: Expression<any>){
        this._left = left;
        this._right = right;
    }

    eval(context: Scope): BooleanNode { 
        //console.log(this._left.eval(context) + " is less than " + this._right.eval(context));
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode && rhs instanceof NumberNode) {
            //console.log("They're both number nodes");
            //console.log(lhs.val + "<" + rhs.val);
            //let bool: boolean = lhs.val < rhs.val;
            //console.log("bool: " + bool);
            return (new BooleanNode(lhs.val < rhs.val));
        } else {
            throw new Error("Arguments to less than must produce numeric values.");
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