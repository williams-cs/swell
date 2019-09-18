import {NegOp} from '../lib/unops/NegOp';
import {NumberNode} from '../lib/prims/NumberNode';

import { assert,expect } from 'chai';
import 'mocha';

describe('A negop', () => {
    it('should evaluate to the negation', () => {
        const testval = new NegOp(new NumberNode(1, null));
        const output = testval.eval(null);
        expect(output).to.eql(new NumberNode(-1, null));
    });
    it('should evaluate to another negation', () => {
        const testval = new NegOp(new NumberNode(-1, null));
        const output = testval.eval(null);
        expect(output).to.eql(new NumberNode(1, null));
    });
});
