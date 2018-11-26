"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pants_1 = require("pants");
const index_1 = require("../../index");
const space_lift_1 = require("space-lift");
var Parser;
(function (Parser) {
    /**
     * to be moved to Pants
     * number parses numbers by repeatedly applying the digit parser
     */
    function number() {
        return (istream) => {
            const o = pants_1.Primitives.many1(pants_1.Primitives.digit())(istream);
            switch (o.tag) {
                case "success":
                    let s = "";
                    for (let digit of o.result) {
                        s += digit.toString();
                    }
                    return new pants_1.Primitives.Success(o.inputstream, parseFloat(s));
                case "failure":
                    return o;
            }
        };
    }
    Parser.number = number;
    /**
     * to be moved to Pants
     * string is an arbitrary string parser that repeatedly applies the letter primitive
     * returns a CharStream representing the entire parsed string
     */
    function string() {
        let p = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(pants_1.Primitives.many1(pants_1.Primitives.letter()));
        let f = (xs) => pants_1.CharUtil.CharStream.concat(xs);
        return pants_1.Primitives.appfun(p)(f);
    }
    Parser.string = string;
    /**
     * to be moved to Pants
     * punctuation parses all possible punctuation characters
     */
    function punctuation() {
        return pants_1.Primitives.sat(x => x == "!"
            || x == "."
            || x == ','
            || x == ";"
            || x == '?'
            || x == "-"
            || x == "&"
            || x == '$'
            || x == ':'
            || x == '/'
            || x == '|'
            || x == '%'
            || x == '#'
            || x == "@"
            || x == "~"
            || x == '`'
            || x == '*'
            || x == '^'
            || x == '{'
            || x == '}'
            || x == "["
            || x == ']'
            || x == '('
            || x == ")"
            || x == "'"
            || x == "_");
    }
    Parser.punctuation = punctuation;
    let id = (x) => x;
    /**
     * parse is a function that wraps the input text in a CharStream
     * and passes it to the upper-level parse function
     * @param program a string representing program text
     */
    function parse(program) {
        program += "\n";
        let o = Parser.ExpressionParser(new pants_1.CharUtil.CharStream(program));
        switch (o.tag) {
            case "success":
                return space_lift_1.Some(o.result);
            case "failure":
                return space_lift_1.None;
        }
    }
    Parser.parse = parse;
    /**
     * Expression parser first searches for the first expression of a sequence and either
     * another expression or the end of the program (NOP) and returns a sequence node
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    Parser.ExpressionParser = i => {
        let f = (tup) => {
            return new index_1.SequenceNode(tup[0], tup[1]);
        };
        let p = pants_1.Primitives.seq(Parser.ExpressionParserNoSeq)(pants_1.Primitives.right(pants_1.Primitives.choice(pants_1.Primitives.char(';'))(pants_1.Primitives.nl()))(pants_1.Primitives.choice(pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(Parser.ExpressionParser))(pants_1.Primitives.appfun(pants_1.Primitives.ws())(_ => new index_1.NOP()))))(f);
        return p(i);
    };
    /**
     * Searches through all possible expressions except for sequences
     * used to avoid infinite looping in upper level parse
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    Parser.ExpressionParserNoSeq = i => {
        let p1 = pants_1.Primitives.choice(lNumber())(lstring2());
        let p2 = pants_1.Primitives.choice(varNameParse())(p1);
        let p3 = pants_1.Primitives.choice(BoolParse())(p2);
        let p4 = pants_1.Primitives.choice(varDecParse())(p3);
        let p5 = pants_1.Primitives.choice(Parser.unOpsExpr)(p4);
        let p6 = pants_1.Primitives.choice(Declare())(p5);
        let p7 = pants_1.Primitives.choice(Parser.binOpExpr)(p6);
        let p8 = pants_1.Primitives.choice(LogicExpr())(p7);
        let p9 = pants_1.Primitives.choice(Parser.ListHead)(p8);
        let p10 = pants_1.Primitives.choice(Parser.funApp)(p9);
        let p11 = pants_1.Primitives.choice(Parser.returnParser)(p10);
        let p12 = pants_1.Primitives.choice(Parser.condParse)(p11);
        let p13 = pants_1.Primitives.choice(Parser.WhileLoop)(p12);
        let p14 = pants_1.Primitives.choice(Parser.ForLoop)(p13);
        let p15 = pants_1.Primitives.choice(Parser.funDef)(p14);
        return p15(i);
    };
    /**
     * Searches through all possible expressions except for binOp expressions
     * used to avoid infinite looping in the binary expression parser
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    Parser.ExpressionParserNoBinOp = i => {
        let p1 = pants_1.Primitives.choice(lNumber())(lstring2());
        let p2 = pants_1.Primitives.choice(varNameParse())(p1);
        let p3 = pants_1.Primitives.choice(BoolParse())(p2);
        let p4 = pants_1.Primitives.choice(varDecParse())(p3);
        let p5 = pants_1.Primitives.choice(Parser.unOpsExpr)(p4);
        let p6 = pants_1.Primitives.choice(Declare())(p5);
        let p7 = pants_1.Primitives.choice(Parser.ListHead)(p6);
        let p8 = pants_1.Primitives.choice(Parser.funApp)(p7);
        let p9 = pants_1.Primitives.choice(Parser.returnParser)(p8);
        let p10 = pants_1.Primitives.choice(Parser.condParse)(p9);
        let p11 = pants_1.Primitives.choice(Parser.WhileLoop)(p10);
        let p12 = pants_1.Primitives.choice(Parser.ForLoop)(p11);
        let p13 = pants_1.Primitives.choice(Parser.funDef)(p12);
        return p13(i);
    };
    /**
     * Searches through all possible expressions except for logical expressions
     * used to avoid infinite looping in the logical expression parser
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    Parser.ExpressionParserNoLogic = i => {
        let p1 = pants_1.Primitives.choice(lNumber())(lstring2());
        let p2 = pants_1.Primitives.choice(varNameParse())(p1);
        let p3 = pants_1.Primitives.choice(BoolParse())(p2);
        let p4 = pants_1.Primitives.choice(varDecParse())(p3);
        let p5 = pants_1.Primitives.choice(Parser.unOpsExpr)(p4);
        let p6 = pants_1.Primitives.choice(Declare())(p5);
        let p7 = pants_1.Primitives.choice(Parser.binOpExpr)(p6);
        let p8 = pants_1.Primitives.choice(Parser.ListHead)(p7);
        let p9 = pants_1.Primitives.choice(Parser.funApp)(p8);
        let p10 = pants_1.Primitives.choice(Parser.returnParser)(p9);
        let p11 = pants_1.Primitives.choice(Parser.condParse)(p10);
        let p12 = pants_1.Primitives.choice(Parser.WhileLoop)(p11);
        let p13 = pants_1.Primitives.choice(Parser.ForLoop)(p12);
        let p14 = pants_1.Primitives.choice(Parser.funDef)(p13);
        return p14(i);
    };
    /**
     * lNumber is used to wrap parsed numbers in NumberNodes for the AST
     */
    function lNumber() {
        return (istream) => {
            let o = number()(istream);
            switch (o.tag) {
                case "success":
                    return new pants_1.Primitives.Success(o.inputstream, new index_1.NumberNode(o.result));
                case "failure":
                    return o;
            }
        };
    }
    Parser.lNumber = lNumber;
    /**
     * binOpsChar parses all possible binary operators, such as + or -
     */
    function binOpsChar() {
        return (istream) => {
            return pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(pants_1.Primitives.sat(x => x == "+"
                || x == "-"
                || x == "/"
                || x == "="
                || x == "*"))(istream);
        };
    }
    Parser.binOpsChar = binOpsChar;
    /**
     * binOpsShort returns a tuple where the first element is the binary operator (CharStream)
     * and the second element is the expression to the right of the operator (Expression<{}>)
     */
    function binOpShort() {
        return pants_1.Primitives.seq(binOpsChar())(Parser.ExpressionParserNoSeq)((x) => x);
    }
    Parser.binOpShort = binOpShort;
    /**
     * binOpExpr parses all possible binary operation expressions and returns the
     * corresponding AST node construct (also parses postfix increments/decrements like i++)
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    Parser.binOpExpr = i => {
        var f = (tup) => {
            let lhs = tup[0];
            let op = tup[1][0];
            let rhs = tup[1][1];
            switch (op.toString()) {
                case "+":
                    return new index_1.PlusOp(lhs, rhs, ws);
                case "-":
                    return new index_1.MinusOp(lhs, rhs, ws);
                case "/":
                    return new index_1.DivOp(lhs, rhs, ws);
                case "*":
                    return new index_1.MulOp(lhs, rhs, ws);
                case "=":
                    return new index_1.AssignOp(lhs, rhs, ws);
                default:
                    throw new Error("Binary Operation not supported");
            }
        };
        let p1 = pants_1.Primitives.choice(Parser.ExpressionParserNoBinOp)(varDecParse());
        let p2 = binOpShort();
        let ws = "";
        let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
        let postPlus = pants_1.Primitives.seq(pants_1.Primitives.right(precedingWS)(Parser.ExpressionParserNoBinOp))(pants_1.Primitives.str('++'))(tup => { return new index_1.Increment(tup[0], ws); });
        let postMinus = pants_1.Primitives.seq(pants_1.Primitives.right(precedingWS)(Parser.ExpressionParserNoBinOp))(pants_1.Primitives.str('--'))(tup => { return new index_1.Decrement(tup[0], ws); });
        let binOp = pants_1.Primitives.seq(pants_1.Primitives.right(precedingWS)(p1))(p2)(f);
        return pants_1.Primitives.choice(binOp)(pants_1.Primitives.choice(postPlus)(postMinus))(i);
    };
    /**
     * unOpsChar parses all possible unary operators
     * Only negations are supported, but more can be added as needed
     * @param i nonsense parameter used to avoid the bug with eager evaluation
     */
    Parser.unOpsChar = i => {
        return pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(pants_1.Primitives.char("-"))(i);
    };
    /**
     * unOpsExpr wraps a unary operation expression in the corresponding
     * AST node and returns it
     * @param i nonsense parameter used to avoid the bug with eager evaluation
     */
    Parser.unOpsExpr = i => {
        var f = (tup) => {
            return new index_1.NegOp(tup[1], ws);
        };
        let ws = "";
        let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
        return pants_1.Primitives.seq(pants_1.Primitives.right(precedingWS)(Parser.unOpsChar))(Parser.ExpressionParserNoSeq)(f)(i);
    };
    /**
     * lstring parses valid strings in the SWELL language
     * a valid string is surrounded by quotations and consists of letters, numbers, punctuation, and/or whitespace
     */
    function lstring() {
        let p1 = pants_1.Primitives.choice(pants_1.Primitives.choice(pants_1.Primitives.letter())(pants_1.Primitives.ws1()))(pants_1.Primitives.digit());
        //let p1 = Primitives.choice(Primitives.letter())(Primitives.ws1());
        let p = pants_1.Primitives.between(pants_1.Primitives.str("\""))(pants_1.Primitives.str("\""))(pants_1.Primitives.many(pants_1.Primitives.choice(p1)(punctuation())));
        let f = (xs) => pants_1.CharUtil.CharStream.concat(xs);
        return pants_1.Primitives.appfun(p)(f);
    }
    Parser.lstring = lstring;
    /**
     * lstring2 wraps strings parsed by lstring in StrinNode objects and returns them
     */
    function lstring2() {
        return (istream) => {
            let ws = "";
            let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
            let o = pants_1.Primitives.right(precedingWS)(lstring())(istream);
            switch (o.tag) {
                case "success":
                    return new pants_1.Primitives.Success(o.inputstream, new index_1.StringNode(o.result.toString(), ws));
                case "failure":
                    return o;
            }
        };
    }
    Parser.lstring2 = lstring2;
    /**
     * varNameParse parses valid variable names
     * variable names in SWELL begin with a lowercase char and are followed
     * by letters or digits
     */
    function varNameParse() {
        var f = (tup) => {
            return new index_1.VariableNode(tup[0].toString() + pants_1.CharUtil.CharStream.concat(tup[1]).toString(), ws);
        };
        let ws = "";
        let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
        let firstChar = pants_1.Primitives.right(precedingWS)(pants_1.Primitives.lower());
        let nextChars = pants_1.Primitives.many(pants_1.Primitives.choice(pants_1.Primitives.digit())(pants_1.Primitives.letter()));
        return pants_1.Primitives.seq(firstChar)(nextChars)(f);
    }
    Parser.varNameParse = varNameParse;
    /**
     * varDecParse parses valid variable declarations in the form "var x"
     * the parser then wraps the parsed value in a variable node for the AST
     */
    function varDecParse() {
        let ws = "";
        let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
        let p1 = pants_1.Primitives.right(precedingWS)(pants_1.Primitives.str("var"));
        let varName = pants_1.Primitives.between(pants_1.Primitives.ws1())(pants_1.Primitives.ws())(varNameParse());
        let p = pants_1.Primitives.seq(p1)(varName)(tup => tup[1]);
        return p;
    }
    Parser.varDecParse = varDecParse;
    /**
     * Declare parses variable declarations in the form "var x = 2"
     * and returns a DeclareOp node
     */
    function Declare() {
        let eq = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(pants_1.Primitives.char('='));
        let p1 = pants_1.Primitives.left(varDecParse())(eq);
        return pants_1.Primitives.seq(p1)(Parser.ExpressionParserNoSeq)(tup => { return new index_1.DeclareOp(tup[0], tup[1]); });
    }
    Parser.Declare = Declare;
    /**
     * ListHead parses all lists in the SWELL language, including empty lists
     * Lists are surrounded by square brackets and each element is separated by a comma
     * returns a listNode object
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    Parser.ListHead = i => {
        let ws = "";
        let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
        let p0 = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(Parser.ExpressionParserNoSeq);
        let p1 = pants_1.Primitives.right(pants_1.Primitives.right(precedingWS)(pants_1.Primitives.char('[')))(p0);
        var f = (tup) => {
            let hd = tup[0];
            let res = [hd];
            let tail = tup[1];
            for (let elem of tail) {
                res.push(elem);
            }
            return new index_1.ListNode(res, ws);
        };
        let p2 = pants_1.Primitives.seq(p1)(ListTail())(f);
        let p3 = pants_1.Primitives.appfun(pants_1.Primitives.right(precedingWS)(pants_1.Primitives.str('[]')))(_ => new index_1.ListNode([], ws));
        return pants_1.Primitives.choice(p3)(p2)(i);
    };
    /**
     * List Tail parses second through last elements of a list, each separated by a comma
     * returns an array of Expressions that will be accessed by ListHead
     */
    function ListTail() {
        let p0 = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(Parser.ExpressionParserNoSeq);
        let p1 = pants_1.Primitives.right(pants_1.Primitives.char(','))(p0);
        let p2 = pants_1.Primitives.left(pants_1.Primitives.many(p1))(pants_1.Primitives.char(']'));
        return p2;
    }
    Parser.ListTail = ListTail;
    /**
     * funDefArgList parses argument lists for function definitions,
     * surrounded by parens and separated by commas
     * returns an array of the parameters
     */
    function funDefArgList() {
        let p1 = pants_1.Primitives.right(pants_1.Primitives.char('('))(string());
        var f = (tup) => {
            let hd = tup[0].toString();
            let res = [hd];
            let tail = tup[1];
            for (let elem of tail) {
                res.push(elem.toString());
            }
            return res;
        };
        let p2 = pants_1.Primitives.seq(p1)(funDefArgListTail())(f);
        let p3 = pants_1.Primitives.appfun(pants_1.Primitives.str('()'))(_ => []);
        return pants_1.Primitives.choice(p3)(p2);
    }
    Parser.funDefArgList = funDefArgList;
    /**
     * funDefArgListTail parses the second through last elements of a function definition parameter list
     * parameters are separated by commas and end with a closing parens
     * returns an array of parameters, which is accessed by funDefArgList
     */
    function funDefArgListTail() {
        let p1 = pants_1.Primitives.right(pants_1.Primitives.char(','))(string());
        let p2 = pants_1.Primitives.left(pants_1.Primitives.many(p1))(pants_1.Primitives.char(')'));
        return p2;
    }
    /**
     * funAppArgList parses argument lists for function applications, including empty args lists
     * the parser returns an array of Expression objects that represent the arguments
     */
    function funAppArgList() {
        let expr = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(Parser.ExpressionParserNoSeq);
        let p1 = pants_1.Primitives.right(pants_1.Primitives.char('('))(expr);
        var f = (tup) => {
            let hd = tup[0];
            let res = [hd];
            let tail = tup[1];
            for (let elem of tail) {
                res.push(elem);
            }
            return res;
        };
        let p2 = pants_1.Primitives.seq(p1)(funAppArgListTail())(f);
        let p3 = pants_1.Primitives.appfun(pants_1.Primitives.str('()'))(_ => []);
        return pants_1.Primitives.choice(p3)(p2);
    }
    Parser.funAppArgList = funAppArgList;
    /**
     * funAppArgListTail parses the second through last elements of an argument list
     * each element is separated by a comma
     * returns an array of Expression objects, later accessed by funAppArgsList
     */
    function funAppArgListTail() {
        let comma = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(pants_1.Primitives.char(','));
        let p1 = pants_1.Primitives.right(comma)(Parser.ExpressionParserNoSeq);
        let p2 = pants_1.Primitives.left(pants_1.Primitives.many(p1))(pants_1.Primitives.right(pants_1.Primitives.ws())(pants_1.Primitives.char(')')));
        return p2;
    }
    /**
     * returnParser parses valid return statements in the form "return x"
     * wraps the parsed value in a Return node for the AST
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    Parser.returnParser = i => {
        let expr = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(Parser.ExpressionParserNoSeq);
        let ws = "";
        let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
        let p = pants_1.Primitives.right(pants_1.Primitives.right(precedingWS)(pants_1.Primitives.str('return')))(expr);
        var f = (e) => { return new index_1.Return(e, ws); };
        return pants_1.Primitives.appfun(p)(f)(i);
    };
    /**
     * funDef parses valid function definitions in the form "fun functionName(argList){ body;}"
     * the parser returns a funDef node for the AST
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    Parser.funDef = i => {
        let ws = "";
        let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
        return pants_1.Primitives.right(pants_1.Primitives.right(precedingWS)(pants_1.Primitives.str('fun')))(pants_1.Primitives.seq(
        /* function name */
        pants_1.Primitives.appfun(string())(cs => cs.toString()))(pants_1.Primitives.seq(
        /* function arguments */
        funDefArgList())(pants_1.Primitives.right(
        /* function body */
        pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(pants_1.Primitives.char('{')))(pants_1.Primitives.left(pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(Parser.ExpressionParser))(pants_1.Primitives.char('}'))))(id))(
        // create the AST node
        (tup) => {
            let fname = tup[0];
            let args = tup[1][0];
            let body = tup[1][1];
            return new index_1.FunDef(fname, body, args, ws);
        }))(i);
    };
    let printOffset = -1;
    /**
     * funApp parses valid function applications in the form "functionName(argsList)" and returns a funApp node
     * parser checks for built-in functions, like print, ellipse, and rect; and returns the valid AST node
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    Parser.funApp = i => {
        let ws = "";
        let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
        return pants_1.Primitives.seq(pants_1.Primitives.right(precedingWS)(string()))(funAppArgList())(tup => {
            let fname = tup[0].toString();
            switch (fname) {
                case "print":
                    if (tup[1].length == 3) {
                        return new index_1.PrintNode(tup[1][0], new index_1.Dimensions(tup[1][1], tup[1][2], new index_1.NumberNode(1)), ws);
                    }
                    printOffset = (printOffset + 1) % 12;
                    return new index_1.PrintNode(tup[1][0], new index_1.Dimensions(new index_1.NumberNode(100 + 100 * (printOffset % 3)), new index_1.NumberNode(100 + 100 * (printOffset / 4)), new index_1.NumberNode(1)), ws);
                case "ellipse":
                    if (tup[1].length == 2) {
                        return new index_1.EllipseNode(tup[1][0], tup[1][1], ws);
                    }
                case "rect":
                    if (tup[1].length == 2) {
                        return new index_1.RectangleNode(tup[1][0], tup[1][1], ws);
                    }
                case "line":
                    if (tup[1].length == 2) {
                        return new index_1.LineNode(tup[1][0], tup[1][1], ws);
                    }
                case "curve":
                    if (tup[1].length == 3) {
                        return new index_1.CurveNode(tup[1][0], tup[1][1], tup[1][2], ws);
                    }
                case "eph":
                    if (tup[1].length == 2) {
                        return new index_1.EphNode(tup[1][0], tup[1][1], ws);
                    }
            }
            let args = tup[1];
            return new index_1.FunApp(fname, args, ws);
        })(i);
    };
    /**
     * BoolParse parses valid booleans, true and false, and returns a BooleanNode
     */
    function BoolParse() {
        let ws = "";
        let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
        let p1 = pants_1.Primitives.appfun(pants_1.Primitives.right(precedingWS)(pants_1.Primitives.str('true')))(_ => new index_1.BooleanNode(true, ws));
        let p2 = pants_1.Primitives.appfun(pants_1.Primitives.right(precedingWS)(pants_1.Primitives.str('false')))(_ => new index_1.BooleanNode(false, ws));
        return pants_1.Primitives.choice(p1)(p2);
    }
    Parser.BoolParse = BoolParse;
    /**
     * logicChar parses all logical operators in the SWELL language and returns the consumed operator
     */
    function logicChar() {
        var logicChar = ["equals", '==', 'and', '>', '<', 'not equals', 'or'];
        var logicChar2 = ['>=', '<='];
        let p1 = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(pants_1.Primitives.strSat(logicChar));
        let p2 = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(pants_1.Primitives.strSat(logicChar2));
        return pants_1.Primitives.choice(p2)(p1);
    }
    Parser.logicChar = logicChar;
    /**
     * logicShort returns a tuple, where the first element represents the logical operator and
     * the second element is the expression to the right of the operator
     */
    function logicShort() {
        return pants_1.Primitives.seq(logicChar())(Parser.ExpressionParserNoSeq)((x) => x);
    }
    Parser.logicShort = logicShort;
    /**
     * logicExpr parses logical expressions and returns the corresponding AST node
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    function LogicExpr() {
        // TODO: Dan (2018-11-19), shouldn't parameterized type be BooleanNode?
        var f = (tup) => {
            let lhs = tup[0];
            let op = tup[1][0];
            let rhs = tup[1][1];
            switch (op.toString()) {
                case "equals":
                    return new index_1.Equals(lhs, rhs, ws);
                case "==":
                    return new index_1.Equals(lhs, rhs, ws);
                case "and":
                    return new index_1.And(lhs, rhs, ws);
                case ">":
                    return new index_1.GreaterThan(lhs, rhs, ws);
                case "<":
                    return new index_1.LessThan(lhs, rhs, ws);
                case ">=":
                    return new index_1.GreaterThanEq(lhs, rhs, ws);
                case "<=":
                    return new index_1.LessThanEq(lhs, rhs, ws);
                case "or":
                    return new index_1.Or(lhs, rhs, ws);
                case "not equals":
                    return new index_1.NotEqual(lhs, rhs, ws);
                default:
                    throw new Error("Logical expression not supported");
            }
        };
        let ws = "";
        let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
        let not = pants_1.Primitives.right(precedingWS)(pants_1.Primitives.str('not'));
        let p1 = pants_1.Primitives.right(not)(Parser.ExpressionParserNoSeq);
        let notExpr = pants_1.Primitives.appfun(p1)(x => new index_1.Not(x, ws));
        let logicExpr = pants_1.Primitives.seq(pants_1.Primitives.right(precedingWS)(Parser.ExpressionParserNoLogic))(logicShort())(f);
        return pants_1.Primitives.choice(notExpr)(logicExpr);
    }
    Parser.LogicExpr = LogicExpr;
    /**
     * IfParse parses valid if statements in the form "if(condition){ body; }"
     * returns an array where the first elem is the condition and the second is the body
     */
    function IfParse() {
        let expr = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(Parser.ExpressionParserNoSeq);
        let bodyParse = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(Parser.ExpressionParser);
        let p1 = pants_1.Primitives.seq(pants_1.Primitives.str('if'))(pants_1.Primitives.char('('))(x => x);
        let cond = pants_1.Primitives.between(p1)(pants_1.Primitives.char(')'))(expr);
        let curly = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(pants_1.Primitives.char('{'));
        let body = pants_1.Primitives.between(curly)(pants_1.Primitives.char('}'))(bodyParse);
        return pants_1.Primitives.seq(cond)(body)(x => x);
    }
    Parser.IfParse = IfParse;
    /**
      * IfElseParse parses valid if else statements in the form "if(condition){ body; } else{ body2;}"
      * returns an array where the first elem is the condition and the second is the first body and the third is body2
      */
    function IfElseParse() {
        let e = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(pants_1.Primitives.str('else'));
        let body = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(Parser.ExpressionParser);
        let body2 = pants_1.Primitives.between(pants_1.Primitives.str('{'))(pants_1.Primitives.str('}'))(body);
        let elseParse = pants_1.Primitives.right(e)(body2);
        var f = (tup) => {
            tup[0].push(tup[1]);
            return tup[0];
        };
        return pants_1.Primitives.seq(IfParse())(elseParse)(f);
    }
    Parser.IfElseParse = IfElseParse;
    /**
     * condParse parses possible conditional statements, including if and if/else statements
     * returns a Conditional node
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    Parser.condParse = i => {
        var f = (tup) => {
            if (tup.length == 3) {
                return new index_1.Conditional(tup[0], tup[1], tup[2]);
            }
            else {
                return new index_1.Conditional(tup[0], tup[1]);
            }
        };
        return pants_1.Primitives.appfun(pants_1.Primitives.choice(IfElseParse())(IfParse()))(f)(i);
    };
    /**
     * WhileLoop parses valid while loops in the form "while(condition) { body;}"
     * returns a WhileNode for the AST
     */
    Parser.WhileLoop = i => {
        let expr = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(Parser.ExpressionParserNoSeq);
        let bodyParse = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(Parser.ExpressionParser);
        let ws = "";
        let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
        let p1 = pants_1.Primitives.seq(pants_1.Primitives.right(precedingWS)(pants_1.Primitives.str("while")))(pants_1.Primitives.char('('))(x => x);
        let cond = pants_1.Primitives.between(p1)(pants_1.Primitives.char(')'))(expr);
        let curly = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(pants_1.Primitives.char('{'));
        let body = pants_1.Primitives.between(curly)(pants_1.Primitives.char('}'))(bodyParse);
        var f = (tup) => { return new index_1.WhileNode(tup[0], tup[1], ws); };
        return pants_1.Primitives.seq(cond)(body)(f)(i);
    };
    /**
     * ForLoop parses valid for loops in the form "for(initial, condition, post) { body;}" and returns a ForNode
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    Parser.ForLoop = i => {
        let args = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(funAppArgList());
        let ws = "";
        let precedingWS = pants_1.Primitives.appfun(pants_1.Primitives.ws())(x => ws = x.toString());
        let p1 = pants_1.Primitives.right(pants_1.Primitives.right(precedingWS)(pants_1.Primitives.str('for')))(args);
        let curly = pants_1.Primitives.between(pants_1.Primitives.ws())(pants_1.Primitives.ws())(pants_1.Primitives.char('{'));
        let expr = pants_1.Primitives.between(pants_1.Primitives.choice(pants_1.Primitives.ws())(pants_1.Primitives.nl()))(pants_1.Primitives.ws())(Parser.ExpressionParser);
        let body = pants_1.Primitives.between(curly)(pants_1.Primitives.char('}'))(expr);
        var f = (tup) => {
            let init = tup[0][0];
            let cond = tup[0][1];
            let post = tup[0][2];
            let body = tup[1];
            return new index_1.ForNode(init, cond, post, body, ws);
        };
        return pants_1.Primitives.seq(p1)(body)(f)(i);
    };
    function singleComment() {
        let p1 = pants_1.Primitives.many1(pants_1.Primitives.item());
        let p2 = pants_1.Primitives.appfun(p1)(xs => pants_1.CharUtil.CharStream.concat(xs));
        return pants_1.Primitives.between(pants_1.Primitives.str('//'))(pants_1.Primitives.nl())(p2);
        //return Primitives.seq<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream[]>(Primitives.str('//'))(Primitives.nl())(x=>x);
    }
    Parser.singleComment = singleComment;
    function multiLineComment() {
        let p1 = pants_1.Primitives.many1(pants_1.Primitives.item());
        let p2 = pants_1.Primitives.appfun(p1)(xs => pants_1.CharUtil.CharStream.concat(xs));
        return pants_1.Primitives.between(pants_1.Primitives.str('\/**'))(pants_1.Primitives.str('*\/'))(p2);
    }
    Parser.multiLineComment = multiLineComment;
})(Parser = exports.Parser || (exports.Parser = {}));
//# sourceMappingURL=parser.js.map