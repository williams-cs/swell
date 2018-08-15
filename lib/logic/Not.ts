import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import { BooleanNode } from "../prims/BooleanNode";

export class Not implements Expression<BooleanNode>{
    private _expr: Expression<any>;
    private _newLine: boolean = false;
    private _ws: string;

    /**
     * Constructor for the logical Not (!) operation
     * @param expr The expression to be operated on (must be a BooleanNode)
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
     * Performs the Not operation and returns BooleanNode with result
     * @param context The current program context
     */
    eval(context: Scope): BooleanNode {
        let e = this._expr.eval(context);
        if (e instanceof BooleanNode) {
            return new BooleanNode(!e.val);
        } else {
            throw new Error("The argument to the ! operator must be boolean.");
        }
    }

    /**
     * Returns a string representation of the operation
     */
    toString(): string {
        return this._ws + "not " + this._expr.toString();
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }

    /**
     * Equals cannot be called directly on a Not op
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on logical ops");
    }

    /**
     * Not operations cannot be drawn directly
     */
    draw(){
        throw new Error("Cannot call draw on logical ops");
    }

    /**
     * Returns expression to be operated on
     */
    get expr(): Expression<any>{
        return this._expr;
    }
}