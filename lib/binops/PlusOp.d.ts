import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
export declare class PlusOp extends BinaryOperation<number> {
    constructor(left: Expression<number>, right: Expression<number>);
    draw(context: Scope): void;
    eval(context: Scope): number;
}
