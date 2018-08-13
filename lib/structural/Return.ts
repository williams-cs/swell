import { Expression } from "../Expression";
import { ReturnError } from "./ReturnError";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";

export class Return implements Expression<any>{
    private _expr: Expression<any>;
    private _newLine: boolean = false;
    private _ws: string;

    /**
     * Constructor for a Return object, representing something to be returned in a function
     * @param expr The expression to be returned
     * @param ws Preceding whitespace
     */
    constructor(expr: Expression<any>, ws?: string){
        this._expr = expr;
        this._ws = ws;
        if (ws == undefined){
            this._ws = "";
        }
    }

    /**
     * Evaluates the expression to be returned and returns via a ReturnErro
     * @param context The current program context
     */
    eval(context: Scope){
        // If return val is a var, returns that var's value
        let result = this._expr.eval(context); 
        throw new ReturnError(result,context.retIDLookup());
    }

    /**
     * Equals cannot be called directly on Return nodes
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on Return");
    }
    
    /**
     * Returns a string representation of the Return node
     */
    toString(): string {
        return this._ws + "return " + this._expr.toString();
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }

    /**
     * Return nodes cannot be drawn directly
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Cannot call draw on Return");
    }
}