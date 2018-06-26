import {FunDef} from '../lib/funhouse/FunDef';
import {Scope} from '../lib/Scope';

import { assert,expect } from 'chai';
import 'mocha';
import { FunApp } from '../lib/funhouse/FunApp';
import { SequenceNode } from '../lib/SequenceNode';

// def identity(x){
//  return x;

describe('An identity function', () => {
    it('should evaluate to its parameters', () => {
        const fundef = new FunDef("identity",null,["x"]);
        const funapp = new FunApp(fundef,[1]);
        let context = new Scope(null);
        const seq = new SequenceNode(fundef,funapp);
        const output = seq.eval(context);
        expect(output).to.equal(1);
    });
});