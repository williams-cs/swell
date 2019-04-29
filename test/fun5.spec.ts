import {Scope} from '../lib/structural/Scope';
import {VariableNode} from '../lib/vars/VariableNode';
import {UserDefinedFunctionNode} from '../lib/funhouse/UserDefinedFunctionNode';
import {FunDef} from '../lib/funhouse/FunDef';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {Return} from '../lib/structural/Return';
import {BodyNode} from '../lib/structural/BodyNode';

import { assert,expect } from 'chai';
import 'mocha';
import { StringNode } from '../lib/prims/StringNode';

//def identity(x){
//  return x;
//identity("hi")

// is this one typechecked?
describe('An identity function', () => {
    it('should evaluate to its parameters', () => {
        const fundef = new FunDef("identity", new BodyNode(new Return(new VariableNode("x"))),[["", "x", "", null, ""]]);
        const funapp = new UserDefinedFunctionNode("identity",[["", "", "", new StringNode("hi"), ""]]);
        let context = new Scope(null);
        const seq = new SequenceNode(fundef,funapp);
        const output = seq.eval(context);
        expect(output.val).to.equal("hi");
    });
});