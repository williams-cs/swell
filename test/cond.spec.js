"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const __1 = require("..");
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
        const body1 = new __1.NumberNode(1); // works with this, not with return
        const x = new __1.VariableNode("x");
        const xnum = new __1.NumberNode(2);
        const decl1 = new __1.AssignOp(x, xnum);
        const log1 = new LessThan_1.LessThan(x, new __1.NumberNode(3));
        const cond1 = new Conditional_1.Conditional(log1, body1);
        const seq1 = new __1.SequenceNode(decl1, cond1);
        const output = seq1.eval(new __1.Scope(null));
        const output1 = seq1.rightVal;
        chai_1.expect(output1).to.eql(new lib_1.NumberNode(1));
    });
    it('declaring a boolean in if statement should evaluate to 1', () => {
        // if(var x = true) return 1
        const body2 = new __1.NumberNode(1); // works with this, not with return
        const x = new __1.VariableNode("x");
        const xbool = new BooleanNode_1.BooleanNode(true);
        const decl2 = new __1.AssignOp(x, xbool);
        //const log1 = new Equals(x,new NumberNode(3));
        const cond2 = new Conditional_1.Conditional(decl2, body2);
        //const seq1 = new SequenceNode(decl1,cond1);
        const output = cond2.eval(new __1.Scope(null));
        //const output1 = seq1.rightVal;
        chai_1.expect(output).to.eql(new lib_1.NumberNode(1));
    });
    it('if(true) should evaluate to 1', () => {
        // var x = true
        // if(x) return 1
        const body3 = new __1.NumberNode(1); // works with this, not with return
        const x = new __1.VariableNode("x");
        const xbool = new BooleanNode_1.BooleanNode(true);
        const decl3 = new __1.AssignOp(x, xbool);
        //const log1 = new LessThan(x,new NumberNode(3));
        const cond3 = new Conditional_1.Conditional(x, body3);
        const seq3 = new __1.SequenceNode(decl3, cond3);
        const output = seq3.eval(new __1.Scope(null));
        const output1 = seq3.rightVal;
        chai_1.expect(output1).to.eql(new lib_1.NumberNode(1));
    });
    it('if/else should evaluate to 1', () => {
        // x = 2
        // if(x < 3) return 1
        // else return 2
        const body4 = new __1.NumberNode(1);
        const else4 = new __1.NumberNode(2);
        const x = new __1.VariableNode("x");
        const xnum = new __1.NumberNode(2);
        const decl4 = new __1.AssignOp(x, xnum);
        const log4 = new LessThan_1.LessThan(x, new __1.NumberNode(3));
        const cond4 = new Conditional_1.Conditional(log4, body4, else4);
        const seq4 = new __1.SequenceNode(decl4, cond4);
        const output = seq4.eval(new __1.Scope(null));
        const output1 = seq4.rightVal;
        chai_1.expect(output1).to.eql(new lib_1.NumberNode(1));
    });
    it('if/else should evaluate to 2', () => {
        // x = 5
        // if(x < 3) return 1
        // else return 2
        const body4 = new __1.NumberNode(1);
        const else4 = new __1.NumberNode(2);
        const x = new __1.VariableNode("x");
        const xnum = new __1.NumberNode(5);
        const decl4 = new __1.AssignOp(x, xnum);
        const log4 = new LessThan_1.LessThan(x, new __1.NumberNode(3));
        const cond4 = new Conditional_1.Conditional(log4, body4, else4);
        const seq4 = new __1.SequenceNode(decl4, cond4);
        const output = seq4.eval(new __1.Scope(null));
        const output1 = seq4.rightVal;
        chai_1.expect(output1).to.eql(new lib_1.NumberNode(2));
    });
    it('if/else if/else should evaluate to 1', () => {
        // x = 2
        // if(x < 3) return 1
        // else if (x < 5) return 2
        // else return 3
        const body5 = new __1.NumberNode(1);
        const elseif5 = new __1.NumberNode(2);
        const else5 = new __1.NumberNode(3);
        const x = new __1.VariableNode("x");
        const xnum = new __1.NumberNode(2);
        const decl5 = new __1.AssignOp(x, xnum);
        const iflog5 = new LessThan_1.LessThan(x, new __1.NumberNode(3));
        const elselog5 = new LessThan_1.LessThan(x, new __1.NumberNode(5));
        const cond52 = new Conditional_1.Conditional(elselog5, elseif5, else5);
        const cond51 = new Conditional_1.Conditional(iflog5, body5, cond52);
        const seq5 = new __1.SequenceNode(decl5, cond51);
        const output = seq5.eval(new __1.Scope(null));
        const output1 = seq5.rightVal;
        chai_1.expect(output1).to.eql(new lib_1.NumberNode(1));
    });
    it('if/else if/else should evaluate to 2', () => {
        // x = 2
        // if(x < 3) return 1
        // else if (x < 5) return 2
        // else return 3
        const body5 = new __1.NumberNode(1);
        const elseif5 = new __1.NumberNode(2);
        const else5 = new __1.NumberNode(3);
        const x = new __1.VariableNode("x");
        const xnum = new __1.NumberNode(4);
        const decl5 = new __1.AssignOp(x, xnum);
        const iflog5 = new LessThan_1.LessThan(x, new __1.NumberNode(3));
        const elselog5 = new LessThan_1.LessThan(x, new __1.NumberNode(5));
        const cond52 = new Conditional_1.Conditional(elselog5, elseif5, else5);
        const cond51 = new Conditional_1.Conditional(iflog5, body5, cond52);
        const seq5 = new __1.SequenceNode(decl5, cond51);
        const output = seq5.eval(new __1.Scope(null));
        const output1 = seq5.rightVal;
        chai_1.expect(output1).to.eql(new lib_1.NumberNode(2));
    });
    it('if/else if/else should evaluate to 3', () => {
        // x = 2
        // if(x < 3) return 1
        // else if (x < 5) return 2
        // else return 3
        const body5 = new __1.NumberNode(1);
        const elseif5 = new __1.NumberNode(2);
        const else5 = new __1.NumberNode(3);
        const x = new __1.VariableNode("x");
        const xnum = new __1.NumberNode(8);
        const decl5 = new __1.AssignOp(x, xnum);
        const iflog5 = new LessThan_1.LessThan(x, new __1.NumberNode(3));
        const elselog5 = new LessThan_1.LessThan(x, new __1.NumberNode(5));
        const cond52 = new Conditional_1.Conditional(elselog5, elseif5, else5);
        const cond51 = new Conditional_1.Conditional(iflog5, body5, cond52);
        const seq5 = new __1.SequenceNode(decl5, cond51);
        const output = seq5.eval(new __1.Scope(null));
        const output1 = seq5.rightVal;
        chai_1.expect(output1).to.eql(new lib_1.NumberNode(3));
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
//# sourceMappingURL=cond.spec.js.map