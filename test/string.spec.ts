import {Scope} from '../lib/structural/Scope'
import{StringNode} from '../lib/prims/StringNode';
import { assert,expect } from 'chai';
import 'mocha';

describe('A string', () => {
    it('should evaluate to a string', () => {
        const teststring = new StringNode("hello world");
        const output = teststring.eval(null);
        expect(output.str).to.equal("hello world");
    });
});

