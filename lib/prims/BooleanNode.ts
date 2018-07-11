import { Scope, Expression } from "..";

export class BooleanNode implements Expression<boolean>{
    private _val: boolean;

    constructor(val: boolean){
        //super(parent);
        this._val = val;
    };
    
    eval(context: Scope): boolean {
        return this._val;
    }

    draw(context: Scope): void {
    
    }

    get val(): boolean{
        return this._val;
    }
    set val(value: boolean){
        this._val = value;
    }
}