"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Equals_1 = require("../lib/logic/Equals");
const lib_1 = require("../lib");
const chai_1 = require("chai");
require("mocha");
const And_1 = require("../lib/logic/And");
const Or_1 = require("../lib/logic/Or");
const Not_1 = require("../lib/logic/Not");
const LessThan_1 = require("../lib/logic/LessThan");
const GreaterThan_1 = require("../lib/logic/GreaterThan");
const LessThanEq_1 = require("../lib/logic/LessThanEq");
const GreaterThanEq_1 = require("../lib/logic/GreaterThanEq");
const NotEqual_1 = require("../lib/logic/NotEqual");
describe('Logic operations', () => {
    it('equals 1 should evaluate to true', () => {
        const var1 = new Equals_1.Equals(new lib_1.NumberNode(1), new lib_1.NumberNode(1));
        const output = var1.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(true);
    });
    it('equals 2 should evaluate to false', () => {
        const var1 = new Equals_1.Equals(new lib_1.NumberNode(2), new lib_1.NumberNode(1));
        const output = var1.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(false);
    });
    it('and 1 should evaluate to false', () => {
        const true2 = new Equals_1.Equals(new lib_1.NumberNode(1), new lib_1.NumberNode(1));
        const false2 = new Equals_1.Equals(new lib_1.NumberNode(1), new lib_1.NumberNode(2));
        const var2 = new And_1.And(true2, false2);
        const output = var2.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(false);
    });
    it('and 2 should evaluate to true', () => {
        const true2 = new Equals_1.Equals(new lib_1.NumberNode(1), new lib_1.NumberNode(1));
        const true3 = new Equals_1.Equals(new lib_1.NumberNode(1), new lib_1.NumberNode(1));
        const var2 = new And_1.And(true2, true3);
        const output = var2.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(true);
    });
    it('or 1 should evaluate to true', () => {
        const true3 = new Equals_1.Equals(new lib_1.NumberNode(1), new lib_1.NumberNode(1));
        const false3 = new Equals_1.Equals(new lib_1.NumberNode(1), new lib_1.NumberNode(2));
        const var3 = new Or_1.Or(true3, false3);
        const output = var3.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(true);
    });
    it('or 2 should evaluate to false', () => {
        const false4 = new Equals_1.Equals(new lib_1.NumberNode(65), new lib_1.NumberNode(1));
        const false3 = new Equals_1.Equals(new lib_1.NumberNode(1), new lib_1.NumberNode(2));
        const var3 = new Or_1.Or(false4, false3);
        const output = var3.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(false);
    });
    it('not 1 should evaluate to true', () => {
        const false4 = new Equals_1.Equals(new lib_1.NumberNode(65), new lib_1.NumberNode(1));
        const false3 = new Equals_1.Equals(new lib_1.NumberNode(1), new lib_1.NumberNode(2));
        const var4 = new Not_1.Not(new Or_1.Or(false4, false3));
        const output = var4.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(true);
    });
    it('not 2 should evaluate to false', () => {
        const var4 = new Not_1.Not(new Equals_1.Equals(new lib_1.NumberNode(2), new lib_1.NumberNode(2)));
        const output = var4.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(false);
    });
    it('less than 1 should evaluate to true', () => {
        const var5 = new LessThan_1.LessThan(new lib_1.NumberNode(1), new lib_1.NumberNode(2));
        const output = var5.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(true);
    });
    it('less than 2 should evaluate to false', () => {
        const var5 = new LessThan_1.LessThan(new lib_1.NumberNode(2), new lib_1.NumberNode(1));
        const output = var5.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(false);
    });
    it('greater than 1 should evaluate to true', () => {
        const var6 = new GreaterThan_1.GreaterThan(new lib_1.NumberNode(2), new lib_1.NumberNode(1));
        const output = var6.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(true);
    });
    it('greater than 2 should evaluate to false', () => {
        const var6 = new GreaterThan_1.GreaterThan(new lib_1.NumberNode(1), new lib_1.NumberNode(1));
        const output = var6.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(false);
    });
    it('less than eq 1 should evaluate to true', () => {
        const var7 = new LessThanEq_1.LessThanEq(new lib_1.NumberNode(1), new lib_1.NumberNode(1));
        const output = var7.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(true);
    });
    it('less than eq 2 should evaluate to false', () => {
        const var7 = new LessThanEq_1.LessThanEq(new lib_1.NumberNode(2), new lib_1.NumberNode(1));
        const output = var7.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(false);
    });
    it('greater than eq 1 should evaluate to true', () => {
        const var8 = new GreaterThanEq_1.GreaterThanEq(new lib_1.NumberNode(2), new lib_1.NumberNode(2));
        const output = var8.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(true);
    });
    it('greater than eq 2 should evaluate to false', () => {
        const var8 = new GreaterThanEq_1.GreaterThanEq(new lib_1.NumberNode(1), new lib_1.NumberNode(2));
        const output = var8.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(false);
    });
    it('not eq 1 should evaluate to true', () => {
        const var9 = new NotEqual_1.NotEqual(new lib_1.NumberNode(1), new lib_1.NumberNode(2));
        const output = var9.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(true);
    });
    it('not eq 1 should evaluate to false', () => {
        const var9 = new NotEqual_1.NotEqual(new lib_1.NumberNode(1), new lib_1.NumberNode(1));
        const output = var9.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(false);
    });
});
