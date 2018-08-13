import { Expression } from "../Expression"; 
import {Scope} from '../structural/Scope'; 
import { Dimensions } from "../structural/Dimensions";

export class BooleanNode implements Expression<BooleanNode>{
    private _val: boolean;
    private _newLine: boolean = false;
    private _ws: string;

    /**
     * Constructor for BooleanNode, a node representing a boolean
     * @param val The boolean value of the BooleanNode
     * @param ws Preceding white space
     */
    constructor(val: boolean, ws?: string){
        this._val = val;
        this._ws = ws;
        if (ws == undefined) {
            this._ws= "";
        }
    };
    
    /**
     * Returns the BooleanNode
     * @param context The current program context
     */
    eval(context: Scope): BooleanNode {
        return this;
    }

    /**
     * BooleanNodes cannot be drawn directly
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    /**
     * Returns whether this BooleanNode equals another
     * @param right The right side of the equality
     */
    equalsVal(right: Expression<any>): boolean{
        if(right instanceof BooleanNode){
            return this.val === right.val;
        }
        return false;
    }
    
    /**
     * Returns a string representation of the BooleanNode
     */
    toString(): string {
        return this._ws + this._val;
    }

    /**
     * Returns the boolean value
     */
    get val(): boolean{
        return this._val;
    }
    /**
     * Sets the boolean value
     */
    set val(value: boolean){
        this._val = value;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
    
}