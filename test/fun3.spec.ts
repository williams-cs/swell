import {FunDef} from '../lib/funhouse/FunDef';
import {Scope} from '../lib/structural/Scope';

import { assert,expect } from 'chai';
import 'mocha';
import { FunApp } from '../lib/funhouse/FunApp';
import { SequenceNode } from '../lib/structural/SequenceNode';
import { Return, VariableNode, PlusOp, NumberNode, AssignOp } from '..';
import { DeclareOp } from '../lib/binops/DeclareOp';

//let i = 1
//def closure(x){
//  return x+i;
//closure(2)

describe('A closure function', () => {
    it('should evaluate to 3', () => {
        const i1 = new DeclareOp(new VariableNode("i"),new NumberNode(1));
        // i1?
        const xvar = new VariableNode("x");
        const ivar = new VariableNode("i");
        const fundef = new FunDef("closure",new Return(new PlusOp(xvar,ivar)),["x"]);
        const funapp = new FunApp("closure",[new NumberNode(2)]);
        let context = new Scope(null);
        const seq1 = new SequenceNode(fundef,funapp);
        const seq2 = new SequenceNode(i1,seq1);
        const output = seq2.eval(context);
        //console.log(output);
        const output1 = seq1.rightVal;
        expect(output1.val).to.equal(3);
    });
});