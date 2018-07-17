import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { StringEffect } from '../effects/StringEffect';
//import{Node} from './Node';

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
        let e = new StringEffect(this);
        console.log("string effect created");
        e.draw(context, x, y);
        console.log("draw method called");
    }

    set str(value: string){
        this._str = value;
    }

    get val(): string{
        return this._str;
    }
}