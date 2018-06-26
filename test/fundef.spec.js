"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FunDef_1 = require("../lib/funhouse/FunDef");
const Scope_1 = require("../lib/Scope");
const chai_1 = require("chai");
require("mocha");
const NumberNode_1 = require("../lib/prims/NumberNode");
describe('A FunDef', () => {
    it('should evaluate to a name in a context', () => {
        const name = "foo";
        const testDef = new FunDef_1.FunDef(name, new NumberNode_1.NumberNode(1));
        let parcontext = new Scope_1.Scope(null);
        let context = new Scope_1.Scope(parcontext);
        const nullout = testDef.eval(context);
        const output = context.lookup(name, context);
        chai_1.expect(output).to.equal(testDef);
    });
});
