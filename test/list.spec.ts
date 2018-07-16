/* CORE */
import {Expression} from '../lib/Expression';
import {Scope} from '../lib/structural/Scope';

/* BINARY OPS */
import {AssignOp} from '../lib/binops/AssignOp';
import {BinaryOperation} from '../lib/binops/BinaryOperation';
import {DivOp} from '../lib/binops/DivOp';
import {MinusOp} from '../lib/binops/MinusOp';
import {MulOp} from '../lib/binops/MulOp';
import {PlusOp} from '../lib/binops/PlusOp';
import {GreaterThan} from '../lib/logic/GreaterThan';
import {GreaterThanEq} from '../lib/logic/GreaterThanEq';
import {LessThan} from '../lib/logic/LessThan';
import {LessThanEq} from '../lib/logic/LessThanEq';
import {DeclareOp} from '../lib/binops/DeclareOp';
import {And} from '../lib/logic/And';
import {Or} from '../lib/logic/Or';
import {Equals} from '../lib/logic/Equals';
import {NotEqual} from '../lib/logic/NotEqual';

/* UNARY OPS */
import {UnaryOperation} from '../lib/unops/UnaryOperation';
import {NegOp} from '../lib/unops/NegOp';
import {Not} from '../lib/logic/Not';

/* DATA TYPES */
import {ListNode} from '../lib/lists/ListNode';
import {NumberNode} from '../lib/prims/NumberNode';
import {StringNode} from '../lib/prims/StringNode';
import {BooleanNode} from '../lib/prims/BooleanNode';

/* VARIABLES */
import {VariableNode} from '../lib/vars/VariableNode';

/* CONTROL CONSTRUCTS */
import {Conditional} from '../lib/conditionals/Conditional';
import {FunApp} from '../lib/funhouse/FunApp';
import {FunDef} from '../lib/funhouse/FunDef';
import {SequenceNode} from '../lib/structural/SequenceNode';
import {WhileNode} from '../lib/loops/WhileNode';
import {ForNode} from '../lib/loops/ForNode';

/* BUILTIN FUNCTIONS */
import {ColorNode} from '../lib/shapes/ColorNode';
import {Ellipse} from '../lib/shapes/Ellipse';
import {EllipseNode} from '../lib/shapes/EllipseNode';
import {Shape} from '../lib/shapes/Shape';
import {PrintNode} from '../lib/structural/PrintNode';
import {Return} from '../lib/structural/Return';
import {ReturnError} from '../lib/structural/ReturnError';

/* Effects */
import {Effect} from '../lib/effects/Effect';
import {EllipseEffect} from '../lib/effects/EllipseEffect';
import {NumberEffect} from '../lib/effects/NumberEffect';
import {StringEffect} from '../lib/effects/StringEffect';

import { assert,expect } from 'chai';
import 'mocha';

//[0,1,2,3]

describe('A list', () => {
    it('should evaluate to [0,1,2,3]', () => {
        const list1 = new ListNode([new NumberNode(0),new NumberNode(1),new NumberNode(2),new NumberNode(3)]);
        const output = list1.eval(new Scope(null));
        expect(output).to.deep.equal(list1);
    });
    
    it('when compared against another, different list should evaluate to false',() => {
        const list1 = new ListNode([new NumberNode(0),new NumberNode(1),new NumberNode(2)]);
        const list2 = new ListNode([new NumberNode(1),new NumberNode(1),new NumberNode(2)]);
        const assign1 = new AssignOp(new VariableNode("list1"),list1);
        const assign2 = new AssignOp(new VariableNode("list2"),list2);
        const comp1 = new Equals(list1,list2);
        const seq1 = new SequenceNode(assign2,comp1);
        const seq2 = new SequenceNode(assign1,seq1);
        const output = seq1.eval(new Scope(null));
        const output1 = seq1.rightVal;
        expect(output1).to.equal(false);
    });
    
    
   
});
