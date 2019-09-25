import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';

export class BooleanNode extends Expression<BooleanNode>{

    /**
     * Constructor for BooleanNode, a node representing a boolean
     * @param val The boolean value of the BooleanNode
     * @param ws Preceding white space
     *
     */
    constructor(private _val: boolean, private _origin: Expression<any>, ws: string = "") {
        super(ws);
    };

    /**
     * Returns the BooleanNode
     * @param context The current program context
     */
    eval(context: Scope): BooleanNode {
        return this;
    }
    
    get origin(): Expression<any> {
        return this._origin;
    };

    equals(right: Expression<any>): boolean {
        if (right instanceof BooleanNode) {
            return this.val === right.val;
        }
        return false;
    }

    toString(): string {
        return this.ws + this.val;
    }

    get val(): boolean {
        return this._val;
    }

    set val(value: boolean) {
        this._val = value;
    }
}
