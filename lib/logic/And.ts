import { BinaryLogicOp } from "./BinaryLogicOp";
import { BooleanNode } from "../prims/BooleanNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";

export class And extends BinaryLogicOp<BooleanNode> {

    eval(context: Scope): BooleanNode {
        return new BooleanNode(this.left.eval(context).val && this.right.eval(context).val);
    }

    toString(): string {
        return this.lws + this.left + " and " + this.right + this.rws;
    }
}
