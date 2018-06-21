import {Expression} from '../Expression';
import {Scope} from '../Scope';

export abstract class UnaryOperation<T> implements Expression<T> {
    constructor(private _val: Expression<T>){};
    abstract eval(context?: Scope): T;
    
    get val(): Expression<T>{
        return this._val;
    }
    set val(value: Expression<T>){
        this._val = value;
    }
}