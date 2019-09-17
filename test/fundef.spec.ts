import {Scope} from '../lib/structural/Scope';
import {NumberNode} from '../lib/prims/NumberNode';
import {FunDef} from '../lib/funhouse/FunDef';
import {BodyNode} from '../lib/structural/BodyNode';

import { assert,expect } from 'chai';
import 'mocha';

describe('A FunDef', () => {
    it('should evaluate to a name in a context', () => {
        const name = "foo";
        const testDef = new FunDef(name, new BodyNode(new NumberNode(1)), []);
        let parcontext = new Scope(null);
        let context = new Scope(parcontext);
        const nullout = testDef.eval(context);
        const output = context.lookup(name);
        expect(output).to.equal(testDef);
    });
});
