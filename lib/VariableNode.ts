import {Expression} from './Expression';

export class VariableNode implements Expression<any>{
    public name: string;
    public val: Expression<any>;
    constructor(name: string, val: Expression<any>){
        this.name = name;
        this.val = val;
    }

    eval(): any {

    }
    /*
    set val(value: Expression<any>){
        this._val = value;
    }
    */

}