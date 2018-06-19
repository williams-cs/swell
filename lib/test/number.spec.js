"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../NumberNode");
const chai_1 = require("chai");
require("mocha");
describe('A number', () => {
    it('should evaluate to a number', () => {
        const testnum = new NumberNode_1.NumberNode(null, 1);
        const output = testnum.eval();
        chai_1.expect(output).to.equal(1);
    });
    it('should evaluate to a different number', () => {
        const testpar = new NumberNode_1.NumberNode(null, 10);
        const testchild = new NumberNode_1.NumberNode(testpar, 15);
        const output = testchild.eval();
        chai_1.expect(output).to.equal(15);
    });
    it('should evaluate to a different number', () => {
        const testpar1 = new NumberNode_1.NumberNode(null, 5);
        const testchild1 = new NumberNode_1.NumberNode(testpar1, 10);
        const output = testchild1.parent.eval();
        chai_1.expect(output).to.equal(5);
    });
});
