import{NegOp} from '../lib/unops/NegOp';
import { NumberNode } from '../lib/NumberNode';
import {Scope} from '../lib/Scope';
import { assert,expect } from 'chai';
import 'mocha';

describe('A negop', () => {
    it('should evaluate to the negation', () => {
        const testval = new NegOp(new NumberNode(1));
        const output = testval.eval(null);
        expect(output).to.equal(-1);
    });
    it('should evaluate to another negation', () => {
        const testval = new NegOp(new NumberNode(-1));
        const output = testval.eval(null);
        expect(output).to.equal(1);
    });
});
