import { UnaryOperation } from './UnaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
export declare class NegOp extends UnaryOperation<number> {
    constructor(val: Expression<number>);
    draw(context: Scope, x: number, y: number): void;
    eval(context: Scope): number;
}
