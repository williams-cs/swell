import{NumberNode} from '../NumberNode';
import { assert,expect } from 'chai';
import 'mocha';

describe('A number', () => {
    it('should evaluate to a number', () => {
        const testnum = new NumberNode(null,1);
        const output = testnum.eval();
        expect(output).to.equal(1);
    });
    it('should evaluate to a different number',() => {
        const testpar = new NumberNode(null,10);
        const testchild = new NumberNode(testpar,15);
        const output = testchild.eval();
        expect(output).to.equal(15);
    });
    it('should evaluate to a different number',() => {
        const testpar1 = new NumberNode(null,5);
        const testchild1 = new NumberNode(testpar1,10);
        const output = testchild1.parent.eval();
        expect(output).to.equal(5);
    });

});
