import {Expression, Scope} from '../..';

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

    draw(context: Scope, x: number, y: number): void {
    
    }

    get val(): number{
        return this._val;
    }
    set val(value: number){
        this._val = value;
    }
}