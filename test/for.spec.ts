import {Scope} from '../lib/structural/Scope';
import {AssignOp} from '../lib/binops/AssignOp';
import {PlusOp} from '../lib/binops/PlusOp';
import {LessThan} from '../lib/logic/LessThan';
import {DeclareOp} from '../lib/binops/DeclareOp';
import {NumberNode} from '../lib/prims/NumberNode';
import {VariableNode} from '../lib/vars/VariableNode';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {ForNode} from '../lib/loops/ForNode';

import { assert,expect } from 'chai';
import 'mocha';
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
        const decl1 = new DeclareOp(i, new NumberNode(0));
        //const initi = new AssignOp(i, new NumberNode(0));
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