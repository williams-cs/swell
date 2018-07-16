import {Expression, Scope, StringEffect} from '../..';

// Nodes representing strings
// Should abstract Node class implement Expression?

export class StringNode implements Expression<StringNode>{
    private _str: string;
    constructor(str: string){
        this._str = str;
    };

    eval(context: Scope): StringNode {
        return this;
    }

    draw(context: Scope, x: number, y: number): void {
        //let e = new StringEffect(this);
        let e = new StringEffect(this);
        e.draw(context, x, y);
    }

    set str(value: string){
        this._str = value;
    }

    get val(): string{
        return this._str;
    }
}