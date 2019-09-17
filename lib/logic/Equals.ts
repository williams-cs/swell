import { BinaryLogicOp } from "./BinaryLogicOp";
import { BooleanNode } from "../prims/BooleanNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";

export class Equals extends BinaryLogicOp<Expression<any>> {

    protected readonly op: string = "==";

    eval(context: Scope): BooleanNode {
        return new BooleanNode(this.left.eval(context).equals(this.right.eval(context)));
    }
}
