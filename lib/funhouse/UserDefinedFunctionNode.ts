import { AbstractFunctionNode } from "./AbstractFunctionNode";
import { Argument } from "./Argument";
import { Expression } from "../Expression";
import { FunDef } from "./FunDef";
import { Scope } from "../structural/Scope";

export class UserDefinedFunctionNode extends AbstractFunctionNode<Expression<any>> {

    protected name: string;

    /**
     * @param name Name of function
     * @param args Argument lists
     * @param preWS Whitespace preceding the function name
     * @param postWS Whitespace between the function and the parentheses
     * @param emptyArgWS Whitespace when there's no argument in the parantheses
     */
    constructor(
        name: string, args: Array<[string, string, string, Expression<any>, string]>,
        preWS: string = "", postWS: string = "", emptyArgWS: string = ""
    ) {
        super(args, preWS, postWS, emptyArgWS);
        this.name = name;
    }

    eval(scope: Scope): any {
        let funDef: FunDef = scope.lookup(this.name); // looking up function
        let funScope: Scope = funDef.scope; // Scope is copied

        this.initArg(funDef.posArgMap, funDef.optArgMap);
        for (let [key, arg] of this.argMap) {
            funScope.assign(key, arg.value.eval(scope));
        }

        return funDef.body.eval(funScope);
    }
}
