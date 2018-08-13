"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const space_lift_1 = require("space-lift");
class Scope {
    /**
     * Constructor for Scope, an object keeping track of objects within a particular context
     * @param parent The parent Scope
     * @param effects Effects within this Scope
     * @param myState The scope state
     * @param eventLog The log of events that occurred
     */
    constructor(parent, effects, myState, eventLog) {
        this._retValID = space_lift_1.None;
        this._canvas = space_lift_1.None;
        this._eventLog = []; // The event log
        this._hadFunEval = false; // Was this created in a function?
        //public globalFunID = Math.random();
        this.globalFunID = 10000000; // The global ID for functions in this context
        this._varBindings = new Map();
        this._parent = parent;
        this._effects = effects || null;
        this._myState = myState || null;
        this._eventLog = eventLog;
        if (this._parent != null && this._parent._hadFunEval)
            this._hadFunEval = true; // copy function eval flag from parent
    }
    /**
     * Copies information from this Scope into another Scope and returns the new Scope
     */
    copy() {
        let s = new Scope(this._parent, this._effects, this._myState, this._eventLog);
        s.varBindings = new Map(this._varBindings);
        s.canvas = this.canvas;
        s.eventLog = this.eventLog;
        return s;
    }
    /**
     * Declares a new variable
     * @param name The name of the variable to be declared
     */
    declare(name) {
        if (this._varBindings.has(name)) {
            throw new Error("Scope already has var with name " + name);
        }
        this._varBindings.set(name, space_lift_1.None);
    }
    /**
     * Assigns a value to a variable in this Context
     * @param name The name of the variable
     * @param val The value of the variable
     */
    assign(name, val) {
        this._varBindings.set(name, space_lift_1.Some(val)); //Some(val)?
    }
    /**
     * Looks up a value within the Scope and all its ancestor Scopes
     * @param name The name of the value
     * @param context The context to search within
     */
    lookup(name, context) {
        if (context.varBindings.has(name)) {
            if (context.varBindings.get(name).isDefined()) {
                return (context.varBindings.get(name).get()); //extra get to manage Some()
            }
        }
        if (!(context.parent == null)) {
            return this.lookup(name, context.parent);
        }
        throw new Error("Variable could not be found.");
    }
    /**
     * Looks up and returns the return ID value
     */
    retIDLookup() {
        if (this._retValID.isDefined()) {
            return this._retValID.get();
        }
        else {
            if (this._parent) {
                return this._parent.retIDLookup();
            }
            else {
                throw new Error("Unknown caller.");
            }
        }
    }
    /**
     * Returns the Map of variable bindings
     */
    get varBindings() {
        return this._varBindings;
    }
    /**
     * Sets the Map of variable bindings
     */
    set varBindings(m) {
        this._varBindings = m;
    }
    /**
     * Returns the parent Scope
     */
    get parent() {
        return this._parent;
    }
    /**
     * Returns the return value ID
     */
    get retValID() {
        return this._retValID;
    }
    /**
     * Sets the return value ID
     */
    set retValID(val) {
        this._retValID = val;
    }
    /**
     * Returns the HTML canvas
     */
    get canvas() {
        return this._canvas;
    }
    /**
     * Sets the HTML canvas
     */
    set canvas(val) {
        this._canvas = val;
    }
    /**
     * Returns the effects array
     */
    get effects() {
        return this._effects;
    }
    /**
     * Sets the effects array
     */
    set effects(arr) {
        this._effects = arr;
    }
    /**
     * Returns the Scope state
     */
    get myState() {
        return this._myState;
    }
    /**
     * Sets the Scope state
     */
    set myState(state) {
        this._myState = state;
    }
    /**
     * Returns the event log
     */
    get eventLog() {
        return this._eventLog;
    }
    /**
     * Sets the event log
     */
    set eventLog(update) {
        this._eventLog = update;
    }
    /**
     * Returns the array of effects
     */
    get mulSelArray() {
        return this._mulSelArray;
    }
    /**
     * Sets the array of effects
     */
    set mulSelArray(update) {
        this._mulSelArray = update;
    }
    /**
     * Returns whether this Scope was created in a function
     */
    get hadFunEval() {
        return this._hadFunEval;
    }
    /**
     * Sets whether this Scope was created in a function
     */
    set hadFunEval(val) {
        this._hadFunEval = val;
    }
}
exports.Scope = Scope;
//# sourceMappingURL=Scope.js.map