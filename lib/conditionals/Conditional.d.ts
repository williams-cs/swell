import { Expression, Scope } from "..";
export declare class Conditional implements Expression<any> {
    private _test;
    private _trueBranch;
    private _falseBranch;
    constructor(test: Expression<any>, trueBranch: Expression<any>, falseBranch?: Expression<any>);
    eval(context: Scope): any;
    readonly trueBranch: Expression<any>;
    draw(): void;
}
