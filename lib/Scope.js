"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const space_lift_1 = require("space-lift");
class Scope {
    constructor(parent) {
        this._map = new Map();
        this._parent = parent;
    }
    // Declares with val of None
    declare(name) {
        if (this._map.has(name)) {
            throw new Error("Scope already has var with name " + name);
        }
        this._map.set(name, space_lift_1.None);
    }
    // Assign/reassign value
    assign(name, val) {
        this._map.set(name, space_lift_1.Some(val));
    }
    lookup(name) {
        console.log("Scope received name: " + name);
        // Receiving name correctly... is it ever getting added to map?
        if (!(this._map.has(name))) {
            throw new Error("Scope has no var with name " + name);
        }
        if (!(this._map.get(name).isDefined())) {
            throw new Error("Var " + name + " is not defined");
        }
        return (this._map.get(name));
    }
}
exports.Scope = Scope;
