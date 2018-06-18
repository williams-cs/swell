"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../NumberNode");
const chai_1 = require("chai");
require("mocha");
describe('A number', () => {
    it('should evaluate to a number', () => {
        const testnum = new NumberNode_1.NumberNode(null, 1);
        console.log("***DEBUG***: " + testnum.val);
        const output = testnum.eval();
        console.log("***DEBUG***: " + output);
        chai_1.expect(output).to.equal(1);
    });
});
