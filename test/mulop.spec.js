"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MulOp_1 = require("../lib/binops/MulOp");
const Scope_1 = require("../lib/Scope");
const chai_1 = require("chai");
require("mocha");
const NumberNode_1 = require("../lib/NumberNode");
describe('A MulOp', () => {
    it('should evaluate to a number', () => {
        const op = new MulOp_1.MulOp(new NumberNode_1.NumberNode(1), new NumberNode_1.NumberNode(2));
        const output = op.eval(new Scope_1.Scope(null));
        chai_1.expect(output).to.equal(2);
    });
    it('should evaluate to a negative number', () => {
        const op1 = new MulOp_1.MulOp(new NumberNode_1.NumberNode(2), new NumberNode_1.NumberNode(-2));
        const output1 = op1.eval(new Scope_1.Scope(null));
        chai_1.expect(output1).to.equal(-4);
    });
    it('should evaluate to zero', () => {
        const op2 = new MulOp_1.MulOp(new NumberNode_1.NumberNode(0), new NumberNode_1.NumberNode(1));
        const output2 = op2.eval(new Scope_1.Scope(null));
        chai_1.expect(output2).to.equal(0);
    });
});
