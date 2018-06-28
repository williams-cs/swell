import { Equals } from "../lib/logic/Equals";
import { NumberNode, Scope } from "../lib";
import { assert,expect } from 'chai';
import 'mocha';

describe('Logic operations', () => {
    it('should evaluate to true', () => {
        const var1 = new Equals(new NumberNode(1),new NumberNode(1));
        const output = var1.eval(new Scope(null));
        expect(output).to.equal(true);
    });
});