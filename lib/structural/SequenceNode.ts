import { Expression, Scope } from "..";

export class SequenceNode implements Expression<void>{
    private _left: Expression<any>;
    private _right: Expression<any>;
    private _leftVal: any;
    private _rightVal: any;

    constructor(left: Expression<any>, right: Expression<any>){
        this._left = left;
        this._right = right;
    }
    
    draw(context: Scope, x: number, y: number): void {
    
    }

    eval(context: Scope): void {
        let leftScope = new Scope(context);
        
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