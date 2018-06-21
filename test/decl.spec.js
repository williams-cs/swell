"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../lib/Scope");
const SequenceNode_1 = require("../lib/SequenceNode");
const AssignOp_1 = require("../lib/binops/AssignOp");
const PlusOp_1 = require("../lib/binops/PlusOp");
const VariableNode_1 = require("../lib/VariableNode");
const chai_1 = require("chai");
require("mocha");
const NumberNode_1 = require("../lib/NumberNode");
describe('A sequence test with declaration', () => {
    it('should evaluate to a number', () => {
        //const ivar = 
        let context = new Scope_1.Scope(null);
        let v = new VariableNode_1.VariableNode("i");
        const left = new AssignOp_1.AssignOp(v, new NumberNode_1.NumberNode(1));
        const right = new PlusOp_1.PlusOp(v, new NumberNode_1.NumberNode(1));
        const seq = new SequenceNode_1.SequenceNode(left, right);
        const output = seq.eval(context);
        chai_1.expect(output).to.equal(2);
    });
});
