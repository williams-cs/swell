import {Scope} from '../lib/structural/Scope';
import {MulOp} from '../lib/binops/MulOp';
import {NumberNode} from '../lib/prims/NumberNode';

import { assert,expect } from 'chai';
import 'mocha';

describe('A MulOp', () => {
    it('should evaluate to a number', () => {
        const op: MulOp = new MulOp(new NumberNode(1,null), new NumberNode(2,null));
        const output = op.eval(new Scope(null));
        expect(output).to.eql(new NumberNode(2,op));
    });
    it('should evaluate to a negative number', () => {
        const op1: MulOp = new MulOp(new NumberNode(2,null), new NumberNode(-2,null));
        const output1 = op1.eval(new Scope(null));
        expect(output1).to.eql(new NumberNode(-4,op1));
    });
    it('should evaluate to zero', () => {
        const op2: MulOp = new MulOp(new NumberNode(0,null), new NumberNode(1,null));
        const output2 = op2.eval(new Scope(null));
        expect(output2).to.eql(new NumberNode(0,op2));
    });
});
