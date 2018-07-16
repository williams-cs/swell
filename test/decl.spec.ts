import { assert,expect } from 'chai';
import 'mocha';

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

describe('A sequence test with declaration', () => {
    it('should evaluate to a number', () => {
        // var i = i
        // i + 2; 
        let context = new Scope(null);
        //context.doc = null;
        const v = new VariableNode("i");
        const left = new DeclareOp(v, new NumberNode(1));
        const right = new PlusOp(v,new NumberNode(2));
        const seq = new SequenceNode(left, right);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        expect(output1).to.deep.equal(new NumberNode(3));
    });
    
    it('should evaluate to a different number', () =>{
        let context1 = new Scope(null);
        const a = new VariableNode("a")
        const b = new VariableNode("b")
        const assigna = new DeclareOp(a,new NumberNode(4));
        const assignb = new DeclareOp(b,new NumberNode(5));
        const mul = new MulOp(a,b);
        const seq2 = new SequenceNode(assignb,mul);
        const seq1 = new SequenceNode(assigna,seq2);
        const output = seq1.eval(context1);
        const output1 = seq2.rightVal; // should this be seq1?
        expect(output1).to.deep.equal(new NumberNode(20));
    });

    it('should evaluate to a different number after reassignment', () =>{
        // var i = 1
        // i = 2; 
        let context = new Scope(null);
        //context.doc = null;
        const v = new VariableNode("i");
        const left = new DeclareOp(v,new NumberNode(1));
        const right = new AssignOp(v,new NumberNode(2));
        const seq = new SequenceNode(left, right);
        const output = seq.eval(context);
        const output1 = seq.rightVal;
        expect(output1).to.deep.equal(new NumberNode(2));
    });
});
