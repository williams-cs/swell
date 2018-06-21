import {Scope} from '../lib/Scope'
import{StringNode} from '../lib/StringNode';
import { assert,expect } from 'chai';
import 'mocha';

describe('A string', () => {
    it('should evaluate to a string', () => {
        const teststring = new StringNode("hello world");
        const output = teststring.eval();
        expect(output).to.equal("hello world");
    });
});

