import {UnaryOperation} from './UnaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';

export class NegOp extends UnaryOperation<NumberNode>{
    private _ws: string;
    constructor(val: Expression<NumberNode>, ws?: string){
        super(val);
        this._ws = ws;
        if (ws == undefined){
            this._ws= "";
        }
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }
    
    eval(context: Scope): NumberNode{
        let v = this.val.eval(context);
        return new NumberNode(-v.val, "");
    }

    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on NegOp");
    }

    toString(): string {
        return this._ws + "-" + this.val;
    }

    newLine(): boolean {
        return false;
    }

    // put in UnaryOp class
    /*
    get value(): number{
        return this.val;
    }
    set value(value: number){
        this.val = value;
    }
    */
}