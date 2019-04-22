import {Scope} from '../lib/structural/Scope';
import {AssignOp} from '../lib/binops/AssignOp';
import {GreaterThan} from '../lib/logic/GreaterThan';
import {GreaterThanEq} from '../lib/logic/GreaterThanEq';
import {LessThan} from '../lib/logic/LessThan';
import {LessThanEq} from '../lib/logic/LessThanEq';
import {And} from '../lib/logic/And';
import {Or} from '../lib/logic/Or';
import {Equals} from '../lib/logic/Equals';
import {NotEqual} from '../lib/logic/NotEqual';
import {Not} from '../lib/logic/Not';
import {NumberNode} from '../lib/prims/NumberNode';
import {BooleanNode} from '../lib/prims/BooleanNode';
import {VariableNode} from '../lib/vars/VariableNode';
import {SequenceNode} from '../lib/structural/SequenceNode';

import { assert,expect } from 'chai';
import 'mocha';

describe('Logic operations', () => {
    it('equals 1 should evaluate to true', () => {
        const var1 = new Equals(new NumberNode(1),new NumberNode(1));
        const output = var1.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true));
    });
    it('equals 2 should evaluate to false', () => {
        const var1 = new Equals(new NumberNode(2),new NumberNode(1));
        const output = var1.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false));
    });
    it('and 1 should evaluate to false',() => {
        const true2 = new Equals(new NumberNode(1),new NumberNode(1));
        const false2 = new Equals(new NumberNode(1),new NumberNode(2));
        const var2 = new And(true2,false2);
        const output = var2.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false));
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
    });
    it('less than 2 should evaluate to false', () => {
        const var5 = new LessThan(new NumberNode(2),new NumberNode(1));
        const output = var5.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false));
    });
    it('greater than 1 should evaluate to true', () => {
        const var6 = new GreaterThan(new NumberNode(2),new NumberNode(1));
        const output = var6.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true));
    });
    it('greater than 2 should evaluate to false', () => {
        const var6 = new GreaterThan(new NumberNode(1),new NumberNode(1));
        const output = var6.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false));
    });
    it('less than eq 1 should evaluate to true', () => {
        const var7 = new LessThanEq(new NumberNode(1),new NumberNode(1));
        const output = var7.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true));
    });
    it('less than eq 2 should evaluate to false', () => {
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
        const output1 = seq10.right;
        expect(output1).to.eql(new BooleanNode(true));
    });

    it('equals right should evaluate to 1', () => {
        const var1 = new Equals(new NumberNode(2),new NumberNode(1));
        const output = var1.right;
        expect(output).to.eql(new NumberNode(1));
    });
    it('equals left should evaluate to 2', () => {
        const var1 = new Equals(new NumberNode(2),new NumberNode(1));
        const output = var1.left;
        expect(output).to.eql(new NumberNode(2));
    });
    it('and right should equal false',() => {
        const true2 = new BooleanNode(true);
        const false2 = new BooleanNode(false);
        const var2 = new And(true2,false2);
        const output = var2.right;
        expect(output).to.eql(new BooleanNode(false));
    });
    it('and left should equal true',() => {
        const true2 = new BooleanNode(true);
        const false2 = new BooleanNode(false);
        const var2 = new And(true2,false2);
        const output = var2.left;
        expect(output).to.eql(new BooleanNode(true));
    });
    it('or right should equal false',() => {
        const true2 = new BooleanNode(true);
        const false2 = new BooleanNode(false);
        const var2 = new Or(true2,false2);
        const output = var2.right;
        expect(output).to.eql(new BooleanNode(false));
    });
    it('or left should equal true',() => {
        const true2 = new BooleanNode(true);
        const false2 = new BooleanNode(false);
        const var2 = new Or(true2,false2);
        const output = var2.left;
        expect(output).to.eql(new BooleanNode(true));
    });
    it('not expr should evaluate to true',() => {
        // const false4 = new Equals(new NumberNode(65),new NumberNode(1));
        // const false3 = new Equals(new NumberNode(1),new NumberNode(2));
        const var4 = new Not(new BooleanNode(true));
        const output = var4.expr;
        expect(output).to.eql(new BooleanNode(true));
    });
    it('less than left should evaluate to 1', () => {
        const var5 = new LessThan(new NumberNode(1),new NumberNode(2));
        const output = var5.left;
        expect(output).to.eql(new NumberNode(1));
    });
    it('less than right should evaluate to 1', () => {
        const var5 = new LessThan(new NumberNode(2),new NumberNode(1));
        const output = var5.right;
        expect(output).to.eql(new NumberNode(1));
    });
    it('less than eq left should evaluate to 1', () => {
        const var5 = new LessThanEq(new NumberNode(1),new NumberNode(2));
        const output = var5.left;
        expect(output).to.eql(new NumberNode(1));
    });
    it('less than right should evaluate to 1', () => {
        const var5 = new LessThanEq(new NumberNode(2),new NumberNode(1));
        const output = var5.right;
        expect(output).to.eql(new NumberNode(1));
    });
    it('greater than left should evaluate to 1', () => {
        const var5 = new GreaterThan(new NumberNode(1),new NumberNode(2));
        const output = var5.left;
        expect(output).to.eql(new NumberNode(1));
    });
    it('greater than right should evaluate to 1', () => {
        const var5 = new GreaterThan(new NumberNode(2),new NumberNode(1));
        const output = var5.right;
        expect(output).to.eql(new NumberNode(1));
    });
    it('greater than eq left should evaluate to 1', () => {
        const var5 = new GreaterThanEq(new NumberNode(1),new NumberNode(2));
        const output = var5.left;
        expect(output).to.eql(new NumberNode(1));
    });
    it('greater than eq right should evaluate to 1', () => {
        const var5 = new GreaterThanEq(new NumberNode(2),new NumberNode(1));
        const output = var5.right;
        expect(output).to.eql(new NumberNode(1));
    });

});