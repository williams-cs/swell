import { Expression } from '../Expression';
import { Scope } from '../Scope';
export declare class ColorNode implements Expression<string> {
    private _red;
    private _green;
    private _blue;
    constructor(red: number, green: number, blue: number);
    draw(context: Scope): void;
    eval(context: Scope): string;
    red: number;
    green: number;
    blue: number;
}
