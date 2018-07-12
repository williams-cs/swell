"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const space_lift_1 = require("space-lift");
class Scope {
    //private _doc: Option<Document>;
    constructor(parent) {
        this._retValID = space_lift_1.None;
        this._hadFunEval = false;
        this.globalFunID = 100000000;
        this._map = new Map();
        this._parent = parent;
        if (this._parent != null && this._parent._hadFunEval)
            this._hadFunEval = true; // copy function eval flag from parent
        //this._doc = parent.doc;
    }
    copy() {
        let s = new Scope(this._parent);
        s.map = new Map(this._map);
        return s;
    }
    declare(name) {
        if (this._map.has(name)) {
            throw new Error("Scope already has var with name " + name);
        }
        this._map.set(name, space_lift_1.None);
    }
    // Assign/reassign value
    assign(name, val) {
        this._map.set(name, space_lift_1.Some(val)); //Some(val)?
    }
    // look up value in context
    lookup(name, context) {
        if (context.map.has(name)) {
            if (context.map.get(name).isDefined()) {
                return (context.map.get(name).get()); //extra get to manage Some()
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
    get map() {
        return this._map;
    }
    set map(m) {
        this._map = m;
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
    get hadFunEval() {
        return this._hadFunEval;
    }
    set hadFunEval(val) {
        this._hadFunEval = val;
    }
}
exports.Scope = Scope;
