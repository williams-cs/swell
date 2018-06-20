import {Expression} from '../Expression';

export abstract class UnaryOperation<T> implements Expression<T> {
    constructor(public val: Expression<T>){};
    abstract eval(): T;
}