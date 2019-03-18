import { Expression } from '../Expression';
import { BodyNode } from '../structural/BodyNode';
import { ParensNode } from '../structural/ParensNode';
import { Argument } from '../funhouse/Argument';
import { Scope } from '../structural/Scope';
import { VariableNode } from '../vars/VariableNode';

export class FunDef<T> extends Expression<T> {
    private _name: string;
    private _body: BodyNode;
    private _args: ParensNode;
    private _funScope: Scope;
    private _rws: string;

    constructor(name: string, body: BodyNode, args?: ParensNode, ws: string = "", rws: string = "") {
        super(ws);
        this._name = name;
        this._body = body;
        this._args = args;
        this._rws = rws;
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
        return `${this.ws}fun${this._rws}${this.name}${this._args}${this.body}`;
    }

    get name(): string {
        return this._name;
    }
    get body(): Expression<BodyNode> {
        return this._body;
    }
    get args(): Argument<any>[] {
        return this._args.expr;
    }
    get scope(): Scope {
        return this._funScope;
    }
}
