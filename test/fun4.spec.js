"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FunDef_1 = require("../lib/funhouse/FunDef");
const Scope_1 = require("../lib/structural/Scope");
const chai_1 = require("chai");
require("mocha");
const FunApp_1 = require("../lib/funhouse/FunApp");
const SequenceNode_1 = require("../lib/structural/SequenceNode");
const VariableNode_1 = require("../lib/vars/VariableNode");
const AssignOp_1 = require("../lib/binops/AssignOp");
const NumberNode_1 = require("../lib/prims/NumberNode");
const lib_1 = require("../lib");
//let i = 1
//def bar(x){
//  return x+i;
//let i = 2
//bar(1)
describe('A bar function to test static/dynamic scoping', () => {
    it('should evaluate to 2 if lexically scoped', () => {
        const i1 = new VariableNode_1.VariableNode("i");
        const i1def = new AssignOp_1.AssignOp(i1, new NumberNode_1.NumberNode(1));
        const fundef = new FunDef_1.FunDef("bar", new lib_1.Return(new lib_1.PlusOp(new VariableNode_1.VariableNode("x"), new VariableNode_1.VariableNode("i"))), ["x"]);
        const i2 = new VariableNode_1.VariableNode("i");
        const i2def = new AssignOp_1.AssignOp(i2, new NumberNode_1.NumberNode(2));
        const funapp = new FunApp_1.FunApp("bar", [1]);
        let context = new Scope_1.Scope(null);
        const seq3 = new SequenceNode_1.SequenceNode(i2def, funapp);
        const seq2 = new SequenceNode_1.SequenceNode(fundef, seq3);
        const seq1 = new SequenceNode_1.SequenceNode(i1def, seq2);
        //const i2def = new AssignOp(new VariableNode("i"), new NumberNode(2));
        const output = seq1.eval(context);
        const output1 = seq3.rightVal;
        chai_1.expect(output1).to.equal(2);
    });
});
//# sourceMappingURL=fun4.spec.js.map