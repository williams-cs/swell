import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class VariableNode implements Expression<any> {
    private _name;
    private _newLine;
    constructor(name: string);
    eval(context: Scope): any;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    toString(): string;
    readonly name: string;
    newLine(): boolean;
}
