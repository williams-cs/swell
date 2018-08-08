import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';

export abstract class UnaryOperation<T> implements Expression<T> {
    private _newLine : boolean = false;
    constructor(private _val: Expression<T>){};
    abstract eval(context?: Scope): T;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {}

    get val(): Expression<T>{
        return this._val;
    }
    set val(value: Expression<T>){
        this._val = value;
    }

    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on UnaryOp");
    };

    newLine() : boolean {
        return this._newLine;
    }
}