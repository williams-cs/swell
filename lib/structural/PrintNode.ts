import { AbstractFunctionNode } from "../funhouse/AbstractFunctionNode";
import { Argument } from "../funhouse/Argument";
import { Expression } from "../Expression";
import { NumberNode } from "../prims/NumberNode";
import { RGBColorNode } from "../aesthetics/RGBColorNode";
import { Scope } from "./Scope";
import { StringNode } from "../prims/StringNode";

export class PrintNode extends AbstractFunctionNode<any> {

    protected readonly name: string = "print";

    getPositionalArgMap(): Map<string, Argument<any>> {
        return new Map<string, Argument<any>>([
            ["object", new Argument<any>()],
        ]);
    }

    getOptionalArgMap(): Map<string, Argument<any>> {
        return new Map<string, Argument<any>>([
            ["x", new Argument<NumberNode>(new NumberNode(100), false)],
            ["y", new Argument<NumberNode>(new NumberNode(100), false)],
            ["fontSize", new Argument<NumberNode>(new NumberNode(20), false)],
            ["color", new Argument<StringNode | RGBColorNode>(new StringNode("#673AB7"), false)],
        ]);
    }

    eval(context: Scope): any {
        let res = this.getArg("object").eval(context);
        if (!res.draw) {
            throw("PrintNode has invalid object.");
        }
        res.draw(context, this);
        return res;
    }

    getX(context: Scope): number {
        return this.getArg("x").eval(context).val;
    }

    setX(context: Scope, val: number): void {
        this.updateArgValue("x", context, val);
    }

    getY(context: Scope): number {
        return this.getArg("y").eval(context).val;
    }

    setY(context: Scope, val: number): void {
        this.updateArgValue("y", context, val);
    }

    getFontSize(context: Scope): number {
        return this.getArg("fontSize").eval(context).val;
    }

    setFontSize(context: Scope, val: number): void {
        this.updateArgValue("fontSize", context, val);
    }

    getColor(context: Scope): string {
        return this.getArg("color").eval(context).val;
    }

    setColor(context: Scope, val: string): void {
        this.updateArgValue("color", context, val);
    }
}
