import {Expression, Scope} from '../..';

export class FunDef<T> implements Expression<T>{
    private _name: string;
    private _body: Expression<T>;
    private _args: string[];
    private _funScope: Scope;

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

    draw(context: Scope, x: number, y: number): void {
        //NO
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