import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';

export class BooleanNode extends Expression<BooleanNode>{

    /**
     * Constructor for BooleanNode, a node representing a boolean
     * @param val The boolean value of the BooleanNode
     * @param lws Preceding white space
     * @param rws Post white space
     */
    constructor(private _val: boolean, lws: string = "", rws: string = "") {
        super(lws, rws);
    };

    /**
     * Returns the BooleanNode
     * @param context The current program context
     */
    eval(context: Scope): BooleanNode {
        return this;
    }

    equals(right: Expression<any>): boolean {
        if (right instanceof BooleanNode) {
            return this.val === right.val;
        }
        return false;
    }

    toString(): string {
        return this.lws + this.val + this.rws;
    }

    get val(): boolean {
        return this._val;
    }

    set val(value: boolean) {
        this._val = value;
    }
}
