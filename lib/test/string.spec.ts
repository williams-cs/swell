
import{StringNode} from '../StringNode';
import { assert,expect } from 'chai';
import 'mocha';

describe('A string', () => {
    it('should evaluate to a string', () => {
        const teststring = new StringNode(null,"hello world");
        const output = teststring.eval();
        expect(output).to.equal("hello world");
    });
    it('should evaluate to a different string',() => {
        const testpar = new StringNode(null,"hello");
        const testchild = new StringNode(testpar,"hello \n world");
        const output = testchild.eval();
        expect(output).to.equal("hello \n world");
    });
    it('should evaluate to another different string',() => {
        const testpar1 = new StringNode(null,"hello world");
        const testchild1 = new StringNode(testpar1,"boo");
        const output = testchild1.parent.eval();
        expect(output).to.equal("hello world");
    });
});

