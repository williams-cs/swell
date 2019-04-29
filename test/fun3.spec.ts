import {Scope} from '../lib/structural/Scope';
import {PlusOp} from '../lib/binops/PlusOp';
import {NumberNode} from '../lib/prims/NumberNode';
import {VariableNode} from '../lib/vars/VariableNode';
import {UserDefinedFunctionNode} from '../lib/funhouse/UserDefinedFunctionNode';
import {FunDef} from '../lib/funhouse/FunDef';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {Return} from '../lib/structural/Return';
import {AssignOp} from '../lib/binops/AssignOp';
import {BodyNode} from '../lib/structural/BodyNode';

import { assert,expect } from 'chai';
import 'mocha';

//let i = 1
//def closure(x){
//  return x+i;
//closure(2)

describe('A closure function', () => {
    it('should evaluate to 3', () => {
        const i1 = new AssignOp(new VariableNode("i"),new NumberNode(1));
        const xvar = new VariableNode("x");
        const ivar = new VariableNode("i");
        const fundef = new FunDef("closure", new BodyNode(new Return(new PlusOp(xvar,ivar))),[["", "x", "", null, ""]]);
        const funapp = new UserDefinedFunctionNode("closure",[["", "", "", new NumberNode(2), ""]]);
        let context = new Scope(null);
        const seq1 = new SequenceNode(fundef,funapp);
        const seq2 = new SequenceNode(i1,seq1);
        const output = seq2.eval(context);
        //console.log(output);
        expect(output.val).to.equal(3);
    });
});