import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class ColorNode implements Expression<string> {
    private _red;
    private _green;
    private _blue;
    constructor(red: number, green: number, blue: number);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    eval(context: Scope): string;
    red: number;
    green: number;
    blue: number;
}
