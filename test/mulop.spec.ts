import {BinaryOperation} from '../lib/binops/BinaryOperation';
import {MulOp} from '../lib/binops/MulOp';
import {Scope} from '../lib/Scope';
import { assert,expect } from 'chai';
import 'mocha';
import { NumberNode } from '../lib/NumberNode';

describe('A MulOp', () => {
    it('should evaluate to a number', () => {
        const op: MulOp = new MulOp(new NumberNode(1), new NumberNode(2));
        const output = op.eval(new Scope(new Map(), null));
        expect(output).to.equal(2);
    });
    it('should evaluate to a negative number', () => {
        const op1: MulOp = new MulOp(new NumberNode(2), new NumberNode(-2));
        const output1 = op1.eval(new Scope(new Map(), null));
        expect(output1).to.equal(-4);
    });
    it('should evaluate to zero', () => {
        const op2: MulOp = new MulOp(new NumberNode(0), new NumberNode(1));
        const output2 = op2.eval(new Scope(new Map(), null));
        expect(output2).to.equal(0);
    });
});
