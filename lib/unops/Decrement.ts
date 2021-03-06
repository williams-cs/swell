import { AssignOp } from '../binops/AssignOp';
import { Expression } from '../Expression';
import { MinusOp } from '../binops/MinusOp';
import { NumberNode } from '../prims/NumberNode';
import { Scope } from '../structural/Scope';
import { UnaryOp } from './UnaryOp';
import { VariableNode } from '../vars/VariableNode';

export class Decrement extends UnaryOp<NumberNode> {

    private innerRep: Expression<NumberNode>;

    constructor(node: Expression<any>, ws: string = "") {
        super(node, ws);
        if (node instanceof VariableNode) {
            this.innerRep = new AssignOp(node, new MinusOp(node, new NumberNode(1,this)));
        } else {
            this.innerRep = new MinusOp(node, new NumberNode(1,this));
        }
    }

    eval(context: Scope): NumberNode {
        return this.innerRep.eval(context);
    }

    toString(): string {
        return `${this.expr}${this.ws}--`;
    }
}
