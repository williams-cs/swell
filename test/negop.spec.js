"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NegOp_1 = require("../lib/unops/NegOp");
const NumberNode_1 = require("../lib/NumberNode");
const chai_1 = require("chai");
require("mocha");
describe('A negop', () => {
    it('should evaluate to the negation', () => {
        const testval = new NegOp_1.NegOp(new NumberNode_1.NumberNode(1));
        const output = testval.eval();
        chai_1.expect(output).to.equal(-1);
    });
    it('should evaluate to another negation', () => {
        const testval = new NegOp_1.NegOp(new NumberNode_1.NumberNode(-1));
        const output = testval.eval();
        chai_1.expect(output).to.equal(1);
    });
});