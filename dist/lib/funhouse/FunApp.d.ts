import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
export declare class FunApp<T> implements Expression<T> {
    private _name;
    private _args;
    private _defaultValue;
    constructor(name: string, args?: any[], defaultValue?: T);
    eval(context: Scope): any;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    readonly name: string;
    readonly args: Expression<{}>[];
}
