import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';

export class VariableNode implements Expression<any>{
    private _name: string;
    private _newLine : boolean = false;
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

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }

    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot directly compare vars, eval first");
    }

    toString() : string {
        return this._name;
    }
    
    get name(): string{
        return this._name;
    }

    newLine() : boolean {
        return this._newLine;
    }

    /*
    set name(str: string){
        this._name = value;
    }
    */
    

}