import {DivOp} from '../lib/binops/DivOp';
import {NumberNode} from '../lib/prims/NumberNode';

import { assert,expect } from 'chai';
import 'mocha';

describe('A DivOp', () => {
    it('should evaluate to a number', () => {
        const op: DivOp = new DivOp(new NumberNode(4,null), new NumberNode(2,null));
        const output = op.eval(null);
        expect(output).to.eql(new NumberNode(2,op));
    });
    it('should evaluate to a negative number', () => {
        const op1: DivOp = new DivOp(new NumberNode(2,null), new NumberNode(-2,null));
        const output1 = op1.eval(null);
        expect(output1).to.eql(new NumberNode(-1,op1));
    });
    it('should evaluate to zero', () => {
        const op2: DivOp = new DivOp(new NumberNode(0,null), new NumberNode(1,null));
        const output2 = op2.eval(null);
        expect(output2).to.eql(new NumberNode(0,op2));
    });
});