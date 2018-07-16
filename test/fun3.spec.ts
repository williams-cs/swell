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

//let i = 1
//def closure(x){
//  return x+i;
//closure(2)

describe('A closure function', () => {
    it('should evaluate to 3', () => {
        const i1 = new DeclareOp(new VariableNode("i"),new NumberNode(1));
        // i1?
        const xvar = new VariableNode("x");
        const ivar = new VariableNode("i");
        const fundef = new FunDef("closure",new Return(new PlusOp(xvar,ivar)),["x"]);
        const funapp = new FunApp("closure",[new NumberNode(2)]);
        let context = new Scope(null);
        const seq1 = new SequenceNode(fundef,funapp);
        const seq2 = new SequenceNode(i1,seq1);
        const output = seq2.eval(context);
        //console.log(output);
        const output1 = seq1.rightVal;
        expect(output1.val).to.equal(3);
    });
});