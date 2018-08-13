import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import { BooleanNode } from "../prims/BooleanNode";

export class Conditional implements Expression<any>{
    private _test: Expression<any>;
    private _trueBranch: Expression<any>;
    private _falseBranch: Expression<any>;
    private _newLine : boolean = true;
    
    /**
     * The constructor for conditionals (if, else if, and else statements)
     * @param test The condition of the statement
     * @param trueBranch The branch to follow if the condition evaluates to true
     * @param falseBranch The branch to follow if the condition evaluates to false
     */
    constructor(test: Expression<any>, trueBranch: Expression<any>, falseBranch?: Expression<any>){
        this._test = test;
        this._trueBranch = trueBranch;
        this._falseBranch = falseBranch;
    }

    /**
     * Checks the test result and returns the result of the true or false branch, depending on the test
     * @param context The current program context
     */
    eval(context: Scope){
        let childCtx = new Scope(context);
        let res = this._test.eval(childCtx);
        if(!(res instanceof BooleanNode)){
            throw new Error("The condition must be a boolean expression.");
        } 
        if(res.val){
            return this._trueBranch.eval(childCtx);
        } else if(this._falseBranch != null) { // check if else/else if is null or undefined
            return this._falseBranch.eval(childCtx); // possibly a bad idea
        }
    }

    /**
     * Returns a string representation of the conditional statement
     */
    toString(): string {
        let res = 'if(' +this._test.toString() + ") {\n " + this._trueBranch.toString() + "}";
        if(this._falseBranch !== undefined){
            res += '\nelse {\n ' + this._falseBranch.toString() + '}'
        }
        return res;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }

    /**
     * Returns the true branch of the conditional
     */
    get trueBranch(): Expression<any>{
        return this._trueBranch;
    }

    /**
     * Returns the false branch of the conditional
     */
    get falseBranch(): Expression<any>{
        return this._falseBranch;
    }

    /**
     * Conditionals cannot be drawn directly
     */
    draw(): void {
        throw new Error("Not implemented");
    }

    /**
     * Equals cannot be called directly on a conditional
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals directly on conditionals");
    }
}