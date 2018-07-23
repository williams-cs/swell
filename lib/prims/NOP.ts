import { Expression } from "../Expression"; 
import {Scope} from '../structural/Scope'; 
import { Dimensions } from "../structural/Dimensions";

export class NOP implements Expression<NOP>{
    eval(context: Scope): NOP {
        return this;
    }
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {}
}