import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import { BooleanNode } from "../prims/BooleanNode";

export class Or implements Expression<any>{
    private _left: Expression<any>;
    private _right: Expression<any>;
    private _newLine : boolean = false;
    private _ws : string;

    constructor(left: Expression<any>, right: Expression<any>, ws? : string){
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined){
            this._ws = "";
        }
    }

    toString() :string {
        return this._ws + this._left.toString() + ' or ' + this._right.toString();
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