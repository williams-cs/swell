import { Primitives, CharUtil } from 'pants';
import Prims = Primitives;
import CharStream = CharUtil.CharStream;
import {
    Expression, SequenceNode, PrintNode, ListNode,
    NumberNode, StringNode, BooleanNode,
    UnaryOp, Increment, NOP, Decrement, NegOp, Not, Parens, 
    BinaryOp, PlusOp, MulOp, DivOp, MinusOp,
    Equals, And, GreaterThan, LessThan, GreaterThanEq, LessThanEq, Or, NotEqual,
    VariableNode, DeclareOp, AssignOp, Argument,
    Return, FunDef, FunApp, Conditional, RepeatNode, BodyNode, ParensNode,
    EllipseNode, RectangleNode, EmojiNode, LineNode,
    RGBColorNode
} from '../../index';
import { Option, Some, None, tuple } from 'space-lift';

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

    export function float(): Prims.IParser<number> {
        return (istream: CharStream) => {
            let beforeDec: Prims.IParser<number> = Prims.left<number, CharStream>(number())(Prims.str('.'));
            let f = (tup: [number, number]) => {
                return parseFloat(tup[0] + "." + tup[1]);
            }
            return Prims.seq<number, number, number>(beforeDec)(number())(f)(istream);
        }
    }

    /**
     * to be moved to Pants
     * string is an arbitrary string parser that repeatedly applies the letter primitive
     * returns a CharStream representing the entire parsed string
     */
    export function string(): Prims.IParser<CharStream> {
        let p: Prims.IParser<CharStream[]> = Prims.many1(Prims.letter());
        let f = (xs: CharStream[]) => CharStream.concat(xs)
        return Prims.appfun<CharStream[], CharStream>(p)(f);
    }

    // String and digits
    export function stringAndDigit(): Prims.IParser<CharStream> {
        let p: Prims.IParser<CharStream[]> = Prims.many1(Prims.choice(Prims.letter())(Prims.digit()));
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

    // Choose from between a lot of choices. Start from the first element.
    // Maybe move to Pants?
    export function choices<T>(...expressions: Prims.IParser<T>[]): Prims.IParser<T> {
        if (expressions.length == 0) {
            throw("Error: choices must have a non-empty array.");
        }
        if (expressions.length == 1) {
            return expressions[0];
        }
        return Prims.choice<T>(expressions[0])(choices<T>(...expressions.slice(1)));
    }

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
     */
    export let ExpressionParser: Prims.IParser<Expression<any>> = i => {
        let f = (tup: [Expression<any>, Expression<any>]) => {
            return new SequenceNode(tup[0], tup[1]);
        }
        let p =
            Prims.seq<Expression<any>, Expression<any>, SequenceNode>(
                ExpressionParserNoSeq
            )(
                Prims.right<CharStream, Expression<any>>(
                    Prims.char('\n')
                )(
                    Prims.choice<Expression<any>>(
                        ExpressionParser
                    )(
                        Prims.appfun<CharStream, Expression<any>>(Prims.ws())(_ => new NOP())
                    )
                )
            )(f);
        return p(i);
    }

    /**
     * Searches through all possible expressions except for sequences
     * used to avoid infinite looping in upper level parse
     */
    export let ExpressionParserNoSeq: Prims.IParser<Expression<{}>> = i => {
        return choices<Expression<any>>(
            loopParse, funDef, conditionalParse, returnParser, funApp,
            ListHead, binOpExpr(), Declare(), unOpsExpr, parens,
            notExpr, boolParse(), varNameParse(), lNumber(), lstring2(),
        )(i);
    }


    /**
     * lNumber is used to wrap parsed numbers in NumberNodes for the AST
     */
    export function lNumber(): Prims.IParser<Expression<{}>> {
        return (istream: CharStream) => {
            let lws = "";
            let preWS = Prims.appfun(Prims.ws())(x => lws = x.toString());
            let o = Prims.right(preWS)(choices<number>(float(), number()))(istream);
            switch (o.tag) {
                case "success":
                    return new Prims.Success(o.inputstream, new NumberNode((<number> o.result), lws));
                case "failure":
                    return o;
            }
        }
    }

    /**
     * lstring parses valid strings in the SWELL language
     * a valid string is surrounded by quotations and consists of letters, numbers, punctuation, and/or whitespace
     */
    export function lstring() {
        let p1 = choices<CharStream>(Prims.letter(), Prims.ws1(), Prims.digit());
        let p: Prims.IParser<CharStream[]> = Prims.between<CharStream, CharStream, CharStream[]>(
            Prims.str("\"")
        )(
            Prims.str("\"")
        )(
            Prims.many<CharStream>(Prims.choice(p1)(punctuation())));
        let f = (xs: CharStream[]) => CharStream.concat(xs)
        return Prims.appfun<CharStream[], CharStream>(p)(f);
    }

    /**
     * lstring2 wraps strings parsed by lstring in StringNode objects and returns them
     */
    export function lstring2() {
        return (istream: CharStream) => {
            let lws = "";
            let preWS = Prims.appfun(Prims.ws())(x => lws = x.toString());
            let o = Prims.right(preWS)(lstring())(istream);
            switch (o.tag) {
                case "success":
                    return new Prims.Success(o.inputstream, new StringNode(o.result.toString(), lws));
                case "failure":
                    return o;
            }
        }
    }

    /**
     * boolParse parses valid booleans, true and false, and returns a BooleanNode
     */
    export function boolParse(): Prims.IParser<BooleanNode> {
        let lws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.ws())(x => lws = x.toString());
        let trueNode = Prims.appfun<CharStream, BooleanNode>(
            Prims.right<string, CharStream>(preWS)(Prims.str('true'))
        )(
            _ => new BooleanNode(true, lws)
        );
        let falseNode = Prims.appfun<CharStream, BooleanNode>(
            Prims.right<string, CharStream>(preWS)(Prims.str('false'))
        )(
            _ => new BooleanNode(false, lws)
        );
        return Prims.choice<BooleanNode>(trueNode)(falseNode);
    }

    const binOpPrecedenceMap: Map<string, number> = new Map([
        ["=", 0],
        ["||", 1],
        ["&&", 2],
        ["==", 3], ["!=", 3],
        ["<", 4], ["<=", 4], [">", 4], [">=", 4],
        ["+", 5], ["-", 5],
        ["*", 6], ["/", 6],
    ]);

    function binOpChar(includePureLogic: boolean = true): Prims.IParser<CharStream> {
        let logicChar = [">", "<"];
        let logicChar2 = [">=", "<=", "==", "!="];
        let mathChar = ["+", "-", "/", "=", "*"];
        if (includePureLogic) {
            logicChar.push("&&", "||");
        }
        return choices<CharStream>(Prims.strSat(logicChar2), Prims.strSat(logicChar), Prims.strSat(mathChar));
    }

    function isOpRightAssoc(op: string): boolean {
        return op == "=";
    }

    export function binOpExpr(includePureLogic: boolean = true): Prims.IParser<Expression<any>> {
        return i => {
            let singleTokenParser = choices<Expression<any>>(
                notExpr, parens, unOpsExpr, boolParse(), varNameParse(), lNumber(), lstring2()
            );
            let ws: string[] = [];
            let preWS = Prims.appfun<CharStream, void>(Prims.ws())(x => {
                ws.push(x.toString());
            });
            let remainingTokensParser = Prims.many1<[CharStream, Expression<any>]>(
                Prims.seq<CharStream, Expression<any>, [CharStream, Expression<any>]>(
                    Prims.right<void, CharStream>(preWS)(binOpChar(includePureLogic))
                )(
                    singleTokenParser
                )(
                    (tup: [CharStream, Expression<any>]) => tup
                )
            );

            let buildBinOp = function(lhs: Expression<any>, tokens: Array<[CharStream, Expression<any>]>, min_precedence: number, ws: string[]) {
                if (tokens.length == 0) {
                    return lhs;
                }
                let currentOp: string;
                let curOpPrecedence: number;
                let curWS: string = "";
                while (tokens.length > 0 && min_precedence <= (curOpPrecedence = binOpPrecedenceMap.get(currentOp = tokens[0][0].toString()))) {
                    let next_min_precedence = isOpRightAssoc(currentOp) ? curOpPrecedence : curOpPrecedence + 1;
                    curWS = ws.shift();
                    let rhs: Expression<any> = buildBinOp(tokens.shift()[1], tokens, next_min_precedence, ws);
                    lhs = createBinOp(currentOp, lhs, rhs, curWS);
                }
                return lhs;
            }

            return Prims.seq<
                Expression<any>, Array<[CharStream, Expression<any>]>, Expression<any>
            >(singleTokenParser)(remainingTokensParser)(
                (tup: [Expression<any>, Array<[CharStream, Expression<any>]>]) => buildBinOp(tup[0], tup[1], 0, ws)
            )(i);
        }
    }

    function createBinOp(op: string, lhs: Expression<any>, rhs: Expression<any>, ws: string): Expression<any> {
        switch (op) {
            case "=":
                return new AssignOp(lhs, rhs, ws);
            case "||":
                return new Or(lhs, rhs, ws);
            case "&&":
                return new And(lhs, rhs, ws);
            case "==":
                return new Equals(lhs, rhs, ws);
            case "!=":
                return new NotEqual(lhs, rhs, ws);
            case ">":
                return new GreaterThan(lhs, rhs, ws);
            case "<":
                return new LessThan(lhs, rhs, ws);
            case ">=":
                return new GreaterThanEq(lhs, rhs, ws);
            case "<=":
                return new LessThanEq(lhs, rhs, ws);
            case "+":
                return new PlusOp(lhs, rhs, ws);
            case "-":
                return new MinusOp(lhs, rhs, ws);
            case "*":
                return new MulOp(lhs, rhs, ws);
            case "/":
                return new DivOp(lhs, rhs, ws);
            default:
                throw new Error("Binary Operation not supported");
        }
    }

    /**
     * unOpsExpr wraps a unary operation expression in the corresponding
     * AST node and returns it
     */
    export let unOpsExpr: Prims.IParser<UnaryOp<any>> = i => {
        let operand: Prims.IParser<Expression<any>> = choices<Expression<any>>(
            parens, varNameParse(), lNumber()
        );
        let ws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let prefixOp: Prims.IParser<CharStream> = Prims.right<string, CharStream>(preWS)(Prims.strSat(["-"]));
        let createPrefixOp = function(tup: [CharStream, Expression<any>]): UnaryOp<any> {
            let op: string = tup[0].toString();
            let expr: Expression<any> = tup[1];
            switch (op) {
                case "-":
                    return new NegOp(expr, ws);
                default:
                    throw new Error(`Unary operator ${op} is not supported.`);
            }
        }

        let postfixOp: Prims.IParser<CharStream> = Prims.right<string, CharStream>(preWS)(Prims.strSat(["++", "--"]));
        let createPostfixOp = function(tup: [Expression<any>, CharStream]): UnaryOp<any> {
            let op: string = tup[1].toString();
            let expr: Expression<any> = tup[0];
            switch (op) {
                case "++":
                    return new Increment(expr, ws);
                case "--":
                    return new Decrement(expr, ws);
                default:
                    throw new Error(`Postfix operator ${op} is not supported.`);
            }
        }

        return Prims.choice<UnaryOp<any>>(
            Prims.seq<CharStream, Expression<any>, UnaryOp<any>>(prefixOp)(operand)(createPrefixOp)
        )(
            Prims.seq<Expression<any>, CharStream, UnaryOp<any>>(operand)(postfixOp)(createPostfixOp)
        )(i);
    }

    export let parens: Prims.IParser<Parens<Expression<any>>> = i => {
        let lws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.ws())(x => lws = x.toString());
        let open = Prims.right<string, CharStream>(preWS)(Prims.str("("));
        let expr = choices<Expression<any>>(
            binOpExpr(), unOpsExpr, parens, notExpr,
            boolParse(), varNameParse(), lNumber(), lstring2()
        );
        let parentheses = Prims.between<CharStream, CharStream, Expression<any>>(open)(Prims.str(")"))(expr);
        return Prims.appfun<Expression<any>, Parens<Expression<any>>>(
            parentheses
        )(
            x => new Parens<Expression<any>>(x, lws)
        )(i);
    }

    export let notExpr: Prims.IParser<Not> = i => {
        let ws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let notOp: Prims.IParser<CharStream> = Prims.right<string, CharStream>(preWS)(Prims.str("!"));
        let operand: Prims.IParser<Expression<any>> = choices<Expression<any>>(
            notExpr, binOpExpr(false), parens, boolParse(), varNameParse(), lNumber(), lstring2()
        );
        let createNotOp = (tup: [CharStream, Expression<any>]) => new Not(tup[1], ws);
        return Prims.seq<CharStream, Expression<any>, Not>(notOp)(operand)(createNotOp)(i);
    }

    /**
     * varNameParse parses valid variable names
     * variable names in SWELL begin with a letter and are followed
     * by letters or digits
     */
    export function varNameParse(): Prims.IParser<VariableNode> {
        let ws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let firstChar = Prims.right<string, CharStream>(preWS)(Prims.letter());
        let nextChars = Prims.many(Prims.choice(Prims.digit())(Prims.letter()));
        let f = (tup: [CharStream, CharStream[]]) => {
            return new VariableNode(tup[0].toString() + CharStream.concat(tup[1]).toString(), ws);
        }
        return Prims.seq<CharStream, CharStream[], VariableNode>(firstChar)(nextChars)(f);
    }

    /**
     * Declare parses variable declarations in the form "var x = 2"
     * and returns a DeclareOp node
     */
    export function Declare(): Prims.IParser<DeclareOp<any>> {
        let ws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.left(Prims.ws())(Prims.char('=')))(x => ws = x.toString());
        let p = Prims.left<VariableNode, string>(varNameParse())(preWS);
        return Prims.seq<VariableNode, Expression<any>, DeclareOp<any>>(p)(ExpressionParserNoSeq)(tup => { return new DeclareOp(tup[0], tup[1], ws) })
    }

    /**
     * ListHead parses all lists in the SWELL language, including empty lists
     * Lists are surrounded by square brackets and each element is separated by a comma
     * returns a listNode object
     */
    export let ListHead: Prims.IParser<ListNode> = i => {
        let ws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let p1 = Prims.right<CharStream, Expression<any>>(Prims.right<string, CharStream>(preWS)(Prims.char('[')))(ExpressionParserNoSeq);
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
        let p3 = Prims.appfun(Prims.right<string, CharStream>(preWS)(Prims.str('[]')))(_ => new ListNode([], ws));
        return Prims.choice<any>(p3)(p2)(i);
    }

    /**
     * List Tail parses second through last elements of a list, each separated by a comma
     * returns an array of Expressions that will be accessed by ListHead
     */
    export function ListTail(): Prims.IParser<Expression<any>[]> {
        let p1 = Prims.right<CharStream, Expression<any>>(Prims.char(','))(ExpressionParserNoSeq);
        let p2 = Prims.left(Prims.many<Expression<any>>(p1))(Prims.char(']'));
        return p2;
    }

     /**
     * ParensNodeParse parses valid argument/conditional parens usage and wraps in a ParensNode
     */
    export let ParensNodeExpr: Prims.IParser<ParensNode<any>> = i =>{
        let ws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let content = Prims.right<string, Expression<any>>(preWS)(Prims.between<CharStream, CharStream, Expression<any>>(Prims.char('('))(Prims.char(')'))(ExpressionParser));
        let f = (e: Expression<any>) => {
            return new ParensNode(e, ws);
        }
        return Prims.appfun<Expression<any>, ParensNode<any>>(content)(f)(i);
    }

    /**
     * Body parses the body of a function, if, or repeat statement, aka expressions between {}
     */
    export let bodyParser: Prims.IParser<BodyNode>  = i => {
        let ws1 = "";
        let ws2 = "";
        let preWS1 = Prims.appfun<CharStream, string>(Prims.left(Prims.ws())(Prims.char('{')))(x => ws1 = x.toString());
        let preWS2 = Prims.appfun<CharStream, string>(Prims.left(Prims.ws())(Prims.char('}')))(x => ws2 = x.toString());
        let p = Prims.between<string, string, Expression<any>>(preWS1)(preWS2)(ExpressionParser);
        var f = (e: Expression<any>) => { return new BodyNode(e, ws1, ws2); }
        return Prims.appfun<Expression<any>, BodyNode>(p)(f)(i);
    }

    /**
     * funDefArg parses and wraps a single argument from fun def in an Argument node
     * helper for funDefArgList
     */
    export let funDefArg: Prims.IParser<Argument<VariableNode>> = i => {
        let ws = "";
        let postWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let p = Prims.left<VariableNode, string>(varNameParse())(postWS);
        var f = (e: VariableNode) => { return new Argument<VariableNode>(e, true, false, ws); }
        return Prims.appfun<VariableNode, Argument<VariableNode>>(p)(f)(i);
    }

    /**
     * Parses a list of arguments in function declaration and wraps in a ParensNode of Arguments
     */
    export let funDefArgList: Prims.IParser<ParensNode<Argument<VariableNode>[]>> = i => {
        let ws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.left<CharStream, CharStream>(Prims.ws())(Prims.char('(')))(x => ws = x.toString());
        let p1 = Prims.right<string, Argument<VariableNode>>(preWS)(funDefArg);
        var f = (tup: [Argument<VariableNode>, Argument<VariableNode>[]]) => {
            tup[1].unshift(tup[0]);
            return tup[1];
        }
        let p2 = Prims.right<CharStream, Argument<VariableNode>>(Prims.char(','))(funDefArg);
        let prest = Prims.left(Prims.many<Argument<VariableNode>>(p2))(Prims.char(')'));
        let argList = Prims.seq<Argument<VariableNode>, Argument<VariableNode>[], Argument<VariableNode>[]>(p1)(prest)(f);
        let empty = Prims.appfun(Prims.str('()'))(_ => []);
        let g = (x: []) => {
            return new ParensNode<Argument<VariableNode>[]>(x, ws)
        }
        return Prims.appfun<any, ParensNode<Argument<VariableNode>[]>>(Prims.choice<any>(argList)(empty))(g)(i);
    }

    /*export function funAppArgList(): Prims.IParser<[Array<[string, Expression<any>, string]>, ParensNode<string[]>]> {
        let ws: string = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.left<CharStream, CharStream>(Prims.ws())(Prims.char('(')))(x => ws = x.toString());
        let argWS: string[] = [];
        let pWS = Prims.appfun<CharStream, number>(Prims.ws())(x => argWS.push(x.toString()));
        let noAsn = Prims.appfun<CharStream, CharStream>(Prims.char(""))(x => {argWS.push(x.toString()); return x;}); //potential error
        let argName = Prims.right<number, CharStream>(pWS)(stringAndDigit());
        let assignOp = Prims.right<CharStream, CharStream>(Prims.ws())(Prims.char('='));
        let assignToArg = Prims.left<CharStream, CharStream>(argName)(assignOp);
        let assignment = Prims.choice<CharStream>(assignToArg)(Prims.ws());
        let f = (tup: [CharStream, [Expression<any>, CharStream]]) => {
            let result: [string, Expression<any>, string] = [tup[0].toString(), tup[1][0], tup[1][1].toString()];
            return result;
        };
        let argVal = Prims.seq<Expression<any>, CharStream, [Expression<any>, CharStream]>(ExpressionParserNoSeq)(Prims.ws())(x => x);
        let firstArg = Prims.seq<CharStream, [Expression<any>, CharStream], [string, Expression<any>, string]>(assignment)(argVal)(f);
        let comma = Prims.right<CharStream, CharStream>(Prims.ws())(Prims.char(','));
        let remainingAssignment = Prims.right<CharStream, CharStream>(comma)(assignment);
        let remainingArg = Prims.seq<CharStream, [Expression<any>, CharStream], [string, Expression<any>, string]>(remainingAssignment)(argVal)(f);
        let argTail = Prims.many<[string, Expression<any>, string]>(remainingArg);
        let args = Prims.choice<Array<[string, Expression<any>, string]>>(
            Prims.seq<[string, Expression<any>, string], Array<[string, Expression<any>, string]>, Array<[string, Expression<any>, string]>>(firstArg)(argTail)(
                (tup: [[string, Expression<any>, string], Array<[string, Expression<any>, string]>]) => {
                    tup[1].unshift(tup[0]);
                    return tup[1];
                }
            )
        )(
            Prims.appfun<CharStream, Array<[string, Expression<any>, string]>>(Prims.ws())(_ => [])
        );
        let parensArgs = Prims.right<string, Array<[string, Expression<any>, string]>>(preWS)(args);
        let parens = Prims.appfun<CharStream, ParensNode<string[]>>(Prims.char(')'))(x => new ParensNode(argWS, ws));
        return Prims.seq<Array<[string, Expression<any>, string]>,ParensNode<string[]>, [Array<[string, Expression<any>, string]>, ParensNode<string[]>]>(parensArgs)(parens)(x => x) ;
    }*/

    /*export function funAppArgList1(): Prims.IParser<Array<[string, Expression<any>, string]>> {
        let argName = Prims.right<CharStream, CharStream>(Prims.ws())(stringAndDigit());
        let assignOp = Prims.right<CharStream, CharStream>(Prims.ws())(Prims.char('='));
        let assignToArg = Prims.left<CharStream, CharStream>(argName)(assignOp);
        let assignment = Prims.choice<CharStream>(assignToArg)(Prims.ws());
        let f = (tup: [CharStream, [Expression<any>, CharStream]]) => {
            let result: [string, Expression<any>, string] = [tup[0].toString(), tup[1][0], tup[1][1].toString()];
            return result;
        };
        let argVal = Prims.seq<Expression<any>, CharStream, [Expression<any>, CharStream]>(ExpressionParserNoSeq)(Prims.ws())(x => x);
        let firstArg = Prims.seq<CharStream, [Expression<any>, CharStream], [string, Expression<any>, string]>(assignment)(argVal)(f);
        let comma = Prims.right<CharStream, CharStream>(Prims.ws())(Prims.char(','));
        let remainingAssignment = Prims.right<CharStream, CharStream>(comma)(assignment);
        let remainingArg = Prims.seq<CharStream, [Expression<any>, CharStream], [string, Expression<any>, string]>(remainingAssignment)(argVal)(f);
        let argTail = Prims.many<[string, Expression<any>, string]>(remainingArg);
        let args = Prims.choice<Array<[string, Expression<any>, string]>>(
            Prims.seq<[string, Expression<any>, string], Array<[string, Expression<any>, string]>, Array<[string, Expression<any>, string]>>(firstArg)(argTail)(
                (tup: [[string, Expression<any>, string], Array<[string, Expression<any>, string]>]) => {
                    tup[1].unshift(tup[0]);
                    return tup[1];
                }
            )
        )(
            Prims.appfun<CharStream, Array<[string, Expression<any>, string]>>(Prims.ws())(_ => [])
        );
        let openParen = Prims.right<CharStream, CharStream>(Prims.ws())(Prims.char('('));
        let closeParen = Prims.right<CharStream, CharStream>(Prims.ws())(Prims.char(')'));
        return Prims.between<CharStream, CharStream, Array<[string, Expression<any>, string]>>(openParen)(closeParen)(args);
    }*/

    /**
     * returnParser parses valid return statements in the form "return x"
     * wraps the parsed value in a Return node for the AST
     */
    export let returnParser: Prims.IParser<Return> = i => {
        let expr = Prims.between<CharStream, CharStream, Expression<any>>(Prims.ws())(Prims.ws())(ExpressionParserNoSeq);
        let ws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let p = Prims.right<CharStream, Expression<any>>(Prims.right<string, CharStream>(preWS)(Prims.str('return')))(expr);
        var f = (e: Expression<any>) => { return new Return(e, ws); }
        return Prims.appfun<Expression<any>, Return>(p)(f)(i);

    }

    /**
     * funDef parses valid function definitions in the form "fun functionName(argList){ body;}"
     * the parser returns a funDef node for the AST
     */
    export let funDef: Prims.IParser<FunDef<any>> = i => {
        let ws = "";
        let rws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let postWS = Prims.appfun<CharStream, string>(Prims.ws())(s => rws = s.toString());
        return Prims.right<CharStream, FunDef<any>>(
            Prims.between<string, string, CharStream>(preWS)(postWS)(Prims.str('fun'))
        )(
            Prims.seq<string, [ParensNode<Argument<VariableNode>[]>, BodyNode], FunDef<{}>>(
                /* function name */
                Prims.appfun<CharStream, string>(
                    string()
                )(cs => cs.toString())
            )(
                Prims.seq<ParensNode<Argument<VariableNode>[]>, BodyNode, [ParensNode<Argument<VariableNode>[]>, BodyNode]>(
                    /* function arguments */
                    funDefArgList
                )(
                    /* function body */
                    bodyParser
                )(x => x)
            )(
                // create the AST node
                (tup: [string, [ParensNode<Argument<VariableNode>[]>, BodyNode]]) => {
                    let fname: string = tup[0];
                    let args: ParensNode<Argument<VariableNode>[]> = tup[1][0];
                    let body: BodyNode = tup[1][1];
                    return new FunDef(fname, body, args, ws, rws);
                }
            )
        )(i)
    }


    /** funApp arg list, where the output is a parensnode with contents of an array that stores argument preWS, argName, argValue, and arg postWS 
     * in a four element tuple
      */
    export let funAppArgList: Prims.IParser<ParensNode<Array<[string, string, Expression<any>, string]>>> = i => {
        let parensWS: string = "";
        let pWS = Prims.appfun<CharStream, string>(Prims.left<CharStream, CharStream>(Prims.ws())(Prims.char('(')))(x => parensWS = x.toString());
        let argName = Prims.seq<CharStream, CharStream, [CharStream, CharStream]>(Prims.ws())(stringAndDigit())(x => x);
        let assignOp = Prims.right<CharStream, CharStream>(Prims.ws())(Prims.char('='));
        let assignToArg = Prims.left<[CharStream, CharStream], CharStream>(argName)(assignOp);
        let noAssign = Prims.appfun<CharStream, CharStream[]>(Prims.ws())(x => [x]);
        let assignment = Prims.choice<CharStream []>(assignToArg)(noAssign); 
        let f = (tup: [CharStream[], [Expression<any>, CharStream]]) => {
            let result: [string, string, Expression<any>, string];
            if(tup[0].length == 2){
                result = [tup[0][0].toString(), tup[0][1].toString(), tup[1][0], tup[1][1].toString()];
            }
            else result = [tup[0][0].toString(), "", tup[1][0], tup[1][1].toString()];
            return result;
        };
        let argVal = Prims.seq<Expression<any>, CharStream, [Expression<any>, CharStream]>(ExpressionParserNoSeq)(Prims.ws())(x => x);
        let firstArg = Prims.seq<CharStream[], [Expression<any>, CharStream], [string, string, Expression<any>, string]>(assignment)(argVal)(f);
        let remainingAssignment = Prims.right<CharStream, CharStream[]>(Prims.char(','))(assignment);
        let remainingArg = Prims.seq<CharStream[], [Expression<any>, CharStream], [string, string, Expression<any>, string]>(remainingAssignment)(argVal)(f);
        let argTail = Prims.many<[string, string, Expression<any>, string]>(remainingArg);
        let args = Prims.choice<Array<[string, string, Expression<any>, string]>>(
            Prims.seq<[string, string, Expression<any>, string], Array<[string, string, Expression<any>, string]>, Array<[string, string, Expression<any>, string]>>(firstArg)(argTail)(
                (tup: [[string, string, Expression<any>, string], Array<[string, string, Expression<any>, string]>]) => {
                    tup[1].unshift(tup[0]);
                    return tup[1];
                }
            )
        )(
            Prims.appfun<CharStream, Array<[string, string, Expression<any>, string]>>(Prims.ws())(_ => [])
        );
        let funAppArgList = Prims.between<string, CharStream, Array<[string, string, Expression<any>, string]>>(pWS)(Prims.char(")"))(args);
        return Prims.appfun<Array<[string, string, Expression<any>, string]>, ParensNode<Array<[string, string, Expression<any>, string]>>>(funAppArgList)(x => new ParensNode<Array<[string, string, Expression<any>, string]>>(x, parensWS))(i);
    }
    
    /**
     * funApp parses valid function applications in the form "functionName(argsList)" and returns a funApp node
     * parser checks for built-in functions, like print, ellipse, and rect; and returns the valid AST node
     */
    export let funApp: Prims.IParser<FunApp<any>> = i => {
        let ws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        return Prims.seq<CharStream, ParensNode<Array<[string, string, Expression<any>, string]>>, any>(
            Prims.right<string, CharStream>(preWS)(string())
        )(
            funAppArgList
        )(tup => {
            let fname: string = tup[0].toString();
            let args: ParensNode<Array<[string, string, Expression<any>, string]>> = tup[1];
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
                    throw new Error("Function name not recognized");
            }
        })(i);
    }

    /**
     * conditionalParse is a rewrite of condParse that includes and passes ws
     */
    export let conditionalParse: Prims.IParser<Conditional> = i => {
        var f = (tup: [ParensNode<any>, BodyNode, BodyNode] | [ParensNode<any>, BodyNode]) => {
            if (tup.length == 3) {
                return new Conditional(tup[0], tup[1], iws, ews, tup[2]);
            }
            else {
                return new Conditional(tup[0], tup[1], iws, ews);
            }
        }
        let iws = ""; 
        let preIWS = Prims.appfun<CharStream, string>(Prims.left<CharStream, CharStream>(Prims.ws())(Prims.str('if')))(x => iws = x.toString());
        let pws = "";
        let parensWS = Prims.appfun<CharStream, string>(Prims.right<string, CharStream>(preIWS)(Prims.ws()))(x => pws = x.toString());
        let aws = "";
        let argWS = Prims.appfun<CharStream, string>(Prims.ws())(x => aws = x.toString());
        let argParse = Prims.left<Expression<any>,string>(ExpressionParserNoSeq)(argWS);
        var g = (e: Expression<any>) => { return new ParensNode<Argument<any>>(new Argument<any>(e, true, false, "", aws), pws); }
        let content = Prims.appfun<Expression<any>, ParensNode<any>>(Prims.between<CharStream, CharStream, Expression<any>>(Prims.char('('))(Prims.char(')'))(argParse))(g);
        let cond = Prims.right<string, ParensNode<any>>(parensWS)(content);
        let ifParse = Prims.seq<ParensNode<any>, BodyNode, [ParensNode<any>, BodyNode]>(cond)(bodyParser)(x => x);
        let ews = "";
        let elseWS = Prims.appfun<CharStream, string>(Prims.left<CharStream, CharStream>(Prims.ws())(Prims.str('else')))(x => ews = x.toString());
        var h = (tup: [[ParensNode<any>, BodyNode], BodyNode]) => {
            let e: [ParensNode<any>, BodyNode, BodyNode]= [tup[0][0],tup[0][1], tup[1]];
            return e;
        }
        let elseParse = Prims.seq<[ParensNode<any>, BodyNode], BodyNode, [ParensNode<any>, BodyNode, BodyNode]>(ifParse)(Prims.right<string, BodyNode>(elseWS)(bodyParser))(h);
        let ifElse = Prims.choice<[ParensNode<any>, BodyNode, BodyNode] | [ParensNode<any>, BodyNode]>(elseParse)(ifParse);
        return Prims.appfun<[ParensNode<any>, BodyNode, BodyNode] | [ParensNode<any>, BodyNode], Conditional>(ifElse)(f)(i);
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
     */
    export let loopParse: Prims.IParser<RepeatNode> = i => {
        var f = (tup: Expression<any>[]) => {
            if (tup.length == 2) {
                return new RepeatNode(tup[0], tup[1]);
            }
        }
        return Prims.appfun<Expression<any>[], RepeatNode>(RepeatLoop())(f)(i);
    }


    export function singleComment(): Prims.IParser<CharStream> {
        let p1 = Prims.many1<CharStream>(Prims.item())
        let p2 = Prims.appfun<CharStream[], CharStream>(p1)(xs => CharStream.concat(xs));
        return Prims.between<CharStream, CharStream, CharStream>(Prims.str('//'))(Prims.nl())(p2);
    }

    export function multiLineComment() {
        let p1 = Prims.many1<CharStream>(Prims.item())
        let p2 = Prims.appfun<CharStream[], CharStream>(p1)(xs => CharStream.concat(xs));
        return Prims.between(Prims.str('\/**'))(Prims.str('*\/'))(p2);
    }
}
