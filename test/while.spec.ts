import {Scope} from '../lib/structural/Scope';
import {AssignOp} from '../lib/binops/AssignOp';
import {PlusOp} from '../lib/binops/PlusOp';
import {LessThan} from '../lib/logic/LessThan';
import {NumberNode} from '../lib/prims/NumberNode';
import {VariableNode} from '../lib/vars/VariableNode';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {WhileNode} from '../lib/loops/WhileNode';

import { assert,expect } from 'chai';
import 'mocha';

// while(int i < 10) i++

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
        const output1 = seq1.right;
        expect(output1).to.deep.equal(new NumberNode(10));
    });
});
