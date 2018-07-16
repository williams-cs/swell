import {Expression, Scope} from '../..';

export abstract class UnaryOperation<T> implements Expression<T> {
    constructor(private _val: Expression<T>){};
    abstract eval(context?: Scope): T;
    draw(context: Scope, x: number, y: number): void {}

    get val(): Expression<T>{
        return this._val;
    }
    set val(value: Expression<T>){
        this._val = value;
    }
}