"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FunDef_1 = require("../lib/funhouse/FunDef");
const Scope_1 = require("../lib/structural/Scope");
const chai_1 = require("chai");
require("mocha");
const FunApp_1 = require("../lib/funhouse/FunApp");
const SequenceNode_1 = require("../lib/structural/SequenceNode");
const lib_1 = require("../lib");
//let i = 1
//def closure(x){
//  return x+i;
//closure(2)
describe('A closure function', () => {
    it('should evaluate to 3', () => {
        const i1 = new lib_1.AssignOp(new lib_1.VariableNode("i"), new lib_1.NumberNode(1));
        // i1?
        const xvar = new lib_1.VariableNode("x");
        const ivar = new lib_1.VariableNode("i");
        const fundef = new FunDef_1.FunDef("closure", new lib_1.Return(new lib_1.PlusOp(xvar, ivar)), ["x"]);
        const funapp = new FunApp_1.FunApp("closure", [2]);
        let context = new Scope_1.Scope(null);
        const seq1 = new SequenceNode_1.SequenceNode(fundef, funapp);
        const seq2 = new SequenceNode_1.SequenceNode(i1, seq1);
        const output = seq2.eval(context);
        const output1 = seq1.rightVal;
        chai_1.expect(output1).to.equal(3);
    });
});
