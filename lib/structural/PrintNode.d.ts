import { Expression } from "../Expression";
import { Scope } from "./Scope";
export declare class PrintNode implements Expression<void> {
    private _toPrint;
    constructor(toPrint: Expression<any>);
    draw(context: Scope): void;
    eval(context: Scope): void;
}
