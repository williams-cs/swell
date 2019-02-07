import { AbstractFunctionNode } from "../funhouse/AbstractFunctionNode";
import { Argument } from "../funhouse/Argument";
import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";
import { NumberNode } from "../prims/NumberNode";

export class PrintNode extends AbstractFunctionNode<any> {

    protected readonly name: string = "print";

    initArgMap(): Map<string, Argument<any>> {
        return new Map<string, Argument<any>>([
            ["object", new Argument<any>()],
            ["x", new Argument<NumberNode>(new NumberNode(100), false)],
            ["y", new Argument<NumberNode>(new NumberNode(100), false)],
        ]);
    }

    eval(context: Scope): any {
        let res = this.object.eval(context);
        if (!res.draw) {
            throw("PrintNode has invalid object.");
        }
        res.draw(context, this);
        return res;
    }

    get object(): Expression<any> {
        return this.getArg("object");
    }

    get x(): Expression<NumberNode> {
        return this.getArg("x");
    }

    get y(): Expression<NumberNode> {
        return this.getArg("y");
    }
}
