import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
export declare class FunDef<T> implements Expression<T> {
    private _name;
    private _body;
    private _args;
    private _funScope;
    constructor(name: string, body: Expression<T>, args?: string[]);
    eval(context: Scope): any;
    draw(context: Scope, x: number, y: number): void;
    readonly name: string;
    readonly body: Expression<T>;
    readonly args: string[];
    readonly scope: Scope;
}
