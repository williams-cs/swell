import { Expression } from "../Expression"; 
import {Scope} from '../structural/Scope'; 
import { Dimensions } from "../structural/Dimensions";

export class NOP implements Expression<NOP>{
    private _newLine : boolean = true;
    eval(context: Scope): NOP {
        return this;
    }
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {}

    toString() : string {
        return "";
    }

    equalsVal(right: Expression<any>): boolean{
        return false;
    }

    newLine() : boolean {
        return this._newLine;
    }
}