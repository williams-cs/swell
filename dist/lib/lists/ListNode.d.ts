import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
export declare class ListNode implements Expression<ListNode> {
    private _list;
    private _newLine;
    constructor(list: Expression<any>[]);
    eval(context: Scope): ListNode;
    toString(): string;
    equalsVal(right: Expression<any>): boolean;
    draw(): void;
    readonly list: Expression<any>[];
    newLine(): boolean;
}
