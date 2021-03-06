import {Scope} from '../lib/structural/Scope';
import {VariableNode} from '../lib/vars/VariableNode';
import {FunDef} from '../lib/funhouse/FunDef';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {Return} from '../lib/structural/Return';
import {UserDefinedFunctionNode} from '../lib/funhouse/UserDefinedFunctionNode';
import {BodyNode} from '../lib/structural/BodyNode';
import {NumberNode} from '../lib/prims/NumberNode';

import { assert,expect } from 'chai';
import 'mocha';

// fun identity(x){
//  return x }

describe('An identity function', () => {
    it('should evaluate to its parameters', () => {
        const fundef = new FunDef("identity", new BodyNode(new Return(new VariableNode("x"))), [["", "x", "", null, ""]]);
        const funapp = new UserDefinedFunctionNode("identity",[["", "x", "", new NumberNode(1,null), ""]]);
        let context = new Scope(null);
        const seq = new SequenceNode(fundef,funapp);
        const output = seq.eval(context);
        expect(output.val).to.equal(1);
    });
});