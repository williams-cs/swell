import { Primitives, CharUtil } from 'pants';
import Prims = Primitives;
import CharStream = CharUtil.CharStream;
import {
    Expression, SequenceNode, PrintNode, ListNode,
    NumberNode, StringNode, BooleanNode,
    UnaryOp, Increment, NOP, Decrement, NegOp, Not, Parens,
    PlusOp, MulOp, DivOp, MinusOp,
    Equals, And, GreaterThan, LessThan, GreaterThanEq, LessThanEq, Or, NotEqual,
    VariableNode, AssignOp,
    Return, FunDef, UserDefinedFunctionNode, Argument, Conditional, BodyNode,
    EllipseNode, RectangleNode, EmojiNode, LineNode, RGBColorNode
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

    // Valid identifier name parser
    export let identifierParser: Prims.IParser<CharStream> = i => {
        return Prims.seq<CharStream, CharStream[], CharStream>(
            Prims.letter()
        )(
            Prims.many(Prims.choice(Prims.letter())(Prims.digit()))
        )(
            (tup: [CharStream, CharStream[]]) => CharStream.concat([tup[0], CharStream.concat(tup[1])])
        )(i);
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
                        Prims.appfun<string, Expression<any>>(Prims.result<string>(""))(_ => new NOP())
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
        return Prims.choices<Expression<any>>(
            funDef, conditionalParser, returnParser, funApp, ListHead,
            binOpExpr(), unOpsExpr, parens, notExpr,
            boolParse(), varNameParse(), lNumber(), lstring,
        )(i);
    }


    /**
     * lNumber is used to wrap parsed numbers in NumberNodes for the AST
     */
    export function lNumber(): Prims.IParser<Expression<{}>> {
        return (istream: CharStream) => {
            let lws = "";
            let preWS = Prims.appfun(Prims.ws())(x => lws = x.toString());
            let o = Prims.right(preWS)(Prims.choices<number>(float(), number()))(istream);
            switch (o.tag) {
                case "success":
                    return new Prims.Success(o.inputstream, new NumberNode((<number>o.result), lws));
                case "failure":
                    return o;
            }
        }
    }

    /**
     * lstring parses valid strings in the SWELL language
     * a valid string is surrounded by quotations and consists of letters, numbers, punctuation, and/or whitespace
     */
    export let lstring: Prims.IParser<StringNode> = i => {
        let stringParser: Prims.IParser<CharStream[]> = Prims.between<CharStream, CharStream, CharStream[]>(
            Prims.str("\"")
        )(
            Prims.str("\"")
        )(
            Prims.many<CharStream>(
                Prims.choices<CharStream>(Prims.letter(), Prims.ws1(), Prims.digit(), binOpChar(), punctuation())
            )
        );
        return Prims.seq<CharStream, CharStream[], StringNode>(Prims.ws())(stringParser)(
            (tup: [CharStream, CharStream[]]) => {
                return new StringNode(CharStream.concat(tup[1]).toString(), tup[0].toString());
            }
        )(i);
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
        let char = [
            ">", "<", ">=", "<=", "==", "!=",
            "+", "-", "/", "=", "*"
        ];
        if (includePureLogic) {
            char.push("&&", "||");
        }
        return Prims.strSat(char);
    }

    function isOpRightAssoc(op: string): boolean {
        return op == "=";
    }

    export function binOpExpr(includePureLogic: boolean = true): Prims.IParser<Expression<any>> {
        return i => {
            let singleTokenParser = Prims.choices<Expression<any>>(
                notExpr, parens, unOpsExpr, funApp, boolParse(), varNameParse(), lNumber(), lstring
            );
            let ws: string[] = [];
            let preWS = Prims.appfun<CharStream, void>(Prims.ws())(x => {
                ws.push(x.toString());
            });
            let remainingTokensParser = Prims.many1<[CharStream, Expression<any>]>(
                Prims.seq<CharStream, Expression<any>, [CharStream, Expression<any>]>(
                    Prims.right<void, CharStream>(preWS)(binOpChar(includePureLogic))
                )(
                    Prims.expect<Expression<any>>(singleTokenParser)("invalid expression")
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
        let operand: Prims.IParser<Expression<any>> = Prims.choices<Expression<any>>(
            parens, funApp, varNameParse(), lNumber()
        );
        let prefixOperand: Prims.IParser<Expression<any>> = Prims.expect<Expression<any>>(operand)("invalid expression");
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
            Prims.seq<CharStream, Expression<any>, UnaryOp<any>>(prefixOp)(prefixOperand)(createPrefixOp)
        )(
            Prims.seq<Expression<any>, CharStream, UnaryOp<any>>(operand)(postfixOp)(createPostfixOp)
        )(i);
    }

    export let parens: Prims.IParser<Parens<Expression<any>>> = i => {
        let preOpenParenWs = "";
        let preCloseParenWs = "";
        let preOpenParenWsParser = Prims.appfun<CharStream, string>(Prims.ws())(
            x => preOpenParenWs = x.toString()
        );
        let preCloseParenWsParser = Prims.appfun<CharStream, string>(Prims.ws())(
            x => preCloseParenWs = x.toString()
        );

        let openParenParser = Prims.right<string, CharStream>(preOpenParenWsParser)(Prims.str("("));
        let closeParenParser = Prims.right<string, CharStream>(preCloseParenWsParser)(Prims.str(")"));
        let expectCloseParen = Prims.expect(closeParenParser)(") expected");

        let expr = Prims.expect<Expression<any>>(
            Prims.choices<Expression<any>>(
                binOpExpr(), unOpsExpr, parens, notExpr,
                boolParse(), varNameParse(), lNumber(), lstring
            )
        )(
            "invalid expression"
        );

        let parentheses = Prims.between<CharStream, CharStream, Expression<any>>(openParenParser)(expectCloseParen)(expr);
        return Prims.appfun<Expression<any>, Parens<Expression<any>>>(
            parentheses
        )(
            x => new Parens<Expression<any>>(x, preOpenParenWs, preCloseParenWs)
        )(i);
    }

    export let notExpr: Prims.IParser<Not> = i => {
        let ws = "";
        let preWS = Prims.appfun<CharStream, string>(Prims.ws())(x => ws = x.toString());
        let notOp: Prims.IParser<CharStream> = Prims.right<string, CharStream>(preWS)(Prims.str("!"));
        let operand: Prims.IParser<Expression<any>> = Prims.expect<Expression<any>>(
            Prims.choices<Expression<any>>(
                notExpr, binOpExpr(false), parens, boolParse(), varNameParse(), lNumber(), lstring
            )
        )("invalid expression");
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
     * Body parses the body of a function, if, or loops statement, aka expressions between {}
     */
    export let bodyParser: Prims.IParser<BodyNode> = i => {
        let preOpenCurlyWs = "";
        let preCloseCurlyWs = "";
        let preOpenCurlyWsParser = Prims.appfun<CharStream, string>(Prims.ws())(
            x => preOpenCurlyWs = x.toString()
        );
        let preCloseCurlyWsParser = Prims.appfun<CharStream, string>(Prims.ws())(
            x => preCloseCurlyWs = x.toString()
        );

        let openCurlyParser = Prims.right<string, CharStream>(preOpenCurlyWsParser)(Prims.str("{"));
        let closeCurlyParser = Prims.right<string, CharStream>(preCloseCurlyWsParser)(Prims.str("}"));
        let expectCloseCurly = Prims.expect(closeCurlyParser)("} expected");

        let expr = Prims.expect<Expression<any>>(ExpressionParser)("invalid expression");
        let body = Prims.between<CharStream, CharStream, Expression<any>>(openCurlyParser)(expectCloseCurly)(expr);

        return Prims.appfun<Expression<any>, BodyNode>(body)(
            x => new BodyNode(x, preOpenCurlyWs, preCloseCurlyWs)
        )(i);
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
     * Parses a list of arguments in function declaration
     */
    export let funDefArgList: Prims.IParser<[Array<[string, string, string, Expression<any>, string]>, string]> = i => {
        let argName = Prims.seq<CharStream, CharStream, [CharStream, CharStream]>(Prims.ws())(identifierParser)(x => x);
        let assign = Prims.seq<CharStream, [Expression<any>, CharStream], [CharStream, Expression<any>, CharStream]>(
            Prims.left<CharStream, CharStream>(Prims.ws())(Prims.char('='))
        )(
            Prims.seq<Expression<any>, CharStream, [Expression<any>, CharStream]>(ExpressionParserNoSeq)(Prims.ws())(tup => tup)
        )(
            (tup: [CharStream, [Expression<any>, CharStream]]) => [tup[0], tup[1][0], tup[1][1]]
        );
        let noAssign = Prims.appfun<CharStream, any[]>(Prims.ws())(x => [x]);
        let assignment = Prims.choice<any[]>(assign)(noAssign);

        let f = function(tup: [[CharStream, CharStream], any[]]): [string, string, string, Expression<any>, string] {
            return (tup[1].length == 1)
                ? [tup[0][0].toString(), tup[0][1].toString(), "", null, tup[1].toString()]
                : [tup[0][0].toString(), tup[0][1].toString(), tup[1][0].toString(), (<Expression<any>> tup[1][1]), tup[1][2].toString()];
        }

        let firstArg = Prims.seq<
            [CharStream, CharStream], any[], [string, string, string, Expression<any>, string]
        >(argName)(assignment)(f);
        let remainingArg = Prims.right<CharStream, [string, string, string, Expression<any>, string]>(Prims.char(','))(firstArg);
        let argTail = Prims.many<[string, string, string, Expression<any>, string]>(remainingArg);

        let emptyArgWS: string = "";
        let args = Prims.choice<Array<[string, string, string, Expression<any>, string]>>(
            Prims.seq<
                [string, string, string, Expression<any>, string],
                Array<[string, string, string, Expression<any>, string]>,
                Array<[string, string, string, Expression<any>, string]>
            >(firstArg)(argTail)(
                (tup: [[string, string, string, Expression<any>, string], Array<[string, string, string, Expression<any>, string]>]) => {
                    return [tup[0]].concat(tup[1])
                }
            )
        )(
            Prims.appfun<CharStream, Array<[string, string, string, Expression<any>, string]>>(Prims.ws())(x => {
                emptyArgWS = x.toString();
                return [];
            })
        );

        let argListParser = Prims.between<
            CharStream, CharStream, Array<[string, string, string, Expression<any>, string]>
        >(Prims.char("("))(Prims.char(")"))(args);

        return Prims.appfun<
            Array<[string, string, string, Expression<any>, string]>,
            [Array<[string, string, string, Expression<any>, string]>, string]
        >(argListParser)((x: Array<[string, string, string, Expression<any>, string]>) => [x, emptyArgWS])(i);
    }

    /**
     * returnParser parses valid return statements in the form "return x"
     * wraps the parsed value in a Return node for the AST
     */
    export let returnParser: Prims.IParser<Return> = i => {
        let preWS = "";
        let postWS = "";
        let preWsParser = Prims.appfun<CharStream, string>(Prims.ws())(x => preWS = x.toString());
        let postWsParser = Prims.appfun<CharStream, string>(Prims.ws1())(x => postWS = x.toString());
        let p = Prims.right<CharStream, Expression<any>>(
            Prims.between<string, string, CharStream>(preWsParser)(postWsParser)(Prims.str("return"))
        )(
            ExpressionParserNoSeq
        );
        let f = (e: Expression<any>) => new Return(e, preWS, postWS);
        return Prims.appfun<Expression<any>, Return>(p)(f)(i);
    }

    /**
     * funDef parses valid function definitions in the form "fun functionName(argList){ body;}"
     * the parser returns a funDef node for the AST
     */
    export let funDef: Prims.IParser<FunDef> = i => {
        let preFuncWs = "";
        let postFuncWs = "";
        let postFuncNameWs = "";
        let preFuncWsParser = Prims.appfun<CharStream, string>(Prims.ws())(x => preFuncWs = x.toString());
        let postFunctWsParser = Prims.appfun<CharStream, string>(Prims.ws())(x => postFuncWs = x.toString());
        let postFuncNameWsParser = Prims.appfun<CharStream, string>(Prims.ws())(x => postFuncNameWs = x.toString());
        return Prims.right<CharStream, FunDef>(
            Prims.between<string, string, CharStream>(preFuncWsParser)(postFunctWsParser)(Prims.str('fun'))
        )(
            Prims.seq<CharStream, [[Array<[string, string, string, Expression<any>, string]>, string], BodyNode], FunDef>(
                /* function name */
                Prims.left<CharStream, string>(identifierParser)(postFuncNameWsParser)
            )(
                Prims.seq<
                    [Array<[string, string, string, Expression<any>, string]>, string],
                    BodyNode, [[Array<[string, string, string, Expression<any>, string]>, string], BodyNode]
                >(
                    /* function arguments */
                    funDefArgList
                )(
                    /* function body */
                    bodyParser
                )(x => x)
            )(
                // create the AST node
                (tup: [CharStream, [[Array<[string, string, string, Expression<any>, string]>, string], BodyNode]]) => {
                    let fname: string = tup[0].toString();
                    let body: BodyNode = tup[1][1];
                    let args: Array<[string, string, string, Expression<any>, string]> = tup[1][0][0];
                    let postExprWS: string = tup[1][0][1]
                    return new FunDef(fname, body, args, preFuncWs, postFuncWs, postFuncNameWs, postExprWS);
                }
            )
        )(i)
    }


    /**
     * Parses an argument list and returns an array that stores a tuple of preArgNameWS, argName, preEqualWS, argValue, and postExprWS
     */
    export let funAppArgList: Prims.IParser<[Array<[string, string, string, Expression<any>, string]>, string]> = i => {
        let argName = Prims.seq<CharStream, CharStream, [CharStream, CharStream]>(Prims.ws())(identifierParser)(x => x);
        let assignOp = Prims.left<CharStream, CharStream>(Prims.ws())(Prims.char('='));
        let assignToArg = Prims.seq<[CharStream, CharStream], CharStream, CharStream[]>(argName)(assignOp)(
            x => x[0].concat(x[1])
        );
        let noAssign = Prims.appfun<CharStream, CharStream[]>(Prims.ws())(x => [x]);
        let assignment = Prims.choice<CharStream[]>(assignToArg)(noAssign);

        let f = (tup: [CharStream[], [Expression<any>, CharStream]]): [string, string, string, Expression<any>, string] => {
            return (tup[0].length == 1) ?
                [tup[0][0].toString(), "", "", tup[1][0], tup[1][1].toString()] :
                [tup[0][0].toString(), tup[0][1].toString(), tup[0][2].toString(), tup[1][0], tup[1][1].toString()];
        };

        let argVal = Prims.seq<Expression<any>, CharStream, [Expression<any>, CharStream]>(ExpressionParserNoSeq)(Prims.ws())(x => x);
        let firstArg = Prims.seq<
            CharStream[], [Expression<any>, CharStream], [string, string, string, Expression<any>, string]
        >(assignment)(argVal)(f);
        let remainingAssignment = Prims.right<CharStream, CharStream[]>(Prims.char(','))(assignment);
        let remainingArg = Prims.seq<
            CharStream[], [Expression<any>, CharStream], [string, string, string, Expression<any>, string]
        >(remainingAssignment)(argVal)(f);

        let argTail = Prims.many<[string, string, string, Expression<any>, string]>(remainingArg);
        let emptyArgWS: string = "";
        let args = Prims.choice<Array<[string, string, string, Expression<any>, string]>>(
            Prims.seq<
                [string, string, string, Expression<any>, string],
                Array<[string, string, string, Expression<any>, string]>,
                Array<[string, string, string, Expression<any>, string]>
            >(firstArg)(argTail)(
                (tup: [[string, string, string, Expression<any>, string], Array<[string, string, string, Expression<any>, string]>]) => {
                    return [tup[0]].concat(tup[1])
                }
            )
        )(
            Prims.appfun<CharStream, Array<[string, string, string, Expression<any>, string]>>(Prims.ws())(x => {
                emptyArgWS = x.toString();
                return [];
            })
        );

        let argListParser = Prims.between<
            CharStream, CharStream, Array<[string, string, string, Expression<any>, string]>
        >(Prims.char("("))(Prims.char(")"))(args);

        return Prims.appfun<
            Array<[string, string, string, Expression<any>, string]>,
            [Array<[string, string, string, Expression<any>, string]>, string]
        >(argListParser)((x: Array<[string, string, string, Expression<any>, string]>) => [x, emptyArgWS])(i);
    }

    /**
     * funApp parses valid function applications in the form "functionName(argsList)"
     * parser checks for built-in functions like print, ellipse, and rect, and user-defined functions
     */
    export let funApp: Prims.IParser<Expression<any>> = i => {
        let preFuncWs = "";
        let preFuncWsParser = Prims.appfun<CharStream, string>(Prims.ws())(x => preFuncWs = x.toString());
        let postFuncWs = "";
        let postFuncWsParser = Prims.appfun<CharStream, string>(Prims.ws())(x => postFuncWs = x.toString());

        return Prims.seq<CharStream, [Array<[string, string, string, Expression<any>, string]>, string], any>(
            Prims.between<string, string, CharStream>(preFuncWsParser)(postFuncWsParser)(identifierParser)
        )(
            funAppArgList
        )(tup => {
            let fname: string = tup[0].toString();
            let args: Array<[string, string, string, Expression<any>, string]> = tup[1][0];
            let emptyArgWS = tup[1][1];
            switch (fname) {
                case "print":
                    return new PrintNode(args, preFuncWs, postFuncWs, emptyArgWS);
                case "ellipse":
                    return new EllipseNode(args, preFuncWs, postFuncWs, emptyArgWS);
                case "rect":
                    return new RectangleNode(args, preFuncWs, postFuncWs, emptyArgWS);
                case "emoji":
                    return new EmojiNode(args, preFuncWs, postFuncWs, emptyArgWS);
                case "line":
                    return new LineNode(args, preFuncWs, postFuncWs, emptyArgWS);
                case "rgb":
                    return new RGBColorNode(args, preFuncWs, postFuncWs, emptyArgWS);
                default:
                    return new UserDefinedFunctionNode(fname, args, preFuncWs, postFuncWs, emptyArgWS);
            }
        })(i);
    }

    /**
     * Parses if statement recursively
     */
    export let conditionalParser: Prims.IParser<Conditional> = i => {
        let preIfWs = "";
        let preIfWsParser = Prims.appfun<CharStream, string>(Prims.ws())(
            x => preIfWs = x.toString()
        );
        let ifParser = Prims.right<string, CharStream>(preIfWsParser)(Prims.str("if"));
        let condParser = Prims.expect<Parens<any>>(parens)("invalid condition expression");
        let bodyParse = Prims.expect<BodyNode>(bodyParser)("invalid body for if statement");
        let condBodyParser = Prims.seq<Parens<any>, BodyNode, [Parens<any>, BodyNode]>(condParser)(bodyParse)(tup => tup);
        let ifStatementParser = Prims.right<CharStream, [Parens<any>, BodyNode]>(ifParser)(condBodyParser);

        let preElseWs = "";
        let preElseWsParser = Prims.appfun<CharStream, string>(Prims.ws())(
            x => preElseWs = x.toString()
        );
        let elseParser = Prims.right<string, CharStream>(preElseWsParser)(Prims.str("else"));
        let elseBodyParser = Prims.choices<BodyNode | Conditional>(conditionalParser, bodyParser);
        let expectElseBodyParser = Prims.expect<BodyNode | Conditional>(elseBodyParser)("invalid else statement");
        let elseStatementParser = Prims.right<CharStream, BodyNode | Conditional>(elseParser)(expectElseBodyParser);

        let singleIfParser = Prims.appfun<[Parens<any>, BodyNode], Conditional>(ifStatementParser)(
            (tup: [Parens<any>, BodyNode]) => new Conditional(tup[0], tup[1], preIfWs)
        );

        let ifElseParser = Prims.seq<[Parens<any>, BodyNode], BodyNode | Conditional, Conditional>(
            ifStatementParser)(elseStatementParser)(
            (tup: [[Parens<any>, BodyNode], BodyNode | Conditional]) => {
                return new Conditional(tup[0][0], tup[0][1], preIfWs, tup[1], preElseWs);
            }
        );

        return Prims.choices<Conditional>(ifElseParser, singleIfParser)(i);
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
