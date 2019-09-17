import {Scope} from '../lib/structural/Scope';
import {AssignOp} from '../lib/binops/AssignOp';
import {LessThan} from '../lib/logic/LessThan';
import {NumberNode} from '../lib/prims/NumberNode';
import {BooleanNode} from '../lib/prims/BooleanNode';
import {VariableNode} from '../lib/vars/VariableNode';
import {Conditional} from '../lib/conditionals/Conditional';
import {SequenceNode} from '../lib/structural/SequenceNode';
import { Parens } from '../lib/unops/Parens';
import {BodyNode} from '../lib/structural/BodyNode';
import { assert,expect } from 'chai';
import 'mocha';

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
        const body1 = new BodyNode(new NumberNode(1)); // works with this, not with return
        const x = new VariableNode("x");
        const xnum = new NumberNode(2);
        const decl1 = new AssignOp(x, xnum);
        const log1 = new Parens(new LessThan(x,new NumberNode(3)));
        const cond1 = new Conditional(log1,body1);
        const seq1 = new SequenceNode(decl1,cond1);
        const output = seq1.eval(new Scope(null));
        expect(output).to.eql(new NumberNode(1));
    });

    it('declaring a boolean in if statement should evaluate to 1', () => {
        // if(var x = true) return 1
        const body2 = new NumberNode(1); // works with this, not with return
        const x = new VariableNode("x");
        const xbool = new BooleanNode(true);
        const decl2 = new AssignOp(x, xbool);
        //const log1 = new Equals(x,new NumberNode(3));
        const cond2 = new Conditional(new Parens(decl2),body2);
        //const seq1 = new SequenceNode(decl1,cond1);
        const output = cond2.eval(new Scope(null));
        //const output1 = seq1.rightVal;
        expect(output).to.eql(new NumberNode(1));
    });

    it('if(true) should evaluate to 1', () => {
        // var x = true
        // if(x) return 1
        const body3 = new NumberNode(1); // works with this, not with return
        const x = new VariableNode("x");
        const xbool = new BooleanNode(true);
        const decl3 = new AssignOp(x, xbool);
        //const log1 = new LessThan(x,new NumberNode(3));
        const cond3 = new Conditional(new Parens(x),body3);
        const seq3 = new SequenceNode(decl3,cond3);
        const output = seq3.eval(new Scope(null));
        expect(output).to.eql(new NumberNode(1));
    });

    it('if/else should evaluate to 1', () => {
        // x = 2
        // if(x < 3) return 1
        // else return 2
        const body4 = new NumberNode(1); 
        const else4 = new NumberNode(2);
        const x = new VariableNode("x");
        const xnum = new NumberNode(2);
        const decl4 = new AssignOp(x, xnum);
        const log4 = new LessThan(x,new NumberNode(3));
        const cond4 = new Conditional(new Parens(log4, " "),body4, "", new BodyNode(else4));
        const seq4 = new SequenceNode(decl4,cond4);
        const output = seq4.eval(new Scope(null));
        //const output1 = seq4.right;
        expect(output).to.eql(new NumberNode(1));
    });

    it('if/else should evaluate to 2', () => {
        // x = 5
        // if(x < 3) return 1
        // else return 2
        const body4 = new NumberNode(1); 
        const else4 = new NumberNode(2);
        const x = new VariableNode("x");
        const xnum = new NumberNode(5);
        const decl4 = new AssignOp(x, xnum);
        const log4 = new LessThan(x,new NumberNode(3));
        const cond4 = new Conditional(new Parens(log4),body4,"", new BodyNode(else4));
        const seq4 = new SequenceNode(decl4,cond4);
        const output = seq4.eval(new Scope(null));
        //const output1 = seq4.right;
        expect(output).to.eql(new NumberNode(2));
    });

    it('if/else if/else should evaluate to 1', () => {
        // x = 2
        // if(x < 3) return 1
        // else if (x < 5) return 2
        // else return 3
        const body5 = new NumberNode(1); 
        const elseif5 = new NumberNode(2);
        const else5 = new NumberNode(3);
        const x = new VariableNode("x");
        const xnum = new NumberNode(2);
        const decl5 = new AssignOp(x, xnum);
        const iflog5 = new LessThan(x,new NumberNode(3));
        const elselog5 = new LessThan(x,new NumberNode(5));
        const cond52 = new Conditional(new Parens(elselog5),elseif5, " ", new BodyNode(else5));
        const cond51 = new Conditional(new Parens(iflog5),body5, "", new BodyNode(cond52));
        const seq5 = new SequenceNode(decl5,cond51);
        const output = seq5.eval(new Scope(null));
        //const output1 = seq5.right;
        expect(output).to.eql(new NumberNode(1));
    });

    it('if/else if/else should evaluate to 2', () => {
        // x = 2
        // if(x < 3) return 1
        // else if (x < 5) return 2
        // else return 3
        const body5 = new NumberNode(1); 
        const elseif5 = new NumberNode(2);
        const else5 = new NumberNode(3);
        const x = new VariableNode("x");
        const xnum = new NumberNode(4);
        const decl5 = new AssignOp(x, xnum);
        const iflog5 = new LessThan(x,new NumberNode(3));
        const elselog5 = new LessThan(x,new NumberNode(5));
        const cond52 = new Conditional(new Parens(elselog5),elseif5, "", new BodyNode(else5));
        const cond51 = new Conditional(new Parens(iflog5),body5, "", cond52);
        const seq5 = new SequenceNode(decl5,cond51);
        const output = seq5.eval(new Scope(null));
        //const output1 = seq5.right;
        expect(output).to.eql(new NumberNode(2));
    });

    it('if/else if/else should evaluate to 3', () => {
        // x = 2
        // if(x < 3) return 1
        // else if (x < 5) return 2
        // else return 3
        const body5 = new NumberNode(1); 
        const elseif5 = new NumberNode(2);
        const else5 = new NumberNode(3);
        const x = new VariableNode("x");
        const xnum = new NumberNode(8);
        const decl5 = new AssignOp(x, xnum);
        const iflog5 = new LessThan(x,new NumberNode(3));
        const elselog5 = new LessThan(x,new NumberNode(5));
        const cond52 = new Conditional(new Parens(elselog5),elseif5,"", new BodyNode(else5));
        const cond51 = new Conditional(new Parens(iflog5),body5,"", cond52);
        const seq5 = new SequenceNode(decl5,cond51);
        const output = seq5.eval(new Scope(null));
        //const output1 = seq5.right;
        expect(output).to.eql(new NumberNode(3));
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
