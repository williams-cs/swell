import {Scope} from '../lib/structural/Scope';
import {NumberNode} from '../lib/prims/NumberNode';
import {UserDefinedFunctionNode} from '../lib/funhouse/UserDefinedFunctionNode';
import {FunDef} from '../lib/funhouse/FunDef';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {Return} from '../lib/structural/Return';
import {BodyNode} from "../lib/structural/BodyNode";
import {VariableNode} from "../lib/vars/VariableNode";

import { assert,expect } from 'chai';
import 'mocha';

// def c(x){
//  return 1;

describe('An constant function', () => {
    it('should evaluate to 1', () => {
        const fundef = new FunDef("c",new BodyNode(new Return(new NumberNode(1,null))),[["", "x", "", null, ""]]);
        const funapp = new UserDefinedFunctionNode("c",[["", "", "", new NumberNode(2,null), ""]]);
        let context = new Scope(null);
        const seq = new SequenceNode(fundef,funapp);
        const output = seq.eval(context);
        expect(output.val).to.equal(1);
    });
});