import {FunDef} from '../lib/funhouse/FunDef';
import {Scope} from '../lib/structural/Scope';

import { assert,expect } from 'chai';
import 'mocha';
import { FunApp } from '../lib/funhouse/FunApp';
import { SequenceNode } from '../lib/structural/SequenceNode';
import { Return, NumberNode } from '../lib';

// def c(x){
//  return 1;

describe('An constant function', () => {
    it('should evaluate to 1', () => {
        const fundef = new FunDef("c",new Return(new NumberNode(1)),["x"]);
        const funapp = new FunApp("c",[2]);
        let context = new Scope(null);
        const seq = new SequenceNode(fundef,funapp);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        expect(output1).to.equal(1);
    });
});