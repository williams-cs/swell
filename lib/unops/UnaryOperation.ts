import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';

export abstract class UnaryOperation<T> implements Expression<T> {
    private _newLine: boolean = false;

    /**
     * Abstract class constructor for Unary Operations
     * @param _val The object to be operated on
     */
    constructor(private _val: Expression<T>){};

    /**
     * Abstract eval method for UnaryOps
     * @param context The current program context
     */
    abstract eval(context?: Scope): T;

    /**
     * Abstract draw method for undrawable UnaryOps
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Unary Operations cannot be drawn directly");
    }

    /**
     * Equals cannot be called directly on UnaryOps
     * @param right 
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on UnaryOp");
    };

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }

    /**
     * Returns the UnaryOp value
     */
    get val(): Expression<T>{
        return this._val;
    }
    /**
     * Sets the UnaryOp value
     */
    set val(value: Expression<T>){
        this._val = value;
    }
}