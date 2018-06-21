import {Expression} from './Expression';
import {Scope} from './Scope';

export class VariableNode implements Expression<any>{
    public name: string;
    public val: Expression<any>;
    constructor(name: string, val: Expression<any>){
        this.name = name;
        this.val = val;
    }

    eval(context: Scope): any {
        return null;
    }
    // add get/set
    /*
    set val(value: Expression<any>){
        this._val = value;
    }
    */

}