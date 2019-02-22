import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';

export class FunDef<T> extends Expression<T> {
    private _name: string;
    private _body: Expression<T>;
    private _args: string[];
    private _funScope: Scope;

    constructor(name: string, body: Expression<T>, args?: string[], lws: string = "", rws: string = "") {
        super(lws, rws);
        this._name = name;
        this._body = body;
        this._args = args;
    };

    // Binds args in context of definition; no values
    // Binds name to parent context (cur context is new context)
    eval(context: Scope): any {
        this._funScope = new Scope(context); // ************* copy????
        this._funScope.canvas = context.canvas;
        this._funScope.eventLog = context.eventLog;
        this._funScope.effects = context.effects;
        /*
        if(this._args != null){
            for(let entry of this._args){
                this._funScope.declare(entry);
            }
        }
        */
        context.declare(this._name); // assign with val function
        context.assign(this._name, this); // parent or current?
        return null;
    }

    toString(): string {
        let argsList = ''
        if (this._args.length > 0) {
            for (let i = 0; i < this._args.length - 1; i++) {
                argsList += this._args[i] + ", ";
            }
            argsList += this._args[this._args.length - 1];
        }
        return this.lws + "fun " + this._name + this.rws + "(" + argsList + ')' + ' {\n ' + this._body.toString() + '}';
    }

    get name(): string {
        return this._name;
    }
    get body(): Expression<T> {
        return this._body;
    }
    get args(): string[] {
        return this._args;
    }
    get scope(): Scope {
        return this._funScope;
    }
}
