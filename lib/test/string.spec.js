"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringNode_1 = require("../StringNode");
const chai_1 = require("chai");
require("mocha");
describe('A string', () => {
    it('should evaluate to a string', () => {
        const teststring = new StringNode_1.StringNode(null, "hello world");
        const output = teststring.eval();
        chai_1.expect(output).to.equal("hello world");
    });
    it('should evaluate to a different string', () => {
        const testpar = new StringNode_1.StringNode(null, "hello");
        const testchild = new StringNode_1.StringNode(testpar, "hello \n world");
        const output = testchild.eval();
        chai_1.expect(output).to.equal("hello \n world");
    });
    it('should evaluate to another different string', () => {
        const testpar1 = new StringNode_1.StringNode(null, "hello world");
        const testchild1 = new StringNode_1.StringNode(testpar1, "boo");
        const output = testchild1.parent.eval();
        chai_1.expect(output).to.equal("hello world");
    });
});
