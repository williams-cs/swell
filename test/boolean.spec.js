"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../lib/prims/BooleanNode");
const Scope_1 = require("../lib/structural/Scope");
const chai_1 = require("chai");
require("mocha");
describe('A boolean', () => {
    it('should evaluate to true', () => {
        const testnum = new BooleanNode_1.BooleanNode(true);
        const output = testnum.eval(new Scope_1.Scope(null));
        chai_1.expect(output).to.equal(true);
    });
    it('should evaluate to false', () => {
        const testnum = new BooleanNode_1.BooleanNode(false);
        const output = testnum.eval(new Scope_1.Scope(null));
        chai_1.expect(output).to.equal(false);
    });
});
