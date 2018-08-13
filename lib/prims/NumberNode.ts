import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
//import{Node} from './Node';

// Nodes representing numbers
// Should abstract Node class implement Expression?

export class NumberNode implements Expression <NumberNode>{
    private _val: number;
    private _newLine: boolean = false;
    private _ws :  string;

    constructor(val: number, ws?: string){
        //super(parent);
        this._val = val;
        this._ws = ws;
        if (ws == undefined) {
            this._ws= "";
        }
    };
    
    eval(context: Scope): NumberNode {
        return this;
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }

    equalsVal(right: Expression<any>): boolean{
        if(right instanceof NumberNode){
            return this.val === right.val;
        }
        return false;
    }

    toString(): string {
        return this._ws + this._val;
    }

    get val(): number{
        return this._val;
    }
    newLine(): boolean {
        return this._newLine;
    }
    set val(value: number){
        this._val = value;
    }
}