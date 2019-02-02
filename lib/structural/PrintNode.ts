import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";
import { NumberNode } from "../prims/NumberNode";

export class PrintNode extends Expression<any> {

    private _scale: number = 1;

    /**
     * Constructor for a PrintNode, representing an object to be printed
     * @param _toPrint The object to be printed
     * @param _coordsGiven Whether the xy coordinates to print the object is given
     * @param _dims The dimensions of the object to be printed
     * @param ws Preceding whitespace
     */
    constructor(
        private _toPrint: Expression<any>,
        private _coordsGiven: boolean,
        private _dims: Dimensions = null,
        ws: string = ""
    ) {
        super(ws);
    }

    /**
     * Evaluates the object to be printed and draws it
     * @param context
     */
    eval(context: Scope): any {
        let res = this.toPrint.eval(context);
        if (this._coordsGiven) {
            res.draw(context, this.dims, this);
        }

        return res;
    }

    toString(): string {
        return this.ws + "print(" + this.toPrint + ", " + this.dims + ")";
    }

    /**
     * Returns the object to be printed
     */
    get toPrint(): Expression<any> {
        return this._toPrint;
    }

    /**
     * Returns the dimensions of the object to be printed
     */
    get dims(): Dimensions {
        return this._dims;
    }
}
