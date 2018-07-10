"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const lib_1 = require("../lib");
const IfOp_1 = require("../lib/conditionals/IfOp");
const LessThan_1 = require("../lib/logic/LessThan");
const Conditional_1 = require("../lib/conditionals/Conditional");
const ElseOp_1 = require("../lib/conditionals/ElseOp");
// x = 2
// if(x < 3) return 1
// x = 2
// if(x < 3) return 1
// else return 2
describe('A conditional statement', () => {
    it('should evaluate to 1', () => {
        let context = new lib_1.Scope(null);
        //const body1 = new Return(new NumberNode(1));
        const body1 = new lib_1.NumberNode(1); // works with this, not with return
        const z = new lib_1.VariableNode("z");
        const znum = new lib_1.NumberNode(2);
        const decl1 = new lib_1.AssignOp(z, znum);
        const log1 = new LessThan_1.LessThan(z, new lib_1.NumberNode(3));
        const if1 = new IfOp_1.IfOp(log1, body1);
        const cond1 = new Conditional_1.Conditional(if1);
        const seq1 = new lib_1.SequenceNode(decl1, cond1);
        const output = seq1.eval(context);
        const output1 = seq1.rightVal;
        chai_1.expect(output1).to.equal(1);
    });
    it('should evaluate to 2', () => {
        let context = new lib_1.Scope(null);
        //const body1 = new Return(new NumberNode(1));
        const body2 = new lib_1.NumberNode(1); // works with this, not with return
        const elsebody2 = new lib_1.NumberNode(2);
        const z = new lib_1.VariableNode("z");
        const znum = new lib_1.NumberNode(5);
        const decl2 = new lib_1.AssignOp(z, znum);
        const log2 = new LessThan_1.LessThan(z, new lib_1.NumberNode(3));
        const if2 = new IfOp_1.IfOp(log2, body2);
        const else2 = new ElseOp_1.ElseOp(elsebody2);
        const cond2 = new Conditional_1.Conditional(if2, else2);
        const seq2 = new lib_1.SequenceNode(decl2, if2);
        const output = seq2.eval(context);
        const output2 = seq2.rightVal;
        chai_1.expect(output2).to.equal(2);
    });
    /*
    describe('An else statement', () => {
     it('should evaluate to 1', () => {
         let context = new Scope(null);
         //const body1 = new Return(new NumberNode(1));
         const body1 = new NumberNode(1);
         const else1 = new ElseOp(body1);
         //const seq1 = new SequenceNode(decl1,if1);
         const output = else1.eval(context);
         //const output1 = seq1.rightVal;
         expect(output).to.equal(1);
     });
 });
 */
});
