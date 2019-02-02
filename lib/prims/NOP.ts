import { Expression } from "../Expression";
import {Scope} from '../structural/Scope';
import { Dimensions } from "../structural/Dimensions";

export class NOP extends Expression<NOP>{

    constructor() {
        super("", true);
    }

    eval(context: Scope): NOP {
        return this;
    }

    toString(): string {
        return "";
    }

    equals(right: Expression<any>): boolean{
        return false;
    }
}
