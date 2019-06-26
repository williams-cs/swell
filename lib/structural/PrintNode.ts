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
            ["x", new OptionalArg<NumberNode>(new NumberNode(100, " "))],
            ["y", new OptionalArg<NumberNode>(new NumberNode(100, " "))],
            ["fontSize", new OptionalArg<NumberNode>(new NumberNode(20, " "))],
            ["color", new OptionalArg<StringNode | RGBColorNode>(new StringNode("#673AB7"))],
        ]);
    }

    eval(scope: Scope): any {
        let res = this.getArg("object").eval(scope);
        if (!res.draw) {
            throw("PrintNode has invalid object.");
        }
        res.draw(scope, this);
        return res;
    }

    getX(scope: Scope): number {
        return this.getArg("x").eval(scope).val;
    }

    setX(scope: Scope, val: number): void {
        this.updateArgValue("x", scope, val);
    }

    getY(scope: Scope): number {
        return this.getArg("y").eval(scope).val;
    }

    setY(scope: Scope, val: number): void {
        this.updateArgValue("y", scope, val);
    }

    getFontSize(scope: Scope): number {
        return this.getArg("fontSize").eval(scope).val;
    }

    setFontSize(scope: Scope, val: number): void {
        this.updateArgValue("fontSize", scope, val);
    }

    getColor(scope: Scope): string {
        return this.getArg("color").eval(scope).val;
    }

    setColor(scope: Scope, val: string): void {
        this.updateArgValue("color", scope, val);
    }
}
