import { AbstractPrintableFunctionNode } from "../structural/AbstractPrintableFunctionNode";
import { AbstractShapeEffect } from "../effects/AbstractShapeEffect";
import { Argument } from "../funhouse/Argument";
import { Expression } from "../Expression";
import { NumberNode } from "../prims/NumberNode";
import { Scope } from "../structural/Scope";

export abstract class AbstractShapeNode<T extends AbstractShapeNode<T, E>, E extends AbstractShapeEffect<T, E>> extends AbstractPrintableFunctionNode<T, E> {

    getPositionalArgMap(): Map<string, Argument<any>> {
        return new Map<string, Argument<any>>([
            ["width", new Argument<NumberNode>()],
            ["height", new Argument<NumberNode>()],
        ]);
    }

    get width(): Expression<NumberNode> {
        return (<Expression<NumberNode>>this.getArg("width"));
    }

    get height(): Expression<NumberNode> {
        return (<Expression<NumberNode>>this.getArg("height"));
    }

    getWidth(context: Scope): number {
        return (<Expression<NumberNode>>this.getArg("width")).eval(context).val;
    }

    getHeight(context: Scope): number {
        return (<Expression<NumberNode>>this.getArg("height")).eval(context).val;
    }

    setWidth(context: Scope, val: number): void {
        this.updateArgValue("width", context, val);
    }

    setHeight(context: Scope, val: number): void {
        this.updateArgValue("height", context, val);
    }
}
