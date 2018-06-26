
/*
import {BinaryOperation} from '../lib/binops/BinaryOperation';
import {Scope} from '../lib/Scope';
import {SequenceNode} from '../lib/SequenceNode';
import {AssignOp} from '../lib/binops/AssignOp';
import {PlusOp} from '../lib/binops/PlusOp';
import {VariableNode} from '../lib/vars/VariableNode';
import { assert,expect } from 'chai';
import 'mocha';
import { NumberNode } from '../lib/prims/NumberNode';
import { MulOp } from '../lib/binops/MulOp';

describe('A sequence test with declaration', () => {
    it('should evaluate to a tuple', () => {
        // var i = i
        // i + 2; 
        let context = new Scope(null);
        const v = new VariableNode("i");
        const left = new AssignOp(v, new NumberNode(1));
        const right = new PlusOp(v,new NumberNode(2));
        const seq = new SequenceNode(left, right);
        const output = seq.eval(context);
        expect(output).to.deep.equal([1,3]);
    });
    
    it('should evaluate to a different tuple', () =>{
        let context1 = new Scope(null);
        const a = new VariableNode("a")
        const b = new VariableNode("b")
        const assigna = new AssignOp(a,new NumberNode(4));
        const assignb = new AssignOp(b,new NumberNode(5));
        const mul = new MulOp(a,b);
        const seq2 = new SequenceNode(assignb,mul);
        const seq1 = new SequenceNode(assigna,seq2);
        const output = seq1.eval(context1);
        expect(output).to.deep.equal([4,[5,20]]);
    });
});
*/