import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import { BooleanNode } from "../prims/BooleanNode";

export class Conditional implements Expression<any>{
    private _test: Expression<any>;
    private _trueBranch: Expression<any>;
    private _falseBranch: Expression<any>;
    private _newLine : boolean = true;
    //private _ifOp: IfOp;
    //private _elseOp: ElseOp;
    //private _elseIfOps: ElseIfOp[];
    //private _ifRes: any;
    //private _elseIfRes: any;
    //private _elseRes: any;
    
    constructor(test: Expression<any>, trueBranch: Expression<any>, falseBranch?: Expression<any>){
        this._test = test;
        this._trueBranch = trueBranch;
        this._falseBranch = falseBranch;
    }

    toString() : string {
        let res = 'if(' +this._test.toString() + ") {\n " + this._trueBranch.toString() + "}";
        if(this._falseBranch !== undefined){
            res += '\nelse {\n ' + this._falseBranch.toString() + '}'
        }
        return res;
    }

    eval(context: Scope){
        let childCtx = new Scope(context);

        let res = this._test.eval(childCtx);
        //if(typeof res != 'boolean'){
        if(!(res instanceof BooleanNode)){
            throw new Error("The condition must be a boolean expression.");
        } 
        if(res.val){
            return this._trueBranch.eval(childCtx);
        } else if(this._falseBranch != null) { // check if else/else if is null or undefined
            return this._falseBranch.eval(childCtx); // possibly a bad idea
        }
    }

    get trueBranch(): Expression<any>{
        return this._trueBranch;
    }
    get falseBranch(): Expression<any>{
        return this._falseBranch;
    }

    newLine() : boolean {
        return this._newLine;
    }

    /*
    constructor(ifOp: IfOp, elseOp?: ElseOp, ...elseIfOps: ElseIfOp[]){
        this._ifOp = ifOp;
        this._elseOp = elseOp;
        this._elseIfOps = elseIfOps;
    }

    eval(context: Scope){

        if(this._ifOp.cond.eval(context)){
            return this._ifOp.eval(context);
        } else {
            for(let entry of this._elseIfOps){
                if(entry.cond.eval(context)) return entry.eval(context);
            }
        }
        return this._elseOp.eval(context);

        
        this._ifRes = this._ifOp.eval(context); // evaluate if
        console.log("ifres (in Conditional): " + this._ifRes);
        console.log("elseOp: " + this._elseOp);

        if(this._ifRes !== null){ // if if condition met, returns result of if body
            return this._ifRes;
        } else if(this._elseIfOps != null){ // if if condition not met, checks elseIfs
            for(let entry of this._elseIfOps){
                this._elseIfRes = entry.eval(context);
                if(this._elseIfRes !== null) return this._elseIfRes;
            }
        } else if(this._elseOp != undefined){ // if if and elseIf conditions not met, executes Else statement if extant
            console.log("Evaluating the Else");
            return this._elseOp.eval(context);
        } 
        
        //return null; // necessary?
    }
    */

    draw(): void {
        throw new Error("Not implemented");
    }

    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals directly on conditionals");
    }
}