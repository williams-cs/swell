import { AbstractPrintableFunctionNode } from "../structural/AbstractPrintableFunctionNode";
import { AbstractShapeEffect } from "../effects/AbstractShapeEffect";
import { Argument } from "../funhouse/Argument";
import { Dimensions } from "../structural/Dimensions";
import { Expression } from "../Expression";
import { NumberNode } from "../prims/NumberNode";
import { PrintNode } from "../structural/PrintNode";
import { Scope } from "../structural/Scope";

export abstract class AbstractShapeNode<T extends AbstractShapeNode<T, E>, E extends AbstractShapeEffect<T, E>> extends AbstractPrintableFunctionNode<T, E> {

    initArgMap(): Map<string, Argument<any>> {
        return new Map<string, Argument<any>>([
            ["width", new Argument<NumberNode>()],
            ["height", new Argument<NumberNode>()],
        ]);
    }

    get width(): Expression<NumberNode> {
        return (<Expression<NumberNode>>this.getArg("width"));
    }

    set width(width: Expression<NumberNode>) {
        this.setArg("width", width);
    }

    get height(): Expression<NumberNode> {
        return (<Expression<NumberNode>>this.getArg("height"));
    }

    set height(height: Expression<NumberNode>) {
        this.setArg("height", height);
    }
}
