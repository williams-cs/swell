"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../lib/structural/Scope");
const chai_1 = require("chai");
require("mocha");
const __1 = require("..");
const LessThan_1 = require("../lib/logic/LessThan");
const DeclareOp_1 = require("../lib/binops/DeclareOp");
const ForNode_1 = require("../lib/loops/ForNode");
// int x = 0;
// for(int i = 0; i < 10; i++){
// x++;
//}
describe('A while loop', () => {
    it('should evaluate to 9', () => {
        const x = new __1.VariableNode("x");
        const xvar = new DeclareOp_1.DeclareOp(x, new __1.NumberNode(0));
        const body1 = new __1.AssignOp(x, new __1.PlusOp(x, new __1.NumberNode(1)));
        const i = new __1.VariableNode("i");
        const decl1 = new DeclareOp_1.DeclareOp(i, new __1.NumberNode(0));
        const cond1 = new LessThan_1.LessThan(i, new __1.NumberNode(10));
        const adj1 = new __1.AssignOp(i, new __1.PlusOp(i, new __1.NumberNode(1)));
        //const cond1 = new LessThan(i,new NumberNode(10));
        const for1 = new ForNode_1.ForNode(decl1, cond1, adj1, body1);
        const seq1 = new __1.SequenceNode(xvar, for1);
        const output = seq1.eval(new Scope_1.Scope(null));
        const output1 = seq1.rightVal;
        chai_1.expect(output1).to.deep.equal(new __1.NumberNode(10));
    });
});
//# sourceMappingURL=for.spec.js.map