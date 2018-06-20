// An abstract class for binary operations. 

import {Expression} from '../Expression';

export abstract class BinaryOperation<T> implements Expression<T> {
    constructor(public left: Expression<T>, public right: Expression<T>){};
    abstract eval(): T;
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