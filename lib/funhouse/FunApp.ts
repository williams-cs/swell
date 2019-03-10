import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { ParensNode } from "../structural/ParensNode";
import { ReturnError } from "../structural/ReturnError";
import { Some } from "space-lift";
import { Argument } from "../funhouse/Argument";

// Application of a function. Assumes arg values passed in same order as FunDef args
export class FunApp<T> extends Expression<T> {

    private _name: string;
    private _args: ParensNode<Argument<any>[]>;
    private _defaultValue: T = undefined;

    /**
     * The constructor for a function application
     * @param name The name of the function
     * @param args Function arguments, if applicable
     * @param ws Preceding whitespace
     * @param defaultValue The default return value of the function, if any
     */
    constructor(name: string, args?: ParensNode<Argument<any>[]>, ws: string = "", defaultValue?: T) {
        super(ws);
        this._name = name;
        this._args = args;
        this._defaultValue = defaultValue;
    }

    eval(context: Scope): any {
        let fundef = context.lookup(this._name, context); // looking up function
        //let child = new Scope(fundef.scope); // avoiding overwrite; need to toss after returning
        let child = fundef.scope.copy(); // Copying definition scope
        let argList = this._args.expr;
        // Assigns arg values to definition arguments
        if (this._args != null) {
            for (let i = 0; i < argList.length; i++) { //lookups?
                //child.declare(this._funct.args[i]); // redeclare?
                child.assign(fundef.args[i], argList[i].value);
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
        let args1 = this._args.expr;
        if (args1.length > 0) {
            for (let i = 0; i < args1.length - 1; i++) {
                argsList += args1[i].value.toString() + ", ";
            }
            argsList += args1[args1.length - 1].value.toString();
        }
        return this.ws + this.name + this._args.ws + "(" + argsList + ")" ;
    }

    get name(): string {
        return this._name;
    }

    get args(): Argument<any>[] {
        return this._args.expr;
    }
}
