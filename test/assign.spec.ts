import {Scope} from '../lib/structural/Scope';
import {PlusOp} from '../lib/binops/PlusOp';
import {NumberNode} from '../lib/prims/NumberNode';
import {AssignOp} from '../lib/binops/AssignOp';
import { VariableNode } from '../lib/vars/VariableNode';
import { assert,expect } from 'chai';
import 'mocha';


describe('An assignop', () => {
    it('should assign x to 2', () => {
        const op: AssignOp<NumberNode> = new AssignOp(new VariableNode("x"),new NumberNode(2,null));
        const scope = new Scope(null);
        const output = op.eval(scope);
        expect(output).to.eql(new NumberNode(2,null));
        expect(scope.lookup("x")).to.eql(new NumberNode(2,null));
    });
    it('should assign x to 2 with origin PlusOp', () => {
        const plusop: PlusOp = new PlusOp(new NumberNode(1,null), new NumberNode(1,null));
        const op: AssignOp<NumberNode> = new AssignOp(new VariableNode("x"),plusop);
        const scope = new Scope(null);
        const output = op.eval(scope);
        expect(output).to.eql(new NumberNode(2, plusop));
        //expect(scope.lookup("x")).to.eql(new NumberNode(2, plusop));
    });
});
