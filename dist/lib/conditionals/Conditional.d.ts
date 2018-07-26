import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
export declare class Conditional implements Expression<any> {
    private _test;
    private _trueBranch;
    private _falseBranch;
    constructor(test: Expression<any>, trueBranch: Expression<any>, falseBranch?: Expression<any>);
    toString(): string;
    eval(context: Scope): any;
    readonly trueBranch: Expression<any>;
    readonly falseBranch: Expression<any>;
    draw(): void;
}
