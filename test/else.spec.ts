import { assert,expect } from 'chai';
import 'mocha';
import { Scope, SequenceNode, NumberNode, AssignOp, VariableNode, Return } from '../lib';
import { IfOp } from '../lib/conditionals/IfOp';
import { LessThan } from '../lib/logic/LessThan';
import { ElseOp } from '../lib/conditionals/ElseOp';

// x = 2
// if(x < 3) return 1

describe('An else statement', () => {
    it('should evaluate to 1', () => {
        let context = new Scope(null);
        //const body1 = new Return(new NumberNode(1));
        const body1 = new NumberNode(1);
        const else1 = new ElseOp(body1);
        //const seq1 = new SequenceNode(decl1,if1);
        const output = else1.eval(context);
        //const output1 = seq1.rightVal;
        expect(output).to.equal(1);
    });
});