import { AbstractBuiltinFunctionNode } from "../funhouse/AbstractBuiltinFunctionNode";
import { Argument } from "../funhouse/Argument";
import { PositionalArg } from "../funhouse/PositionalArg";
import { Expression } from "../Expression";
import { NumberNode } from "../prims/NumberNode";
import { Scope } from "../structural/Scope";
import { StringNode } from "../prims/StringNode";

export class RGBColorNode extends AbstractBuiltinFunctionNode<StringNode> {

    protected name: string = "rgb";

    getPositionalArgMap(): Map<string, PositionalArg<any>> {
        return new Map<string, PositionalArg<any>>([
            ["red", new PositionalArg<NumberNode>()],
            ["green", new PositionalArg<NumberNode>()],
            ["blue", new PositionalArg<NumberNode>()],
        ]);
    }

    eval(context: Scope): StringNode {
        let red = this.intToHex(this.getRed(context));
        let green = this.intToHex(this.getGreen(context));
        let blue = this.intToHex(this.getBlue(context));
        return new StringNode("#" + red + green + blue);
    }

    intToHex(num: number): string {
        let hex: string = num.toString(16);
        if (hex.length % 2) {
          hex = "0" + hex;
        }
        return hex;
    }

    getRed(context: Scope): number {
        return this.getArg("red").eval(context).val;
    }

    setRed(context: Scope, val: number): void {
        this.updateArgValue("red", context, val);
    }

    getGreen(context: Scope): number {
        return this.getArg("green").eval(context).val;
    }

    setGreen(context: Scope, val: number): void {
        this.updateArgValue("green", context, val);
    }

    getBlue(context: Scope): number {
        return this.getArg("blue").eval(context).val;
    }

    setBlue(context: Scope, val: number): void {
        this.updateArgValue("blue", context, val);
    }
}
