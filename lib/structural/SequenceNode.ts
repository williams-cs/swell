import { Expression } from "../Expression"; 
import {Scope} from './Scope'; 
import { Dimensions } from "./Dimensions";
import { Some } from "space-lift";

export class SequenceNode implements Expression<void>{
    private _left: Expression<any>;
    private _right: Expression<any>;
    private _leftVal: any;
    private _rightVal: any;
    private _newLine : boolean = false;

    get newLine() : boolean {
        return this._newLine;
    }

    constructor(left: Expression<any>, right: Expression<any>){
        this._left = left;
        this._right = right;
    }
    
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }

    toString() : string {
        let result = this._left.toString() + ";\n";
        if(this._right.newLine == false){
            result += this._right.toString() + ";";
        }
        else {
            result += this._right.toString();
        }
        return result;
    }

    eval(context: Scope): void {
        let leftScope = new Scope(context, context.effects, context.myState, context.eventLog);
        leftScope.canvas = Some(context.canvas.get());
        //throwing away after evaling
        this._leftVal = this._left.eval(leftScope);
        this._rightVal = this._right.eval(leftScope); // leftScope may be modified now
    }

    set left(left: Expression<any>){
        this._left = left;
    }
    get left(): Expression<any>{
        return this._left;
    }

    set right(right: Expression<any>){
        this._right = right;
    }
    get right(): Expression<any>{
        return this._right;
    }

    get leftVal(): any{
        return this._leftVal;
    }
    
    get rightVal(): any{
        return this._rightVal;
    }
}