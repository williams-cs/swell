import { Expression } from "../Expression"; 
import {Scope} from '../structural/Scope'; 
import { Dimensions } from "../structural/Dimensions";

export class BooleanNode implements Expression<BooleanNode>{
    private _val: boolean;
    private _newLine : boolean = false;
    private _ws : string;

    constructor(val: boolean, ws : string){
        //super(parent);
        this._val = val;
        this._ws = ws;
    };
    
    eval(context: Scope): BooleanNode {
        return this;
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }
    
    toString() : string {
        return this._ws + this._val;
    }

    get val(): boolean{
        return this._val;
    }
    set val(value: boolean){
        this._val = value;
    }
    newLine() : boolean {
        return this._newLine;
    }
    
}