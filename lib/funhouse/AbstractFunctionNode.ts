import { Argument } from "./Argument";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";

export abstract class AbstractFunctionNode<T extends Expression<any>> extends Expression<T> {

    // Function's name
    protected abstract name: string;

    /**
     * Argument map for functions. Begins with positional args first, then
     * follows with optional named args. Positionals don't have default value and
     * must be supplied, while optional named args MUST have default values.
     * Note: Map traversal is in order of insertion.
     */
    protected argMap: Map<string, Argument<any>>;

    /**
     * Constructor for an abstract function
     * @param args array of arguments
     * @param lws The whitespace preceding the expression
     * @param rws The whitespace after the expression
     */
    constructor(args: Array<[string, Expression<any>]>, lws: string = "", rws: string = "") {
        super(lws, rws);
        this.initArg(args);
    }

    private initArg(args: Array<[string, Expression<any>]>) {
        // Check values of arg maps
        let posArgMap: Map<string, Argument<any>> = this.getPositionalArgMap();
        for (let [key, arg] of posArgMap) {
            if (arg.value != undefined) {
                throw(`Positional argument "${key}" must not have a default value`);
            }
            if (!arg.isPositional) {
                throw(`Positional argument "${key}" must have isPositional equals true`);
            }
        }
        let optArgMap: Map<string, Argument<any>> = this.getOptionalArgMap();
        for (let [key, arg] of optArgMap) {
            if (arg.value == undefined) {
                throw(`Optional argument "${key}" must have a default value`);
            }
            if (arg.isPositional) {
                throw(`Optional argument "${key}" must have isPositional equals false`);
            }
        }

        // Check for duplicate arg names
        let argNames: string[] = Array.from(posArgMap.keys()).concat(Array.from(optArgMap.keys()));
        if ((new Set(argNames)).size != argNames.length) {
            throw(`Duplicate argument names in function definition`);
        }
        argNames = args.map(([key, arg]) => key).filter(name => name != "");
        if ((new Set(argNames)).size != argNames.length) {
            throw(`Duplicate input argument names`);
        }

        let posArgCount: number = posArgMap.size;
        let optArgCount: number = optArgMap.size;
        let providedArgCount: number = args.length;
        let totalArgCount: number = posArgCount + optArgCount;
        if (providedArgCount > totalArgCount || providedArgCount < posArgCount) {
            throw(`Expected ${optArgCount != 0 ? posArgCount + "-" : ""}${totalArgCount} argument(s), got ${providedArgCount}.`);
        }

        // Set positional arguments - MUST be in order
        this.argMap = posArgMap;
        let count: number = 0;
        for (let [key, arg] of this.argMap) {
            let inputArg: [string, Expression<any>] = args[count];
            let argName: string = inputArg[0];
            if (argName != "" && argName != key) {
                throw(`Invalid positional argument name: Expected "${key}" in position ${count}, got "${argName}"`);
            }
            arg.value = inputArg[1];
            if (argName != "") {
                arg.alwaysVisible = true;
            }
            count++;
        }

        // Set provided optional arguments - can be any order
        for (let i = count; i < args.length; i++) {
            let arg: [string, Expression<any>] = args[i];
            let argName: string = arg[0];
            if (argName == "") {
                throw("Missing argument name");
            }
            let optArg: Argument<any> = optArgMap.get(argName);
            if (!optArg) {
                throw(`Invalid argument name: "${argName}"`);
            }
            optArg.value = arg[1];
            optArg.isModified = true;
            this.argMap.set(argName, optArg);
        }

        // Set remaining optional arguments
        for (let [key, arg] of optArgMap) {
            if (!this.argMap.get(key)) {
                this.argMap.set(key, arg);
            }
        }
    }

    /**
     * Initialize positional argument map. Positional argument should not have
     * default values
     */
    getPositionalArgMap(): Map<string, Argument<any>> {
        return new Map<string, Argument<any>>();
    };

    /**
     * Initialize optional argument map. Optional argument should have default values
     */
    getOptionalArgMap(): Map<string, Argument<any>> {
        return new Map<string, Argument<any>>();
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
     * @param context Program's current context
     * @param value The value to give to the argument
     */
    updateArgValue(argName: string, context: Scope, value: any): void {
        let arg: Argument<any> = this.argMap.get(argName);
        if (arg === undefined) {
            throw(`Invalid argument name "${argName}" to function "${this.name}"`);
        }
        arg.value.eval(context).val = value;
        arg.isModified = true;
    }

    toString(): string {
        let argString: string = "";
        for (let [key, arg] of this.argMap) {
            if (arg.isPositional || arg.isModified) {
                argString += (arg.isPositional && !arg.alwaysVisible) ? `${arg.value}, ` : `${key} = ${arg.value}, `;
            }
        }
        if (this.argMap.size > 0) {
            argString = argString.slice(0, argString.length - 2);
        }
        return `${this.lws}${this.name}${this.rws}(${argString})`;
    }
}
