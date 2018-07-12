"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlusOp_1 = require("../lib/binops/PlusOp");
const chai_1 = require("chai");
require("mocha");
const NumberNode_1 = require("../lib/prims/NumberNode");
const Scope_1 = require("../lib/structural/Scope");
describe('A plusop', () => {
    it('should evaluate to a number', () => {
        const op = new PlusOp_1.PlusOp(new NumberNode_1.NumberNode(1), new NumberNode_1.NumberNode(2));
        const output = op.eval(new Scope_1.Scope(null));
        chai_1.expect(output).to.equal(3);
    });
    it('should evaluate to a negative number', () => {
        const op1 = new PlusOp_1.PlusOp(new NumberNode_1.NumberNode(1), new NumberNode_1.NumberNode(-2));
        const output1 = op1.eval(new Scope_1.Scope(null));
        chai_1.expect(output1).to.equal(-1);
    });
    it('should evaluate to zero', () => {
        const op2 = new PlusOp_1.PlusOp(new NumberNode_1.NumberNode(-1), new NumberNode_1.NumberNode(1));
        const output2 = op2.eval(new Scope_1.Scope(null));
        chai_1.expect(output2).to.equal(0);
    });
});
