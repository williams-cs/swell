import { Expression } from '../Expression';
import { Scope } from '../Scope';
export declare class VariableNode implements Expression<any> {
    private _name;
    constructor(name: string);
    draw(context: Scope): void;
    eval(context: Scope): any;
    readonly name: string;
}
