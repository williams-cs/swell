"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DivOp_1 = require("../lib/binops/DivOp");
const chai_1 = require("chai");
require("mocha");
const NumberNode_1 = require("../lib/prims/NumberNode");
describe('A DivOp', () => {
    it('should evaluate to a number', () => {
        const op = new DivOp_1.DivOp(new NumberNode_1.NumberNode(4), new NumberNode_1.NumberNode(2));
        const output = op.eval(null);
        chai_1.expect(output).to.eql(new NumberNode_1.NumberNode(2));
    });
    it('should evaluate to a negative number', () => {
        const op1 = new DivOp_1.DivOp(new NumberNode_1.NumberNode(2), new NumberNode_1.NumberNode(-2));
        const output1 = op1.eval(null);
        chai_1.expect(output1).to.eql(new NumberNode_1.NumberNode(-1));
    });
    it('should evaluate to zero', () => {
        const op2 = new DivOp_1.DivOp(new NumberNode_1.NumberNode(0), new NumberNode_1.NumberNode(1));
        const output2 = op2.eval(null);
        chai_1.expect(output2).to.eql(new NumberNode_1.NumberNode(0));
    });
});
//# sourceMappingURL=divop.spec.js.map