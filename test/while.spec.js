"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../lib/structural/Scope");
const chai_1 = require("chai");
require("mocha");
const __1 = require("..");
const LessThan_1 = require("../lib/logic/LessThan");
const DeclareOp_1 = require("../lib/binops/DeclareOp");
// while(int i < 10) i++
describe('A while loop', () => {
    it('should evaluate to 9', () => {
        const x = new __1.VariableNode("x");
        const xvar = new DeclareOp_1.DeclareOp(x, new __1.NumberNode(0));
        const body1 = new __1.AssignOp(x, new __1.PlusOp(x, new __1.NumberNode(1)));
        //const cond1 = new Conditional(new LessThan(x,new NumberNode(10)), add1);
        const cond1 = new LessThan_1.LessThan(x, new __1.NumberNode(10));
        const while1 = new __1.WhileNode(cond1, body1);
        const seq1 = new __1.SequenceNode(xvar, while1);
        const output = seq1.eval(new Scope_1.Scope(null));
        const output1 = seq1.rightVal;
        chai_1.expect(output1).to.deep.equal(new __1.NumberNode(10));
    });
});
//# sourceMappingURL=while.spec.js.map