import {BinaryOperation} from '../lib/binops/BinaryOperation';
import {DivOp} from '../lib/binops/DivOp';
import {Scope} from '../lib/Scope';
import { assert,expect } from 'chai';
import 'mocha';
import { NumberNode } from '../lib/NumberNode';

describe('A DivOp', () => {
    it('should evaluate to a number', () => {
        const op: DivOp = new DivOp(new NumberNode(4), new NumberNode(2));
        const output = op.eval(new Scope(new Map(), null));
        expect(output).to.equal(2);
    });
    it('should evaluate to a negative number', () => {
        const op1: DivOp = new DivOp(new NumberNode(2), new NumberNode(-2));
        const output1 = op1.eval(new Scope(new Map(), null));
        expect(output1).to.equal(-1);
    });
    it('should evaluate to zero', () => {
        const op2: DivOp = new DivOp(new NumberNode(0), new NumberNode(1));
        const output2 = op2.eval(new Scope(new Map(), null));
        expect(output2).to.equal(0);
    });
});