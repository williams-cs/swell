import { BooleanNode } from "../prims/BooleanNode";
import { Scope } from "../structural/Scope";
import { UnaryOp } from "../unops/UnaryOp";

export class Not extends UnaryOp<BooleanNode> {

    eval(context: Scope): BooleanNode {
        return new BooleanNode(!this.expr.eval(context).val,this);
    }

    toString(): string {
        return this.ws + "!" + this.expr;
    }
}
