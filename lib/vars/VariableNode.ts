import {Expression} from '../Expression';
import {Scope} from '../Scope';

export class VariableNode implements Expression<any>{
    private _name: string;
    //private _val: Expression<any>;
    constructor(name: string){
        this._name = name;
        //this._val = val;
    }

    draw(context: Scope): void {
    
    }
    
    eval(context: Scope): any {
        //todo: grab val from context
        //console.log("looking up: " + this._name);
        return context.lookup(this._name, context);
    }
    // add get/set
    
    get name(): string{
        return this._name;
    }

    /*
    set name(str: string){
        this._name = value;
    }
    */
    

}