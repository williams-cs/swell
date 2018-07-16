import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
export declare class ColorNode implements Expression<string> {
    private _red;
    private _green;
    private _blue;
    constructor(red: number, green: number, blue: number);
    draw(context: Scope, x: number, y: number): void;
    eval(context: Scope): string;
    red: number;
    green: number;
    blue: number;
}
