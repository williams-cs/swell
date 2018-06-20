//import {Node} from './Node';
import {Expression} from './Expression';

// A Position Node

export class PosNode implements Expression<number>{
    private _val: number;
    constructor(val: number){
        this._val = val;
    }

    eval(): number {
        return this._val;
    }

    get val(): number{
        return this._val;
    }
    set val(value: number){
        this._val = value;
    }
}