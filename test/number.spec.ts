import {NumberNode} from '../lib/prims/NumberNode';

import { assert,expect } from 'chai';
import 'mocha';

describe('A number', () => {
    it('should evaluate to a number', () => {
        const testnum = new NumberNode(1);
        const output = testnum.eval(null);
        expect(output).to.eql(new NumberNode(1));
    });
    it('should evaluate to a number', () => {
        const testnum = new NumberNode(-1);
        const output = testnum.eval(null);
        expect(output).to.eql(new NumberNode(-1));
    });

});
