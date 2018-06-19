"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../lib/NumberNode");
const chai_1 = require("chai");
require("mocha");
describe('A number', () => {
    it('should evaluate to a number', () => {
        const testnum = new NumberNode_1.NumberNode(1);
        const output = testnum.eval();
        chai_1.expect(output).to.equal(1);
    });
});
