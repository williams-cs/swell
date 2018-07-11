import { Expression } from '../Expression';
import { Scope } from '../Scope';
export declare class VariableNode implements Expression<any> {
    private _name;
    constructor(name: string);
    eval(context: Scope): any;
    draw(context: Scope): void;
    readonly name: string;
}
