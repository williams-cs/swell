import { AssignOp } from '../binops/AssignOp';
import { Expression } from '../Expression';
import { NumberNode } from '../prims/NumberNode';
import { PlusOp } from '../binops/PlusOp';
import { Scope } from '../structural/Scope';
import { UnaryOp } from './UnaryOp';
import { VariableNode } from '../vars/VariableNode';

export class Increment extends UnaryOp<NumberNode> {

    private innerRep: Expression<NumberNode>;

    constructor(node: Expression<any>, ws: string = "") {
        super(node, ws);
        if (node instanceof VariableNode) {
            this.innerRep = new AssignOp(node, new PlusOp(node, new NumberNode(1)));
        } else {
            this.innerRep = new PlusOp(node, new NumberNode(1));
        }
    }

    eval(context: Scope): NumberNode {
        return this.innerRep.eval(context);
    }

    toString(): string {
        return `${this.expr}${this.ws}++`;
    }
}
