import {Expression} from '../Expression';

export abstract class UnaryOperation<T> implements Expression<T> {
    constructor(private _val: Expression<T>){};
    abstract eval(): T;
    get val(): Expression<T>{
        return this._val;
    }
    set val(value: Expression<T>){
        this._val = value;
    }
}