import {Expression} from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';

export class FunDef<T> implements Expression<T>{
    private _name: string;
    private _body: Expression<T>;
    private _args: string[];
    private _funScope: Scope;
    private _newLine : boolean = true;

    constructor(name: string, body: Expression<T>, args?: string[]){
        this._name = name;
        this._body = body;
        this._args = args;
    };

    // Binds args in context of definition; no values
    // Binds name to parent context (cur context is new context)
    eval(context: Scope): any{
        this._funScope = new Scope(context);
        
        /*
        if(this._args != null){
            for(let entry of this._args){
                this._funScope.declare(entry);
            }
        }
        */
        context.declare(this._name); // assign with val function
        context.assign(this._name,this); // parent or current?
        return null;
    }

    newLine() : boolean {
        return this._newLine;
    }

    toString() : string {
        let argsList= ''
        for (let i =0 ; i < this._args.length-1; i++) {
            argsList += this._args[i] + ", ";
        }
        argsList += this._args[this._args.length-1];
        return "fun " + this._name + "(" + argsList + ')' + ' {\n ' + this._body.toString() + '}';
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals directly on functions");
    }

    // Get methods
    get name(): string{
        return this._name;
    }
    get body(): Expression<T>{
        return this._body;
    }
    get args(): string[]{
        return this._args;
    }
    get scope(): Scope{
        return this._funScope;
    }
}