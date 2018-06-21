import {Expression} from './Expression';
import {Scope} from './Scope';

export class SequenceNode<T,U> implements Expression<[T,U]>{
    private _left: Expression<T>;
    private _right: Expression<U>;

    constructor(left: Expression<T>, right: Expression<U>){
        this._left = left;
        this._right = right;
    }
    
    set left(left: Expression<T>){
        this._left = left;
    }
    get left(): Expression<T>{
        return this._left;
    }

    set right(right: Expression<U>){
        this._right = right;
    }
    get right(): Expression<U>{
        return this._right;
    }

    eval(context: Scope): [T,U] {
        let leftScope = new Scope(new Map(), context);
        return [this._left.eval(leftScope),
            this._right.eval(leftScope)]; // leftScope may be modified now
    }
}