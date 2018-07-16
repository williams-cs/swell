import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
export declare class VariableNode implements Expression<any> {
    private _name;
    constructor(name: string);
    eval(context: Scope): any;
    draw(context: Scope, x: number, y: number): void;
    readonly name: string;
}
