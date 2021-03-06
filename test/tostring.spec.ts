import { assert, expect } from 'chai';
import 'mocha';
import {
    Expression, SequenceNode, PrintNode, ListNode,
    NumberNode, StringNode, BooleanNode,
    UnaryOp, Increment, NOP, Decrement, NegOp, Not, Parens,
    BinaryOp, PlusOp, MulOp, DivOp, MinusOp,
    Equals, And, GreaterThan, LessThan, GreaterThanEq, LessThanEq, Or, NotEqual,
    VariableNode, AssignOp, BodyNode, 
    Return, FunDef, UserDefinedFunctionNode, Conditional,
    ForNode, WhileNode,
    EllipseNode, RectangleNode, EmojiNode, LineNode,
    RGBColorNode
} from '../index';
describe('toString operations', () => {
    it('AssignOp should evaluate to a string', () => {
        // i = 1
        // i = 2
        const v = new VariableNode("i", " ");
        const left = new AssignOp(v, new NumberNode(1,null), " ");
        const right = new AssignOp(v, new NumberNode(2, null," "), " ");
        //const seq = new SequenceNode(left, right);
        const output = right.toString();
        expect(output).to.deep.equal(" i = 2");
    });
    it('Decrement should evaluate to a string', () => {
        //  i = 1
        // i--
        const v = new VariableNode("i");
        const left = new AssignOp(v, new NumberNode(1,null));
        const decr = new Decrement(v);

        //const right = new AssignOp(v,new NumberNode(2));
        //const seq = new SequenceNode(left, right);
        const output = decr.toString();
        expect(output).to.deep.equal("i--");
    });
    it('Increment should evaluate to a string', () => {
        //  i = 1
        // i--;
        const v = new VariableNode("i");
        const left = new AssignOp(v, new NumberNode(1,null));
        const decr = new Increment(v);

        //const right = new AssignOp(v,new NumberNode(2));
        //const seq = new SequenceNode(left, right);
        const output = decr.toString();
        expect(output).to.deep.equal("i++");
    });
    it('divop should evaluate to a string', () => {
        const op = new DivOp(new NumberNode(4,null), new NumberNode(2, null," "), " ");
        const output = op.toString();
        expect(output).to.eql("4 / 2");
    });
    it('minusop should evaluate to a string', () => {
        const op = new MinusOp(new NumberNode(2,null), new NumberNode(1, null," "), " ");
        const output = op.toString();
        expect(output).to.eql("2 - 1");
    });
    it('plusop should evaluate to a string', () => {
        const op = new PlusOp(new NumberNode(2,null), new NumberNode(1, null," "), " ");
        const output = op.toString();
        expect(output).to.eql("2 + 1");
    });
    it('mulop should evaluate to a string', () => {
        const op = new MulOp(new NumberNode(2,null), new NumberNode(1, null," "), " ");
        const output = op.toString();
        expect(output).to.eql("2 * 1");
    });
    it('if statement should evaluate to a string', () => {
        const ret = new Return(new NumberNode(1,null), " ", " ");
        const body1 = new BodyNode(ret, " ", " ");
        const x = new VariableNode("x", " ");
        const xnum = new NumberNode(2,null);
        const decl1 = new AssignOp(x, xnum);
        const log1 = new LessThan(x, new NumberNode(3, null," "), " ");
        const cond1 = new Conditional(new Parens(log1, " ", " "), body1, " ");
        const output = cond1.toString();
        // const seq1 = new SequenceNode(decl1,cond1);
        // const output = seq1.eval(new Scope(null));
        // const output1 = seq1.rightVal;
        expect(output).to.eql(" if ( x < 3 ) { return 1 }");
    });
    it('fundef should evaluate to a string', () => {
        const fundef = new SequenceNode(new FunDef("identity", new BodyNode(new Return(new VariableNode("x"), "\n ", " "), " "), [["", "x", "", null, ""]], "", " "), new NOP());
        //const funapp = new FunApp("identity",[1]);
        const output = fundef.toString();
        expect(output).to.equal("fun identity(x) {\n return x}\n");
    });
    it('funapp should evaluate to a string', () => {
        //const fundef = new FunDef("identity",new Return(new VariableNode("x")),["x"]);
        const funapp = new SequenceNode(new UserDefinedFunctionNode("identity", [["", "", " ", null, " "]]), new NOP());
        const output = funapp.toString();
        expect(output).to.equal("identity()\n");
    });
    it('list should evaluate to [0, 1, 2, 3]', () => {
        const list1 = new ListNode([[new NumberNode(0,null), ""],[new NumberNode(1, null," "),""], [new NumberNode(2, null," "),""],[new NumberNode(3, null," "),""]]);
        const output = list1.toString();
        expect(output).to.deep.equal("[0, 1, 2, 3]");
    });
    it('greater than should evaluate to >', () => {
        const var1 = new GreaterThan(new NumberNode(1,null), new NumberNode(1, null," "), " ");
        const output = var1.toString();
        expect(output).to.eql("1 > 1");
    });
    it('less than should evaluate to >', () => {
        const var1 = new LessThan(new NumberNode(1,null), new NumberNode(1, null," "), " ");
        const output = var1.toString();
        expect(output).to.eql("1 < 1");
    });
    it('greater than eq should evaluate to >', () => {
        const var1 = new GreaterThanEq(new NumberNode(1,null), new NumberNode(1, null," "), " ");
        const output = var1.toString();
        expect(output).to.eql("1 >= 1");
    });
    it('less than eq should evaluate to >', () => {
        const var1 = new LessThanEq(new NumberNode(1,null), new NumberNode(1, null," "), " ");
        const output = var1.toString();
        expect(output).to.eql("1 <= 1");
    });
    it('boolean should evaluate to a string', () => {
        const bool = new BooleanNode(true,null);
        const output = bool.toString();
        expect(output).to.equal("true");
    });
    it('number should evaluate to a string', () => {
        const bool = new NumberNode(1,null);
        const output = bool.toString();
        expect(output).to.equal("1");
    });
    it('string should evaluate to a string', () => {
        const bool = new StringNode("hi",null);
        const output = bool.toString();
        expect(output).to.equal("\"hi\"");
    });
    it('NOP should evaluate to an empty string', () => {
        const bool = new NOP();
        const output = bool.toString();
        expect(output).to.equal("");
    });
    it('ellipse should evaluate to a string', () => {
        const ell = new EllipseNode([["", "width", " ", new NumberNode(30, null," "), ""], [" ", "height", " ", new NumberNode(30, null," "), ""]]);
        const output = ell.toString();
        expect(output).to.equal("ellipse(width = 30, height = 30)");
    });
    it('rect should evaluate to a string', () => {
        const ell = new RectangleNode([["", "width", " ", new NumberNode(30, null," "), ""], [" ", "height", " ", new NumberNode(30,null, " "), ""]]);
        const output = ell.toString();
        expect(output).to.equal("rect(width = 30, height = 30)");
    });
    it('return should evaluate to a string', () => {
        const ell = new RectangleNode([["  ", "width", " ", new NumberNode(30, null," "), "   "], [" ", "height", " ", new NumberNode(30, null," "), ""]]);
        const ret = new Return(ell, "", " ");
        const output = ret.toString();
        expect(output).to.equal("return rect(  width = 30   , height = 30)");
    });
    it('sequence should evaluate to a string', () => {
        const num0 = new NumberNode(1,null);
        const plus0 = new PlusOp(new NumberNode(2,null), new NumberNode(2, null," "), " ");
        const node0 = new SequenceNode(num0, plus0);

        const output = node0.toString();
        //const output1 = node0.rightVal;
        //deep or strict equal?
        //expect(output).to.deep.equal([num0.eval(null),plus0.eval(null)])
        expect(output).to.eql("1\n2 + 2");
    });
    it('negop should evaluate to a string', () => {
        const neg = new NegOp(new NumberNode(1,null));
        const output = neg.toString();
        expect(output).to.equal("-1");
    });
    it('variable should evaluate to a string', () => {
        const vari = new VariableNode("help");
        const output = vari.toString();
        expect(output).to.equal("help");
    });
});
