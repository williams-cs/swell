import {BinaryOperation} from '../lib/binops/BinaryOperation';
import {Scope} from '../lib/Scope';
import {SequenceNode} from '../lib/SequenceNode';
import {AssignOp} from '../lib/binops/AssignOp';
import {PlusOp} from '../lib/binops/PlusOp';
import {VariableNode} from '../lib/VariableNode';
import { assert,expect } from 'chai';
import 'mocha';
import { NumberNode } from '../lib/NumberNode';

describe('A sequence test with declaration', () => {
    it('should evaluate to a number', () => {
        //const ivar = 
        let context = new Scope(null);
        let v = new VariableNode("i");
        const left = new AssignOp(v, new NumberNode(1));
        const right = new PlusOp(v,new NumberNode(1));
        const seq = new SequenceNode(left, right);

        const output = seq.eval(context);
        expect(output).to.equal(2);
    });
});