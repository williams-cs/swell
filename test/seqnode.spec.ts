import {PlusOp} from '../lib/binops/PlusOp';
import {NumberNode} from '../lib/prims/NumberNode';
import {SequenceNode} from '../lib/structural/SequenceNode';

import { assert,expect } from 'chai';
import 'mocha';
import { Scope } from '../lib/structural/Scope';

describe('A SeqNode', () => {
    it('should evaluate to a tuple', () => {
        const num0 = new NumberNode(1, null);
        const plus0 = new PlusOp(new NumberNode(2, null),new NumberNode(2, null));
        const node0 = new SequenceNode(num0,plus0);
        
        const output = node0.eval(new Scope(null));
        //deep or strict equal?
        //expect(output).to.deep.equal([num0.eval(null),plus0.eval(null)])
        expect(output.val).to.eql((new NumberNode(4, node0)).val);
    });
});
