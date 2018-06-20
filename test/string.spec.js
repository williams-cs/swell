"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../lib/Scope");
const StringNode_1 = require("../lib/StringNode");
const chai_1 = require("chai");
require("mocha");
describe('A string', () => {
    it('should evaluate to a string', () => {
        const teststring = new StringNode_1.StringNode("hello world");
        const output = teststring.eval(new Scope_1.Scope(new Map(), null));
        chai_1.expect(output).to.equal("hello world");
    });
});
