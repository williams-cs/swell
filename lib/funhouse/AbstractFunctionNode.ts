import { Argument } from "./Argument";
import { Expression } from "../Expression";

export abstract class AbstractFunctionNode<T extends AbstractFunctionNode<T>> extends Expression<T> {

    /**
     * Argument map for functions. Begins with positional args first, then
     * follows with optional named args. Positionals don't have default value and
     * must be supplied, while optional named args MUST have default values.
     * Note: Map traversal is in order of insertion.
     */
    protected argMap: Map<string, Argument<any>>;

    // Function's name
    protected abstract name: string;

    constructor(args: Array<[string, Expression<any>]>, ws: string = "") {
        super(ws);

        // Initialize argument map and check if valid
        this.argMap = this.initArgMap();
        let isCheckingPositional: boolean = true;
        let posCount: number = 0;
        for (let [key, param] of this.argMap) {
            if (isCheckingPositional) {
                if (!param.positional) {
                    isCheckingPositional = false;
                } else if (param.value !== undefined) {
                    throw(`Invalid positional argument's value: Argument "${key}" must not have a default value.`);
                } else {
                    posCount++;
                }
            } else {
                if (param.positional) {
                    throw(`Invalid positional argument: "${key}" should not be positional.`);
                }
                if (param.value === undefined) {
                    throw(`Invalid optional argument: Optional arg "${key}" must have a default value.`);
                }
            }
        }

        // Check number of provided arguments
        if (args.length > this.argMap.size || args.length < posCount) {
            throw(`Expected ${this.argMap.size != posCount ? posCount + "-" : ""}${this.argMap.size} arguments, got ${args.length}.`);
        }

        // Set positional arguments
        let count: number = 0;
        for (let key of this.argMap.keys()) {
            if (count == posCount) {
                break;
            }
            let arg: [string, Expression<any>] = args[count];
            let argName: string = arg[0];
            if (argName != "" && argName != key) {
                throw(`Invalid positional argument name: Expected "${key}" in position ${count}, got "${argName}"`);
            }
            this.argMap.get(key).value = arg[1];
            count++;
        }

        // Set optional arguments
        for (let i = posCount; i < args.length; i++) {
            let arg: [string, Expression<any>] = args[i];
            let argName: string = arg[0];
            if (argName == "") {
                throw("Missing argument name");
            }
            if (!this.argMap.get(argName)) {
                throw(`Invalid argument name: ${argName}`);
            }
            this.argMap.get(argName).value = arg[1];
        }
    }

    /**
     * Initialize the argument map of the function. Must begin with positional first,
     * then optional named args. Positionals MUST NOT have default values, while
     * optionals MUST have default values.
     */
    abstract initArgMap(): Map<string, Argument<any>>;

    /**
     * Get argument value from argument map given arg name
     * @param argName Name of argument to get
     */
    getArg(argName: string): Expression<any> {
        return this.argMap.get(argName).value;
    }

    /**
     * Set the argument's value
     * @param argName Name of argument to set values
     * @param value Value to set
     */
    setArg(argName: string, value: Expression<any>): void {
        this.argMap.get(argName).value = value;
    }

    toString(): string {
        let argString: string = "";
        for (let [key, arg] of this.argMap) {
            argString += arg.positional ? `${arg.value}, ` : `${key} = ${arg.value}, `;
        }
        if (this.argMap.size > 0) {
            argString = argString.slice(0, argString.length - 2);
        }
        return `${this.ws}${this.name}(${argString})`;
    }
}
