"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringNode_1 = require("../lib/StringNode");
const chai_1 = require("chai");
require("mocha");
describe('A string', () => {
    it('should evaluate to a string', () => {
        const teststring = new StringNode_1.StringNode("hello world");
        const output = teststring.eval();
        chai_1.expect(output).to.equal("hello world");
    });
});
