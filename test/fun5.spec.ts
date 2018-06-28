import {FunDef} from '../lib/funhouse/FunDef';
import {Scope} from '../lib/Scope';

import { assert,expect } from 'chai';
import 'mocha';
import { FunApp } from '../lib/funhouse/FunApp';
import { SequenceNode } from '../lib/SequenceNode';
import { Return, VariableNode } from '../lib';

//def identity(x){
//  return x;
//identity("hi")

// is this one typechecked?
describe('An identity function', () => {
    it('should evaluate to its parameters', () => {
        const fundef = new FunDef("identity",new Return(new VariableNode("x")),["x"]);
        const funapp = new FunApp("identity",["hi"]);
        let context = new Scope(null);
        const seq = new SequenceNode(fundef,funapp);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        expect(output1).to.equal("hi");
    });
});