import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import {Dimensions} from '../structural/Dimensions';
import {FloatEffect} from '../effects/FloatEffect';


// Nodes representing numbers
// Should abstract Node class implement Expression?

export class FloatNode implements Expression <FloatNode>{
    private _val: number;
    private _newLine: boolean = false;
    private _ws: string;

    /**
     * Constructor for a NumberNode, a node representing a number
     * @param val The number value
     * @param ws Preceding whitespace
     */
    constructor(val: number, ws?: string){
        this._val = val;
        this._ws = ws;
        if (ws == undefined) {
            this._ws= "";
        }
    };

    /**
     * Returns this FloatNode
     * @param context The current program context
     */
    eval(context: Scope): FloatNode {
        return this;
    }

    /**
     * FloatNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
      let e = new FloatEffect(this);
      e.draw(context, dims, ast);
    }

    /**
     * Returns whether this FloatNode equals another FloatNode
     * @param right The right side of the equality (must be a NumberNode)
     */
    equalsVal(right: Expression<any>): boolean{
        if(right instanceof FloatNode){
            return this.val === right.val;
        }
        return false;
    }

    /**
     * Returns a string representation of the FloatNode
     */
    toString(): string {
        return this._ws + this._val;
    }

    /**
     * Returns the number stored in the node
     */
    get val(): number{
        return this._val;
    }
     /**
      * Sets the value of the number stored in the node
      */
    set val(value: number){
        this._val = value;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}
