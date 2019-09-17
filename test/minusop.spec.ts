import {Scope} from '../lib/structural/Scope';
import {MinusOp} from '../lib/binops/MinusOp';
import {NumberNode} from '../lib/prims/NumberNode';

import { assert,expect } from 'chai';
import 'mocha';

describe('A minusop', () => {
    it('should evaluate to a number', () => {
        const op: MinusOp = new MinusOp(new NumberNode(2), new NumberNode(1));
        const output = op.eval(new Scope(null));
        expect(output).to.eql(new NumberNode(1));
    });
    it('should evaluate to a negative number', () => {
        const op1: MinusOp = new MinusOp(new NumberNode(1), new NumberNode(2));
        const output1 = op1.eval(new Scope(null));
        expect(output1).to.eql(new NumberNode(-1));
    });
    it('should evaluate to zero', () => {
        const op2: MinusOp = new MinusOp(new NumberNode(1), new NumberNode(1));
        const output2 = op2.eval(new Scope(null));
        expect(output2).to.eql(new NumberNode(0));
    });
});
