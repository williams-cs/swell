import {Expression} from './Expression';
import {Scope} from './Scope';
//import{Node} from './Node';

// Nodes representing strings
// Should abstract Node class implement Expression?

export class StringNode implements Expression<string>{
    private _str: string;
    constructor(str: string){
        this._str = str;
    };

    eval(context: Scope): string {
        return this._str;
    }

    set str(value: string){
        this._str = value;
    }

    get str(): string{
        return this._str;
    }
}