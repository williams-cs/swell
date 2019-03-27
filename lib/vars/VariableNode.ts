import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';

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
    eval(scope: Scope): any {
        return scope.lookup(this.name);
    }

    get name(): string {
        return this._name;
    }

    toString(): string {
        return this.ws + this.name;
    }
}
