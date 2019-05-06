import { Argument } from "./Argument";
import { OptionalArg } from "./OptionalArg";
import { PositionalArg } from "./PositionalArg";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import clone = require("clone");

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

    protected _commentOut: boolean = false;

    /**
     * Constructor for an abstract function
     * @param args array of arguments
     * @param preWS Whitespace preceding the function name
     * @param postWS Whitespace between the function and the parentheses
     * @param emptyArgWS Whitespace when there's no argument in the parantheses
     */
    constructor(
        private args: Array<[string, string, string, Expression<any>, string]>,
        preWS: string = "", private postWS: string = "", private emptyArgWS: string = ""
    ) {
        super(preWS);
    }

    /**
     * @param args Argument list
     * @param posArgMap Positional arg map
     * @param optArgMap Optional arg map
     */
    protected initArg(
        posArgMap: Map<string, Argument<any>>,
        optArgMap: Map<string, Argument<any>>,
    ) {
        // Check values of arg maps
        for (let [key, arg] of posArgMap) {
            if (arg.value !== undefined && arg.value !== null) {
                throw(`Positional argument "${key}" must not have a default value`);
            }
            if (!arg.isPositional) {
                throw(`Positional argument "${key}" must have isPositional equals true`);
            }
        }

        for (let [key, arg] of optArgMap) {
            if (arg.value === undefined || arg.value === null) {
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
        argNames = this.args.map(([preWS, key, arg, postWS]) => key).filter(name => name != "");
        if ((new Set(argNames)).size != argNames.length) {
            throw(`Duplicate input argument names`);
        }

        let posArgCount: number = posArgMap.size;
        let optArgCount: number = optArgMap.size;
        let providedArgCount: number = this.args.length;
        let totalArgCount: number = posArgCount + optArgCount;
        if (providedArgCount > totalArgCount || providedArgCount < posArgCount) {
            throw(`Expected ${optArgCount != 0 ? posArgCount + "-" : ""}${totalArgCount} argument(s), got ${providedArgCount}.`);
        }

        // Set positional arguments - MUST be in order
        this.argMap = new Map();
        let count: number = 0;
        for (let [key, _] of posArgMap) {
            let arg: [string, string, string, Expression<any>, string] = this.args[count];
            let argName: string = arg[1];
            if (argName != "" && argName != key) {
                throw(`Invalid positional argument name: Expected "${key}" in position ${count}, got "${argName}"`);
            }
            this.argMap.set(key, new PositionalArg(arg[3], argName != "", arg[0], arg[2], arg[4]));
            count++;
        }

        // Set unnamed optional arguments - must be in order
        for (let [key, _] of optArgMap) {
            if (count >= providedArgCount) {
                break;
            }
            let arg: [string, string, string, Expression<any>, string] = this.args[count];
            if (arg[1] != "") {
                break;
            }
            this.argMap.set(key, new OptionalArg(arg[3], false, arg[0], arg[2], arg[4]));
            count++;
        }

        // Set named optional arguments - can be any order
        for (let i = count; i < providedArgCount; i++) {
            let arg: [string, string, string, Expression<any>, string] = this.args[i];
            let argName: string = arg[1];
            if (argName == "") {
                throw("Unnamed optional argument cannot follow named optional argument");
            }
            if (!optArgMap.get(argName)) {
                throw(`Invalid optional argument name: "${argName}"`);
            }
            this.argMap.set(argName, new OptionalArg(arg[3], true, arg[0], arg[2], arg[4]));
        }

        // Set remaining optional arguments
        for (let [key, arg] of optArgMap) {
            if (!this.argMap.get(key)) {
                this.argMap.set(key, arg);
            }
        }
    }

    toString(): string {
        let com: string = "";
        if (this._commentOut) com = "//";
        let argString: string = "";
        if (this.argMap != undefined) {
            for (let [key, arg] of this.argMap) {
                argString += (arg.alwaysVisible || (!arg.isPositional && arg.isModified))
                    ? `${arg.preArgNameWS}${key}${arg.preEqualWS}=${arg.value}${arg.postExprWS},`
                    : (arg.isPositional ? `${arg.preArgNameWS}${arg.value}${arg.postExprWS},` : "");
            }
            argString = argString.slice(0, argString.length - 1);
        } else {
            argString = this.emptyArgWS;
        }
        return `${com}${this.ws}${this.name}${this.postWS}(${argString})`;
    }

    commentOut() {
        this._commentOut = true;
    }
}
