//Will fail always

import {Scope} from '../lib/structural/Scope';
import {NumberNode} from '../lib/prims/NumberNode';
import {RepeatNode} from '../lib/loops/RepeatNode';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {AssignOp} from '../lib/binops/AssignOp';
import {VariableNode} from '../lib/vars/VariableNode';
import {PlusOp} from '../lib/binops/PlusOp';
import {Parser} from '../lib/parser/parser';

import { assert,expect } from 'chai';
import 'mocha';

describe('printing multiple items with repeat', () => {
    it('should create a horizontal list of incrementing numbers', () => {
        const ast = Parser.parse("a = 0\na = a + 20\nprint(a, x = a, y = 180, fontSize = 23)\na = a + 20\nprint(a, x = a, y = 160, fontSize = 23)")
        //const yval = x7.eval(scope);
        assert.fail
    });
});
