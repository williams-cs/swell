// An abstract class for binary operations. 
import {Scope} from '../structural/Scope';
import {Expression} from '../Expression';

export abstract class BinaryOperation<T> implements Expression<T> {
    constructor(private _left: Expression<T>, private _right: Expression<T>){};
    abstract eval(context: Scope): T;

    draw(context: Scope): void {}

    get left(): Expression<T>{
        return this._left;
    }
    set left(left: Expression<T>){
        this._left = left;
    }

    get right(): Expression<T>{
        return this._right;
    }
    set right(right: Expression<T>){
        this._right = right;
    }
}

/*
export class PlusOperation extends BinaryOperation<number>{
    constructor(left: Expression<number>, right: Expression<number>){
        super(left,right);
    }

    eval(): number{
        return this.left.eval() + this.right.eval();
    }
}
*/