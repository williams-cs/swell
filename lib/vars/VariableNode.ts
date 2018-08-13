import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';

export class VariableNode implements Expression<any>{
    private _name: string;
    private _newLine: boolean = false;
    private _ws: string;
    
    /**
     * Constructor for a VariableNode, a node representing a variable
     * @param name The variable name
     * @param ws Preceding whitespace
     */
    constructor(name: string, ws?: string){
        this._name = name;
        this._ws = ws;
        if(ws == undefined){
            this._ws = "";
        }
    }
    
    /**
     * Looks up the value of the variable in the context
     * @param context The current program context
     */
    eval(context: Scope): any {
        return context.lookup(this._name, context);
    }

    /**
     * VariableNodes cannot be drawn directly
     * @param context 
     * @param dims
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Cannot call draw on variable nodes");
    }

    /**
     * Equals cannot be called directly on VariableNodes
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot directly compare vars, eval first");
    }

    /**
     * Returns a string representation of the VariableNode
     */
    toString(): string {
        return this._ws + this._name;
    }
    
    /**
     * Returns the name of the variable
     */
    get name(): string{
        return this._name;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}