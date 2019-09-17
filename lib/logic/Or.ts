import { BinaryLogicOp } from "./BinaryLogicOp";
import { BooleanNode } from "../prims/BooleanNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";

export class Or extends BinaryLogicOp<BooleanNode> {

    protected readonly op: string = "||";

    eval(context: Scope): BooleanNode {
        return new BooleanNode(this.left.eval(context).val || this.right.eval(context).val);
    }
}
