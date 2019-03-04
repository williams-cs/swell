import { BinaryLogicOp } from "./BinaryLogicOp";
import { BooleanNode } from "../prims/BooleanNode";
import { Expression } from "../Expression";
import { NumberNode } from "../prims/NumberNode";
import { Scope } from "../structural/Scope";

export class LessThanEq extends BinaryLogicOp<NumberNode> {

    protected readonly op: string = "<=";

    eval(context: Scope): BooleanNode {
        return new BooleanNode(this.left.eval(context).val <= this.right.eval(context).val);
    }
}
