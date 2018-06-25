import {Expression} from './Expression';
import { Scope } from './Scope';
import { BodyNode } from './BodyNode';

export class FunDef implements Expression<any>{
    private _name: string;
    private _body: BodyNode;
    private _args: string[];

    constructor(name: string, body: BodyNode, args?: string[]){
        this._name = name;
        this._body = body;
        this._args = args;
    };

    // Binds args in context of definition; no values
    // Binds name to parent context
    eval(context: Scope): any{
        for(let entry of this._args){
            context.declare(entry);
        }
        context.parent.declare(this._name);
    }

    // Get methods
    get name(): string{
        return this._name;
    }
    get body(): BodyNode{
        return this._body;
    }
    get args(): string[]{
        return this._args;
    }
}