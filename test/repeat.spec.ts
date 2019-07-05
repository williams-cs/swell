import {Scope} from '../lib/structural/Scope';
import {NumberNode} from '../lib/prims/NumberNode';
import {RepeatNode} from '../lib/loops/RepeatNode';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {AssignOp} from '../lib/binops/AssignOp';
import {VariableNode} from '../lib/vars/VariableNode';
import {PlusOp} from '../lib/binops/PlusOp';

import { assert,expect } from 'chai';
import 'mocha';

//y = 1
//x = 3
//repeat(x){
//  y = y+1
//}

describe('A repeat', () => {
    it('should add a variable 3 times', () => {
        const x3 = new VariableNode("x");
        const x4 = new NumberNode(3);
        const x1 = new AssignOp(x3,x4);
        const x7 = new VariableNode("y");
        const x8 = new NumberNode(1);
        const x9 = new VariableNode("x");
        const x11 = new VariableNode("y");
        const x13 = new VariableNode("y");
        const x14 = new NumberNode(1);
        const x12 = new PlusOp(x13,x14);
        const x10 = new AssignOp(x11,x12);
        const x6 = new RepeatNode(x9,x10);
        const x5 = new AssignOp(x7,x8);
        const x2 = new SequenceNode(x5,x6);
        const ast = new SequenceNode(x1,x2);
        const scope = new Scope(null);
        const output = ast.eval(scope);
        //const yval = x7.eval(scope);
        expect(output).to.eql(new NumberNode(4));
    });
});
