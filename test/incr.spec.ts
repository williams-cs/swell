import { assert,expect } from 'chai';
import 'mocha';

import {Scope} from '../lib/structural/Scope';
import {AssignOp} from '../lib/binops/AssignOp';
import {MulOp} from '../lib/binops/MulOp';
import {PlusOp} from '../lib/binops/PlusOp';
import {DeclareOp} from '../lib/binops/DeclareOp';
import {NumberNode} from '../lib/prims/NumberNode';
import {VariableNode} from '../lib/vars/VariableNode';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {Increment} from '../lib/unops/Increment';

describe('An increment test', () => {
    it('should evaluate to a number', () => {
        // var i = 1
        // i++
        let context = new Scope(null);
        //context.doc = null;
        const v = new VariableNode("i");
        const left = new DeclareOp(v, new NumberNode(1));
        const right = new Increment(v);
        const seq = new SequenceNode(left, right);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        expect(output1).to.deep.equal(new NumberNode(2));
    });
});
