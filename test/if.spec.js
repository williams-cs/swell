"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const lib_1 = require("../lib");
const IfOp_1 = require("../lib/conditionals/IfOp");
const LessThan_1 = require("../lib/logic/LessThan");
// x = 2
// if(x < 3) return 1
describe('An if statement', () => {
    it('should evaluate to 1', () => {
        let context = new lib_1.Scope(null);
        //const body1 = new Return(new NumberNode(1));
        const body1 = new lib_1.NumberNode(1); // works with this, not with return
        const z = new lib_1.VariableNode("z");
        const znum = new lib_1.NumberNode(2);
        const decl1 = new lib_1.AssignOp(z, znum);
        const cond1 = new LessThan_1.LessThan(z, new lib_1.NumberNode(3));
        const if1 = new IfOp_1.IfOp(cond1, body1);
        const seq1 = new lib_1.SequenceNode(decl1, if1);
        const output = seq1.eval(context);
        const output1 = seq1.rightVal;
        chai_1.expect(output1).to.equal(1);
    });
});
