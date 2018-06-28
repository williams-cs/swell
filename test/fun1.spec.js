"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FunDef_1 = require("../lib/funhouse/FunDef");
const Scope_1 = require("../lib/Scope");
const chai_1 = require("chai");
require("mocha");
const FunApp_1 = require("../lib/funhouse/FunApp");
const SequenceNode_1 = require("../lib/SequenceNode");
const lib_1 = require("../lib");
// def identity(x){
//  return x;
describe('An identity function', () => {
    it('should evaluate to its parameters', () => {
        const fundef = new FunDef_1.FunDef("identity", new lib_1.Return(new lib_1.VariableNode("x")), ["x"]);
        const funapp = new FunApp_1.FunApp("identity", [1]);
        let context = new Scope_1.Scope(null);
        const seq = new SequenceNode_1.SequenceNode(fundef, funapp);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        chai_1.expect(output1).to.equal(1);
    });
});
