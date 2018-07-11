"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const lib_1 = require("../lib");
const LessThan_1 = require("../lib/logic/LessThan");
const Conditional_1 = require("../lib/conditionals/Conditional");
const BooleanNode_1 = require("../lib/prims/BooleanNode");
// x = 2
// if(x < 3) return 1
// if(var x = true)...
// if(x)... (x is boolean)
// x = 2
// if(x < 3) return 1
// else return 2
// if(...)
// else if(...)
// else(...)
describe('A conditional statement', () => {
    it('basic if should evaluate to 1', () => {
        const body1 = new lib_1.NumberNode(1); // works with this, not with return
        const x = new lib_1.VariableNode("x");
        const xnum = new lib_1.NumberNode(2);
        const decl1 = new lib_1.AssignOp(x, xnum);
        const log1 = new LessThan_1.LessThan(x, new lib_1.NumberNode(3));
        const cond1 = new Conditional_1.Conditional(log1, body1);
        const seq1 = new lib_1.SequenceNode(decl1, cond1);
        const output = seq1.eval(new lib_1.Scope(null));
        const output1 = seq1.rightVal;
        chai_1.expect(output1).to.equal(1);
    });
    it('declaring a boolean in if statement should evaluate to 1', () => {
        // if(var x = true) return 1
        const body2 = new lib_1.NumberNode(1); // works with this, not with return
        const x = new lib_1.VariableNode("x");
        const xbool = new BooleanNode_1.BooleanNode(true);
        const decl2 = new lib_1.AssignOp(x, xbool);
        //const log1 = new Equals(x,new NumberNode(3));
        const cond2 = new Conditional_1.Conditional(decl2, body2);
        //const seq1 = new SequenceNode(decl1,cond1);
        const output = cond2.eval(new lib_1.Scope(null));
        //const output1 = seq1.rightVal;
        chai_1.expect(output).to.equal(1);
    });
    it('if(true) should evaluate to 1', () => {
        const body3 = new lib_1.NumberNode(1); // works with this, not with return
        const x = new lib_1.VariableNode("x");
        const xbool = new BooleanNode_1.BooleanNode(true);
        const decl3 = new lib_1.AssignOp(x, xbool);
        //const log1 = new LessThan(x,new NumberNode(3));
        const cond3 = new Conditional_1.Conditional(x, body3);
        const seq3 = new lib_1.SequenceNode(decl3, cond3);
        const output = seq3.eval(new lib_1.Scope(null));
        const output1 = seq3.rightVal;
        chai_1.expect(output1).to.equal(1);
    });
});
/*
let context = new Scope(null);
//const body1 = new Return(new NumberNode(1));
const body1 = new NumberNode(1); // works with this, not with return
const z = new VariableNode("z");
const znum = new NumberNode(2);
const decl1 = new AssignOp(z, znum);
const log1 = new LessThan(z,new NumberNode(3));
const if1 = new IfOp(log1,body1);
const cond1 = new Conditional(if1);
const seq1 = new SequenceNode(decl1,cond1);
const output = seq1.eval(context);
const output1 = seq1.rightVal;
expect(output1).to.equal(1);
});
it('should evaluate to 2', () => {
let context = new Scope(null);
//const body1 = new Return(new NumberNode(1));
const body2 = new NumberNode(1); // works with this, not with return
const elsebody2 = new NumberNode(2);
const z = new VariableNode("z");
const znum = new NumberNode(5);
const decl2 = new AssignOp(z, znum);
const log2 = new LessThan(z,new NumberNode(3));
const if2 = new IfOp(log2,body2);
const else2 = new ElseOp(elsebody2);
const cond2 = new Conditional(if2,else2);
const seq2 = new SequenceNode(decl2,if2);
const output = seq2.eval(context);
const output2 = seq2.rightVal;
expect(output2).to.equal(2);
});
*/
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
