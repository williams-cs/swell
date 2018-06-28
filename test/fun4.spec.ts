import {FunDef} from '../lib/funhouse/FunDef';
import {Scope} from '../lib/Scope';

import { assert,expect } from 'chai';
import 'mocha';
import { FunApp } from '../lib/funhouse/FunApp';
import { SequenceNode } from '../lib/SequenceNode';
import { VariableNode } from '../lib/vars/VariableNode';
import { AssignOp } from '../lib/binops/AssignOp';
import { NumberNode } from '../lib/prims/NumberNode';
import { PlusOp } from '../lib';

//let i = 1
//def bar(x){
//  return x+i;
//let i = 2
//bar(1)

describe('A bar function to test static/dynamic scoping', () => {
    it('should evaluate to 2 if statically scoped', () => {
        const i1 = new VariableNode("i");
        const i1def = new AssignOp(i1,new NumberNode(1));
        const fundef = new FunDef("bar",new PlusOp(new VariableNode("x"), new VariableNode("i")),["x"]);
        
        const i2 = new VariableNode("i");
        const i2def = new AssignOp(i2,new NumberNode(2));

        const funapp = new FunApp(fundef,[2]);
        let context = new Scope(null);
        const seq = new SequenceNode(fundef,funapp);
        const output = seq.eval(context);
        expect(output).to.equal(2);
    });
});