"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const space_lift_1 = require("space-lift");
const MulSel_1 = require("../logging/MulSel");
class Scope {
    constructor(parent, effects, myState, eventLog) {
        this._retValID = space_lift_1.None;
        this._canvas = space_lift_1.None;
        this._eventLog = [];
        this._hadFunEval = false;
        //public globalFunID = Math.random();
        this.globalFunID = 10000000;
        this._varBindings = new Map();
        this._parent = parent;
        this._effects = effects || null;
        this._myState = myState || null;
        this._eventLog = eventLog;
        this._mulSelected = new MulSel_1.MulSel;
        this._mulSelected.mulSel = false;
        if (this._parent != null && this._parent._hadFunEval)
            this._hadFunEval = true; // copy function eval flag from parent
    }
    copy() {
        let s = new Scope(this._parent, this._effects, this._myState, this._eventLog);
        s.varBindings = new Map(this._varBindings);
        return s;
    }
    declare(name) {
        //console.log("declaring variable " + name);
        if (this._varBindings.has(name)) {
            throw new Error("Scope already has var with name " + name);
        }
        this._varBindings.set(name, space_lift_1.None);
    }
    // Assign/reassign value
    assign(name, val) {
        //console.log("assigning value " + val + " for variable " + name + ".");
        this._varBindings.set(name, space_lift_1.Some(val)); //Some(val)?
    }
    // look up value in context
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
    retIDLookup() {
        //console.log("retValID: " + this._retValID);
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
    get varBindings() {
        return this._varBindings;
    }
    set varBindings(m) {
        this._varBindings = m;
    }
    get parent() {
        return this._parent;
    }
    get retValID() {
        return this._retValID;
    }
    set retValID(val) {
        this._retValID = val;
    }
    get canvas() {
        return this._canvas;
    }
    set canvas(val) {
        this._canvas = val;
    }
    get effects() {
        return this._effects;
    }
    set effects(arr) {
        this._effects = arr;
    }
    get myState() {
        return this._myState;
    }
    set myState(state) {
        this._myState = state;
    }
    get eventLog() {
        return this._eventLog;
    }
    set eventLog(update) {
        this._eventLog = update;
    }
    get mulSelected() {
        return this._mulSelected;
    }
    // set mulSelected(update: boolean){
    //     this._mulSelected.val = update;
    // }
    get mulSelArray() {
        return this._mulSelArray;
    }
    set mulSelArray(update) {
        this._mulSelArray = update;
    }
    get hadFunEval() {
        return this._hadFunEval;
    }
    set hadFunEval(val) {
        this._hadFunEval = val;
    }
}
exports.Scope = Scope;
//# sourceMappingURL=Scope.js.map