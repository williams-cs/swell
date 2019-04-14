import { AbstractPrintableFunctionNode } from "../structural/AbstractPrintableFunctionNode";
import { AbstractLineEffect } from "../effects/AbstractLineEffect";
import { PositionalArg } from "../funhouse/PositionalArg";
import { Expression } from "../Expression";
import { NumberNode } from "../prims/NumberNode";
import { Scope } from "../structural/Scope";

export abstract class AbstractLineNode<T extends AbstractLineNode<T, E>, E extends AbstractLineEffect<T, E>> extends AbstractPrintableFunctionNode<T, E> {

    getPositionalArgMap(): Map<string, PositionalArg<any>> {
        return new Map<string, PositionalArg<any>>([
            ["x1", new PositionalArg<NumberNode>(null, true)],
            ["y1", new PositionalArg<NumberNode>(null, true)],
            ["x2", new PositionalArg<NumberNode>(null, true)],
            ["y2", new PositionalArg<NumberNode>(null, true)],
        ]);
    }

    get x1(): Expression<NumberNode> {
        return (<Expression<NumberNode>>this.getArg("x1"));
    }

    get y1(): Expression<NumberNode> {
        return (<Expression<NumberNode>>this.getArg("y1"));
    }

    get x2(): Expression<NumberNode> {
        return (<Expression<NumberNode>>this.getArg("x2"));
    }

    get y2(): Expression<NumberNode> {
        return (<Expression<NumberNode>>this.getArg("y2"));
    }

    getX1(context: Scope): number {
        return (<Expression<NumberNode>>this.getArg("x1")).eval(context).val;
    }

    getY1(context: Scope): number {
        return (<Expression<NumberNode>>this.getArg("y1")).eval(context).val;
    }

    getX2(context: Scope): number {
        return (<Expression<NumberNode>>this.getArg("x2")).eval(context).val;
    }

    getY2(context: Scope): number {
        return (<Expression<NumberNode>>this.getArg("y2")).eval(context).val;
    }

    setX1(context: Scope, val: number): void {
        this.updateArgValue("x1", context, val);
    }

    setY1(context: Scope, val: number): void {
        this.updateArgValue("y1", context, val);
    }

    setX2(context: Scope, val: number): void {
        this.updateArgValue("x2", context, val);
    }

    setY2(context: Scope, val: number): void {
        this.updateArgValue("y2", context, val);
    }
}
