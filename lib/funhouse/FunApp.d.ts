import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
export declare class FunApp<T> implements Expression<T> {
    private _name;
    private _args;
    private _defaultValue;
    constructor(name: string, args?: any[], defaultValue?: T);
    eval(context: Scope): any;
    draw(context: Scope): void;
    readonly name: string;
}
