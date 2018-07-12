import {Expression} from '../Expression';
import {Scope} from '../Scope';
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

    draw(context: Scope): void {
        let e = new StringEffect();
        e.draw(context);
    }

    set str(value: string){
        this._str = value;
    }

    get str(): string{
        return this._str;
    }
}