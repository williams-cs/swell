import { assert, expect } from 'chai';
import 'mocha';
import {
    Expression, SequenceNode, PrintNode, ListNode,
    NumberNode, StringNode, BooleanNode, FloatNode,
    UnaryOp, Increment, NOP, Decrement, NegOp, Not, Parens,
    BinaryOp, PlusOp, MulOp, DivOp, MinusOp,
    Equals, And, GreaterThan, LessThan, GreaterThanEq, LessThanEq, Or, NotEqual,
    VariableNode, DeclareOp, AssignOp,
    Return, FunDef, FunApp, Conditional,
    ForNode, RepeatNode, WhileNode,
    EllipseNode, RectangleNode, EmojiNode, LineNode,
    RGBColorNode
} from '../index';
describe('toString operations', () => {
    it('AssignOp should evaluate to a string', () => {
        // var i = 1
        // i = 2;
        const v = new VariableNode("i");
        const left = new DeclareOp(v, new NumberNode(1));
        const right = new AssignOp(v, new NumberNode(2));
        //const seq = new SequenceNode(left, right);
        const output = right.toString();
        expect(output).to.deep.equal("i = 2");
    });
    it('DeclareOp should evaluate to a string', () => {
        // var i = 1
        // i = 2;
        const v = new VariableNode("i");
        const left = new DeclareOp(v, new NumberNode(1));
        //const right = new AssignOp(v,new NumberNode(2));
        //const seq = new SequenceNode(left, right);
        const output = left.toString();
        expect(output).to.deep.equal("var i = 1");
    });
    it('Decrement should evaluate to a string', () => {
        // var i = 1
        // i--;
        const v = new VariableNode("i");
        const left = new DeclareOp(v, new NumberNode(1));
        const decr = new Decrement(v);

        //const right = new AssignOp(v,new NumberNode(2));
        //const seq = new SequenceNode(left, right);
        const output = decr.toString();
        expect(output).to.deep.equal("i--");
    });
    it('Increment should evaluate to a string', () => {
        // var i = 1
        // i--;
        const v = new VariableNode("i");
        const left = new DeclareOp(v, new NumberNode(1));
        const decr = new Increment(v);

        //const right = new AssignOp(v,new NumberNode(2));
        //const seq = new SequenceNode(left, right);
        const output = decr.toString();
        expect(output).to.deep.equal("i++");
    });
    it('divop should evaluate to a string', () => {
        const op = new DivOp(new NumberNode(4), new NumberNode(2));
        const output = op.toString();
        expect(output).to.eql("4 / 2");
    });
    it('minusop should evaluate to a string', () => {
        const op = new MinusOp(new NumberNode(2), new NumberNode(1));
        const output = op.toString();
        expect(output).to.eql("2 - 1");
    });
    it('plusop should evaluate to a string', () => {
        const op = new PlusOp(new NumberNode(2), new NumberNode(1));
        const output = op.toString();
        expect(output).to.eql("2 + 1");
    });
    it('mulop should evaluate to a string', () => {
        const op = new MulOp(new NumberNode(2), new NumberNode(1));
        const output = op.toString();
        expect(output).to.eql("2 * 1");
    });
    it('if statement should evaluate to a string', () => {
        const body1 = new NumberNode(1); // works with this, not with return
        const x = new VariableNode("x");
        const xnum = new NumberNode(2);
        const decl1 = new AssignOp(x, xnum);
        const log1 = new LessThan(x, new NumberNode(3));
        const cond1 = new Conditional(log1, body1);
        const output = cond1.toString();
        // const seq1 = new SequenceNode(decl1,cond1);
        // const output = seq1.eval(new Scope(null));
        // const output1 = seq1.rightVal;
        expect(output).to.eql("if(x < 3) {\n 1}"); // this should be return, no?
    });
    it('fundef should evaluate to a string', () => {
        const fundef = new FunDef("identity", new Return(new VariableNode("x")), ["x"]);
        //const funapp = new FunApp("identity",[1]);
        const output = fundef.toString();
        expect(output).to.equal("fun identity(x) {\n return x}"); // should there be a semicolon?
    });
    it('funapp should evaluate to a string', () => {
        //const fundef = new FunDef("identity",new Return(new VariableNode("x")),["x"]);
        const funapp = new FunApp("identity", [1]);
        const output = funapp.toString();
        expect(output).to.equal("identity(1)"); // should there be a semicolon?
    });
    it('list should evaluate to [0, 1, 2, 3]', () => {
        const list1 = new ListNode([new NumberNode(0), new NumberNode(1), new NumberNode(2), new NumberNode(3)]);
        const output = list1.toString();
        expect(output).to.deep.equal("[0, 1, 2, 3]");
    });
    it('equals should evaluate to equals', () => {
        const var1 = new Equals(new NumberNode(1), new NumberNode(1));
        const output = var1.toString();
        expect(output).to.eql("1 equals 1"); // should we have ==, !=, &&, etc?
    });
    it('not equals should evaluate to not equals', () => {
        const var1 = new NotEqual(new NumberNode(1), new NumberNode(1));
        const output = var1.toString();
        expect(output).to.eql("1 not equals 1");
    });
    it('or should evaluate to or', () => {
        const var1 = new Or(new BooleanNode(true), new BooleanNode(true));
        const output = var1.toString();
        expect(output).to.eql("true or true");
    });
    it('and should evaluate to and', () => {
        const var1 = new And(new BooleanNode(true), new BooleanNode(true));
        const output = var1.toString();
        expect(output).to.eql("true and true");
    });
    it('greater than should evaluate to >', () => {
        const var1 = new GreaterThan(new NumberNode(1), new NumberNode(1));
        const output = var1.toString();
        expect(output).to.eql("1 > 1");
    });
    it('less than should evaluate to >', () => {
        const var1 = new LessThan(new NumberNode(1), new NumberNode(1));
        const output = var1.toString();
        expect(output).to.eql("1 < 1");
    });
    it('greater than eq should evaluate to >', () => {
        const var1 = new GreaterThanEq(new NumberNode(1), new NumberNode(1));
        const output = var1.toString();
        expect(output).to.eql("1 >= 1");
    });
    it('less than eq should evaluate to >', () => {
        const var1 = new LessThanEq(new NumberNode(1), new NumberNode(1));
        const output = var1.toString();
        expect(output).to.eql("1 <= 1");
    });
    it('not should evaluate to not', () => {
        const var1 = new Not(new BooleanNode(true));
        const output = var1.toString();
        expect(output).to.eql("not true");
    });
    it('for loop should evaluate to a string', () => {
        const x = new VariableNode("x");
        const xvar = new DeclareOp(x, new NumberNode(0));
        const body1 = new AssignOp(x, new PlusOp(x, new NumberNode(1)));

        const i = new VariableNode("i");
        const decl1 = new DeclareOp(i, new NumberNode(0));
        const adj1 = new AssignOp(i, new PlusOp(i, new NumberNode(1)));
        const cond1 = new LessThan(i, new NumberNode(10));

        const for1 = new ForNode(decl1, cond1, adj1, body1);
        //const seq1 = new SequenceNode(xvar,for1);
        const output = for1.toString();
        //const output1 = seq1.rightVal;
        expect(output).to.deep.equal("for(var i = 0, i < 10, i = i + 1) {\n x = x + 1}");
    });
    it('while should evaluate to a string', () => {
        const x = new VariableNode("x");
        const xvar = new DeclareOp(x, new NumberNode(0));
        const body1 = new AssignOp(x, new PlusOp(x, new NumberNode(1)));
        //const cond1 = new Conditional(new LessThan(x,new NumberNode(10)), add1);
        const cond1 = new LessThan(x, new NumberNode(10));
        const while1 = new WhileNode(cond1, body1);
        //const seq1 = new SequenceNode(xvar,while1);
        const output = while1.toString();
        expect(output).to.equal("while(x < 10) {\n x = x + 1}");
    });
    it('boolean should evaluate to a string', () => {
        const bool = new BooleanNode(true);
        const output = bool.toString();
        expect(output).to.equal("true");
    });
    it('number should evaluate to a string', () => {
        const bool = new NumberNode(1);
        const output = bool.toString();
        expect(output).to.equal("1");
    });
    it('string should evaluate to a string', () => {
        const bool = new StringNode("hi");
        const output = bool.toString();
        expect(output).to.equal("\"hi\"");
    });
    it('NOP should evaluate to an empty string', () => {
        const bool = new NOP();
        const output = bool.toString();
        expect(output).to.equal("");
    });
    it('ellipse should evaluate to a string', () => {
        const ell = new EllipseNode([["width", new NumberNode(30)], ["height", new NumberNode(30)]]);
        const output = ell.toString();
        expect(output).to.equal("ellipse(width = 30, height = 30)");
    });
    it('rect should evaluate to a string', () => {
        const ell = new RectangleNode([["width", new NumberNode(30)], ["height", new NumberNode(30)]]);
        const output = ell.toString();
        expect(output).to.equal("rect(width = 30, height = 30)");
    });
    it('return should evaluate to a string', () => {
        const ell = new RectangleNode([["width", new NumberNode(30)], ["height", new NumberNode(30)]]);
        const ret = new Return(ell);
        const output = ret.toString();
        expect(output).to.equal("return rect(width = 30, height = 30)");
    });
    it('sequence should evaluate to a string', () => {
        const num0 = new NumberNode(1);
        const plus0 = new PlusOp(new NumberNode(2), new NumberNode(2), "\n");
        const node0 = new SequenceNode(num0, plus0);

        const output = node0.toString();
        //const output1 = node0.rightVal;
        //deep or strict equal?
        //expect(output).to.deep.equal([num0.eval(null),plus0.eval(null)])
        expect(output).to.eql("1;\n2 + 2;");
    });
    it('negop should evaluate to a string', () => {
        const neg = new NegOp(new NumberNode(1));
        const output = neg.toString();
        expect(output).to.equal("-1");
    });
    it('variable should evaluate to a string', () => {
        const vari = new VariableNode("help");
        const output = vari.toString();
        expect(output).to.equal("help");
    });
});
