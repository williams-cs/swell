import { Expression } from "../Expression"
import { Scope } from "../structural/Scope"

export class SingleComment extends Expression<any> {

    //comment stored after //
    protected comment: string;

    constructor(comment: string, ws: string){
        super(ws);
        this.comment = comment;
    }

    eval(scope: Scope) { 

    }

    toString(): string{
        return this.ws + "//" + this.comment;
    }
}