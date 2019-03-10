import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { ReturnError } from "../structural/ReturnError";
import { Some } from "space-lift";

// Application of a function. Assumes arg values passed in same order as FunDef args
export class FunApp<T> extends Expression<T> {

    private _name: string;
    private _args: Expression<{}>[];
    private _defaultValue: T = undefined;

    /**
     * The constructor for a function application
     * @param name The name of the function
     * @param args Function arguments, if applicable
     * @param ws Preceding whitespace
     * @param defaultValue The default return value of the function, if any
     */
    constructor(name: string, args?: any[], ws: string = "", defaultValue?: T) {
        super(ws);
        this._name = name;
        this._args = args;
        this._defaultValue = defaultValue;
    }

    eval(context: Scope): any {
        let fundef = context.lookup(this._name, context); // looking up function
        //let child = new Scope(fundef.scope); // avoiding overwrite; need to toss after returning
        let child = fundef.scope.copy(); // Copying definition scope

        // Assigns arg values to definition arguments
        if (this._args != null) {
            for (let i = 0; i < this._args.length; i++) { //lookups?
                //child.declare(this._funct.args[i]); // redeclare?
                child.assign(fundef.args[i], this._args[i]);
            }
        }

        let id = context.globalFunID; // Assigns an ID to the function
        context.globalFunID++;

        child.retValID = Some(id); // new method

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

        //return fundef.body.eval(child);
    }

    toString(): string {
        let argsList = '';
        if (this._args.length > 0) {
            for (let i = 0; i < this._args.length - 1; i++) {
                argsList += this._args[i].toString() + ", ";
            }
            argsList += this._args[this._args.length - 1].toString();
        }
        return this.ws + this.name + "(" + argsList + ")" ;
    }

    get name(): string {
        return this._name;
    }

    get args(): Expression<{}>[] {
        return this._args;
    }
}
