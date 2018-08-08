import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class FunDef<T> implements Expression<T> {
    private _name;
    private _body;
    private _args;
    private _funScope;
    private _newLine;
    private _ws;
    constructor(name: string, body: Expression<T>, args?: string[], ws?: string);
    eval(context: Scope): any;
    newLine(): boolean;
    toString(): string;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    readonly name: string;
    readonly body: Expression<T>;
    readonly args: string[];
    readonly scope: Scope;
}
