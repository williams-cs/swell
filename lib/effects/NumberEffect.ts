import { AbstractTextEffect } from "./AbstractTextEffect";
import { NumberNode } from "../prims/NumberNode";

export class NumberEffect extends AbstractTextEffect<NumberNode, number, NumberEffect> {

    readonly name: string = "number";

    convertStrToNodeVal(str: string): number {
        let num: number = Number(str);
        if (!isFinite(num) || str.includes("e") || String(num).includes("e")) {
            throw ("Exception: Not a number");
        }
        return num;
    }
}
