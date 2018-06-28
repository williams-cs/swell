"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Equals_1 = require("../lib/logic/Equals");
const lib_1 = require("../lib");
const chai_1 = require("chai");
require("mocha");
describe('Logic operations', () => {
    it('should evaluate to true', () => {
        const var1 = new Equals_1.Equals(new lib_1.NumberNode(1), new lib_1.NumberNode(1));
        const output = var1.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.equal(true);
    });
});
