"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../lib/Scope");
const SequenceNode_1 = require("../lib/SequenceNode");
const AssignOp_1 = require("../lib/binops/AssignOp");
const PlusOp_1 = require("../lib/binops/PlusOp");
const VariableNode_1 = require("../lib/vars/VariableNode");
const chai_1 = require("chai");
require("mocha");
const NumberNode_1 = require("../lib/prims/NumberNode");
const MulOp_1 = require("../lib/binops/MulOp");
describe('A sequence test with declaration', () => {
    it('should evaluate to a tuple', () => {
        // var i = i
        // i + 2; 
        let context = new Scope_1.Scope(null);
        const v = new VariableNode_1.VariableNode("i");
        const left = new AssignOp_1.AssignOp(v, new NumberNode_1.NumberNode(1));
        const right = new PlusOp_1.PlusOp(v, new NumberNode_1.NumberNode(2));
        const seq = new SequenceNode_1.SequenceNode(left, right);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        chai_1.expect(output1).to.equal(3);
    });
    it('should evaluate to a different tuple', () => {
        let context1 = new Scope_1.Scope(null);
        const a = new VariableNode_1.VariableNode("a");
        const b = new VariableNode_1.VariableNode("b");
        const assigna = new AssignOp_1.AssignOp(a, new NumberNode_1.NumberNode(4));
        const assignb = new AssignOp_1.AssignOp(b, new NumberNode_1.NumberNode(5));
        const mul = new MulOp_1.MulOp(a, b);
        const seq2 = new SequenceNode_1.SequenceNode(assignb, mul);
        const seq1 = new SequenceNode_1.SequenceNode(assigna, seq2);
        const output = seq1.eval(context1);
        const output1 = seq2.rightVal; // should this be seq1?
        chai_1.expect(output1).to.equal(20);
    });
});
