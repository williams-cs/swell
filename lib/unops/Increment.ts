import { AssignOp } from '../binops/AssignOp';
import { Expression } from '../Expression';
import { FloatNode } from '../prims/FloatNode';
import { NumberNode } from '../prims/NumberNode';
import { PlusOp } from '../binops/PlusOp';
import { Scope } from '../structural/Scope';
import { UnaryOp } from './UnaryOp';
import { VariableNode } from '../vars/VariableNode';

export class Increment extends UnaryOp<NumberNode | FloatNode> {

    private innerRep: Expression<NumberNode | FloatNode>;

    constructor(node: Expression<any>, lws: string = "", rws: string = "") {
        super(node, lws, rws);
        if (node instanceof VariableNode) {
            this.innerRep = new AssignOp(node, new PlusOp(node, new NumberNode(1)));
        } else {
            this.innerRep = new PlusOp(node, new NumberNode(1));
        }
    }

    eval(context: Scope): NumberNode | FloatNode {
        return this.innerRep.eval(context);
    }

    toString(): string {
        return `${this.lws}${this.expr}++${this.rws}`;
    }
}
