import { assert,expect } from 'chai';
import 'mocha';

import {SequenceNode} from '../lib/structural/SequenceNode';
import {Equals} from '../lib/logic/Equals';
import { BooleanNode } from '../lib/prims/BooleanNode';
import { NOP } from '../lib/prims/NOP';
import { Scope } from '../lib/structural/Scope';
import { NumberNode } from '../lib/prims/NumberNode';
import { StringNode } from '../lib/prims/StringNode';
import { EllipseNode } from '../lib/shapes/EllipseNode';


describe('A series of equalities', () => {
    it('true==true should evaluate to true', () => {
        
        const bool1 = new BooleanNode(true);
        const bool2 = new BooleanNode(true);
        const right = new Equals(bool1, bool2);
        const seq1 = new SequenceNode(new NOP(), right);
        const output = seq1.eval(new Scope(null));
        const output1 = seq1.rightVal;
        expect(output1).to.deep.equal(new BooleanNode(true));
    });
    it('true==false should evaluate to false', () => {
        const bool1 = new BooleanNode(true);
        const bool2 = new BooleanNode(false);
        const right = new Equals(bool1, bool2);
        const seq1 = new SequenceNode(new NOP(), right);
        const output = seq1.eval(new Scope(null));
        const output1 = seq1.rightVal;
        expect(output1).to.deep.equal(new BooleanNode(false));
    });
    it('1==1 should evaluate to true', () => {
        const num1 = new NumberNode(1);
        const num2 = new NumberNode(1);
        const right = new Equals(num1, num2);
        const seq1 = new SequenceNode(new NOP(), right);
        const output = seq1.eval(new Scope(null));
        const output1 = seq1.rightVal;
        expect(output1).to.deep.equal(new BooleanNode(true));
    });
    it('1==2 should evaluate to false', () => {
        const num1 = new NumberNode(1);
        const num2 = new NumberNode(2);
        const right = new Equals(num1, num2);
        const seq1 = new SequenceNode(new NOP(), right);
        const output = seq1.eval(new Scope(null));
        const output1 = seq1.rightVal;
        expect(output1).to.deep.equal(new BooleanNode(false));
    });
    it('two identical strings should evaluate to true', () => {
        const str1 = new StringNode("hi");
        const str2 = new StringNode("hi");
        const right = new Equals(str1, str2);
        const seq1 = new SequenceNode(new NOP(), right);
        const output = seq1.eval(new Scope(null));
        const output1 = seq1.rightVal;
        expect(output1).to.deep.equal(new BooleanNode(true));
    });
    it('two different strings should evaluate to false', () => {
        const str1 = new StringNode("hi");
        const str2 = new StringNode("bye");
        const right = new Equals(str1, str2);
        const seq1 = new SequenceNode(new NOP(), right);
        const output = seq1.eval(new Scope(null));
        const output1 = seq1.rightVal;
        expect(output1).to.deep.equal(new BooleanNode(false));
    });
    it('a string == a number should evaluate to false', () => {
        const str1 = new StringNode("hi");
        const num1 = new NumberNode(1);
        const right = new Equals(str1, num1);
        const seq1 = new SequenceNode(new NOP(), right);
        const output = seq1.eval(new Scope(null));
        const output1 = seq1.rightVal;
        expect(output1).to.deep.equal(new BooleanNode(false));
    });
    it('two identical ellipses should evaluate to true', () => {
        const ell1 = new EllipseNode(new NumberNode(30),new NumberNode(30));
        const ell2 = new EllipseNode(new NumberNode(30),new NumberNode(30));
        const right = new Equals(ell1, ell2);
        const seq1 = new SequenceNode(new NOP(), right);
        const output = seq1.eval(new Scope(null));
        const output1 = seq1.rightVal;
        expect(output1).to.deep.equal(new BooleanNode(true));
    });
    it('two nonidentical ellipses should evaluate to false', () => {
        const ell1 = new EllipseNode(new NumberNode(30),new NumberNode(30));
        const ell2 = new EllipseNode(new NumberNode(30),new NumberNode(40));
        const right = new Equals(ell1, ell2);
        const seq1 = new SequenceNode(new NOP(), right);
        const output = seq1.eval(new Scope(null));
        const output1 = seq1.rightVal;
        expect(output1).to.deep.equal(new BooleanNode(false));
    });
});