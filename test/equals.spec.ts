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
import { RectangleNode } from '../lib/shapes/RectangleNode';
import { ForNode } from '../lib/loops/ForNode';
import { VariableNode } from '../lib/vars/VariableNode';
import { AssignOp } from '../lib/binops/AssignOp';
import { PlusOp } from '../lib/binops/PlusOp';
import { LessThan } from '../lib/logic/LessThan';
import { WhileNode } from '../lib/loops/WhileNode';

describe('A series of equalities', () => {
    it('true==true should evaluate to true', () => {
        const bool1 = new BooleanNode(true,null);
        const bool2 = new BooleanNode(true,null);
        const left = new Equals(bool1, bool2);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(true,left));
    });
    it('true==false should evaluate to false', () => {
        const bool1 = new BooleanNode(true,null);
        const bool2 = new BooleanNode(false,null);
        const left = new Equals(bool1, bool2);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(false,left));
    });
    it('1==1 should evaluate to true', () => {
        const num1 = new NumberNode(1,null);
        const num2 = new NumberNode(1,null);
        const left = new Equals(num1, num2);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(true,left));
    });
    it('1==2 should evaluate to false', () => {
        const num1 = new NumberNode(1,null);
        const num2 = new NumberNode(2,null);
        const left = new Equals(num1, num2);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(false,left));
    });
    it('two identical strings should evaluate to true', () => {
        const str1 = new StringNode("hi",null);
        const str2 = new StringNode("hi",null);
        const left = new Equals(str1, str2);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(true,left));
    });
    it('two different strings should evaluate to false', () => {
        const str1 = new StringNode("hi",null);
        const str2 = new StringNode("bye",null);
        const left = new Equals(str1, str2);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(false,left));
    });
    it('two identical ellipses should evaluate to true', () => {
        const ell1 = new EllipseNode([["", "width", "", new NumberNode(30,null), ""], ["", "height", "", new NumberNode(30,null), ""]]);
        const ell2 = new EllipseNode([["", "width", "", new NumberNode(30,null), ""], ["", "height", "", new NumberNode(30,null), ""]]);
        const left = new Equals(ell1, ell2);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(true,left));
    });
    it('two nonidentical ellipses should evaluate to false', () => {
        const ell1 = new EllipseNode([["", "width", "", new NumberNode(30,null), ""], ["", "height", "", new NumberNode(30,null), ""]]);
        const ell2 = new EllipseNode([["", "width", "", new NumberNode(30,null), ""], ["", "height", "", new NumberNode(40,null), ""]]);
        const left = new Equals(ell1, ell2);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(false,left));
    });
    it('two identical rects should evaluate to true', () => {
        const rect1 = new RectangleNode([["", "width", "", new NumberNode(30,null), ""], ["", "height", "", new NumberNode(30,null), ""]]);
        const rect2 = new RectangleNode([["", "width", "", new NumberNode(30,null), ""], ["", "height", "", new NumberNode(30,null), ""]]);
        const left = new Equals(rect1, rect2);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(true,left));
    });
    it('two nonidentical rects should evaluate to false', () => {
        const rect1 = new RectangleNode([["", "width", "", new NumberNode(30,null), ""], ["", "height", "", new NumberNode(30,null), ""]]);
        const rect2 = new RectangleNode([["", "width", "", new NumberNode(30,null), ""], ["", "height", "", new NumberNode(40,null), ""]]);
        const left = new Equals(rect1, rect2);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(false,left));
    });
    it('an ellipse == a rect should evaluate to false', () => {
        const rect1 = new RectangleNode([["", "width", "", new NumberNode(30,null), ""], ["", "height", "", new NumberNode(30,null), ""]]);
        const ell1 = new EllipseNode([["", "width", "", new NumberNode(30,null), ""], ["", "height", "", new NumberNode(40,null), ""]]);
        const left = new Equals(rect1, ell1);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(false,left));
    });
    it('a rect == an ellipse should evaluate to false', () => {
        const rect1 = new RectangleNode([["", "width", "", new NumberNode(30,null), ""], ["", "height", "", new NumberNode(30,null), ""]]);
        const ell1 = new EllipseNode([["", "width", "", new NumberNode(30,null), ""], ["", "height", "", new NumberNode(40,null), ""]]);
        const left = new Equals(ell1, rect1);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(false,left));
    });
    it('true==1 should evaluate to false', () => {
        const bool1 = new BooleanNode(true,null);
        const num1 = new NumberNode(1,null);
        const left = new Equals(bool1, num1);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(false,left));
    });
    it('1===true should evaluate to false', () => {
        const bool1 = new BooleanNode(true,null);
        const num1 = new NumberNode(1,null);
        const left = new Equals(num1, bool1);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(false,left));
    });
    it('a string == a number should evaluate to false', () => {
        const str1 = new StringNode("hi",null);
        const num1 = new NumberNode(1,null);
        const left = new Equals(str1, num1);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(false,left));
    });
    it('a string == a NOP should evaluate to false', () => {
        const str1 = new StringNode("hi",null);
        const nop1 = new NOP();
        const left = new Equals(nop1, str1);
        const seq1 = new SequenceNode(left, new NOP());
        const output = seq1.eval(new Scope(null));
        expect(output).to.deep.equal(new BooleanNode(false,left));
    });
    // it('a for loop == a for loop should throw an error', () => {

    //     const output = seq1.eval(new Scope(null));
    //     const output = seq1.rightVal;
    //     expect(output).to.deep.equal(new BooleanNode(false));
    // });
});
