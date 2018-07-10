import { assert,expect } from 'chai';
import 'mocha';
import { Scope, SequenceNode, NumberNode, AssignOp, VariableNode, Return } from '../lib';
import { IfOp } from '../lib/conditionals/IfOp';
import { LessThan } from '../lib/logic/LessThan';

// x = 2
// if(x < 3) return 1

describe('An if statement', () => {
    it('should evaluate to 1', () => {
        let context = new Scope(null);
        //const body1 = new Return(new NumberNode(1));
        const body1 = new NumberNode(1); // works with this, not with return
        const z = new VariableNode("z");
        const znum = new NumberNode(2);
        const decl1 = new AssignOp(z, znum);
        const cond1 = new LessThan(z,new NumberNode(3));
        const if1 = new IfOp(cond1,body1);
        const seq1 = new SequenceNode(decl1,if1);
        const output = seq1.eval(context);
        const output1 = seq1.rightVal;
        expect(output1).to.equal(1);
    });
});