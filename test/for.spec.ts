import { assert,expect } from 'chai';
import 'mocha';
import { LessThan, Scope, DeclareOp, VariableNode, AssignOp, NumberNode, PlusOp, SequenceNode, ForNode } from '..';
import { Context } from 'mocha';

// int x = 0;
// for(int i = 0; i < 10; i++){
    // x++;
//}

describe('A for loop', () => {
    it('should evaluate to 10', () => {
        const x = new VariableNode("x");
        const xvar = new DeclareOp(x,new NumberNode(0));
        const body1 = new AssignOp(x, new PlusOp(x,new NumberNode(1)));

        const i = new VariableNode("i");
        const decl1 = new DeclareOp(i, new NumberNode(1));
        const adj1 = new AssignOp(i, new PlusOp(i,new NumberNode(1)));
        const cond1 = new LessThan(i,new NumberNode(10));
        //const cond1 = new LessThan(i,new NumberNode(10));

        const for1 = new ForNode(decl1,cond1,adj1,body1);
        const seq1 = new SequenceNode(xvar,for1);
        const output = seq1.eval(new Scope(null));
        const output1 = seq1.rightVal;
        expect(output1).to.deep.equal(new NumberNode(10));
    });
});