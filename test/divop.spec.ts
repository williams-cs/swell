import {DivOp, NumberNode} from '..';
import { assert,expect } from 'chai';
import 'mocha';

describe('A DivOp', () => {
    it('should evaluate to a number', () => {
        const op: DivOp = new DivOp(new NumberNode(4), new NumberNode(2));
        const output = op.eval(null);
        expect(output).to.eql(new NumberNode(2));
    });
    it('should evaluate to a negative number', () => {
        const op1: DivOp = new DivOp(new NumberNode(2), new NumberNode(-2));
        const output1 = op1.eval(null);
        expect(output1).to.eql(new NumberNode(-1));
    });
    it('should evaluate to zero', () => {
        const op2: DivOp = new DivOp(new NumberNode(0), new NumberNode(1));
        const output2 = op2.eval(null);
        expect(output2).to.eql(new NumberNode(0));
    });
});