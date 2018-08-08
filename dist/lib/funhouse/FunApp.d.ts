import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
export declare class FunApp<T> implements Expression<T> {
    private _name;
    private _args;
    private _defaultValue;
    private _newLine;
    private _ws;
    constructor(name: string, args?: any[], ws?: string, defaultValue?: T);
    toString(): string;
    newLine(): boolean;
    eval(context: Scope): any;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    equalsVal(right: Expression<any>): boolean;
    readonly name: string;
    readonly args: Expression<{}>[];
}
