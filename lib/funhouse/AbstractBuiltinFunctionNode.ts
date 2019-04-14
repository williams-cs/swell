import { AbstractFunctionNode } from "./AbstractFunctionNode";
import { Argument } from "./Argument";
import { OptionalArg } from "./OptionalArg";
import { PositionalArg } from "./PositionalArg";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";

export abstract class AbstractBuiltinFunctionNode<T extends Expression<any>> extends AbstractFunctionNode<T> {

    constructor(
        args: Array<[string, string, string, Expression<any>, string]>,
        preWS: string = "", postWS: string = "", emptyArgWS: string = ""
    ) {
        super(args, preWS, postWS, emptyArgWS);
        this.initArg(this.getPositionalArgMap(), this.getOptionalArgMap());
    }

    /**
     * Initialize positional argument map. Positional argument should not have
     * default values
     */
    getPositionalArgMap(): Map<string, PositionalArg<any>> {
        return new Map();
    };

    /**
     * Initialize optional argument map. Optional argument should have default values
     */
    getOptionalArgMap(): Map<string, OptionalArg<any>> {
        return new Map();
    };

    /**
     * Get argument value from argument map given arg name
     * @param argName Name of argument to get
     */
    getArg(argName: string): Expression<any> {
        let arg: Argument<any> = this.argMap.get(argName);
        if (arg === undefined) {
            throw(`Invalid argument name "${argName}" to function "${this.name}"`);
        }
        return arg.value;
    }

    /**
     * Set the argument's value
     * @param argName Name of argument to set values
     * @param value Value to set
     */
    setArg(argName: string, value: Expression<any>): void {
        this.argMap.get(argName).value = value;
    }

    /**
     * Update argument's value and mark as modified
     * @param argName Name of argument to update
     * @param scope Program's current context
     * @param value The value to give to the argument
     */
    updateArgValue(argName: string, scope: Scope, value: any): void {
        let arg: Argument<any> = this.argMap.get(argName);
        if (arg === undefined) {
            throw(`Invalid argument name "${argName}" to function "${this.name}"`);
        }
        arg.value.eval(scope).val = value;
        arg.isModified = true;
    }
}
