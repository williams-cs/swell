import{NumberNode} from '../lib/NumberNode';
import {Scope} from '../lib/Scope';
import { assert,expect } from 'chai';
import 'mocha';

describe('A number', () => {
    it('should evaluate to a number', () => {
        const testnum = new NumberNode(1);
        const output = testnum.eval(new Scope(new Map(), null));
        expect(output).to.equal(1);
    });

});
