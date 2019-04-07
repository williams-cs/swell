import { Expression } from '../Expression';
import { BodyNode } from '../structural/BodyNode';
import { Argument } from '../funhouse/Argument';
import { Scope } from '../structural/Scope';
import { VariableNode } from '../vars/VariableNode';

export class FunDef<T> extends Expression<T> {
    private _name: string;
    private _body: BodyNode;
    private _args: Argument<VariableNode>[];
    private _funScope: Scope;
    private _rws: string;

    constructor(name: string, body: BodyNode, args?: Argument<VariableNode>[], ws: string = "", rws: string = "") {
        super(ws);
        this._name = name;
        this._body = body;
        this._args = args;
        this._rws = rws;
    };

    // Binds args in context of definition; no values
    // Binds name to parent context (cur context is new context)
    eval(context: Scope): any {
        this._funScope = context.copy(false);
        context.assign(this._name, this); // parent or current?
    }

    toString(): string {
        let argsList = ''
        let argsVal = this._args;
        if (argsVal.length > 0) {
            for (let i = 0; i < argsVal.length - 1; i++) {
                argsList += argsVal[i].value.name + ", ";
            }
            argsList += argsVal[argsVal.length - 1].value.name;
        }
        return `${this.ws}fun${this._rws}${this.name}(${argsList})${this.body}`;
    }

    get name(): string {
        return this._name;
    }
    get body(): Expression<BodyNode> {
        return this._body;
    }
    get args(): Argument<any>[] {
        return this._args;
    }
    get scope(): Scope {
        return this._funScope;
    }
}
