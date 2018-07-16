import { assert,expect } from 'chai';
import 'mocha';
import{NegOp, NumberNode} from '..';

describe('A negop', () => {
    it('should evaluate to the negation', () => {
        const testval = new NegOp(new NumberNode(1));
        const output = testval.eval(null);
        expect(output).to.eql(new NumberNode(-1));
    });
    it('should evaluate to another negation', () => {
        const testval = new NegOp(new NumberNode(-1));
        const output = testval.eval(null);
        expect(output).to.eql(new NumberNode(1));
    });
});
