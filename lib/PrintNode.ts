import { Expression } from "./Expression";
import { Scope } from "./Scope";

export class PrintNode implements Expression<void>{
    private _toPrint: Expression<any>
    constructor(toPrint: Expression<any>){
        this._toPrint = toPrint;
    }

    draw(context: Scope): void {
    
    }

    // eval param and call draw
    eval(context: Scope): void{
        this._toPrint.draw(context);
    }
}