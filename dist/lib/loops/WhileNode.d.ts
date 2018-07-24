import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { Dimensions } from "../structural/Dimensions";
export declare class WhileNode implements Expression<any> {
    private _cond;
    private _body;
    constructor(cond: Expression<any>, body: Expression<any>);
    eval(context: Scope): any;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
}
