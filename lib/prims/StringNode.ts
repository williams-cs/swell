import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { StringEffect } from '../effects/StringEffect';
import { Dimensions } from '../structural/Dimensions';

export class StringNode implements Expression<StringNode> {

    private _str: string;
    private _newLine: boolean = false;
    private _ws: string;

    /**
     * Constructor for a StringNode, a node representing a string
     * @param str The string stored in the node
     * @param ws Preceding whitespace
     */
    constructor(str: string, ws?: string){
        this._str = str;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }

    /**
     * Returns this StringNode
     * @param context The current program context
     */
    eval(context: Scope): StringNode {
        return this;
    }

    /**
     * Draws the String using StringEffect
     * @param context The current program context
     * @param dims The dimensions of the string to be drawn
     * @param ast The program AST
     */
    draw(scope: Scope, dims: Dimensions, ast: Expression<any>): void {
        let e = new StringEffect(this, scope, dims);
        e.draw();
    }

    /**
     * Returns whether this StringNode equals another StringNode
     * @param right The right side of the equality, must be a StringNode
     */
    equalsVal(right: Expression<any>): boolean{
        if(right instanceof StringNode){
            return this.val === right.val;
        }
        return false;
    }

    /**
     * Returns a string representation of the StringNode
     */
    toString(): string {
        return this._ws + "\"" + this._str + "\"";
    }

    /**
     * Sets the string stored in the node
     */
    set val(value: string){
        this._str = value;
    }
    /**
     * Returns the string stored in the node
     */
    get val(): string {
        return this._str;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}
