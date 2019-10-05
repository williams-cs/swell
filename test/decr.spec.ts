import { assert,expect } from 'chai';
import 'mocha';

import {Scope} from '../lib/structural/Scope';
import {AssignOp} from '../lib/binops/AssignOp';
import {MulOp} from '../lib/binops/MulOp';
import {PlusOp} from '../lib/binops/PlusOp';
import {NumberNode} from '../lib/prims/NumberNode';
import {VariableNode} from '../lib/vars/VariableNode';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {Decrement} from '../lib/unops/Decrement';

describe('A decrement test', () => {
    it('should evaluate to a number', () => {
        // i = 1
        // i--

        let context = new Scope(null);
        const v = new VariableNode("i");
        const left = new AssignOp(v, new NumberNode(1,null));
        const right = new Decrement(v);
        const seq = new SequenceNode(left, right);
        const output = seq.eval(context);
        // Decrement internally uses a MinusOp, so a
        // new NumberNode will not deep equal output;
        // we just use the overloaded equals() method
        // instead.
        expect(output.equals(new NumberNode(0, null)));
    });
});
