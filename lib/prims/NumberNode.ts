import {Expression} from '../Expression';
import {Scope} from '../Scope';
//import{Node} from './Node';

// Nodes representing numbers
// Should abstract Node class implement Expression?

export class NumberNode implements Expression <number>{
    private _val: number;

    constructor(val: number){
        //super(parent);
        this._val = val;
    };

    eval(context: Scope): number {
        return this._val;
    }

    get val(): number{
        return this._val;
    }
    set val(value: number){
        this._val = value;
    }
    /*
    get parent(): Node{
        return this.parent;
    }
    */
}