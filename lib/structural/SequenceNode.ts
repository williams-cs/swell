import { Expression } from "../Expression"; 
import {Scope} from './Scope'; 
import { Dimensions } from "./Dimensions";
import { Some } from "space-lift";

export class SequenceNode implements Expression<void>{
    private _left: Expression<any>;
    private _right: Expression<any>;
    private _leftVal: any;
    private _rightVal: any;
    private _newLine : boolean = true;

    /**
     * Constructor for a SequenceNode, the building block of the AST
     * @param left The left side of the Sequence
     * @param right The right side of the Sequence
     */
    constructor(left: Expression<any>, right: Expression<any>){
        this._left = left;
        this._right = right;
    }
    
    /**
     * Evaluates the children in postorder (left, right, parent)
     * @param context The current program context
     */
    eval(context: Scope): void {
        let leftScope = new Scope(context, context.effects, context.myState, context.eventLog);
        leftScope.canvas = Some(context.canvas.get());
        //throwing away after evaling
        this._leftVal = this._left.eval(leftScope);
        this._rightVal = this._right.eval(leftScope); // leftScope may be modified now
    }

    /**
     * SequenceNodes cannot be directly drawn
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Cannot call draw() on SequenceNodes")
    }

    /**
     * Equals cannot be directly called on SequenceNodes
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on SequenceNode");
    }

    /**
     * Returns a string representation of the AST
     */
    toString(): string {
        let result = this._left.toString();
        if(this._left.newLine() == true) {
            result += '\n';
        }
        else {
            result += ";\n";
        }
        if(this._right.newLine() == false){
            result += this._right.toString() + ";";
        }
        else {
            result += this._right.toString();
        }
        return result;
    }

    /**
     * Returns the left child
     */
    set left(left: Expression<any>){
        this._left = left;
    }
    /**
     * Sets the left child
     */
    get left(): Expression<any>{
        return this._left;
    }

    /**
     * Returns the right child
     */
    set right(right: Expression<any>){
        this._right = right;
    }
    /**
     * Sets the right child
     */
    get right(): Expression<any>{
        return this._right;
    }

    /**
     * Returns the value of the left chile
     */
    get leftVal(): any{
        return this._leftVal;
    }
    
    /**
     * Returns the value of the right chile
     */
    get rightVal(): any{
        return this._rightVal;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}