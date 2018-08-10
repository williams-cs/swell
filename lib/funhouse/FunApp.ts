import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { ReturnError } from "../structural/ReturnError";
import { Some } from "space-lift";
import { Dimensions } from "../structural/Dimensions";

// Application of a function. Assumes arg values passed in same order as FunDef args
export class FunApp<T> implements Expression<T>{
    private _name: string;
    private _args: Expression<{}>[];
    private _defaultValue: T = undefined;
    private _newLine : boolean = false;
    private _ws : string;

    constructor(name: string, args?: any[],  ws?: string, defaultValue?: T){
        this._name = name;
        this._args = args;
        this._defaultValue = defaultValue;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }

    toString() : string {
        let argsList= '';
        if(this._args.length > 0) {
            for (let i =0 ; i < this._args.length-1; i++) {
                argsList += this._args[i].toString() + ", ";
            }
            argsList += this._args[this._args.length-1].toString();
        }
        return this._ws + this.name + '(' + argsList + ")";
    }

    newLine() : boolean {
        return this._newLine;
    }

    // Assigns args to values in new context
    eval(context: Scope): any{
        let fundef = context.lookup(this._name,context); // looking up function
        //let child = new Scope(fundef.scope); // avoiding overwrite; need to toss after returning
        let child = fundef.scope.copy(); // Copying definition scope

        if(this._args != null){
            for(let i = 0; i < this._args.length; i++){ //lookups?
                //child.declare(this._funct.args[i]); // redeclare?
                child.assign(fundef.args[i],this._args[i]); 
            }
        }
        
        // the ID of the return value
        //let id = v5("warp-lab.williams.edu",v5.DNS); // generate a unique ID for this function application
        //let id2 = v5("warp-lab.williams.edu",v5.DNS);

        //let id = v4();
        let id = context.globalFunID;
        context.globalFunID++;

        child.retValID = Some(id); // new method
        //console.log(child.retValID.get());

        // we only return a value with function application
        // if it is explicitly returned using a return statement;
        // we abuse JS exceptions for this purpose
        try {
            child.hadFunEval = true;
            fundef.body.eval(child);
            return this._defaultValue;
        } catch (e) {
            // make sure that we catch only the error intended for us
            if (e instanceof ReturnError && parseInt(e.ID) == id) {
                return e.retVal;
            }
            // error was not intended for us; rethrow
            throw e;
        }

        return fundef.body.eval(child);
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals directly on functions");
    }


    get name(): string {
        return this._name;
    }
    get args(): Expression<{}>[] {
        return this._args;
    }
}