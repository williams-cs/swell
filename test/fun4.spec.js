"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FunDef_1 = require("../lib/funhouse/FunDef");
const Scope_1 = require("../lib/Scope");
const chai_1 = require("chai");
require("mocha");
const FunApp_1 = require("../lib/funhouse/FunApp");
const SequenceNode_1 = require("../lib/SequenceNode");
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
    it('should evaluate to 2 if statically scoped', () => {
        const i1 = new VariableNode_1.VariableNode("i");
        const i1def = new AssignOp_1.AssignOp(i1, new NumberNode_1.NumberNode(1));
        const fundef = new FunDef_1.FunDef("bar", new lib_1.PlusOp(new VariableNode_1.VariableNode("x"), new VariableNode_1.VariableNode("i")), ["x"]);
        const i2 = new VariableNode_1.VariableNode("i");
        const i2def = new AssignOp_1.AssignOp(i2, new NumberNode_1.NumberNode(2));
        const funapp = new FunApp_1.FunApp(fundef, [2]);
        let context = new Scope_1.Scope(null);
        const seq = new SequenceNode_1.SequenceNode(fundef, funapp);
        const output = seq.eval(context);
        chai_1.expect(output).to.equal(2);
    });
});
