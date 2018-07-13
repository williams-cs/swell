
import {Scope} from '../lib/structural/Scope'
import{StringNode} from '../lib/prims/StringNode';
import { assert,expect } from 'chai';
import 'mocha';
import { VariableNode, AssignOp, NumberNode, WhileNode, PlusOp, SequenceNode, Conditional } from '../lib';
import { LessThan } from '../lib/logic/LessThan';
import { Context } from 'mocha';

describe('A while loop', () => {
    it('should evaluate to 9', () => {
        const x = new VariableNode("x");
        const xvar = new AssignOp(x,new NumberNode(0));
        const body1 = new AssignOp(x, new PlusOp(x,new NumberNode(1)));
        //const cond1 = new Conditional(new LessThan(x,new NumberNode(10)), add1);
        const cond1 = new LessThan(x,new NumberNode(10));
        const while1 = new WhileNode(cond1,body1);
        const seq1 = new SequenceNode(xvar,while1);
        const output = seq1.eval(new Scope(null));
        const output1 = seq1.rightVal;
        expect(output1).to.equal(9);
    });
});
