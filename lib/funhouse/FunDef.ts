import { Expression } from '../Expression';
import { BodyNode } from '../structural/BodyNode';
import { Argument } from '../funhouse/Argument';
import { Scope } from '../structural/Scope';

export class FunDef extends Expression<any> {

    // The scope in which this function is evaluated
    private funScope: Scope;

    // Positional argument map
    private _posArgMap: Map<string, Argument<any>>;

    // Optional argument map
    private _optArgMap: Map<string, Argument<any>>

    constructor(
        private name: string,
        private _body: BodyNode,
        args: Array<[string, string, string, Expression<any>, string]>,
        preFuncWS: string = "",
        private postFuncWS: string = "",
        private emptyArgWS: string = "",
    ) {
        super(preFuncWS);
        this._posArgMap = new Map();
        this._optArgMap = new Map();

        // Set positional arguments
        let arg_ind = 0;
        while (arg_ind < args.length) {
            let arg: [string, string, string, Expression<any>, string] = args[arg_ind];
            let arg_value: Expression<any> = arg[3];
            if (arg_value !== null && arg_value !== undefined) {
                break;
            }
            this._posArgMap.set(arg[1], new Argument<Expression<any>>(null, true, false, arg[0], arg[2], arg[4]));
            arg_ind++;
        }

        // Set optional arguments
        while (arg_ind < args.length) {
            let arg: [string, string, string, Expression<any>, string] = args[arg_ind];
            let arg_value: Expression<any> = arg[3];
            let arg_name: string = arg[1];
            if (arg_value === null || arg_value === undefined) {
                throw new Error(`Argument ${arg_name} is optional but doesn't have a default value`);
            }
            this._optArgMap.set(arg_name, new Argument<Expression<any>>(arg_value, false, false, arg[0], arg[2], arg[4]));
            arg_ind++;
        }
    };

    // Binds args in scope of definition; no values
    // Binds name to parent scope (cur context is new scope)
    eval(scope: Scope): void {
        scope.assign(this.name, this);
        this.funScope = scope.copy();
    }

    get body(): BodyNode {
        return this._body;
    }

    get scope(): Scope {
        return this.funScope.copy();
    }

    get posArgMap(): Map<string, Argument<any>> {
        return new Map(this._posArgMap);
    }

    get optArgMap(): Map<string, Argument<any>> {
        return new Map(this._optArgMap);
    }

    toString(): string {
        let argString = "";
        if (this._posArgMap.size == 0 && this._optArgMap.size == 0) {
            argString = this.emptyArgWS;
        } else {
            for (let [key, arg] of this._posArgMap) {
                argString += `${arg.preArgNameWS}${key}${arg.postExprWS},`;
            }
            for (let [key, arg] of this._optArgMap) {
                argString += `${arg.preArgNameWS}${key}${arg.preEqualWS}=${arg.value}${arg.postExprWS},`;
            }
            argString = argString.slice(0, argString.length - 1);
        }
        return `${this.ws}fun${this.postFuncWS}${this.name}(${argString})${this.body}`;
    }
}
