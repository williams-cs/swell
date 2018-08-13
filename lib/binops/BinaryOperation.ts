// An abstract class for binary operations. 
import {Scope} from '../structural/Scope';
import {Expression} from '../Expression';
import {Dimensions} from '../structural/Dimensions';

export abstract class BinaryOperation<T> implements Expression<T> {
    private _newLine: boolean = false;

    /**
     * Constructor for the BinOp abstract class
     * @param _left The left side of the binary operation
     * @param _right The right side of the binary operation
     */
    constructor(private _left: Expression<T>, private _right: Expression<T>){};
    abstract eval(context: Scope): T;

    /**
     * Draws the binary operation, if applicable
     * @param context The current program context
     * @param dims The dimensions
     * @param ast The AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {}
    
    /**
     * Checks if equal to another expression
     * @param right The right side of the equality
     */
    equalsVal(right: Expression<any>): boolean {
        throw new Error("Cannot call equals directly on BinOp");
    }

    /**
     * Returns a string representation of the binary operation
     */
    toString(): string {return ""};

    /**
     * Gets left side of the binary operation
     */
    get left(): Expression<T>{
        return this._left;
    }
    /**
     * Sets left side of the binary operation
     */
    set left(left: Expression<T>){
        this._left = left;
    }

    /**
     * Gets right side of the binary operation
     */
    get right(): Expression<T>{
        return this._right;
    }
    /**
     * Sets right side of the binary operation
     */
    set right(right: Expression<T>){
        this._right = right;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}