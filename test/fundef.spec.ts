import {FunDef, Scope, NumberNode} from '..';
import { assert,expect } from 'chai';
import 'mocha';

describe('A FunDef', () => {
    it('should evaluate to a name in a context', () => {
        const name = "foo";
        const testDef = new FunDef(name,new NumberNode(1));
        let parcontext = new Scope(null);
        let context = new Scope(parcontext);
        const nullout = testDef.eval(context);
        const output = context.lookup(name,context);
        expect(output).to.equal(testDef);
    });
});
