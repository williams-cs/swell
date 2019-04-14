import { AbstractBuiltinFunctionNode } from "../funhouse/AbstractBuiltinFunctionNode";
import { OptionalArg } from "../funhouse/OptionalArg";
import { PositionalArg } from "../funhouse/PositionalArg";
import { Expression } from "../Expression";
import { NumberNode } from "../prims/NumberNode";
import { RGBColorNode } from "../aesthetics/RGBColorNode";
import { Scope } from "./Scope";
import { StringNode } from "../prims/StringNode";

export class PrintNode extends AbstractBuiltinFunctionNode<any> {

    protected readonly name: string = "print";

    getPositionalArgMap(): Map<string, PositionalArg<any>> {
        return new Map<string, PositionalArg<any>>([
            ["object", new PositionalArg<any>()],
        ]);
    }

    getOptionalArgMap(): Map<string, OptionalArg<any>> {
        return new Map<string, OptionalArg<any>>([
            ["x", new OptionalArg<NumberNode>(new NumberNode(100))],
            ["y", new OptionalArg<NumberNode>(new NumberNode(100))],
            ["fontSize", new OptionalArg<NumberNode>(new NumberNode(20))],
            ["color", new OptionalArg<StringNode | RGBColorNode>(new StringNode("#673AB7"))],
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
