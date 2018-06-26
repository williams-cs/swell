import {FunDef} from '../lib/funhouse/FunDef';
import {Scope} from '../lib/Scope';

import { assert,expect } from 'chai';
import 'mocha';
import { FunApp } from '../lib/funhouse/FunApp';
import { SequenceNode } from '../lib/SequenceNode';

// def c(x){
//  return 1;

describe('An constant function', () => {
    it('should evaluate to 1', () => {
        const fundef = new FunDef("c",null,["x"]); // body = ret 1
        const funapp = new FunApp(fundef,[1]);
        let context = new Scope(null);
        const seq = new SequenceNode(fundef,funapp);
        const output = seq.eval(context);
        expect(output).to.equal(1);
    });
});