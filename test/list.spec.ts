import {Scope} from '../lib/structural/Scope';
import {AssignOp} from '../lib/binops/AssignOp';
import {Equals} from '../lib/logic/Equals';
import {ListNode} from '../lib/lists/ListNode';
import {NumberNode} from '../lib/prims/NumberNode';
import {VariableNode} from '../lib/vars/VariableNode';
import {SequenceNode} from '../lib/structural/SequenceNode';

import { assert,expect } from 'chai';
import 'mocha';
import { BooleanNode } from '../lib/prims/BooleanNode';

//[0,1,2,3]

describe('A list', () => {
    it('should evaluate to [0,1,2,3]', () => {
        const list1 = new ListNode([[new NumberNode(0), ""],[new NumberNode(1),""], [new NumberNode(2),""],[new NumberNode(3),""]]);
        const output = list1.eval(new Scope(null));
        expect(output).to.deep.equal(list1);
    });
    
    it('when compared against another, different list should evaluate to false',() => {
        const list1 = new ListNode([[new NumberNode(0), ""],[new NumberNode(1),""], [new NumberNode(2),""],[new NumberNode(3),""]]);
        const list2 = new ListNode([[new NumberNode(0), ""],[new NumberNode(1),""], [new NumberNode(2),""],[new NumberNode(4),""]]);
        const assign1 = new AssignOp(new VariableNode("list1"),list1);
        const assign2 = new AssignOp(new VariableNode("list2"),list2);
        const comp1 = new Equals(list1,list2);
        const seq1 = new SequenceNode(assign2,comp1);
        const seq2 = new SequenceNode(assign1,seq1);
        const output = seq2.eval(new Scope(null));
        expect(output.val).to.deep.equal((new BooleanNode(false)).val);
    });
    
    
   
});
