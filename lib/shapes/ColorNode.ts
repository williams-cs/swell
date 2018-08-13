import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';

export class ColorNode implements Expression<string>{
    private _red: number;
    private _green: number;
    private _blue: number;
    private _newLine: boolean = false;

    /**
     * Constructor for a ColorNode, a node representing an RGB color
     */
    constructor(red: number, green: number, blue: number){
        this._red = red;
        this._green = green;
        this._blue = blue;
    };

    /**
     * Evaluates into a string RGB value
     * @param context The current program context
     */
    eval(context: Scope){
        return this._red + " " + this._green + " " + this._blue;
    }

    /**
     * ColorNodes cannot currently be drawn
     * @param context 
     * @param dims 
     * @param ast 
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    /**
     * Returns whether this ColorNode equals another ColorNode
     * @param right The right side of the equality (must be a BooleanNode)
     */
    equalsVal(right: Expression<any>): boolean{
        if(right instanceof ColorNode){
            return (this.red === right.red && this.green === right.green && this.blue === right.blue);
        }
        return false;
    }

    /**
     * Returns a string representation of the ColorNode
     */
    toString(): string {
        return "";
    }

    /**
     * Returns the red value
     */
    get red(): number{
        return this._red;
    }
    /**
     * Sets the red value
     */
    set red(red: number){
        this._red = red;
    }

    /**
     * Returns the green value
     */
    get green(): number{
        return this._green;
    }
    /**
     * Sets the green value
     */
    set green(green: number){
        this._green = green;
    }

    /**
     * Returns the blue value
     */
    get blue(): number{
        return this._blue;
    }
    /**
     * Sets the blue value
     */
    set blue(blue: number){
        this._blue = blue;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}