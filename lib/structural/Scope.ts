import { Option, Some, None } from 'space-lift';
import { Effect } from '../effects/Effect';
import { LogEvent } from '../logging/LogEvent';
import clone = require("clone");

export class Scope {

    private _varBindings: Map<string, Option<any>>;

    private _parent: Scope;

    private _latestScope: Scope = null;

    private _canvas: HTMLCanvasElement;

    private _effects: Effect<any>[];

    private _eventLog: LogEvent<any>[] = []; // The event log

    private _retValID: Option<string> = None;

    private _mulSelArray: Effect<any>[]; // The array of selected objects

    private _hadFunEval: boolean = false; // Was this created in a function?

    private _isRunning: boolean = false;

    public globalFunID = 10000000; // The global ID for functions in this context

    /**
     * Constructor for Scope, an object keeping track of objects within a particular context
     * @param parent The parent Scope
     * @param canvas The canvas for the effects
     * @param effects The array of effects
     * @param eventLog The log of events that occurred
     */
    constructor(
        parent: Scope, canvas: HTMLCanvasElement = null,
        effects: Effect<any>[] = null, eventLog: LogEvent<any>[] = null
    ) {
        this._varBindings = new Map();
        this._latestScope = this;
        this._parent = parent;
        this._canvas = canvas;
        this._effects = effects;
        this._eventLog = eventLog;
        if (this._parent != null && this._parent.hadFunEval) {
            this._hadFunEval = true; // copy function eval flag from parent
        }
    }

    /**
     * Returns a copy of the current scope
     */
    copy(): Scope {
        let s: Scope = new Scope(this.parent, this.canvas, this.effects, this.eventLog);
        s.varBindings = new Map(this.varBindings);
        return s;
    }

    /**
     * Returns a child scope with the current scope as parent.
     */
    createChildScope(): Scope {
        let s: Scope = new Scope(this, this.canvas, this.effects, this.eventLog);
        s.varBindings = new Map(this.varBindings);
        return s;
    }

    /**
     * Assigns a value to a variable in this Context
     * @param name The name of the variable
     * @param val The value of the variable
     */
    assign(name: string, val: any): void {
        this.varBindings.set(name, Some(val)); //Some(val)?
    }

    /**
     * Looks up the value of the variable with the given name
     * in the current scope and ancestor scopes
     * @param name The name of the value
     */
    lookup(name: string): any {
        if (this.varBindings.has(name) && this.varBindings.get(name).isDefined()) {
            return (this.varBindings.get(name).get()); //extra get to manage Some()
        }
        if (!(this.parent == null)) {
            return this.parent.lookup(name);
        }
        throw new Error(`Identifier "${name}" could not be found.`);
    }

    /**
     * Looks up and returns the return ID value
     */
    retIDLookup(): any {
        if (this.retValID.isDefined()) {
            return this.retValID.get();
        }
        if (this.parent) {
            return this.parent.retIDLookup();
        }
        throw new Error("Unknown caller.");
    }

    get varBindings(): Map<string, Option<any>> {
        return this._varBindings;
    }

    set varBindings(m: Map<string, Option<any>>) {
        this._varBindings = m;
    }

    get parent(): Scope {
        return this._parent;
    }

    get latestScope(): Scope {
        return this._latestScope;
    }

    set latestScope(scope: Scope) {
        this._latestScope = scope;
    }

    get retValID(): Option<string> {
        return this._retValID;
    }

    set retValID(val: Option<string>) {
        this._retValID = val;
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    get effects(): Effect<any>[] {
        return this._effects;
    }

    get eventLog(): LogEvent<any>[] {
        return this._eventLog;
    }

    set eventLog(update: LogEvent<any>[]) {
        this._eventLog = update;
    }

    get mulSelArray(): Effect<any>[] {
        return this._mulSelArray;
    }

    get hadFunEval(): boolean {
        return this._hadFunEval;
    }

    set hadFunEval(val: boolean) {
        this._hadFunEval = val;
    }
}
