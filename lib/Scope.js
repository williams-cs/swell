"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const space_lift_1 = require("space-lift");
class Scope {
    constructor(parent) {
        this._map = new Map();
        this._parent = parent;
    }
    get map() {
        return this._map;
    }
    get parent() {
        return this._parent;
    }
    // Declares with val of None
    //
    declare(name) {
        if (this._map.has(name)) {
            throw new Error("Scope already has var with name " + name);
        }
        console.log("Setting map with name: " + name);
        this._map.set(name, space_lift_1.None);
        //console.log("Should be None: " + this._map.get(name));
    }
    // Assign/reassign value
    assign(name, val) {
        this._map.set(name, space_lift_1.Some(val)); //Some(val)?
    }
    lookup(name, context) {
        console.log("Scope received name: " + name);
        console.log("Got i? " + this._map.get("i"));
        // Receiving name correctly... is it ever getting added to map?
        if (context.map.has(name)) {
            if (context.map.get(name).isDefined()) {
                return (context.map.get(name).get()); //extra get to manage Some()
            }
        }
        if (!(context.parent == null)) {
            return this.lookup(name, context.parent);
        }
        throw new Error("Variable could not be found.");
        /*
        if(!(this._map.has(name))){
            if(this._parent == null){ // may need scope param if not recursing right
                throw new Error("Scope has no var with name " + name);
            } else {
                this._parent.lookup(name);
            }
        }
        if(!(this._map.get(name).isDefined())){
            if(this._parent == null){
                throw new Error("Var " + name + " is not defined");
            } else {
                this._parent.lookup(name);
            }
        }
        */
    }
}
exports.Scope = Scope;
