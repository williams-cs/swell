import {Option, Some, None} from 'space-lift';
import { Effect } from '../effects/Effect';
import { LogEvent } from '../logging/LogEvent';

export class Scope{
    private _varBindings: Map<string, Option<any>>; 
    private _parent: Scope;
    private _retValID: Option<string> = None;
    private _canvas: Option<HTMLCanvasElement> = None;
    private _effects: Effect<any>[];

    private _mulSelArray: Effect<any>[]; // The array of selected objects

    private _eventLog: LogEvent<any>[] = []; // The event log

    private _hadFunEval: boolean = false; // Was this created in a function?
    //public globalFunID = Math.random();
    public globalFunID = 10000000; // The global ID for functions in this context

    /**
     * Constructor for Scope, an object keeping track of objects within a particular context
     * @param parent The parent Scope
     * @param effects Effects within this Scope
     * @param myState The scope state
     * @param eventLog The log of events that occurred
     */
    constructor(parent: Scope, effects?: Effect<any>[], eventLog?: LogEvent<any>[]){
        this._varBindings = new Map();
        this._parent = parent;
        this._effects = effects || null;
        this._eventLog = eventLog;
        if(this._parent != null && this._parent._hadFunEval) this._hadFunEval = true; // copy function eval flag from parent
    }

    /**
     * Copies information from this Scope into another Scope and returns the new Scope
     */
    copy(){
        let s = new Scope(this._parent, this._effects, this._eventLog);
        s.varBindings = new Map(this._varBindings);
        s.canvas = this.canvas;
        s.eventLog = this.eventLog;
        return s;
    }

    /**
     * Declares a new variable 
     * @param name The name of the variable to be declared
     */
    declare(name: string){
        if(this._varBindings.has(name)){
            throw new Error("Scope already has var with name " + name);
        }
        this._varBindings.set(name,None);
    }

    /**
     * Assigns a value to a variable in this Context
     * @param name The name of the variable
     * @param val The value of the variable
     */
    assign(name: string, val: any): void{
        this._varBindings.set(name,Some(val)); //Some(val)?
    }

    /**
     * Looks up a value within the Scope and all its ancestor Scopes
     * @param name The name of the value
     * @param context The context to search within 
     */
    lookup(name: string, context: Scope): any{
        if(context.varBindings.has(name)){
            if(context.varBindings.get(name).isDefined()){
                return (context.varBindings.get(name).get()); //extra get to manage Some()
            }
        }

        if(!(context.parent == null)){
            return this.lookup(name, context.parent);
        }
        throw new Error("Variable could not be found.");
    }

    /**
     * Looks up and returns the return ID value 
     */
    retIDLookup(): any {
        if(this._retValID.isDefined()){
            return this._retValID.get();
        } else {
            if(this._parent){
                return this._parent.retIDLookup();
            } else {
                throw new Error("Unknown caller.");
            }
        }
    }

    /**
     * Returns the Map of variable bindings
     */
    get varBindings(): Map<string, Option<any>>{
        return this._varBindings;
    }
    /**
     * Sets the Map of variable bindings
     */
    set varBindings(m: Map<string, Option<any>>){
        this._varBindings = m;
    }

    /**
     * Returns the parent Scope
     */
    get parent(): Scope{
        return this._parent;
    }

    /**
     * Returns the return value ID
     */
    get retValID(): Option<string>{
        return this._retValID;
    }
    /**
     * Sets the return value ID
     */
    set retValID(val: Option<string>){
        this._retValID = val;
    }

    /**
     * Returns the HTML canvas
     */
    get canvas() : Option<HTMLCanvasElement> {
        return this._canvas;
    }
    /**
     * Sets the HTML canvas
     */
    set canvas(val: Option<HTMLCanvasElement>) {
        this._canvas = val;
    }

    /**
     * Returns the effects array
     */
    get effects(): Effect<any>[] {
        return this._effects;
    }
    /**
     * Sets the effects array
     */
    set effects(arr: Effect<any>[]) {
        this._effects = arr;
    }

    /**
     * Returns the event log
     */
    get eventLog(): LogEvent<any>[] {
        return this._eventLog;
    }
    /**
     * Sets the event log
     */
    set eventLog(update: LogEvent<any>[]){
        this._eventLog = update;
    }

    /**
     * Returns the array of effects
     */
    get mulSelArray(): Effect<any>[] {
        return this._mulSelArray;
    }
    /**
     * Sets the array of effects
     */
    set mulSelArray(update: Effect<any>[]){
        this._mulSelArray = update;
    }

    /**
     * Returns whether this Scope was created in a function
     */
    get hadFunEval(): boolean{
        return this._hadFunEval;
    }
    /**
     * Sets whether this Scope was created in a function
     */
    set hadFunEval(val: boolean){
        this._hadFunEval = val;
    }
}