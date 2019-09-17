import { BinaryOp } from './BinaryOp';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';

export class PlusOp extends BinaryOp<NumberNode> {

    protected readonly op: string = "+";

    eval(context: Scope): NumberNode {
        return new NumberNode(this.left.eval(context).val + this.right.eval(context).val);
    }
}
