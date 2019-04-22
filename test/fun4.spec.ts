import {Scope} from '../lib/structural/Scope';
import {PlusOp} from '../lib/binops/PlusOp';
import {AssignOp} from '../lib/binops/AssignOp';
import {NumberNode} from '../lib/prims/NumberNode';
import {VariableNode} from '../lib/vars/VariableNode';
import {UserDefinedFunctionNode} from '../lib/funhouse/UserDefinedFunctionNode';
import {FunDef} from '../lib/funhouse/FunDef';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {Return} from '../lib/structural/Return';
import {BodyNode} from '../lib/structural/BodyNode';

import { assert,expect } from 'chai';
import 'mocha';

//let i = 1
//def bar(x){
//  return x+i;
//let i = 2
//bar(1)

describe('A bar function to test static/dynamic scoping', () => {
    it('should evaluate to 2 if lexically scoped', () => {
        const i1 = new VariableNode("i");
        const i1def = new AssignOp(i1,new NumberNode(1));
        const fundef = new FunDef("bar",new BodyNode(new Return(new PlusOp(new VariableNode("x"), new VariableNode("i")))),[["", "", "", new VariableNode("x"), ""]]);
        
        const i2 = new VariableNode("i");
        const i2def = new AssignOp(i2,new NumberNode(2));

        const funapp = new UserDefinedFunctionNode("bar",[["", "", "", new NumberNode(1), ""]]);
        let context = new Scope(null);

        const seq3 = new SequenceNode(i2def,funapp);
        const seq2 = new SequenceNode(fundef,seq3);
        const seq1 = new SequenceNode(i1def,seq2);

        //const i2def = new AssignOp(new VariableNode("i"), new NumberNode(2));
        const output = seq1.eval(context);
        const output1 = seq3.right;
        expect(output1).to.deep.equal(new NumberNode(2));
    });
});