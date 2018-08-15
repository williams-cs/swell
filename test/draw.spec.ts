import { assert,expect } from 'chai';
import 'mocha';

import {Scope} from '../lib/structural/Scope';
import {NumberNode} from '../lib/prims/NumberNode';
import {BooleanNode} from '../lib/prims/BooleanNode';

describe('A draw test', () => {
    it('should evaluate to an error', () => {
        // var i = 1
        // i++ 
        let context = new Scope(null);
        //context.doc = null;
        const v = new BooleanNode(true);
        const out = v.draw(context, null, null);
        // const output = seq.eval(context);
        // const output1 = seq.rightVal;
        expect(out).to.equal(new Error("Not implemented"));
    });
    it('should evaluate to an error', () => {
        // var i = 1
        // i++ 
        let context = new Scope(null);
        //context.doc = null;
        const v = new NumberNode(1);
        const out = v.draw(context, null, null);
        // const output = seq.eval(context);
        // const output1 = seq.rightVal;
        expect(out).to.equal(new Error("Not implemented"));
    });
});