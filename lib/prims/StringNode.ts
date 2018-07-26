import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { StringEffect } from '../effects/StringEffect';
import { Dimensions } from '../structural/Dimensions';
import { PrintNode } from '../structural/PrintNode';
//import{Node} from './Node';

// Nodes representing strings
// Should abstract Node class implement Expression?

export class StringNode implements Expression<StringNode>{

    private _str: string;
    private _newLine : boolean = false;

    constructor(str: string){
        this._str = str;
    }

    eval(context: Scope): StringNode {
        return this;
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        let e = new StringEffect(this);
        e.draw(context, dims, ast);
    }
    
    toString() : string {
        return '\"' + this._str + '\"';
    }

    set str(value: string){
        this._str = value;
    }

    get val(): string {
        return this._str;
    }

    newLine() : boolean {
        return this._newLine;
    }
}