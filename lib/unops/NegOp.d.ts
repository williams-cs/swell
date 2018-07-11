import { UnaryOperation } from './UnaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../Scope';
export declare class NegOp extends UnaryOperation<number> {
    constructor(val: Expression<number>);
    draw(context: Scope): void;
    eval(context: Scope): number;
}
