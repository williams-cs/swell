"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PosNode_1 = require("../lib/prims/PosNode");
const chai_1 = require("chai");
require("mocha");
describe('A PositionNode', () => {
    it('should evaluate to a number', () => {
        const testnum = new PosNode_1.PosNode(234);
        const output = testnum.eval(null);
        chai_1.expect(output).to.equal(234);
    });
});
