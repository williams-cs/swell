"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../lib/structural/Scope");
const SequenceNode_1 = require("../lib/structural/SequenceNode");
const AssignOp_1 = require("../lib/binops/AssignOp");
const PlusOp_1 = require("../lib/binops/PlusOp");
const VariableNode_1 = require("../lib/vars/VariableNode");
const chai_1 = require("chai");
require("mocha");
const NumberNode_1 = require("../lib/prims/NumberNode");
const MulOp_1 = require("../lib/binops/MulOp");
const DeclareOp_1 = require("../lib/binops/DeclareOp");
describe('A sequence test with declaration', () => {
    it('should evaluate to a number', () => {
        // var i = i
        // i + 2; 
        let context = new Scope_1.Scope(null);
        //context.doc = null;
        const v = new VariableNode_1.VariableNode("i");
        const left = new DeclareOp_1.DeclareOp(v, new NumberNode_1.NumberNode(1));
        const right = new PlusOp_1.PlusOp(v, new NumberNode_1.NumberNode(2));
        const seq = new SequenceNode_1.SequenceNode(left, right);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        chai_1.expect(output1).to.deep.equal(new NumberNode_1.NumberNode(3));
    });
    it('should evaluate to a different number', () => {
        let context1 = new Scope_1.Scope(null);
        const a = new VariableNode_1.VariableNode("a");
        const b = new VariableNode_1.VariableNode("b");
        const assigna = new DeclareOp_1.DeclareOp(a, new NumberNode_1.NumberNode(4));
        const assignb = new DeclareOp_1.DeclareOp(b, new NumberNode_1.NumberNode(5));
        const mul = new MulOp_1.MulOp(a, b);
        const seq2 = new SequenceNode_1.SequenceNode(assignb, mul);
        const seq1 = new SequenceNode_1.SequenceNode(assigna, seq2);
        const output = seq1.eval(context1);
        const output1 = seq2.rightVal; // should this be seq1?
        chai_1.expect(output1).to.deep.equal(new NumberNode_1.NumberNode(20));
    });
    it('should evaluate to a different number after reassignment', () => {
        // var i = 1
        // i = 2; 
        let context = new Scope_1.Scope(null);
        //context.doc = null;
        const v = new VariableNode_1.VariableNode("i");
        const left = new DeclareOp_1.DeclareOp(v, new NumberNode_1.NumberNode(1));
        const right = new AssignOp_1.AssignOp(v, new NumberNode_1.NumberNode(2));
        const seq = new SequenceNode_1.SequenceNode(left, right);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        chai_1.expect(output1).to.deep.equal(new NumberNode_1.NumberNode(2));
    });
});
//# sourceMappingURL=decl.spec.js.map