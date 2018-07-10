"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const lib_1 = require("../lib");
const ElseOp_1 = require("../lib/conditionals/ElseOp");
// x = 2
// if(x < 3) return 1
describe('An else statement', () => {
    it('should evaluate to 1', () => {
        let context = new lib_1.Scope(null);
        //const body1 = new Return(new NumberNode(1));
        const body1 = new lib_1.NumberNode(1);
        //const z = new VariableNode("z");
        //const znum = new NumberNode(2);
        //const decl1 = new AssignOp(z, znum);
        //const cond1 = new LessThan(z,new NumberNode(3));
        //const if1 = new IfOp(cond1,body1);
        const else1 = new ElseOp_1.ElseOp(body1);
        //const seq1 = new SequenceNode(decl1,if1);
        const output = else1.eval(context);
        //const output1 = seq1.rightVal;
        chai_1.expect(output).to.equal(1);
    });
});
