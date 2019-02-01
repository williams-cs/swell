import { AssignOp } from '../binops/AssignOp';
import { Expression } from '../Expression';
import { FloatNode } from '../prims/FloatNode';
import { MinusOp } from '../binops/MinusOp';
import { NumberNode } from '../prims/NumberNode';
import { Scope } from '../structural/Scope';
import { UnaryOp } from './UnaryOp';
import { VariableNode } from '../vars/VariableNode';

export class Decrement extends UnaryOp<NumberNode | FloatNode> {

    private innerRep: Expression<NumberNode | FloatNode>;

    constructor(node: Expression<any>, ws: string = "") {
        super(node, ws);
        if (node instanceof VariableNode) {
            this.innerRep = new AssignOp(node, new MinusOp(node, new NumberNode(1)));
        } else {
            this.innerRep = new MinusOp(node, new NumberNode(1));
        }
    }

    eval(context: Scope): NumberNode | FloatNode {
        return this.innerRep.eval(context);
    }

    toString(): string {
        return this.ws + this.expr + "--";
    }
}
