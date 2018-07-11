import { Expression } from "../Expression";
import { Scope } from "../Scope";
export declare class ListNode implements Expression<any> {
    private _list;
    private _evalList;
    constructor(list: Expression<any>[]);
    eval(context: Scope): any;
    draw(): void;
    readonly list: Expression<any>[];
}
