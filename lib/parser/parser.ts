import { Primitives, CharUtil } from 'pants';
import { NumberNode, StringNode, Expression, BinaryOperation, DeclareOp, PlusOp, MulOp, DivOp, MinusOp, NegOp, VariableNode, AssignOp, UnaryOperation, ListNode, SequenceNode, Return, FunDef, FunApp, BooleanNode, Conditional, RepeatNode, WhileNode, PrintNode, Equals, Not, And, GreaterThan, LessThan, GreaterThanEq, LessThanEq, Or, NotEqual, ForNode, Dimensions, Increment, NOP, Decrement, EllipseNode, RectangleNode, LineNode, CurveNode, EphNode, EmojiNode } from '../../index';
import { Option, Some, None } from 'space-lift';
import { FloatNode } from '../prims/FloatNode';

export namespace Parser {

    /**
     * to be moved to Pants
     * number parses numbers by repeatedly applying the digit parser
     */
    export function number() : Primitives.IParser<number> {
        return (istream: CharUtil.CharStream) => {
            const o = Primitives.many1(Primitives.digit())(istream)
            switch(o.tag) {
                case "success":
                    let s = "";
                    for (let digit of o.result){
                        s+= digit.toString();
                    }
                    return new Primitives.Success<number>(o.inputstream, parseFloat(s));
                case "failure":
                    return o;
            }
        }
    }

    export function float(): Primitives.IParser<Expression<{}>>{
        let p1 = Primitives.left<number, CharUtil.CharStream>(number())(Primitives.str('.'));
        let p2 = Primitives.seq<number, number, number[]>(p1)(number())(x =>x);
        let float_val = Primitives.appfun<string, number>(Primitives.appfun<number[], string>(p2)(x=> x[0] + "." + x[1]))(x=> parseFloat(x));
        return Primitives.appfun<number, FloatNode>(float_val)(x => new FloatNode(x));
    }

    /**
     * to be moved to Pants
     * string is an arbitrary string parser that repeatedly applies the letter primitive
     * returns a CharStream representing the entire parsed string
     */
    export function string() : Primitives.IParser<CharUtil.CharStream> {
        let p: Primitives.IParser<CharUtil.CharStream[]> = Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream[]>(
            Primitives.ws()
        )(
            Primitives.ws()
        )(
            Primitives.many1(Primitives.letter())
        );
        let f = (xs: CharUtil.CharStream[]) => CharUtil.CharStream.concat(xs)
        return Primitives.appfun<CharUtil.CharStream[],CharUtil.CharStream>(p)(f);
    }

    /**
     * to be moved to Pants
     * punctuation parses all possible punctuation characters
     */
    export function punctuation(){
        return Primitives.sat(
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
    export function parseWithOutcome(program: string): Primitives.Outcome<Expression<any>>{
        program += "\n";
        return ExpressionParser(new CharUtil.CharStream(program));
    }

    /**
     * parse is a function that wraps the input text in a CharStream
     * and passes it to the upper-level parse function
     * @param program a string representing program text
     */
    export function parse(program: string): Option<Expression<any>>{
        let o = parseWithOutcome(program);
        switch(o.tag){
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
    export let ExpressionParser : Primitives.IParser<Expression<any>> = i => {
        let f= (tup: [Expression<any>, Expression<any>]) => {
            return new SequenceNode(tup[0], tup[1]);
        }
        let p =
            Primitives.seq<Expression<any>,Expression<any>,SequenceNode>(
                ExpressionParserNoSeq
            )(
                Primitives.right<CharUtil.CharStream,Expression<any>>(Primitives.choice(
                    Primitives.char(';'))(Primitives.nl())
                )(
                    Primitives.choice<Expression<any>>(Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>>(Primitives.ws())(Primitives.ws())(ExpressionParser))(
                        Primitives.appfun<CharUtil.CharStream,Expression<any>>(Primitives.ws())(_ => new NOP())
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
    export let ExpressionParserNoSeq : Primitives.IParser<Expression<{}>> = i => {
        let p1 = Primitives.choice(lNumber())(lstring2())
        let p2 = Primitives.choice(float())(p1);
        let p3 = Primitives.choice<Expression<any>>(varNameParse())(p2);
        let p4 = Primitives.choice<Expression<any>>(BoolParse())(p3);
        let p5 = Primitives.choice<Expression<any>>(varDecParse())(p4);
        let p6 = Primitives.choice<Expression<any>>(unOpsExpr)(p5);
        let p7 = Primitives.choice<Expression<any>>(Declare())(p6);
        let p8 = Primitives.choice<Expression<any>>(binOpExpr)(p7);
        let p9 = Primitives.choice<Expression<any>> (LogicExpr())(p8);
        let p10 = Primitives.choice<Expression<any>>(ListHead)(p9);
        let p11 = Primitives.choice<Expression<any>>(funApp)(p10);
        let p12 = Primitives.choice<Expression<any>>(returnParser)(p11);
        let p13 = Primitives.choice<Expression<any>>(condParse)(p12);
        let p14 = Primitives.choice<Expression<any>>(WhileLoop)(p13);
        let p15 = Primitives.choice<Expression<any>>(ForLoop)(p14);
        let p16 = Primitives.choice<Expression<any>>(funDef)(p15);
        let p17 = Primitives.choice<Expression<any>>(loopParse)(p16);
        return p17(i);
    }

    /**
     * Searches through all possible expressions except for binOp expressions
     * used to avoid infinite looping in the binary expression parser
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    export let ExpressionParserNoBinOp : Primitives.IParser<Expression<{}>> = i => {
        let p1 = Primitives.choice(lNumber())(lstring2());
        let p2 = Primitives.choice(float())(p1);
        let p3 = Primitives.choice<Expression<any>>(varNameParse())(p2);
        let p4 = Primitives.choice<Expression<any>>(BoolParse())(p3);
        let p5 = Primitives.choice<Expression<any>>(varDecParse())(p4);
        let p6 = Primitives.choice<Expression<any>>(unOpsExpr)(p5);
        let p7= Primitives.choice<Expression<any>>(Declare())(p6);
        let p8= Primitives.choice<Expression<any>>(ListHead)(p7);
        let p9= Primitives.choice<Expression<any>>(funApp)(p8);
        let p10= Primitives.choice<Expression<any>>(returnParser)(p9);
        let p11= Primitives.choice<Expression<any>>(condParse)(p10);
        let p12= Primitives.choice<Expression<any>>(WhileLoop)(p11);
        let p13= Primitives.choice<Expression<any>>(ForLoop)(p12);
        let p14= Primitives.choice<Expression<any>>(funDef)(p13);
        let p15 = Primitives.choice<Expression<any>>(loopParse)(p14);
        return p15(i);
    }

    /**
     * Searches through all possible expressions except for logical expressions
     * used to avoid infinite looping in the logical expression parser
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    export let ExpressionParserNoLogic : Primitives.IParser<Expression<{}>> = i => {
        let p1 = Primitives.choice(lNumber())(lstring2());
        let p2 = Primitives.choice(float())(p1);
        let p3 = Primitives.choice<Expression<any>>(varNameParse())(p2)
        let p4 = Primitives.choice<Expression<any>>(BoolParse())(p3);
        let p5 = Primitives.choice<Expression<any>>(varDecParse())(p4);
        let p6 = Primitives.choice<Expression<any>>(unOpsExpr)(p5);
        let p7= Primitives.choice<Expression<any>>(Declare())(p6)
        let p8= Primitives.choice<Expression<any>>(binOpExpr)(p7);
        let p9= Primitives.choice<Expression<any>>(ListHead)(p8);
        let p10= Primitives.choice<Expression<any>>(funApp)(p9);
        let p11= Primitives.choice<Expression<any>>(returnParser)(p10);
        let p12= Primitives.choice<Expression<any>>(condParse)(p11);
        let p13= Primitives.choice<Expression<any>>(WhileLoop)(p12);
        let p14= Primitives.choice<Expression<any>>(ForLoop)(p13);
        let p15= Primitives.choice<Expression<any>>(funDef)(p14);
        let p16 = Primitives.choice<Expression<any>>(loopParse)(p15);
        return p16(i);
    }

    /**
     * lNumber is used to wrap parsed numbers in NumberNodes for the AST
     */
    export function lNumber() : Primitives.IParser<Expression<{}>> {
        return (istream: CharUtil.CharStream) => {
            let o = number()(istream);
            switch(o.tag){
                case "success":
                    return new Primitives.Success(o.inputstream, new NumberNode(o.result));
                case "failure":
                    return o;
            }
        }
    }

    /**
     * binOpsChar parses all possible binary operators, such as + or -
     */
    export function binOpsChar() : Primitives.IParser<CharUtil.CharStream> {
        return (istream: CharUtil.CharStream) => {
            return Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream>(
                    Primitives.ws()
                )(
                    Primitives.ws()
                )(
                    Primitives.sat(["+", "-", "/", "=", "*"])
                )(istream);
        }
    }

    /**
     * binOpsShort returns a tuple where the first element is the binary operator (CharStream)
     * and the second element is the expression to the right of the operator (Expression<{}>)
     */
   export function binOpShort() : (cs: CharUtil.CharStream) => Primitives.Outcome<[CharUtil.CharStream,Expression<{}>]> {
       return Primitives.seq<CharUtil.CharStream,Expression<{}>,[CharUtil.CharStream,Expression<{}>]>(binOpsChar())(ExpressionParserNoSeq)((x: [CharUtil.CharStream,Expression<{}>]) => x);
   }

    /**
     * binOpExpr parses all possible binary operation expressions and returns the
     * corresponding AST node construct (also parses postfix increments/decrements like i++)
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
     export let binOpExpr : Primitives.IParser<Expression<any>> = i => {
        var f = (tup: [Expression<any>,[CharUtil.CharStream, Expression<any>]]) => {
            let lhs: Expression<any> = tup[0];
            let op: CharUtil.CharStream = tup[1][0];
            let rhs: Expression<any> = tup[1][1];
            switch(op.toString()) {
                case "+":
                    return new PlusOp((<Expression<NumberNode|FloatNode>>lhs), (<Expression<NumberNode|FloatNode>>rhs), ws);
                case "-":
                    return new MinusOp((<Expression<NumberNode|FloatNode>>lhs), (<Expression<NumberNode|FloatNode>>rhs), ws);
                case "/":
                    return new DivOp((<Expression<NumberNode|FloatNode>>lhs), (<Expression<NumberNode|FloatNode>>rhs), ws);
                case "*":
                    return new MulOp((<Expression<NumberNode|FloatNode>>lhs), (<Expression<NumberNode|FloatNode>>rhs), ws);
                case "=":
                    return new AssignOp((<Expression<VariableNode>> lhs), (<Expression<any>> rhs), ws);
                 default:
                    throw new Error("Binary Operation not supported");
            }
        }
        let p1= Primitives.choice(ExpressionParserNoBinOp)(varDecParse());
        let p2= binOpShort();
        let ws = "";
        let precedingWS = Primitives.appfun<CharUtil.CharStream, string>(Primitives.ws())(x => ws = x.toString());
        let postPlus = Primitives.seq<Expression<any>, CharUtil.CharStream, Increment>(Primitives.right<string, Expression<any>>(precedingWS)(ExpressionParserNoBinOp))(Primitives.str('++'))(tup => {return new Increment(tup[0], ws)});
        let postMinus = Primitives.seq<Expression<any>, CharUtil.CharStream, Decrement>(Primitives.right<string, Expression<any>>(precedingWS)(ExpressionParserNoBinOp))(Primitives.str('--'))(tup => {return new Decrement(tup[0], ws)});
        let binOp = Primitives.seq<Expression<any>,[CharUtil.CharStream,Expression<any>],BinaryOperation<any>>(Primitives.right<string, Expression<any>>(precedingWS)(p1))(p2)(f);
        return Primitives.choice<Expression<any>>(binOp)(Primitives.choice<Expression<any>>(postPlus)(postMinus))(i);
     }

     /**
      * unOpsChar parses all possible unary operators
      * Only negations are supported, but more can be added as needed
      * @param i nonsense parameter used to avoid the bug with eager evaluation
      */
    export let unOpsChar: Primitives.IParser<CharUtil.CharStream> = i => {
        return Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream>(Primitives.ws())(Primitives.ws())(Primitives.char("-"))(i);
    }

    /**
     * unOpsExpr wraps a unary operation expression in the corresponding
     * AST node and returns it
     * @param i nonsense parameter used to avoid the bug with eager evaluation
     */
    export let unOpsExpr: Primitives.IParser<UnaryOperation<{}>> = i => {
        var f= (tup: [CharUtil.CharStream, Expression<NumberNode|FloatNode>]) => {
            return new NegOp(tup[1], ws);
        }
        let ws = "";
        let precedingWS = Primitives.appfun<CharUtil.CharStream, string>(Primitives.ws())(x => ws = x.toString());
        return Primitives.seq<CharUtil.CharStream, Expression<any>, UnaryOperation<{}>>(Primitives.right<string, CharUtil.CharStream>(precedingWS)(unOpsChar))(ExpressionParserNoSeq)(f)(i);
    }

    /**
     * lstring parses valid strings in the SWELL language
     * a valid string is surrounded by quotations and consists of letters, numbers, punctuation, and/or whitespace
     */
    export function lstring() {
        let p1 = Primitives.choice(Primitives.choice(Primitives.letter())(Primitives.ws1()))(Primitives.digit());
        //let p1 = Primitives.choice(Primitives.letter())(Primitives.ws1());
        let p: Primitives.IParser<CharUtil.CharStream[]> = Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream[]>(
            Primitives.str("\"")
        )(
            Primitives.str("\"")
        )(
            Primitives.many<CharUtil.CharStream>(Primitives.choice(p1)(punctuation())));
        let f = (xs: CharUtil.CharStream[]) => CharUtil.CharStream.concat(xs)
        return Primitives.appfun<CharUtil.CharStream[],CharUtil.CharStream>(p)(f);

    }

    /**
     * lstring2 wraps strings parsed by lstring in StrinNode objects and returns them
     */
    export function lstring2() {
        return (istream: CharUtil.CharStream) => {
            let ws = "";
            let precedingWS = Primitives.appfun(Primitives.ws())(x => ws = x.toString());
            let o = Primitives.right(precedingWS)(lstring())(istream);
            switch(o.tag){
                case "success":
                    return new Primitives.Success(o.inputstream, new StringNode(o.result.toString(), ws));
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
    export function varNameParse() : Primitives.IParser<VariableNode> {
        var f = (tup: [CharUtil.CharStream, CharUtil.CharStream[]]) => {
            return new VariableNode(tup[0].toString() + CharUtil.CharStream.concat(tup[1]).toString(), ws);
        }
        let ws = "";
        let precedingWS = Primitives.appfun<CharUtil.CharStream, string>(Primitives.ws())(x => ws = x.toString());
        let firstChar = Primitives.right<string, CharUtil.CharStream>(precedingWS)(Primitives.lower());
        let nextChars = Primitives.many(Primitives.choice(Primitives.digit())(Primitives.letter()));
        return Primitives.seq<CharUtil.CharStream, CharUtil.CharStream[], VariableNode>(firstChar)(nextChars)(f);
    }

    /**
     * varDecParse parses valid variable declarations in the form "var x"
     * the parser then wraps the parsed value in a variable node for the AST
     */
    export function varDecParse() : Primitives.IParser<VariableNode>{
        let ws = "";
        let precedingWS = Primitives.appfun<CharUtil.CharStream, string>(Primitives.ws())(x => ws = x.toString());
        let p1 = Primitives.right<string, CharUtil.CharStream>(precedingWS)(Primitives.str("var"));
        let varName = Primitives.between<CharUtil.CharStream, CharUtil.CharStream, VariableNode>(Primitives.ws1())(Primitives.ws())(varNameParse());
        let p = Primitives.seq<CharUtil.CharStream, VariableNode , VariableNode>(p1)(varName)(tup => tup[1]);
        return p;
    }

    /**
     * Declare parses variable declarations in the form "var x = 2"
     * and returns a DeclareOp node
     */
    export function Declare() : Primitives.IParser<DeclareOp<any>> {
        let eq= Primitives.between(Primitives.ws())(Primitives.ws())(Primitives.char('='));
        let p1 = Primitives.left(varDecParse())(eq);
        return Primitives.seq<VariableNode, Expression<any>, DeclareOp<any>>(p1)(ExpressionParserNoSeq)(tup => {return new DeclareOp(tup[0], tup[1])})
    }

    /**
     * ListHead parses all lists in the SWELL language, including empty lists
     * Lists are surrounded by square brackets and each element is separated by a comma
     * returns a listNode object
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let ListHead : Primitives.IParser<ListNode> = i =>{
        let ws = "";
        let precedingWS = Primitives.appfun<CharUtil.CharStream, string>(Primitives.ws())(x => ws = x.toString());
        let p0= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>>(Primitives.ws())(Primitives.ws())(ExpressionParserNoSeq);
        let p1= Primitives.right<CharUtil.CharStream, Expression<any>>(Primitives.right<string, CharUtil.CharStream>(precedingWS)(Primitives.char('[')))(p0);
        var f = (tup : [Expression<any>, any ]) => {
            let hd= tup[0];
            let res : [any] = [hd];
            let tail= tup[1];
            for(let elem of tail) {
                res.push(elem);
            }
            return new ListNode(res, ws);
        }
        let p2 = Primitives.seq<Expression<any>, {}, {}>(p1)(ListTail())(f);
        let p3 = Primitives.appfun(Primitives.right<string, CharUtil.CharStream>(precedingWS)(Primitives.str('[]')))(_ => new ListNode([], ws));
        return Primitives.choice<any>(p3)(p2)(i);
    }

    /**
     * List Tail parses second through last elements of a list, each separated by a comma
     * returns an array of Expressions that will be accessed by ListHead
     */
    export function ListTail() : Primitives.IParser<Expression<any>[]> {
        let p0= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>>(Primitives.ws())(Primitives.ws())(ExpressionParserNoSeq);
        let p1= Primitives.right<CharUtil.CharStream, Expression<any>>(Primitives.char(','))(p0);
        let p2 = Primitives.left(Primitives.many<Expression<any>>(p1))(Primitives.char(']'));
        return p2;
    }

    /**
     * funDefArgList parses argument lists for function definitions,
     * surrounded by parens and separated by commas
     * returns an array of the parameters
     */
    export function funDefArgList() : Primitives.IParser<string[]> {
        let p1= Primitives.right<CharUtil.CharStream, CharUtil.CharStream>(Primitives.char('('))(string());
        var f = (tup : [CharUtil.CharStream, CharUtil.CharStream[] ]) => {
            let hd= tup[0].toString();
            let res : [any] = [hd];
            let tail= tup[1];
            for(let elem of tail) {
                res.push(elem.toString());
            }
            return res;
        }
        let p2 = Primitives.seq<CharUtil.CharStream, CharUtil.CharStream[], string[]>(p1)(funDefArgListTail())(f);
        let p3 = Primitives.appfun(Primitives.str('()'))(_ => []);
        return Primitives.choice<any>(p3)(p2);
    }

    /**
     * funDefArgListTail parses the second through last elements of a function definition parameter list
     * parameters are separated by commas and end with a closing parens
     * returns an array of parameters, which is accessed by funDefArgList
     */
    function funDefArgListTail() : Primitives.IParser<CharUtil.CharStream[]> {
        let p1= Primitives.right<CharUtil.CharStream, CharUtil.CharStream>(Primitives.char(','))(string());
        let p2 = Primitives.left(Primitives.many<CharUtil.CharStream>(p1))(Primitives.char(')'));
        return p2;
    }

    /**
     * funAppArgList parses argument lists for function applications, including empty args lists
     * the parser returns an array of Expression objects that represent the arguments
     */
    export function funAppArgList() : Primitives.IParser<Expression<any>[]> {
        let expr= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>>(Primitives.ws())(Primitives.ws())(ExpressionParserNoSeq);
        let p1= Primitives.right<CharUtil.CharStream, Expression<any>>(Primitives.char('('))(expr);
        var f = (tup : [Expression<any>, Expression<any>[]]) => {
            let hd: Expression<{}> = tup[0];
            let res = [hd];
            let tail = tup[1];
            for(let elem of tail) {
                res.push(elem);
            }
            return res;
        }
        let p2 = Primitives.seq<Expression<any>, Expression<any>[], Expression<any>[]>(p1)(funAppArgListTail())(f);
        let p3 = Primitives.appfun<CharUtil.CharStream, Expression<{}>[]>(Primitives.str('()'))(_ => []);
        return Primitives.choice<Expression<any>[]>(p3)(p2);
    }

    /**
     * funAppArgListTail parses the second through last elements of an argument list
     * each element is separated by a comma
     * returns an array of Expression objects, later accessed by funAppArgsList
     */
    function funAppArgListTail() : Primitives.IParser<Expression<any>[]> {
        let comma = Primitives.between<CharUtil.CharStream,CharUtil.CharStream,CharUtil.CharStream>(Primitives.ws())(Primitives.ws())(Primitives.char(','))
        let p1= Primitives.right<CharUtil.CharStream, Expression<any>>(comma)(ExpressionParserNoSeq);
        let p2 = Primitives.left(Primitives.many<Expression<any>>(p1))(Primitives.right(Primitives.ws())(Primitives.char(')')));
        return p2;
    }

    /**
     * returnParser parses valid return statements in the form "return x"
     * wraps the parsed value in a Return node for the AST
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let returnParser : Primitives.IParser<Return> = i =>{
        let expr= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>>(Primitives.ws())(Primitives.ws())(ExpressionParserNoSeq);
        let ws = "";
        let precedingWS = Primitives.appfun<CharUtil.CharStream, string>(Primitives.ws())(x => ws = x.toString());
        let p= Primitives.right<CharUtil.CharStream, Expression<any>>(Primitives.right<string, CharUtil.CharStream>(precedingWS)(Primitives.str('return')))(expr);
        var f= (e :Expression<any>) => {return new Return(e, ws);}
        return Primitives.appfun<Expression<any>, Return>(p)(f)(i);

    }

    /**
     * funDef parses valid function definitions in the form "fun functionName(argList){ body;}"
     * the parser returns a funDef node for the AST
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let funDef : Primitives.IParser<FunDef<any>> = i =>{
        let ws = "";
        let precedingWS = Primitives.appfun<CharUtil.CharStream, string>(Primitives.ws())(x => ws = x.toString());
        return Primitives.right<CharUtil.CharStream,FunDef<{}>>(
                    Primitives.right<string, CharUtil.CharStream>(precedingWS)(Primitives.str('fun'))
                )(
                    Primitives.seq<string,[string[],Expression<{}>],FunDef<{}>>(
                        /* function name */
                        Primitives.appfun<CharUtil.CharStream,string>(
                            string()
                        )(cs => cs.toString())
                    )(
                        Primitives.seq<string[],Expression<{}>,[string[],Expression<{}>]>(
                            /* function arguments */
                            funDefArgList()
                        )(
                            Primitives.right<CharUtil.CharStream, Expression<{}>>(
                                /* function body */
                                Primitives.between<CharUtil.CharStream, CharUtil.CharStream,CharUtil.CharStream>(
                                    Primitives.ws()
                                )(
                                    Primitives.ws()
                                )(
                                    Primitives.char('{')
                                )
                            )(
                                Primitives.left<Expression<{}>,CharUtil.CharStream>(
                                    Primitives.between<CharUtil.CharStream, CharUtil.CharStream,Expression<{}>>(
                                        Primitives.ws()
                                    )(
                                        Primitives.ws()
                                    )(
                                        ExpressionParser
                                    )
                                )(
                                    Primitives.char('}')
                                )
                            )
                        )(id)
                    )(
                        // create the AST node
                        (tup: [string,[string[],Expression<{}>]]) => {
                            let fname: string = tup[0];
                            let args: string[] = tup[1][0];
                            let body: Expression<{}> = tup[1][1];
                            return new FunDef(fname, body, args, ws);
                        }
                    )
                )(i)
    }

    //let printOffset = -1;
    //let boundingRects = [];

    //TODO
    export function getNonOverlappingCoords(): [number, number] {
      return[0,0];
    }

    /**
     * funApp parses valid function applications in the form "functionName(argsList)" and returns a funApp node
     * parser checks for built-in functions, like print, ellipse, and rect; and returns the valid AST node
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let funApp : Primitives.IParser<Expression<any>> = i =>{
        let ws = "";
        let precedingWS = Primitives.appfun<CharUtil.CharStream, string>(Primitives.ws())(x => ws = x.toString());
        return Primitives.seq<CharUtil.CharStream, Expression<any>[], any>(Primitives.right<string, CharUtil.CharStream>(precedingWS)(string()))(funAppArgList())(tup => {
            let fname: string = tup[0].toString();
            switch(fname){
                case "print":
                    if (tup[1].length == 3) {
                            //boundingRects.push([tup[1][0].width, tup[1][0].height, tup[1][1], tup[1][2]]);
                            return new PrintNode(tup[1][0], true, new Dimensions(tup[1][1] , tup[1][2], new NumberNode(1)), ws);
                    }
                    //printOffset = (printOffset + 1) % 12;
                    return new PrintNode(tup[1][0], true, new Dimensions(new NumberNode(100) , new NumberNode(100), new NumberNode(1)), ws);
                    //return new PrintNode(tup[1][0], false);
                case "ellipse":
                    if(tup[1].length == 2){
                        return new EllipseNode(tup[1][0], tup[1][1], ws);
                    }
                case "rect":
                    if(tup[1].length == 2){
                        return new RectangleNode(tup[1][0], tup[1][1], ws);
                    }
                case "line":
                    if(tup[1].length == 2){
                        return new LineNode(tup[1][0], tup[1][1], ws);
                    }
                case "curve":
                        if(tup[1].length == 3){
                            return new CurveNode(tup[1][0], tup[1][1], tup[1][2], ws);
                        }
                case "eph":
                    if(tup[1].length == 2){
                        return new EphNode(tup[1][0], tup[1][1], ws);
                    }
                case "emoji":
                    if(tup[1].length == 3){
                        return new EmojiNode(tup[1][0], tup[1][1], tup[1][2], ws);
                    }
            }
            let args: Expression<any>[] = tup[1];
            return new FunApp(fname, args, ws);
        })(i);
    }

    /**
     * BoolParse parses valid booleans, true and false, and returns a BooleanNode
     */
    export function BoolParse(): Primitives.IParser<BooleanNode>{
        let ws = "";
        let precedingWS = Primitives.appfun<CharUtil.CharStream, string>(Primitives.ws())(x => ws = x.toString());
       let p1= Primitives.appfun<CharUtil.CharStream, BooleanNode>(Primitives.right<string, CharUtil.CharStream>(precedingWS)(Primitives.str('true')))(_=> new BooleanNode(true, ws));
       let p2= Primitives.appfun<CharUtil.CharStream, BooleanNode>(Primitives.right<string, CharUtil.CharStream> (precedingWS)(Primitives.str('false')))(_=> new BooleanNode(false, ws));
       return Primitives.choice<BooleanNode>(p1)(p2);
    }

    /**
     * logicChar parses all logical operators in the SWELL language and returns the consumed operator
     */
    export function logicChar() : Primitives.IParser<CharUtil.CharStream>{
        var logicChar = ["equals", '==', 'and', '>', '<', 'not equals', 'or'];
        var logicChar2 = ['>=', '<='];
        let p1 = Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream>(Primitives.ws())(Primitives.ws())(Primitives.strSat(logicChar));
        let p2= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream>(Primitives.ws())(Primitives.ws())(Primitives.strSat(logicChar2));
        return Primitives.choice(p2)(p1);
    }

    /**
     * logicShort returns a tuple, where the first element represents the logical operator and
     * the second element is the expression to the right of the operator
     */
    export function logicShort() : Primitives.IParser<[CharUtil.CharStream, Expression<any>]>{
        return Primitives.seq<CharUtil.CharStream,Expression<any>,[CharUtil.CharStream,Expression<any>]>(logicChar())(ExpressionParserNoSeq)((x: [CharUtil.CharStream,Expression<any>]) => x);
    }

    /**
     * logicExpr parses logical expressions and returns the corresponding AST node
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export function LogicExpr() : Primitives.IParser<Expression<any>> {
        // TODO: Dan (2018-11-19), shouldn't parameterized type be BooleanNode?
        var f = (tup: [Expression<any>,[CharUtil.CharStream, Expression<any>]]) => {
            let lhs: Expression<any> = tup[0];
            let op: CharUtil.CharStream = tup[1][0];
            let rhs: Expression<any> = tup[1][1];
            switch(op.toString()) {
                case "equals":
                    return new Equals((<Expression<any>>lhs), (<Expression<any>>rhs), ws);
                case "==":
                    return new Equals((<Expression<any>>lhs), (<Expression<any>>rhs), ws);
                case "and":
                    return new And((<Expression<any>>lhs), (<Expression<any>>rhs), ws);
                case ">":
                    return new GreaterThan((<Expression<any>> lhs), (<Expression<any>> rhs), ws);
                case "<":
                    return new LessThan((<Expression<any>> lhs), (<Expression<any>> rhs), ws);
                case ">=":
                    return new GreaterThanEq((<Expression<any>> lhs), (<Expression<any>> rhs), ws);
                case "<=":
                    return new LessThanEq((<Expression<any>> lhs), (<Expression<any>> rhs), ws);
                case "or":
                    return new Or((<Expression<any>> lhs), (<Expression<any>> rhs), ws);
                case "not equals":
                    return new NotEqual((<Expression<any>> lhs), (<Expression<any>> rhs), ws);
                 default:
                    throw new Error("Logical expression not supported");
            }
        }
        let ws = "";
        let precedingWS = Primitives.appfun<CharUtil.CharStream, string>(Primitives.ws())(x => ws = x.toString());
        let not= Primitives.right<string, CharUtil.CharStream>(precedingWS)(Primitives.str('not'));
        let p1= Primitives.right<CharUtil.CharStream, Expression<any>>(not)(ExpressionParserNoSeq);
        let notExpr= Primitives.appfun<Expression<any>, Not>(p1)(x => new Not(x, ws));
        let logicExpr= Primitives.seq<Expression<any>, [CharUtil.CharStream, Expression<any>], any>(Primitives.right<string, Expression<any>>(precedingWS)(ExpressionParserNoLogic))(logicShort())(f);
        return Primitives.choice(notExpr)(logicExpr);
     }

     /**
      * IfParse parses valid if statements in the form "if(condition){ body; }"
      * returns an array where the first elem is the condition and the second is the body
      */
    export function IfParse() : Primitives.IParser<Expression<any>[]>{
        let expr= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<{}>>(Primitives.ws())(Primitives.ws())(ExpressionParserNoSeq);
        let bodyParse= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<{}>>(Primitives.ws())(Primitives.ws())(ExpressionParser);
        let ifWS = Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream>(Primitives.ws())(Primitives.ws())(Primitives.str('if'));
        let ifStr = Primitives.choice<CharUtil.CharStream> (ifWS)(Primitives.str("if"));
        let p1= Primitives.seq<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream[]>(ifStr)(Primitives.char('('))(x =>x);
        let cond= Primitives.between<CharUtil.CharStream[], CharUtil.CharStream, Expression<any>>(p1)(Primitives.char(')'))(expr);
        let curly= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream>(Primitives.ws())(Primitives.ws())(Primitives.char('{'));
        let body= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>>(curly)(Primitives.char('}'))(bodyParse);
        return Primitives.seq<Expression<any>, Expression<any>, Expression<any>[]>(cond)(body)(x => x);
    }

    /**
      * IfElseParse parses valid if else statements in the form "if(condition){ body; } else{ body2;}"
      * returns an array where the first elem is the condition and the second is the first body and the third is body2
      */
    export function IfElseParse() : Primitives.IParser<Expression<any>[]> {
        let e = Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream>(Primitives.ws())(Primitives.ws())(Primitives.str('else'));
        let body= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>>(Primitives.ws())(Primitives.ws())(ExpressionParser);
        let body2= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>>(Primitives.str('{'))(Primitives.str('}'))(body);
        let elseParse= Primitives.right<CharUtil.CharStream, Expression<any>>(e)(body2);
        var f= (tup : [Expression<any>[], Expression<any>]) => {
            tup[0].push(tup[1]);
            return tup[0];
        }
        return Primitives.seq<Expression<any>[], Expression<any>, Expression<any>[]>(IfParse())(elseParse)(f);
    }

    /**
     * condParse parses possible conditional statements, including if and if/else statements
     * returns a Conditional node
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let condParse : Primitives.IParser<Conditional> = i => {
        var f = (tup : Expression<any>[]) => {
            if(tup.length == 3) {
                return new Conditional(tup[0], tup[1], tup[2]);
            }
            else{
                return new Conditional(tup[0], tup[1]);
            }
        }
        return Primitives.appfun<Expression<any>[], Conditional>(Primitives.choice<Expression<any>[]>(IfElseParse())(IfParse())) (f)(i);
    }

    /**
     * RepeatLoop parses valid repeat statement of the form "repeat(n){ body; }"
     * returns an array where the first elem is number of repeats and the second is the body
     */
   export function RepeatLoop() : Primitives.IParser<Expression<any>[]>{
       let expr = Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<{}>>(Primitives.ws())(Primitives.ws())(ExpressionParserNoSeq);
       let bodyParse = Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<{}>>(Primitives.ws())(Primitives.ws())(ExpressionParser);
       let p1 = Primitives.seq<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream[]>(Primitives.str('repeat'))(Primitives.char('('))(x =>x);
       let n = Primitives.between<CharUtil.CharStream[], CharUtil.CharStream, Expression<any>>(p1)(Primitives.char(')'))(expr);
       let curly = Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream>(Primitives.ws())(Primitives.ws())(Primitives.char('{'));
       let body = Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>>(curly)(Primitives.char('}'))(bodyParse);
       return Primitives.seq<Expression<any>, Expression<any>, Expression<any>[]>(n)(body)(x => x);
   }

   /**
    * loopParse parses possible loop statements, is a helper for RepeatLoop
    * returns a RepeatNode
    * @param i a nonsense parameter used to avoid the bug with eager evaluation
    */
   export let loopParse : Primitives.IParser<RepeatNode> = i => {
       var f = (tup : Expression<any>[]) => {
           if(tup.length == 2) {
               return new RepeatNode(tup[0], tup[1]);
           }
       }
       return Primitives.appfun<Expression<any>[], RepeatNode>(RepeatLoop()) (f)(i);
   }

    /**
     * WhileLoop parses valid while loops in the form "while(condition) { body;}"
     * returns a WhileNode for the AST
     */
    export let WhileLoop : Primitives.IParser<WhileNode>  = i => {
        let expr= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<{}>>(Primitives.ws())(Primitives.ws())(ExpressionParserNoSeq);
        let bodyParse=Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<{}>>(Primitives.ws())(Primitives.ws())(ExpressionParser);
        let ws = "";
        let precedingWS = Primitives.appfun<CharUtil.CharStream, string>(Primitives.ws())(x => ws = x.toString());
        let p1= Primitives.seq<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream[]>(Primitives.right<string, CharUtil.CharStream>(precedingWS)(Primitives.str("while")))(Primitives.char('('))(x =>x);
        let cond= Primitives.between<CharUtil.CharStream[], CharUtil.CharStream, Expression<any>>(p1)(Primitives.char(')'))(expr);
        let curly= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream>(Primitives.ws())(Primitives.ws())(Primitives.char('{'));
        let body= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>>(curly)(Primitives.char('}'))(bodyParse);
        var f= (tup : [Expression<any>, Expression<any>]) => {return new WhileNode(tup[0], tup[1], ws);}
        return Primitives.seq<Expression<any>, Expression<any>, WhileNode>(cond)(body)(f)(i);
    }

    /**
     * ForLoop parses valid for loops in the form "for(initial, condition, post) { body;}" and returns a ForNode
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    export let ForLoop : Primitives.IParser<ForNode> = i =>{
        let args= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>[]>(Primitives.ws())(Primitives.ws())(funAppArgList());
        let ws = "";
        let precedingWS = Primitives.appfun<CharUtil.CharStream, string>(Primitives.ws())(x => ws = x.toString());
        let p1= Primitives.right<CharUtil.CharStream, Expression<any>[]>(Primitives.right<string, CharUtil.CharStream>(precedingWS)(Primitives.str('for')))(args);
        let curly= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream>(Primitives.ws())(Primitives.ws())(Primitives.char('{'));
        let expr= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>>(Primitives.choice(Primitives.ws())(Primitives.nl()))(Primitives.ws())(ExpressionParser);
        let body= Primitives.between<CharUtil.CharStream, CharUtil.CharStream, Expression<any>>(curly)(Primitives.char('}'))(expr);
        var f= (tup : [Expression<any>[], Expression<any>]) => {
            let init= tup[0][0];
            let cond= tup[0][1];
            let post= tup[0][2];
            let body= tup[1];
            return new ForNode(init, cond, post, body, ws);
        }
        return Primitives.seq<Expression<any> [], Expression<any>, ForNode>(p1)(body)(f)(i);
    }

    export function singleComment() : Primitives.IParser<CharUtil.CharStream> {
        let p1 = Primitives.many1<CharUtil.CharStream>(Primitives.item())
        let p2 = Primitives.appfun<CharUtil.CharStream[], CharUtil.CharStream>(p1)(xs => CharUtil.CharStream.concat(xs));
        return Primitives.between<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream>(Primitives.str('//'))(Primitives.nl())(p2);
        //return Primitives.seq<CharUtil.CharStream, CharUtil.CharStream, CharUtil.CharStream[]>(Primitives.str('//'))(Primitives.nl())(x=>x);
    }

    export function multiLineComment () {
        let p1 = Primitives.many1<CharUtil.CharStream>(Primitives.item())
        let p2 = Primitives.appfun<CharUtil.CharStream[], CharUtil.CharStream>(p1)(xs => CharUtil.CharStream.concat(xs));
        return Primitives.between(Primitives.str('\/**'))(Primitives.str('*\/'))(p2);
    }
}
