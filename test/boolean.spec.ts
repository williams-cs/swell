import {Scope} from '../lib/structural/Scope';
import {BooleanNode} from '../lib/prims/BooleanNode';

import { assert,expect } from 'chai';
import 'mocha';

describe('A boolean', () => {
    it('should evaluate to true', () => {
        const testnum = new BooleanNode(true,null);
        const output = testnum.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true,null));
    });
    it('should evaluate to false', () => {
        const testnum = new BooleanNode(false,null);
        const output = testnum.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false,null));
    });

});
