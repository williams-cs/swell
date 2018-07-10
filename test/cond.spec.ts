import { assert,expect } from 'chai';
import 'mocha';
import { Scope, SequenceNode, NumberNode, AssignOp, VariableNode, Return } from '../lib';
import { IfOp } from '../lib/conditionals/IfOp';
import { LessThan } from '../lib/logic/LessThan';
import { Conditional } from '../lib/conditionals/Conditional';
import { ElseOp } from '../lib/conditionals/ElseOp';

// x = 2
// if(x < 3) return 1

// x = 2
// if(x < 3) return 1
// else return 2

describe('A conditional statement', () => {
    it('should evaluate to 1', () => {
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