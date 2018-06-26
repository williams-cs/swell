import {FunDef} from '../lib/funhouse/FunDef';
import {Scope} from '../lib/Scope';

import { assert,expect } from 'chai';
import 'mocha';
import { FunApp } from '../lib/funhouse/FunApp';
import { SequenceNode } from '../lib/SequenceNode';

//let i = 1
//def closure(x){
//  return x+i;

describe('A closure function', () => {
    it('should evaluate to 2', () => {
        const fundef = new FunDef("closure",null,["x"]);
        const funapp = new FunApp(fundef,[2]);
        let context = new Scope(null);
        const seq = new SequenceNode(fundef,funapp);
        const output = seq.eval(context);
        expect(output).to.equal(3);
    });
});