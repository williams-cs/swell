import { Scope, Expression } from "../..";

export class BooleanNode implements Expression<BooleanNode>{
    private _val: boolean;

    constructor(val: boolean){
        //super(parent);
        this._val = val;
    };
    
    eval(context: Scope): BooleanNode {
        return this;
    }

    draw(context: Scope, x: number, y: number): void {
    
    }

    get val(): boolean{
        return this._val;
    }
    set val(value: boolean){
        this._val = value;
    }
}