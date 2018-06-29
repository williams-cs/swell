"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const ListNode_1 = require("../lib/lists/ListNode");
const lib_1 = require("../lib");
//import { ListHead } from '../lib/lists/ListHead';
//[0,1,2,3]
describe('A list', () => {
    it('should evaluate to [0,1,2,3]', () => {
        const list1 = new ListNode_1.ListNode([new lib_1.NumberNode(0), new lib_1.NumberNode(1), new lib_1.NumberNode(2), new lib_1.NumberNode(3)]);
        const output = list1.eval(new lib_1.Scope(null));
        chai_1.expect(output).to.deep.equal([0, 1, 2, 3]);
    });
    // I need to draw this out on paper to make it work
    /*
    it('should evaluate to ',() => {
        const list1 = new ListNode([new NumberNode(0),new NumberNode(1),new NumberNode(2)]);
        const list2 = new ListNode([new NumberNode(1),new NumberNode(1),new NumberNode(2)]);
        const assign1 = new AssignOp(new VariableNode("list1"),list1);
        const assign2 = new AssignOp(new VariableNode("list2"),list2);
        const comp1 = new Equals(list1,list2);
        const seq1 = new SequenceNode(assign2,comp1);
        const seq2 = new SequenceNode(assign1,seq1);
        const output = seq1.eval(new Scope(null));
        const output1 = seq2.rightVal;
        expect(output1).to.equal(false);
    });
    */
});
