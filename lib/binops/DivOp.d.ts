import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
export declare class DivOp extends BinaryOperation<number> {
    constructor(left: Expression<number>, right: Expression<number>);
    draw(context: Scope, x: number, y: number): void;
    eval(context: Scope): number;
}
