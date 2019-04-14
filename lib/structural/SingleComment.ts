import { Expression } from "../Expression"
import { Scope } from "../structural/Scope"

export class SingleComment extends Expression<any> {

    protected comment: string;

    constructor(comment: string, ws: string){
        super(ws);
    }

    eval(scope: Scope): void{}

    toString(): string{
        return this.ws + "\\" + this.comment;
    }
}