import { Equals } from "../lib/logic/Equals";
import { NumberNode, Scope, VariableNode, AssignOp, SequenceNode } from "../lib";
import { assert,expect } from 'chai';
import 'mocha';
import { And } from "../lib/logic/And";
import { Or } from "../lib/logic/Or";
import { Not } from "../lib/logic/Not";
import { LessThan } from "../lib/logic/LessThan";
import { GreaterThan } from "../lib/logic/GreaterThan";
import { LessThanEq } from "../lib/logic/LessThanEq";
import { GreaterThanEq } from "../lib/logic/GreaterThanEq";
import { NotEqual } from "../lib/logic/NotEqual";
import { BooleanNode } from "../lib/prims/BooleanNode";

describe('Logic operations', () => {
    it('equals 1 should evaluate to true', () => {
        const var1 = new Equals(new NumberNode(1),new NumberNode(1));
        const output = var1.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true));
    });
    it('equals 2 should evaluate to false', () => {
        const var1 = new Equals(new NumberNode(2),new NumberNode(1));
        const output = var1.eval(new Scope(null));
        expect(output).to.eql(false);
    });
    it('and 1 should evaluate to false',() => {
        const true2 = new Equals(new NumberNode(1),new NumberNode(1));
        const false2 = new Equals(new NumberNode(1),new NumberNode(2));
        const var2 = new And(true2,false2);
        const output = var2.eval(new Scope(null));
        expect(output).to.eql(false);
    });
    it('and 2 should evaluate to true',() => {
        const true2 = new Equals(new NumberNode(1),new NumberNode(1));
        const true3 = new Equals(new NumberNode(1),new NumberNode(1));
        const var2 = new And(true2,true3);
        const output = var2.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true));
    });
    it('or 1 should evaluate to true',() => {
        const true3 = new Equals(new NumberNode(1),new NumberNode(1));
        const false3 = new Equals(new NumberNode(1),new NumberNode(2));
        const var3 = new Or(true3,false3);
        const output = var3.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true));
    });
    it('or 2 should evaluate to false',() => {
        const false4 = new Equals(new NumberNode(65),new NumberNode(1));
        const false3 = new Equals(new NumberNode(1),new NumberNode(2));
        const var3 = new Or(false4,false3);
        const output = var3.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false));
    });
    it('not 1 should evaluate to true',() => {
        const false4 = new Equals(new NumberNode(65),new NumberNode(1));
        const false3 = new Equals(new NumberNode(1),new NumberNode(2));
        const var4 = new Not(new Or(false4,false3));
        const output = var4.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true));
    });
    it('not 2 should evaluate to false', () => {
        const var4 = new Not(new Equals(new NumberNode(2),new NumberNode(2)));
        const output = var4.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false));
    });
    it('less than 1 should evaluate to true', () => {
        const var5 = new LessThan(new NumberNode(1),new NumberNode(2));
        const output = var5.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true));
    });it('less than 2 should evaluate to false', () => {
        const var5 = new LessThan(new NumberNode(2),new NumberNode(1));
        const output = var5.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false));
    });
    it('greater than 1 should evaluate to true', () => {
        const var6 = new GreaterThan(new NumberNode(2),new NumberNode(1));
        const output = var6.eval(new Scope(null));
        expect(output).to.eql(true);
    });it('greater than 2 should evaluate to false', () => {
        const var6 = new GreaterThan(new NumberNode(1),new NumberNode(1));
        const output = var6.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false));
    });
    it('less than eq 1 should evaluate to true', () => {
        const var7 = new LessThanEq(new NumberNode(1),new NumberNode(1));
        const output = var7.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true));
    });it('less than eq 2 should evaluate to false', () => {
        const var7 = new LessThanEq(new NumberNode(2),new NumberNode(1));
        const output = var7.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false));
    });
    it('greater than eq 1 should evaluate to true', () => {
        const var8 = new GreaterThanEq(new NumberNode(2),new NumberNode(2));
        const output = var8.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true));
    });
    it('greater than eq 2 should evaluate to false', () => {
        const var8 = new GreaterThanEq(new NumberNode(1),new NumberNode(2));
        const output = var8.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false));
    });
    it('not eq 1 should evaluate to true', () => {
        const var9 = new NotEqual(new NumberNode(1),new NumberNode(2));
        const output = var9.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true));
    });
    it('not eq 1 should evaluate to false', () => {
        const var9 = new NotEqual(new NumberNode(1),new NumberNode(1));
        const output = var9.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false));
    });
    it('less than with var should evaluate to true', () => {
        const x10 = new VariableNode("x");
        const decl10 = new AssignOp(x10,new NumberNode(1));
        const var10 = new LessThan(x10,new NumberNode(4));
        const seq10 = new SequenceNode(decl10,var10);
        const output = seq10.eval(new Scope(null));
        const output1 = seq10.rightVal;
        expect(output1).to.eql(new BooleanNode(true));
    });
});