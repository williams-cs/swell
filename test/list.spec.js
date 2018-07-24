"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const ListNode_1 = require("../lib/lists/ListNode");
const __1 = require("..");
const Equals_1 = require("../lib/logic/Equals");
//import { ListHead } from '../lib/lists/ListHead';
//[0,1,2,3]
describe('A list', () => {
    it('should evaluate to [0,1,2,3]', () => {
        const list1 = new ListNode_1.ListNode([new __1.NumberNode(0), new __1.NumberNode(1), new __1.NumberNode(2), new __1.NumberNode(3)]);
        const output = list1.eval(new __1.Scope(null));
        chai_1.expect(output).to.deep.equal(list1);
    });
    it('when compared against another, different list should evaluate to false', () => {
        const list1 = new ListNode_1.ListNode([new __1.NumberNode(0), new __1.NumberNode(1), new __1.NumberNode(2)]);
        const list2 = new ListNode_1.ListNode([new __1.NumberNode(1), new __1.NumberNode(1), new __1.NumberNode(2)]);
        const assign1 = new __1.AssignOp(new __1.VariableNode("list1"), list1);
        const assign2 = new __1.AssignOp(new __1.VariableNode("list2"), list2);
        const comp1 = new Equals_1.Equals(list1, list2);
        const seq1 = new __1.SequenceNode(assign2, comp1);
        const seq2 = new __1.SequenceNode(assign1, seq1);
        const output = seq1.eval(new __1.Scope(null));
        const output1 = seq1.rightVal;
        chai_1.expect(output1).to.equal(false);
    });
});
//# sourceMappingURL=list.spec.js.map