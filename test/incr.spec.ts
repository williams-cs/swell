import { assert,expect } from 'chai';
import 'mocha';

import {Scope} from '../lib/structural/Scope';
import {AssignOp} from '../lib/binops/AssignOp';
import {MulOp} from '../lib/binops/MulOp';
import {PlusOp} from '../lib/binops/PlusOp';
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
        const left = new AssignOp(v, new NumberNode(1,null));
        const right = new Increment(v);
        const seq = new SequenceNode(left, right);
        const output = seq.eval(context);
        // use overloaded equals method defined on numbernode
        // since new numbernode will have a different origin
        expect(output.equals(new NumberNode(2,right)));
    });
});
