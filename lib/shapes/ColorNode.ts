import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';

export class ColorNode extends Expression<string> {

    /**
     * Constructor for a ColorNode, a node representing an RGB color
     */
    constructor(private _red: number, private _green: number, private _blue: number, ws: string = "") {
        super(ws);
    };

    /**
     * Evaluates into a string RGB value
     * @param context The current program context
     */
    eval(context: Scope) {
        return this.red + " " + this.green + " " + this.blue;
    }

    /**
     * Returns whether this ColorNode equals another ColorNode
     * @param right The right side of the equality (must be a BooleanNode)
     */
    equals(right: Expression<any>): boolean {
        return right instanceof ColorNode &&
            (this.red === right.red && this.green === right.green && this.blue === right.blue);
    }

    toString(): string {
        return "";
    }

    get red(): number {
        return this._red;
    }

    set red(red: number) {
        this._red = red;
    }

    get green(): number {
        return this._green;
    }

    set green(green: number) {
        this._green = green;
    }

    get blue(): number {
        return this._blue;
    }

    set blue(blue: number) {
        this._blue = blue;
    }
}
