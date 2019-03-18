import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { Argument } from '../funhouse/Argument';
import { Some } from "space-lift";

export class ParensNode extends Expression<any>{

    private _content: Argument<any>[];
    /**
     * The constructor for parens nodes that follow if, function def, or repeat node
     * @param content expression between curly braces 
     * @param ws Preceding whitespace
     */
    constructor(
        content: Argument<any>[],
        ws: string = "",
    ) {
        super(ws);
        this._content = content;
    }

    eval(context: Scope) {
        if(this._content.length == 1) return this._content[0].value.eval(context);
    }

    toString(): string {
        let argStr = "";
        for(let e of this._content){
            argStr += `${e.toString()},`; 
        }
        argStr = argStr.slice(0, argStr.length - 1);
        return `${this.ws}(${argStr})`;
    }

    get expr(): Argument<any>[] {
        return this._content;
    }
}
