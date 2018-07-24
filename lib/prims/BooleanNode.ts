import { Expression } from "../Expression"; 
import {Scope} from '../structural/Scope'; 
import { Dimensions } from "../structural/Dimensions";

export class BooleanNode implements Expression<BooleanNode>{
    private _val: boolean;

    constructor(val: boolean){
        //super(parent);
        this._val = val;
    };
    
    eval(context: Scope): BooleanNode {
        return this;
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }

    get val(): boolean{
        return this._val;
    }
    set val(value: boolean){
        this._val = value;
    }
}