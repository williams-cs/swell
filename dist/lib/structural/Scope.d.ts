import { Option } from 'space-lift';
import { Effect } from '../effects/Effect';
import { LogEvent } from '../logging/LogEvent';
export declare class Scope {
    private _varBindings;
    private _parent;
    private _retValID;
    private _canvas;
    private _effects;
    private _myState;
    private _mulSelArray;
    private _eventLog;
    private _hadFunEval;
    globalFunID: number;
    /**
     * Constructor for Scope, an object keeping track of objects within a particular context
     * @param parent The parent Scope
     * @param effects Effects within this Scope
     * @param myState The scope state
     * @param eventLog The log of events that occurred
     */
    constructor(parent: Scope, effects?: Effect<any>[], myState?: {
        dragoffx: number;
        dragoffy: number;
        initDistance: number;
        selection: any;
        dragging: boolean;
        resizing: boolean;
    }, eventLog?: LogEvent<any>[]);
    /**
     * Copies information from this Scope into another Scope and returns the new Scope
     */
    copy(): Scope;
    /**
     * Declares a new variable
     * @param name The name of the variable to be declared
     */
    declare(name: string): void;
    /**
     * Assigns a value to a variable in this Context
     * @param name The name of the variable
     * @param val The value of the variable
     */
    assign(name: string, val: any): void;
    /**
     * Looks up a value within the Scope and all its ancestor Scopes
     * @param name The name of the value
     * @param context The context to search within
     */
    lookup(name: string, context: Scope): any;
    /**
     * Looks up and returns the return ID value
     */
    retIDLookup(): any;
    /**
     * Returns the Map of variable bindings
     */
    /**
    * Sets the Map of variable bindings
    */
    varBindings: Map<string, Option<any>>;
    /**
     * Returns the parent Scope
     */
    readonly parent: Scope;
    /**
     * Returns the return value ID
     */
    /**
    * Sets the return value ID
    */
    retValID: Option<string>;
    /**
     * Returns the HTML canvas
     */
    /**
    * Sets the HTML canvas
    */
    canvas: Option<HTMLCanvasElement>;
    /**
     * Returns the effects array
     */
    /**
    * Sets the effects array
    */
    effects: Effect<any>[];
    /**
     * Returns the Scope state
     */
    /**
    * Sets the Scope state
    */
    myState: any;
    /**
     * Returns the event log
     */
    /**
    * Sets the event log
    */
    eventLog: LogEvent<any>[];
    /**
     * Returns the array of effects
     */
    /**
    * Sets the array of effects
    */
    mulSelArray: Effect<any>[];
    /**
     * Returns whether this Scope was created in a function
     */
    /**
    * Sets whether this Scope was created in a function
    */
    hadFunEval: boolean;
}
