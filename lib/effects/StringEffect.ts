import { AbstractTextEffect } from "./AbstractTextEffect";
import { StringNode } from "../prims/StringNode";

export class StringEffect extends AbstractTextEffect<StringNode, string> {

    readonly name: string = "string";

    convertStrToNodeVal(str: string): string {
        return str;
    }
}
