import {StringNode} from '../lib/prims/StringNode';

import { assert,expect } from 'chai';
import 'mocha';

describe('A string', () => {
    it('should evaluate to a string', () => {
        const teststring = new StringNode("hello world");
        const output = teststring.eval(null);
        expect(output.val).to.equal("hello world");
    });
});

