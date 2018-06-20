import {Scope} from '../lib/Scope';
import{PosNode} from '../lib/PosNode';
import { assert,expect } from 'chai';
import 'mocha';

describe('A PositionNode', () => {
    it('should evaluate to a number', () => {
        const testnum = new PosNode(234);
        const output = testnum.eval(new Scope(new Map(), null));
        expect(output).to.equal(234);
    });

});