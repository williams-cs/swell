import {FunDef} from '../lib/funhouse/FunDef';
import {Scope} from '../lib/Scope';

import { assert,expect } from 'chai';
import 'mocha';
import { FunApp } from '../lib/funhouse/FunApp';
import { SequenceNode } from '../lib/SequenceNode';
import { Return, VariableNode, PlusOp, NumberNode, AssignOp } from '../lib';
import { ADDRGETNETWORKPARAMS } from 'dns';

//let i = 1
//def closure(x){
//  return x+i;
//closure(2)

describe('A closure function', () => {
    it('should evaluate to 3', () => {
        const i1 = new AssignOp(new VariableNode("i"),new NumberNode(1));
        // i1?
        const fundef = new FunDef("closure",new Return(new PlusOp(new VariableNode("x"),new VariableNode("i"))),["x"]);
        const funapp = new FunApp(fundef,[2]);
        let context = new Scope(null);
        const seq = new SequenceNode(fundef,funapp);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        expect(output1).to.equal(3);
    });
});