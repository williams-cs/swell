"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequenceNode_1 = require("../lib/SequenceNode");
const chai_1 = require("chai");
require("mocha");
const NumberNode_1 = require("../lib/prims/NumberNode");
const PlusOp_1 = require("../lib/binops/PlusOp");
describe('A SeqNode', () => {
    it('should evaluate to a tuple', () => {
        const num0 = new NumberNode_1.NumberNode(1);
        const plus0 = new PlusOp_1.PlusOp(new NumberNode_1.NumberNode(2), new NumberNode_1.NumberNode(2));
        const node0 = new SequenceNode_1.SequenceNode(num0, plus0);
        const output = node0.eval(null);
        //deep or strict equal?
        //expect(output).to.deep.equal([num0.eval(null),plus0.eval(null)])
        chai_1.expect(output).to.deep.equal([1, 4]);
    });
});
