import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class FunDef<T> implements Expression<T> {
    private _name;
    private _body;
    private _args;
    private _funScope;
    private _newLine;
    constructor(name: string, body: Expression<T>, args?: string[]);
    eval(context: Scope): any;
    newLine(): boolean;
    toString(): string;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    equalsVal(right: Expression<any>): boolean;
    readonly name: string;
    readonly body: Expression<T>;
    readonly args: string[];
    readonly scope: Scope;
}
