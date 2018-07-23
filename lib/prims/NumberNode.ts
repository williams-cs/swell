import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
//import{Node} from './Node';

// Nodes representing numbers
// Should abstract Node class implement Expression?

export class NumberNode implements Expression <NumberNode>{
    private _val: number;

    constructor(val: number){
        //super(parent);
        this._val = val;
    };
    
    eval(context: Scope): NumberNode {
        return this;
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }

    get val(): number{
        return this._val;
    }
    set val(value: number){
        this._val = value;
    }
}