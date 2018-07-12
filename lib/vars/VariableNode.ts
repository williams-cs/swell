import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';

export class VariableNode implements Expression<any>{
    private _name: string;
    //private _val: Expression<any>;
    constructor(name: string){
        this._name = name;
        //this._val = val;
    }
    
    eval(context: Scope): any {
        //todo: grab val from context
        //console.log("looking up: " + this._name);
        return context.lookup(this._name, context);
    }

    draw(context: Scope): void {
    
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