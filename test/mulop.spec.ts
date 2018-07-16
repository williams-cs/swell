import { assert,expect } from 'chai';
import 'mocha';
import { NumberNode, MulOp, Scope } from '..';

describe('A MulOp', () => {
    it('should evaluate to a number', () => {
        const op: MulOp = new MulOp(new NumberNode(1), new NumberNode(2));
        const output = op.eval(new Scope(null));
        expect(output).to.eql(new NumberNode(2));
    });
    it('should evaluate to a negative number', () => {
        const op1: MulOp = new MulOp(new NumberNode(2), new NumberNode(-2));
        const output1 = op1.eval(new Scope(null));
        expect(output1).to.eql(new NumberNode(-4));
    });
    it('should evaluate to zero', () => {
        const op2: MulOp = new MulOp(new NumberNode(0), new NumberNode(1));
        const output2 = op2.eval(new Scope(null));
        expect(output2).to.eql(new NumberNode(0));
    });
});
