import { assert,expect } from 'chai';
import 'mocha';
import { NumberNode, PlusOp, Scope } from '..';

describe('A plusop', () => {
    it('should evaluate to a number', () => {
        const op: PlusOp = new PlusOp(new NumberNode(1), new NumberNode(2));
        const output = op.eval(new Scope(null));
        expect(output).to.eql(new NumberNode(3));
    });
    it('should evaluate to a negative number', () => {
        const op1: PlusOp = new PlusOp(new NumberNode(1), new NumberNode(-2));
        const output1 = op1.eval(new Scope(null));
        expect(output1).to.eql(new NumberNode(-1));
    });
    it('should evaluate to zero', () => {
        const op2: PlusOp = new PlusOp(new NumberNode(-1), new NumberNode(1));
        const output2 = op2.eval(new Scope(null));
        expect(output2).to.eql(new NumberNode(0));
    });
});
