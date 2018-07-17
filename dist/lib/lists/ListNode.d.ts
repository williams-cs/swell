import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
export declare class ListNode implements Expression<ListNode> {
    private _list;
    constructor(list: Expression<any>[]);
    eval(context: Scope): ListNode;
    draw(): void;
    readonly list: Expression<any>[];
}
