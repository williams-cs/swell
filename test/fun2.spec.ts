import { assert,expect } from 'chai';
import 'mocha';
import { Return, NumberNode, SequenceNode, FunApp, Scope, FunDef } from '..';

// def c(x){
//  return 1;

describe('An constant function', () => {
    it('should evaluate to 1', () => {
        const fundef = new FunDef("c",new Return(new NumberNode(1)),["x"]);
        const funapp = new FunApp("c",[2]);
        let context = new Scope(null);
        const seq = new SequenceNode(fundef,funapp);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        expect(output1.val).to.equal(1);
    });
});