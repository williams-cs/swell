import { Expression, Scope } from '..';
export declare class WhileNode implements Expression<any> {
    private _cond;
    private _body;
    constructor(cond: Expression<any>, body: Expression<any>);
    eval(context: Scope): any;
    draw(context: Scope, x: number, y: number): void;
}
