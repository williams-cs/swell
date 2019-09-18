import {NumberNode} from '../lib/prims/NumberNode';

import { assert,expect } from 'chai';
import 'mocha';

describe('A number', () => {
    it('should evaluate to a number', () => {
        const testnum = new NumberNode(1, null);
        const output = testnum.eval(null);
        expect(output).to.eql(new NumberNode(1, null));
    });
    it('should evaluate to a number', () => {
        const testnum = new NumberNode(-1, null);
        const output = testnum.eval(null);
        expect(output).to.eql(new NumberNode(-1, null));
    });

});
