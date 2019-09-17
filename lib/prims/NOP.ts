import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';

export class NOP extends Expression<NOP>{

    constructor() {
        super("");
    }

    eval(scope: Scope): NOP {
        return this;
    }

    toString(): string {
        return "";
    }

    equals(right: Expression<any>): boolean{
        return false;
    }
}
