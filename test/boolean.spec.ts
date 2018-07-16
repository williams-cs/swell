import{BooleanNode, Scope} from '..';
import { assert,expect } from 'chai';
import 'mocha';

describe('A boolean', () => {
    it('should evaluate to true', () => {
        const testnum = new BooleanNode(true);
        const output = testnum.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(true));
    });
    it('should evaluate to false', () => {
        const testnum = new BooleanNode(false);
        const output = testnum.eval(new Scope(null));
        expect(output).to.eql(new BooleanNode(false));
    });

});
