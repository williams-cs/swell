import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';

export class VariableNode extends Expression<any> {

    /**
     * Constructor for a VariableNode, a node representing a variable
     * @param name The variable name
     * @param lws Preceding whitespace
     * @param rws Post whitespace
     */
    constructor(private _name: string, lws: string = "", rws: string = "") {
        super(lws, rws, false);
    }

    /**
     * Looks up the value of the variable in the context
     * @param context The current program context
     */
    eval(context: Scope): any {
        return context.lookup(this.name, context);
    }

    toString(): string {
        return this.lws + this.name + this.rws;
    }

    get name(): string {
        return this._name;
    }
}
