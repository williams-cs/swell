"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FunDef_1 = require("../lib/funhouse/FunDef");
const Scope_1 = require("../lib/structural/Scope");
const chai_1 = require("chai");
require("mocha");
const FunApp_1 = require("../lib/funhouse/FunApp");
const SequenceNode_1 = require("../lib/structural/SequenceNode");
const lib_1 = require("../lib");
// def c(x){
//  return 1;
describe('An constant function', () => {
    it('should evaluate to 1', () => {
        const fundef = new FunDef_1.FunDef("c", new lib_1.Return(new lib_1.NumberNode(1)), ["x"]);
        const funapp = new FunApp_1.FunApp("c", [2]);
        let context = new Scope_1.Scope(null);
        const seq = new SequenceNode_1.SequenceNode(fundef, funapp);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        chai_1.expect(output1).to.equal(1);
    });
});
