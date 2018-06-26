"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FunDef_1 = require("../lib/funhouse/FunDef");
const Scope_1 = require("../lib/Scope");
const chai_1 = require("chai");
require("mocha");
const FunApp_1 = require("../lib/funhouse/FunApp");
const SequenceNode_1 = require("../lib/SequenceNode");
// def c(x){
//  return 1;
describe('An constant function', () => {
    it('should evaluate to 1', () => {
        const fundef = new FunDef_1.FunDef("c", null, ["x"]); // body = ret 1
        const funapp = new FunApp_1.FunApp(fundef, [1]);
        let context = new Scope_1.Scope(null);
        const seq = new SequenceNode_1.SequenceNode(fundef, funapp);
        const output = seq.eval(context);
        chai_1.expect(output).to.equal(1);
    });
});
