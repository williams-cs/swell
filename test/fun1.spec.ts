import {Scope} from '../lib/structural/Scope';
import {VariableNode} from '../lib/vars/VariableNode';
import {FunApp} from '../lib/funhouse/FunApp';
import {FunDef} from '../lib/funhouse/FunDef';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {Return} from '../lib/structural/Return';

import { assert,expect } from 'chai';
import 'mocha';

// def identity(x){
//  return x;

describe('An identity function', () => {
    it('should evaluate to its parameters', () => {
        const fundef = new FunDef("identity",new Return(new VariableNode("x")),["x"]);
        const funapp = new FunApp("identity",[1]);
        let context = new Scope(null);
        const seq = new SequenceNode(fundef,funapp);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        expect(output1).to.equal(1);
    });
});