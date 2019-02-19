import { Primitives, CharUtil } from 'pants';
import Prims = Primitives;
import CharStream = CharUtil.CharStream;
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
} from '../../index';
import { Option, Some, None } from 'space-lift';

export namespace Parser {

    /**
     * to be moved to Pants
     * number parses numbers by repeatedly applying the digit parser
     */
    export function number(): Prims.IParser<number> {
        return (istream: CharStream) => {
            const o = Prims.many1(Prims.digit())(istream)
            switch (o.tag) {
                case "success":
                    let s = "";
                    for (let digit of o.result) {
                        s += digit.toString();
                    }
                    return new Prims.Success<number>(o.inputstream, parseFloat(s));
                case "failure":
                    return o;
            }
        }
    }

    export function float(): Prims.IParser<Expression<{}>> {
        let p1 = Prims.left<number, CharStream>(number())(Prims.str('.'));
        let p2 = Prims.seq<number, number, number[]>(p1)(number())(x => x);
        let float_val = Prims.appfun<string, number>(Prims.appfun<number[], string>(p2)(x => x[0] + "." + x[1]))(x => parseFloat(x));
        return Prims.appfun<number, FloatNode>(float_val)(x => new FloatNode(x));
    }

    /**
     * to be moved to Pants
     * string is an arbitrary string parser that repeatedly applies the letter primitive
     * returns a CharStream representing the entire parsed string
     */
    export function string(): Prims.IParser<CharStream> {
        let p: Prims.IParser<CharStream[]> = Prims.between<CharStream, CharStream, CharStream[]>(
            Prims.ws()
        )(
            Prims.ws()
        )(
            Prims.many1(Prims.letter())
        );
        let f = (xs: CharStream[]) => CharStream.concat(xs)
        return Prims.appfun<CharStream[], CharStream>(p)(f);
    }

    // String and digits
    export function stringAndDigit(): Prims.IParser<CharStream> {
        let p: Prims.IParser<CharStream[]> = Prims.between<CharStream, CharStream, CharStream[]>(
            Prims.ws()
        )(
            Prims.ws()
        )(
            Prims.many1(Prims.choice(Prims.letter())(Prims.digit()))
        );
        let f = (xs: CharStream[]) => CharStream.concat(xs)
        return Prims.appfun<CharStream[], CharStream>(p)(f);
    }

    /**
     * to be moved to Pants
     * punctuation parses all possible punctuation characters
     */
    export function punctuation() {
        return Prims.strSat(
            ["!", ".", ",", ";", "?", "-", "&", "$", ":",
                "/", "|", "%", "#", "@", "~", "`", "*", "^",
                "{", "}", "[", "]", "(", ")", "'", "_"]);
    }

    let id = (x: any) => x

    /**
     * parseWithOutcome is a function that wraps the input text in a CharStream
     * and passes it to the upper-level parse function. The function
     * returns an Outcome, which contains either an AST (on success) or
     * failure information (on failure).
     * @param program a string representing program text
     */
    export function parseWithOutcome(program: string): Prims.Outcome<Expression<any>> {
        program += "\n";
        return ExpressionParser(new CharStream(program));
    }

    /**
     * parse is a function that wraps the input text in a CharStream
     * and passes it to the upper-level parse function
     * @param program a string representing program text
     */
    export function parse(program: string): Option<Expression<any>> {
        let o = parseWithOutcome(program);
        switch (o.tag) {
            case "success":
                return Some(o.result);
            case "failure":
                return None;
        }
    }

    /**
     * Expression parser first searches for the first expression of a sequence and either
     * another expression or the end of the program (NOP) and returns a sequence node
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    export let ExpressionParser: Prims.IParser<Expression<any>> = i => {
        let f = (tup: [Expression<any>, Expression<any>]) => {
            return new SequenceNode(tup[0], tup[1]);
        }
        let p =
            Prims.seq<Expression<any>, Expression<any>, SequenceNode>(
                ExpressionParserNoSeq
            )(
                Prims.right<CharStream, Expression<any>>(Prims.choice(
                    Prims.char(';'))(Prims.nl())
                )(
                    Prims.choice<Expression<any>>(Prims.between<CharStream, CharStream, Expression<any>>(Prims.ws())(Prims.ws())(ExpressionParser))(
                        Prims.appfun<CharStream, Expression<any>>(Prims.ws())(_ => new NOP())
                    )
                )
            )(f)
        return p(i);
    }

    /**
     * Searches through all possible expressions except for sequences
     * used to avoid infinite looping in upper level parse
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    export let ExpressionParserNoSeq: Prims.IParser<Expression<{}>> = i => {
        let p1 = Prims.choice(lNumber())(lstring2())
        let p2 = Prims.choice(float())(p1);
        let p3 = Prims.choice<Expression<any>>(varNameParse())(p2);
        let p4 = Prims.choice<Expression<any>>(BoolParse())(p3);
        let p5 = Prims.choice<Expression<any>>(varDecParse())(p4);
        let p6 = Prims.choice<Expression<any>>(unOpsExpr)(p5);
        let p7 = Prims.choice<Expression<any>>(Declare())(p6);
        let p8 = Prims.choice<Expression<any>>(binOpExpr)(p7);
        let p9 = Prims.choice<Expression<any>>(LogicExpr())(p8);
        let p10 = Prims.choice<Expression<any>>(ListHead)(p9);
        let p11 = Prims.choice<Expression<any>>(funApp)(p10);
        let p12 = Prims.choice<Expression<any>>(returnParser)(p11);
        let p13 = Prims.choice<Expression<any>>(condParse)(p12);
        let p14 = Prims.choice<Expression<any>>(WhileLoop)(p13);
        let p15 = Prims.choice<Expression<any>>(ForLoop)(p14);
        let p16 = Prims.choice<Expression<any>>(funDef)(p15);
        let p17 = Prims.choice<Expression<any>>(loopParse)(p16);
        return p17(i);
    }

    /**
     * Searches through all possible expressions except for binOp expressions
     * used to avoid infinite looping in the binary expression parser
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    export let ExpressionParserNoBinOp: Prims.IParser<Expression<{}>> = i => {
        let p1 = Prims.choice(lNumber())(lstring2());
        let p2 = Prims.choice(float())(p1);
        let p3 = Prims.choice<Expression<any>>(varNameParse())(p2);
        let p4 = Prims.choice<Expression<any>>(BoolParse())(p3);
        let p5 = Prims.choice<Expression<any>>(varDecParse())(p4);
        let p6 = Prims.choice<Expression<any>>(unOpsExpr)(p5);
        let p7 = Prims.choice<Expression<any>>(Declare())(p6);
        let p8 = Prims.choice<Expression<any>>(ListHead)(p7);
        let p9 = Prims.choice<Expression<any>>(funApp)(p8);
        let p10 = Prims.choice<Expression<any>>(returnParser)(p9);
        let p11 = Prims.choice<Expression<any>>(condParse)(p10);
        let p12 = Prims.choice<Expression<any>>(WhileLoop)(p11);
        let p13 = Prims.choice<Expression<any>>(ForLoop)(p12);
        let p14 = Prims.choice<Expression<any>>(funDef)(p13);
        let p15 = Prims.choice<Expression<any>>(loopParse)(p14);
        return p15(i);
    }

    /**
     * Searches through all possible expressions except for logical expressions
     * used to avoid infinite looping in the logical expression parser
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    export let ExpressionParserNoLogic: Prims.IParser<Expression<{}>> = i => {
        let p1 = Prims.choice(lNumber())(lstring2());
        let p2 = Prims.choice(float())(p1);
        let p3 = Prims.choice<Expression<any>>(varNameParse())(p2)
        let p4 = Prims.choice<Expression<any>>(BoolParse())(p3);
        let p5 = Prims.choice<Expression<any>>(varDecParse())(p4);
        let p6 = Prims.choice<Expression<any>>(unOpsExpr)(p5);
        let p7 = Prims.choice<Expression<any>>(Declare())(p6)
        let p8 = Prims.choice<Expression<any>>(binOpExpr)(p7);
        let p9 = Prims.choice<Expression<any>>(ListHead)(p8);
        let p10 = Prims.choice<Expression<any>>(funApp)(p9);
        let p11 = Prims.choice<Expression<any>>(returnParser)(p10);
        let p12 = Prims.choice<Expression<any>>(condParse)(p11);
        let p13 = Prims.choice<Expression<any>>(WhileLoop)(p12);
        let p14 = Prims.choice<Expression<any>>(ForLoop)(p13);
        let p15 = Prims.choice<Expression<any>>(funDef)(p14);
        let p16 = Prims.choice<Expression<any>>(loopParse)(p15);
        return p16(i);
    }

    /**
     * lNumber is used to wrap parsed numbers in NumberNodes for the AST
     */
    export function lNumber(): Prims.IParser<Expression<{}>> {
        return (istream: CharStream) => {
            let o = number()(istream);
            switch (o.tag) {
                case "success":
                    return new Prims.Success(o.inputstream, new NumberNode(o.result));
                case "failure":
                    return o;
            }
        }
    }

    /**
     * binOpsChar parses all possible binary operators, such as + or -
     */
    export function binOpsChar(): Prims.IParser<CharStream> {
        return (istream: CharStream) => {
            return Prims.between<CharStream, CharStream, CharStream>(
                Prims.ws()
            )(
                Prims.ws()
            )(
                Prims.strSat(["+", "-", "/", "=", "*"])
            )(istream);
        }
    }

    /**
     * binOpsShort returns a tuple where the first element is the binary operator (CharStream)
     * and the second element is the expression to the right of the operator (Expression<{}>)
     */
    export function binOpShort(): (cs: CharStream) => Prims.Outcome<[CharStream, Expression<{}>]> {
        return Prims.seq<CharStream, Expression<{}>, [CharStream, Expression<{}>]>(binOpsChar())(ExpressionParserNoSeq)((x: [CharStream, Expression<{}>]) => x);
    }

    /**
     * binOpExpr parses all possible binary operation expressions and returns the
     * corresponding AST node construct (also parses postfix increments/decrements like i++)
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let binOpExpr: Prims.IParser<Expression<any>> = i => {
        var f = (tup: [Expression<any>, [CharStream, Expression<any>]]) => {
            let lhs: Expression<any> = tup[0];
            let op: CharStream = tup[1][0];
            let rhs: Expression<any> = tup[1][1];
            switch (op.toString()) {
                case "+":
                    return new PlusOp((<Expression<NumberNode | FloatNode>>lhs), (<Expression<NumberNode | FloatNode>>rhs), ws);
                case "-":
                    return new MinusOp((<Expression<NumberNode | FloatNode>>lhs), (<Expression<NumberNode | FloatNode>>rhs), ws);
                case "/":
                    return new DivOp((<Expression<NumberNode | FloatNode>>lhs), (<Expression<NumberNode | FloatNode>>rhs), ws);
                case "*":
                    return new MulOp((<Expression<NumberNode | FloatNode>>lhs), (<Expression<NumberNode | FloatNode>>rhs), ws);
                case "=":
                    return new AssignOp((<Expression<VariableNode>>lhs), (<Expression<any>>rhs), ws);
                default:
                    throw new Error("Binary Operation not supported");
            }
        }
        let p1 = Prims.choice(ExpressionParserNoBinOp)(varDecParse());
        let p2 = binOpShort();
        let ws = "";
        let precedingWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let postPlus = Prims.seq<Expression<any>, CharStream, Increment>(Prims.right<string, Expression<any>>(precedingWS)(ExpressionParserNoBinOp))(Prims.str('++'))(tup => { return new Increment(tup[0], ws) });
        let postMinus = Prims.seq<Expression<any>, CharStream, Decrement>(Prims.right<string, Expression<any>>(precedingWS)(ExpressionParserNoBinOp))(Prims.str('--'))(tup => { return new Decrement(tup[0], ws) });
        let binOp = Prims.seq<Expression<any>, [CharStream, Expression<any>], BinaryOp<any>>(Prims.right<string, Expression<any>>(precedingWS)(p1))(p2)(f);
        return Prims.choice<Expression<any>>(binOp)(Prims.choice<Expression<any>>(postPlus)(postMinus))(i);
    }

    /**
     * unOpsChar parses all possible unary operators
     * Only negations are supported, but more can be added as needed
     * @param i nonsense parameter used to avoid the bug with eager evaluation
     */
    export let unOpsChar: Prims.IParser<CharStream> = i => {
        return Prims.between<CharStream, CharStream, CharStream>(Prims.ws())(Prims.ws())(Prims.char("-"))(i);
    }

    /**
     * unOpsExpr wraps a unary operation expression in the corresponding
     * AST node and returns it
     * @param i nonsense parameter used to avoid the bug with eager evaluation
     */
    export let unOpsExpr: Prims.IParser<UnaryOp<{}>> = i => {
        var f = (tup: [CharStream, Expression<NumberNode | FloatNode>]) => {
            return new NegOp(tup[1], ws);
        }
        let ws = "";
        let precedingWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        return Prims.seq<CharStream, Expression<any>, UnaryOp<{}>>(Prims.right<string, CharStream>(precedingWS)(unOpsChar))(ExpressionParserNoSeq)(f)(i);
    }

    /**
     * lstring parses valid strings in the SWELL language
     * a valid string is surrounded by quotations and consists of letters, numbers, punctuation, and/or whitespace
     */
    export function lstring() {
        let p1 = Prims.choice(Prims.choice(Prims.letter())(Prims.ws1()))(Prims.digit());
        //let p1 = Prims.choice(Prims.letter())(Prims.ws1());
        let p: Prims.IParser<CharStream[]> = Prims.between<CharStream, CharStream, CharStream[]>(
            Prims.str("\"")
        )(
            Prims.str("\"")
        )(
            Prims.many<CharStream>(Prims.choice(p1)(punctuation())));
        let f = (xs: CharStream[]) => CharStream.concat(xs)
        return Prims.appfun<CharStream[], CharStream>(p)(f);

    }

    export let parens: Prims.IParser<Parens> = i => {
        let open = Prims.between<CharStream, CharStream, CharStream>(Prims.ws())(Prims.ws())(Prims.str("("));
        let close = Prims.between<CharStream, CharStream, CharStream>(Prims.ws())(Prims.ws())(Prims.str(")"));
        let expr = Prims.choice<Expression<any>>(binOpExpr)(unOpsExpr);
        let expr2 = Prims.choice<Expression<any>>(expr)(lNumber());
        let parens = Prims.right<CharStream, Expression<any>>(open)(Prims.left<Expression<any>, CharStream>(expr2)(close));
        return Prims.appfun<Expression<any>, Parens>(parens)(x => new Parens(x))(i);
    }

    /**
     * lstring2 wraps strings parsed by lstring in StrinNode objects and returns them
     */
    export function lstring2() {
        return (istream: CharStream) => {
            let ws = "";
            let precedingWS = Prims.appfun(Prims.ws())(x => ws = x.toString());
            let o = Prims.right(precedingWS)(lstring())(istream);
            switch (o.tag) {
                case "success":
                    return new Prims.Success(o.inputstream, new StringNode(o.result.toString(), ws));
                case "failure":
                    return o;
            }
        }
    }

    /**
     * varNameParse parses valid variable names
     * variable names in SWELL begin with a lowercase char and are followed
     * by letters or digits
     */
    export function varNameParse(): Prims.IParser<VariableNode> {
        var f = (tup: [CharStream, CharStream[]]) => {
            return new VariableNode(tup[0].toString() + CharStream.concat(tup[1]).toString(), ws);
        }
        let ws = "";
        let precedingWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let firstChar = Prims.right<string, CharStream>(precedingWS)(Prims.lower());
        let nextChars = Prims.many(Prims.choice(Prims.digit())(Prims.letter()));
        return Prims.seq<CharStream, CharStream[], VariableNode>(firstChar)(nextChars)(f);
    }

    /**
     * varDecParse parses valid variable declarations in the form "var x"
     * the parser then wraps the parsed value in a variable node for the AST
     */
    export function varDecParse(): Prims.IParser<VariableNode> {
        let ws = "";
        let precedingWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let p1 = Prims.right<string, CharStream>(precedingWS)(Prims.str("var"));
        let varName = Prims.between<CharStream, CharStream, VariableNode>(Prims.ws1())(Prims.ws())(varNameParse());
        let p = Prims.seq<CharStream, VariableNode, VariableNode>(p1)(varName)(tup => tup[1]);
        return p;
    }

    /**
     * Declare parses variable declarations in the form "var x = 2"
     * and returns a DeclareOp node
     */
    export function Declare(): Prims.IParser<DeclareOp<any>> {
        let eq = Prims.between(Prims.ws())(Prims.ws())(Prims.char('='));
        let p1 = Prims.left(varDecParse())(eq);
        return Prims.seq<VariableNode, Expression<any>, DeclareOp<any>>(p1)(ExpressionParserNoSeq)(tup => { return new DeclareOp(tup[0], tup[1]) })
    }

    /**
     * ListHead parses all lists in the SWELL language, including empty lists
     * Lists are surrounded by square brackets and each element is separated by a comma
     * returns a listNode object
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let ListHead: Prims.IParser<ListNode> = i => {
        let ws = "";
        let precedingWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let p0 = Prims.between<CharStream, CharStream, Expression<any>>(Prims.ws())(Prims.ws())(ExpressionParserNoSeq);
        let p1 = Prims.right<CharStream, Expression<any>>(Prims.right<string, CharStream>(precedingWS)(Prims.char('[')))(p0);
        var f = (tup: [Expression<any>, any]) => {
            let hd = tup[0];
            let res: [any] = [hd];
            let tail = tup[1];
            for (let elem of tail) {
                res.push(elem);
            }
            return new ListNode(res, ws);
        }
        let p2 = Prims.seq<Expression<any>, {}, {}>(p1)(ListTail())(f);
        let p3 = Prims.appfun(Prims.right<string, CharStream>(precedingWS)(Prims.str('[]')))(_ => new ListNode([], ws));
        return Prims.choice<any>(p3)(p2)(i);
    }

    /**
     * List Tail parses second through last elements of a list, each separated by a comma
     * returns an array of Expressions that will be accessed by ListHead
     */
    export function ListTail(): Prims.IParser<Expression<any>[]> {
        let p0 = Prims.between<CharStream, CharStream, Expression<any>>(Prims.ws())(Prims.ws())(ExpressionParserNoSeq);
        let p1 = Prims.right<CharStream, Expression<any>>(Prims.char(','))(p0);
        let p2 = Prims.left(Prims.many<Expression<any>>(p1))(Prims.char(']'));
        return p2;
    }

    /**
     * funDefArgList parses argument lists for function definitions,
     * surrounded by parens and separated by commas
     * returns an array of the parameters
     */
    export function funDefArgList(): Prims.IParser<string[]> {
        let p1 = Prims.right<CharStream, CharStream>(Prims.char('('))(string());
        var f = (tup: [CharStream, CharStream[]]) => {
            let hd = tup[0].toString();
            let res: [any] = [hd];
            let tail = tup[1];
            for (let elem of tail) {
                res.push(elem.toString());
            }
            return res;
        }
        let p2 = Prims.seq<CharStream, CharStream[], string[]>(p1)(funDefArgListTail())(f);
        let p3 = Prims.appfun(Prims.str('()'))(_ => []);
        return Prims.choice<any>(p3)(p2);
    }

    /**
     * funDefArgListTail parses the second through last elements of a function definition parameter list
     * parameters are separated by commas and end with a closing parens
     * returns an array of parameters, which is accessed by funDefArgList
     */
    function funDefArgListTail(): Prims.IParser<CharStream[]> {
        let p1 = Prims.right<CharStream, CharStream>(Prims.char(','))(string());
        let p2 = Prims.left(Prims.many<CharStream>(p1))(Prims.char(')'));
        return p2;
    }

    export function funAppArgList2(): Prims.IParser<Array<[string, Expression<any>]>> {
        let argName = Prims.right<CharStream, CharStream>(Prims.ws())(stringAndDigit());
        let assignOp = Prims.right<CharStream, CharStream>(Prims.ws())(Prims.char('='));
        let assignToArg = Prims.left<CharStream, CharStream>(argName)(assignOp);
        let assignment = Prims.choice<CharStream>(assignToArg)(Prims.ws());
        let f = (tup: [CharStream, Expression<any>]) => {
            let result: [string, Expression<any>] = [tup[0].toString().trim(), tup[1]];
            return result;
        };
        let expr = Prims.right<CharStream, Expression<any>>(Prims.ws())(ExpressionParserNoSeq);
        let firstArg = Prims.seq<CharStream, Expression<any>, [string, Expression<any>]>(assignment)(expr)(f);
        let comma = Prims.right<CharStream, CharStream>(Prims.ws())(Prims.char(','));
        let remainingAssignment = Prims.between<CharStream, CharStream, CharStream>(comma)(Prims.ws())(assignment);
        let remainingArg = Prims.seq<CharStream, Expression<any>, [string, Expression<any>]>(remainingAssignment)(expr)(f);
        let argTail = Prims.many<[string, Expression<any>]>(remainingArg);
        let args = Prims.choice<Array<[string, Expression<any>]>>(
            Prims.seq<[string, Expression<any>], Array<[string, Expression<any>]>, Array<[string, Expression<any>]>>(firstArg)(argTail)(
                (tup: [[string, Expression<any>], Array<[string, Expression<any>]>]) => {
                    tup[1].unshift(tup[0]);
                    return tup[1];
                }
            )
        )(
            Prims.appfun<CharStream, Array<[string, Expression<any>]>>(Prims.ws())(_ => [])
        );
        let openParen = Prims.right<CharStream, CharStream>(Prims.ws())(Prims.char('('));
        let closeParen = Prims.right<CharStream, CharStream>(Prims.ws())(Prims.char(')'));
        return Prims.between<CharStream, CharStream, Array<[string, Expression<any>]>>(openParen)(closeParen)(args);
    }

    /**
     * funAppArgList parses argument lists for function applications, including empty args lists
     * the parser returns an array of Expression objects that represent the arguments
     */
    export function funAppArgList(): Prims.IParser<Expression<any>[]> {
        let expr = Prims.between<CharStream, CharStream, Expression<any>>(Prims.ws())(Prims.ws())(ExpressionParserNoSeq);
        let p1 = Prims.right<CharStream, Expression<any>>(Prims.char('('))(expr);
        var f = (tup: [Expression<any>, Expression<any>[]]) => {
            let hd: Expression<{}> = tup[0];
            let res = [hd];
            let tail = tup[1];
            for (let elem of tail) {
                res.push(elem);
            }
            return res;
        }
        let p2 = Prims.seq<Expression<any>, Expression<any>[], Expression<any>[]>(p1)(funAppArgListTail())(f);
        let p3 = Prims.appfun<CharStream, Expression<{}>[]>(Prims.str('()'))(_ => []);
        return Prims.choice<Expression<any>[]>(p3)(p2);
    }

    /**
     * funAppArgListTail parses the second through last elements of an argument list
     * each element is separated by a comma
     * returns an array of Expression objects, later accessed by funAppArgsList
     */
    function funAppArgListTail(): Prims.IParser<Expression<any>[]> {
        let comma = Prims.between<CharStream, CharStream, CharStream>(Prims.ws())(Prims.ws())(Prims.char(','))
        let p1 = Prims.right<CharStream, Expression<any>>(comma)(ExpressionParserNoSeq);
        let p2 = Prims.left(Prims.many<Expression<any>>(p1))(Prims.right(Prims.ws())(Prims.char(')')));
        return p2;
    }

    /**
     * returnParser parses valid return statements in the form "return x"
     * wraps the parsed value in a Return node for the AST
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let returnParser: Prims.IParser<Return> = i => {
        let expr = Prims.between<CharStream, CharStream, Expression<any>>(Prims.ws())(Prims.ws())(ExpressionParserNoSeq);
        let ws = "";
        let precedingWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let p = Prims.right<CharStream, Expression<any>>(Prims.right<string, CharStream>(precedingWS)(Prims.str('return')))(expr);
        var f = (e: Expression<any>) => { return new Return(e, ws); }
        return Prims.appfun<Expression<any>, Return>(p)(f)(i);

    }

    /**
     * funDef parses valid function definitions in the form "fun functionName(argList){ body;}"
     * the parser returns a funDef node for the AST
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let funDef: Prims.IParser<FunDef<any>> = i => {
        let ws = "";
        let precedingWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        return Prims.right<CharStream, FunDef<{}>>(
            Prims.right<string, CharStream>(precedingWS)(Prims.str('fun'))
        )(
            Prims.seq<string, [string[], Expression<{}>], FunDef<{}>>(
                /* function name */
                Prims.appfun<CharStream, string>(
                    string()
                )(cs => cs.toString())
            )(
                Prims.seq<string[], Expression<{}>, [string[], Expression<{}>]>(
                    /* function arguments */
                    funDefArgList()
                )(
                    Prims.right<CharStream, Expression<{}>>(
                        /* function body */
                        Prims.between<CharStream, CharStream, CharStream>(
                            Prims.ws()
                        )(
                            Prims.ws()
                        )(
                            Prims.char('{')
                        )
                    )(
                        Prims.left<Expression<{}>, CharStream>(
                            Prims.between<CharStream, CharStream, Expression<{}>>(
                                Prims.ws()
                            )(
                                Prims.ws()
                            )(
                                ExpressionParser
                            )
                        )(
                            Prims.char('}')
                        )
                    )
                )(id)
            )(
                // create the AST node
                (tup: [string, [string[], Expression<{}>]]) => {
                    let fname: string = tup[0];
                    let args: string[] = tup[1][0];
                    let body: Expression<{}> = tup[1][1];
                    return new FunDef(fname, body, args, ws);
                }
            )
        )(i)
    }

    /**
     * funApp parses valid function applications in the form "functionName(argsList)" and returns a funApp node
     * parser checks for built-in functions, like print, ellipse, and rect; and returns the valid AST node
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let funApp: Prims.IParser<Expression<any>> = i => {
        let ws = "";
        let precedingWS = Prims.appfun<CharStream, string>(Prims.ws())(x => x.toString());
        return Prims.seq<CharStream, Array<[string, Expression<any>]>, any>(
            Prims.right<string, CharStream>(precedingWS)(string())
        )(
            funAppArgList2()
        )(tup => {
            let fname: string = tup[0].toString();
            let args: Array<[string, Expression<any>]> = tup[1];
            switch (fname) {
                case "print":
                    return new PrintNode(args, ws);
                case "ellipse":
                    return new EllipseNode(args, ws);
                case "rect":
                    return new RectangleNode(args, ws);
                case "emoji":
                    return new EmojiNode(args, ws);
                case "line":
                    return new LineNode(args, ws);
                case "rgb":
                    return new RGBColorNode(args, ws);
                default:
                    return new FunApp(fname, [], ws);
            }
        })(i);
    }

    /**
     * BoolParse parses valid booleans, true and false, and returns a BooleanNode
     */
    export function BoolParse(): Prims.IParser<BooleanNode> {
        let ws = "";
        let precedingWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let p1 = Prims.appfun<CharStream, BooleanNode>(Prims.right<string, CharStream>(precedingWS)(Prims.str('true')))(_ => new BooleanNode(true, ws));
        let p2 = Prims.appfun<CharStream, BooleanNode>(Prims.right<string, CharStream>(precedingWS)(Prims.str('false')))(_ => new BooleanNode(false, ws));
        return Prims.choice<BooleanNode>(p1)(p2);
    }

    /**
     * logicChar parses all logical operators in the SWELL language and returns the consumed operator
     */
    export function logicChar(): Prims.IParser<CharStream> {
        var logicChar = ["equals", '==', 'and', '>', '<', 'not equals', 'or'];
        var logicChar2 = ['>=', '<='];
        let p1 = Prims.between<CharStream, CharStream, CharStream>(Prims.ws())(Prims.ws())(Prims.strSat(logicChar));
        let p2 = Prims.between<CharStream, CharStream, CharStream>(Prims.ws())(Prims.ws())(Prims.strSat(logicChar2));
        return Prims.choice(p2)(p1);
    }

    /**
     * logicShort returns a tuple, where the first element represents the logical operator and
     * the second element is the expression to the right of the operator
     */
    export function logicShort(): Prims.IParser<[CharStream, Expression<any>]> {
        return Prims.seq<CharStream, Expression<any>, [CharStream, Expression<any>]>(logicChar())(ExpressionParserNoSeq)((x: [CharStream, Expression<any>]) => x);
    }

    /**
     * logicExpr parses logical expressions and returns the corresponding AST node
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export function LogicExpr(): Prims.IParser<Expression<any>> {
        // TODO: Dan (2018-11-19), shouldn't parameterized type be BooleanNode?
        var f = (tup: [Expression<any>, [CharStream, Expression<any>]]) => {
            let lhs: Expression<any> = tup[0];
            let op: CharStream = tup[1][0];
            let rhs: Expression<any> = tup[1][1];
            switch (op.toString()) {
                case "equals":
                    return new Equals((<Expression<any>>lhs), (<Expression<any>>rhs), ws);
                case "==":
                    return new Equals((<Expression<any>>lhs), (<Expression<any>>rhs), ws);
                case "and":
                    return new And((<Expression<any>>lhs), (<Expression<any>>rhs), ws);
                case ">":
                    return new GreaterThan((<Expression<any>>lhs), (<Expression<any>>rhs), ws);
                case "<":
                    return new LessThan((<Expression<any>>lhs), (<Expression<any>>rhs), ws);
                case ">=":
                    return new GreaterThanEq((<Expression<any>>lhs), (<Expression<any>>rhs), ws);
                case "<=":
                    return new LessThanEq((<Expression<any>>lhs), (<Expression<any>>rhs), ws);
                case "or":
                    return new Or((<Expression<any>>lhs), (<Expression<any>>rhs), ws);
                case "not equals":
                    return new NotEqual((<Expression<any>>lhs), (<Expression<any>>rhs), ws);
                default:
                    throw new Error("Logical expression not supported");
            }
        }
        let ws = "";
        let precedingWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let not = Prims.right<string, CharStream>(precedingWS)(Prims.str('not'));
        let p1 = Prims.right<CharStream, Expression<any>>(not)(ExpressionParserNoSeq);
        let notExpr = Prims.appfun<Expression<any>, Not>(p1)(x => new Not(x, ws));
        let logicExpr = Prims.seq<Expression<any>, [CharStream, Expression<any>], any>(Prims.right<string, Expression<any>>(precedingWS)(ExpressionParserNoLogic))(logicShort())(f);
        return Prims.choice(notExpr)(logicExpr);
    }

    /**
     * IfParse parses valid if statements in the form "if(condition){ body; }"
     * returns an array where the first elem is the condition and the second is the body
     */
    export function IfParse(): Prims.IParser<Expression<any>[]> {
        let expr = Prims.between<CharStream, CharStream, Expression<{}>>(Prims.ws())(Prims.ws())(ExpressionParserNoSeq);
        let bodyParse = Prims.between<CharStream, CharStream, Expression<{}>>(Prims.ws())(Prims.ws())(ExpressionParser);
        let ifWS = Prims.between<CharStream, CharStream, CharStream>(Prims.ws())(Prims.ws())(Prims.str('if'));
        let ifStr = Prims.choice<CharStream>(ifWS)(Prims.str("if"));
        let p1 = Prims.seq<CharStream, CharStream, CharStream[]>(ifStr)(Prims.char('('))(x => x);
        let cond = Prims.between<CharStream[], CharStream, Expression<any>>(p1)(Prims.char(')'))(expr);
        let curly = Prims.between<CharStream, CharStream, CharStream>(Prims.ws())(Prims.ws())(Prims.char('{'));
        let body = Prims.between<CharStream, CharStream, Expression<any>>(curly)(Prims.char('}'))(bodyParse);
        return Prims.seq<Expression<any>, Expression<any>, Expression<any>[]>(cond)(body)(x => x);
    }

    /**
      * IfElseParse parses valid if else statements in the form "if(condition){ body; } else{ body2;}"
      * returns an array where the first elem is the condition and the second is the first body and the third is body2
      */
    export function IfElseParse(): Prims.IParser<Expression<any>[]> {
        let e = Prims.between<CharStream, CharStream, CharStream>(Prims.ws())(Prims.ws())(Prims.str('else'));
        let body = Prims.between<CharStream, CharStream, Expression<any>>(Prims.ws())(Prims.ws())(ExpressionParser);
        let body2 = Prims.between<CharStream, CharStream, Expression<any>>(Prims.str('{'))(Prims.str('}'))(body);
        let elseParse = Prims.right<CharStream, Expression<any>>(e)(body2);
        var f = (tup: [Expression<any>[], Expression<any>]) => {
            tup[0].push(tup[1]);
            return tup[0];
        }
        return Prims.seq<Expression<any>[], Expression<any>, Expression<any>[]>(IfParse())(elseParse)(f);
    }

    /**
     * condParse parses possible conditional statements, including if and if/else statements
     * returns a Conditional node
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let condParse: Prims.IParser<Conditional> = i => {
        var f = (tup: Expression<any>[]) => {
            if (tup.length == 3) {
                return new Conditional(tup[0], tup[1], tup[2]);
            }
            else {
                return new Conditional(tup[0], tup[1]);
            }
        }
        return Prims.appfun<Expression<any>[], Conditional>(Prims.choice<Expression<any>[]>(IfElseParse())(IfParse()))(f)(i);
    }

    /**
     * RepeatLoop parses valid repeat statement of the form "repeat(n){ body; }"
     * returns an array where the first elem is number of repeats and the second is the body
     */
    export function RepeatLoop(): Prims.IParser<Expression<any>[]> {
        let expr = Prims.between<CharStream, CharStream, Expression<{}>>(Prims.ws())(Prims.ws())(ExpressionParserNoSeq);
        let bodyParse = Prims.between<CharStream, CharStream, Expression<{}>>(Prims.ws())(Prims.ws())(ExpressionParser);
        let p1 = Prims.seq<CharStream, CharStream, CharStream[]>(Prims.str('repeat'))(Prims.char('('))(x => x);
        let n = Prims.between<CharStream[], CharStream, Expression<any>>(p1)(Prims.char(')'))(expr);
        let curly = Prims.between<CharStream, CharStream, CharStream>(Prims.ws())(Prims.ws())(Prims.char('{'));
        let body = Prims.between<CharStream, CharStream, Expression<any>>(curly)(Prims.char('}'))(bodyParse);
        return Prims.seq<Expression<any>, Expression<any>, Expression<any>[]>(n)(body)(x => x);
    }

    /**
     * loopParse parses possible loop statements, is a helper for RepeatLoop
     * returns a RepeatNode
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let loopParse: Prims.IParser<RepeatNode> = i => {
        var f = (tup: Expression<any>[]) => {
            if (tup.length == 2) {
                return new RepeatNode(tup[0], tup[1]);
            }
        }
        return Prims.appfun<Expression<any>[], RepeatNode>(RepeatLoop())(f)(i);
    }

    /**
     * WhileLoop parses valid while loops in the form "while(condition) { body;}"
     * returns a WhileNode for the AST
     */
    export let WhileLoop: Prims.IParser<WhileNode> = i => {
        let expr = Prims.between<CharStream, CharStream, Expression<{}>>(Prims.ws())(Prims.ws())(ExpressionParserNoSeq);
        let bodyParse = Prims.between<CharStream, CharStream, Expression<{}>>(Prims.ws())(Prims.ws())(ExpressionParser);
        let ws = "";
        let precedingWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let p1 = Prims.seq<CharStream, CharStream, CharStream[]>(Prims.right<string, CharStream>(precedingWS)(Prims.str("while")))(Prims.char('('))(x => x);
        let cond = Prims.between<CharStream[], CharStream, Expression<any>>(p1)(Prims.char(')'))(expr);
        let curly = Prims.between<CharStream, CharStream, CharStream>(Prims.ws())(Prims.ws())(Prims.char('{'));
        let body = Prims.between<CharStream, CharStream, Expression<any>>(curly)(Prims.char('}'))(bodyParse);
        var f = (tup: [Expression<any>, Expression<any>]) => { return new WhileNode(tup[0], tup[1], ws); }
        return Prims.seq<Expression<any>, Expression<any>, WhileNode>(cond)(body)(f)(i);
    }

    /**
     * ForLoop parses valid for loops in the form "for(initial, condition, post) { body;}" and returns a ForNode
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let ForLoop: Prims.IParser<ForNode> = i => {
        let args = Prims.between<CharStream, CharStream, Expression<any>[]>(Prims.ws())(Prims.ws())(funAppArgList());
        let ws = "";
        let precedingWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let p1 = Prims.right<CharStream, Expression<any>[]>(Prims.right<string, CharStream>(precedingWS)(Prims.str('for')))(args);
        let curly = Prims.between<CharStream, CharStream, CharStream>(Prims.ws())(Prims.ws())(Prims.char('{'));
        let expr = Prims.between<CharStream, CharStream, Expression<any>>(Prims.choice(Prims.ws())(Prims.nl()))(Prims.ws())(ExpressionParser);
        let body = Prims.between<CharStream, CharStream, Expression<any>>(curly)(Prims.char('}'))(expr);
        var f = (tup: [Expression<any>[], Expression<any>]) => {
            let init = tup[0][0];
            let cond = tup[0][1];
            let post = tup[0][2];
            let body = tup[1];
            return new ForNode(init, cond, post, body, ws);
        }
        return Prims.seq<Expression<any>[], Expression<any>, ForNode>(p1)(body)(f)(i);
    }

    export function singleComment(): Prims.IParser<CharStream> {
        let p1 = Prims.many1<CharStream>(Prims.item())
        let p2 = Prims.appfun<CharStream[], CharStream>(p1)(xs => CharStream.concat(xs));
        return Prims.between<CharStream, CharStream, CharStream>(Prims.str('//'))(Prims.nl())(p2);
        //return Prims.seq<CharStream, CharStream, CharStream[]>(Prims.str('//'))(Prims.nl())(x=>x);
    }

    export function multiLineComment() {
        let p1 = Prims.many1<CharStream>(Prims.item())
        let p2 = Prims.appfun<CharStream[], CharStream>(p1)(xs => CharStream.concat(xs));
        return Prims.between(Prims.str('\/**'))(Prims.str('*\/'))(p2);
    }
}
