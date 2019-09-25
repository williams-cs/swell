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
        const var1 = new Equals(new NumberNode(1,null),new NumberNode(1,null));
        const output = var1.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(true,var1)).val);
    });
    it('equals 2 should evaluate to false', () => {
        const var1 = new Equals(new NumberNode(2,null),new NumberNode(1,null));
        const output = var1.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(false,var1)).val);
    });
    it('and 1 should evaluate to false',() => {
        const true2 = new Equals(new NumberNode(1,null),new NumberNode(1,null));
        const false2 = new Equals(new NumberNode(1,null),new NumberNode(2,null));
        const var2 = new And(true2,false2);
        const output = var2.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(false, var2)).val);
    });
    it('and 2 should evaluate to true',() => {
        const true2 = new Equals(new NumberNode(1,null),new NumberNode(1,null));
        const true3 = new Equals(new NumberNode(1,null),new NumberNode(1,null));
        const var2 = new And(true2,true3);
        const output = var2.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(true,var2)).val);
    });
    it('or 1 should evaluate to true',() => {
        const true3 = new Equals(new NumberNode(1,null),new NumberNode(1,null));
        const false3 = new Equals(new NumberNode(1,null),new NumberNode(2,null));
        const var3 = new Or(true3,false3);
        const output = var3.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(true,var3)).val);
    });
    it('or 2 should evaluate to false',() => {
        const false4 = new Equals(new NumberNode(65,null),new NumberNode(1,null));
        const false3 = new Equals(new NumberNode(1,null),new NumberNode(2,null));
        const var3 = new Or(false4,false3);
        const output = var3.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(false,var3)).val);
    });
    it('not 1 should evaluate to true',() => {
        const false4 = new Equals(new NumberNode(65,null),new NumberNode(1,null));
        const false3 = new Equals(new NumberNode(1,null),new NumberNode(2,null));
        const var4 = new Not(new Or(false4,false3));
        const output = var4.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(true,var4)).val);
    });
    it('not 2 should evaluate to false', () => {
        const var4 = new Not(new Equals(new NumberNode(2,null),new NumberNode(2,null)));
        const output = var4.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(false,var4)).val);
    });
    it('less than 1 should evaluate to true', () => {
        const var5 = new LessThan(new NumberNode(1,null),new NumberNode(2,null));
        const output = var5.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(true,var5)).val);
    });
    it('less than 2 should evaluate to false', () => {
        const var5 = new LessThan(new NumberNode(2,null),new NumberNode(1,null));
        const output = var5.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(false,var5)).val);
    });
    it('greater than 1 should evaluate to true', () => {
        const var6 = new GreaterThan(new NumberNode(2,null),new NumberNode(1,null));
        const output = var6.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(true,var6)).val);
    });
    it('greater than 2 should evaluate to false', () => {
        const var6 = new GreaterThan(new NumberNode(1,null),new NumberNode(1,null));
        const output = var6.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(false,var6)).val);
    });
    it('less than eq 1 should evaluate to true', () => {
        const var7 = new LessThanEq(new NumberNode(1,null),new NumberNode(1,null));
        const output = var7.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(true,var7)).val);
    });
    it('less than eq 2 should evaluate to false', () => {
        const var7 = new LessThanEq(new NumberNode(2,null),new NumberNode(1,null));
        const output = var7.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(false,var7)).val);
    });
    it('greater than eq 1 should evaluate to true', () => {
        const var8 = new GreaterThanEq(new NumberNode(2,null),new NumberNode(2,null));
        const output = var8.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(true,var8)).val);
    });
    it('greater than eq 2 should evaluate to false', () => {
        const var8 = new GreaterThanEq(new NumberNode(1,null),new NumberNode(2,null));
        const output = var8.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(false,var8)).val);
    });
    it('not eq 1 should evaluate to true', () => {
        const var9 = new NotEqual(new NumberNode(1,null),new NumberNode(2,null));
        const output = var9.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(true,var9)).val);
    });
    it('not eq 1 should evaluate to false', () => {
        const var9 = new NotEqual(new NumberNode(1,null),new NumberNode(1,null));
        const output = var9.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(false,var9)).val);
    });
    it('less than with var should evaluate to true', () => {
        const x10 = new VariableNode("x");
        const decl10 = new AssignOp(x10,new NumberNode(1,null));
        const var10 = new LessThan(x10,new NumberNode(4,null));
        const seq10 = new SequenceNode(decl10,var10);
        const output = seq10.eval(new Scope(null));
        expect(output.val).to.eql((new BooleanNode(true,var10)).val);
    });

    it('equals right should evaluate to 1', () => {
        const var1 = new Equals(new NumberNode(2,null),new NumberNode(1,null));
        const output = var1.right;
        expect(output).to.eql(new NumberNode(1,null));
    });
    it('equals left should evaluate to 2', () => {
        const var1 = new Equals(new NumberNode(2,null),new NumberNode(1,null));
        const output = var1.left;
        expect(output).to.eql(new NumberNode(2,null));
    });
    it('and right should equal false',() => {
        const true2 = new BooleanNode(true,null);
        const false2 = new BooleanNode(false,null);
        const var2 = new And(true2,false2);
        const output = var2.right;
        expect(output).to.eql(new BooleanNode(false,null));
    });
    it('and left should equal true',() => {
        const true2 = new BooleanNode(true,null);
        const false2 = new BooleanNode(false,null);
        const var2 = new And(true2,false2);
        const output = var2.left;
        expect(output).to.eql(new BooleanNode(true,null));
    });
    it('or right should equal false',() => {
        const true2 = new BooleanNode(true,null);
        const false2 = new BooleanNode(false,null);
        const var2 = new Or(true2,false2);
        const output = var2.right;
        expect(output).to.eql(new BooleanNode(false,null));
    });
    it('or left should equal true',() => {
        const true2 = new BooleanNode(true,null);
        const false2 = new BooleanNode(false,null);
        const var2 = new Or(true2,false2);
        const output = var2.left;
        expect(output).to.eql(new BooleanNode(true,null));
    });
    it('not expr should evaluate to true',() => {
        // const false4 = new Equals(new NumberNode(65),new NumberNode(1));
        // const false3 = new Equals(new NumberNode(1),new NumberNode(2));
        const var4 = new Not(new BooleanNode(true,null));
        const output = var4.expr;
        expect(output).to.eql(new BooleanNode(true,null));
    });
    it('less than left should evaluate to 1', () => {
        const var5 = new LessThan(new NumberNode(1,null),new NumberNode(2,null));
        const output = var5.left;
        expect(output).to.eql(new NumberNode(1,null));
    });
    it('less than right should evaluate to 1', () => {
        const var5 = new LessThan(new NumberNode(2,null),new NumberNode(1,null));
        const output = var5.right;
        expect(output).to.eql(new NumberNode(1,null));
    });
    it('less than eq left should evaluate to 1', () => {
        const var5 = new LessThanEq(new NumberNode(1,null),new NumberNode(2,null));
        const output = var5.left;
        expect(output).to.eql(new NumberNode(1,null));
    });
    it('less than right should evaluate to 1', () => {
        const var5 = new LessThanEq(new NumberNode(2,null),new NumberNode(1,null));
        const output = var5.right;
        expect(output).to.eql(new NumberNode(1,null));
    });
    it('greater than left should evaluate to 1', () => {
        const var5 = new GreaterThan(new NumberNode(1,null),new NumberNode(2,null));
        const output = var5.left;
        expect(output).to.eql(new NumberNode(1,null));
    });
    it('greater than right should evaluate to 1', () => {
        const var5 = new GreaterThan(new NumberNode(2,null),new NumberNode(1,null));
        const output = var5.right;
        expect(output).to.eql(new NumberNode(1,null));
    });
    it('greater than eq left should evaluate to 1', () => {
        const var5 = new GreaterThanEq(new NumberNode(1,null),new NumberNode(2,null));
        const output = var5.left;
        expect(output).to.eql(new NumberNode(1,null));
    });
    it('greater than eq right should evaluate to 1', () => {
        const var5 = new GreaterThanEq(new NumberNode(2,null),new NumberNode(1,null));
        const output = var5.right;
        expect(output).to.eql(new NumberNode(1,null));
    });

});