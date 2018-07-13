import {BinaryOperation} from '../lib/binops/BinaryOperation';
import {Scope} from '../lib/structural/Scope';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {AssignOp} from '../lib/binops/AssignOp';
import {PlusOp} from '../lib/binops/PlusOp';
import {VariableNode} from '../lib/vars/VariableNode';
import { assert,expect } from 'chai';
import 'mocha';
import { NumberNode } from '../lib/prims/NumberNode';
import { MulOp } from '../lib/binops/MulOp';
import { DeclareOp } from '../lib/binops/DeclareOp';

describe('A sequence test with declaration', () => {
    it('should evaluate to a number', () => {
        // var i = i
        // i + 2; 
        let context = new Scope(null);
        //context.doc = null;
        const v = new VariableNode("i");
        const left = new DeclareOp(v, new NumberNode(1));
        const right = new PlusOp(v,new NumberNode(2));
        const seq = new SequenceNode(left, right);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        expect(output1).to.deep.equal(new NumberNode(3));
    });
    
    it('should evaluate to a different number', () =>{
        let context1 = new Scope(null);
        const a = new VariableNode("a")
        const b = new VariableNode("b")
        const assigna = new DeclareOp(a,new NumberNode(4));
        const assignb = new DeclareOp(b,new NumberNode(5));
        const mul = new MulOp(a,b);
        const seq2 = new SequenceNode(assignb,mul);
        const seq1 = new SequenceNode(assigna,seq2);
        const output = seq1.eval(context1);
        const output1 = seq2.rightVal; // should this be seq1?
        expect(output1).to.deep.equal(new NumberNode(20));
    });

    it('should evaluate to a different number after reassignment', () =>{
        // var i = 1
        // i = 2; 
        let context = new Scope(null);
        //context.doc = null;
        const v = new VariableNode("i");
        const left = new DeclareOp(v,new NumberNode(1));
        const right = new AssignOp(v,new NumberNode(2));
        const seq = new SequenceNode(left, right);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        expect(output1).to.deep.equal(new NumberNode(2));
    });
});
