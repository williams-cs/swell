/*
import {SequenceNode} from '../lib/SequenceNode';

import { assert,expect } from 'chai';
import 'mocha';
import { NumberNode } from '../lib/prims/NumberNode';
import { PlusOp } from '../lib/binops/PlusOp';

describe('A SeqNode', () => {
    it('should evaluate to a tuple', () => {
        const num0 = new NumberNode(1);
        const plus0 = new PlusOp(new NumberNode(2),new NumberNode(2));
        const node0 = new SequenceNode(num0,plus0);
        
        const output = node0.eval(null);
        //deep or strict equal?
        //expect(output).to.deep.equal([num0.eval(null),plus0.eval(null)])
        expect(output).to.deep.equal([1,4]);
    });
});
*/