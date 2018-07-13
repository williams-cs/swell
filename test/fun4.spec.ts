import {FunDef} from '../lib/funhouse/FunDef';
import {Scope} from '../lib/structural/Scope';

import { assert,expect } from 'chai';
import 'mocha';
import { FunApp } from '../lib/funhouse/FunApp';
import { SequenceNode } from '../lib/structural/SequenceNode';
import { VariableNode } from '../lib/vars/VariableNode';
import { AssignOp } from '../lib/binops/AssignOp';
import { NumberNode } from '../lib/prims/NumberNode';
import { PlusOp, Return } from '../lib';
import { DeclareOp } from '../lib/binops/DeclareOp';

//let i = 1
//def bar(x){
//  return x+i;
//let i = 2
//bar(1)

describe('A bar function to test static/dynamic scoping', () => {
    it('should evaluate to 2 if lexically scoped', () => {
        const i1 = new VariableNode("i");
        const i1def = new DeclareOp(i1,new NumberNode(1));
        const fundef = new FunDef("bar",new Return(new PlusOp(new VariableNode("x"), new VariableNode("i"))),["x"]);
        
        const i2 = new VariableNode("i");
        const i2def = new DeclareOp(i2,new NumberNode(2));

        const funapp = new FunApp("bar",[1]);
        let context = new Scope(null);

        const seq3 = new SequenceNode(i2def,funapp);
        const seq2 = new SequenceNode(fundef,seq3);
        const seq1 = new SequenceNode(i1def,seq2);

        //const i2def = new AssignOp(new VariableNode("i"), new NumberNode(2));
        const output = seq1.eval(context);
        const output1 = seq3.rightVal;
        expect(output1).to.equal(2);
    });
});