import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';

export class VariableNode extends Expression<any> {

    /**
     * Constructor for a VariableNode, a node representing a variable
     * @param name The variable name
     * @param ws Preceding whitespace
     */
    constructor(private _name: string, ws: string = "") {
        super(ws, false);
    }

    /**
     * Looks up the value of the variable in the context
     * @param context The current program context
     */
    eval(context: Scope): any {
        return context.lookup(this.name, context);
    }

    toString(): string {
        return this.ws + this.name;
    }

    get name(): string {
        return this._name;
    }
}
