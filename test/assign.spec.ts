import {Scope} from '../lib/structural/Scope';
import {PlusOp} from '../lib/binops/PlusOp';
import {NumberNode} from '../lib/prims/NumberNode';
import {AssignOp} from '../lib/binops/AssignOp';
import { VariableNode } from '../lib/vars/VariableNode';
import { assert,expect } from 'chai';
import 'mocha';


describe('A minusop', () => {
    it('should assign x to 2', () => {
        const op: AssignOp<NumberNode> = new AssignOp(new VariableNode("x"),new NumberNode(2));
        const scope = new Scope(null);
        const output = op.eval(scope);
        expect(output).to.eql(new NumberNode(2));
        expect(scope.lookup("x")).to.eql(new NumberNode(2));
    });
    it('should assign x to 3 with pointer to a PlusOp', () => {
        const op: AssignOp<NumberNode> = new AssignOp(new VariableNode("x"),new PlusOp(new NumberNode(2), new NumberNode(1)));
        const scope = new Scope(null);
        const output = op.eval(scope);
        expect(output).to.eql(new NumberNode(4));
        expect(scope.lookup("x")).to.eql(new NumberNode(4));
        expect(scope.lookup("x").origin).to.eql(new PlusOp(new NumberNode(2), new NumberNode(1)));
    });
});
