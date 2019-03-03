import { BinaryLogicOp } from "./BinaryLogicOp";
import { BooleanNode } from "../prims/BooleanNode";
import { Expression } from "../Expression";
import { FloatNode } from "../prims/FloatNode";
import { NumberNode } from "../prims/NumberNode";
import { Scope } from "../structural/Scope";

export class GreaterThan extends BinaryLogicOp<NumberNode | FloatNode> {

    eval(context: Scope): BooleanNode {
        return new BooleanNode(this.left.eval(context).val > this.right.eval(context).val);
    }

    toString(): string {
        return `${this.ws}${this.left}>${this.right}`;
    }
}
