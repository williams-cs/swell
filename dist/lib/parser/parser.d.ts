import { Primitives, CharUtil } from 'pants';
import { StringNode, Expression, DeclareOp, VariableNode, UnaryOperation, ListNode, Return, FunDef, BooleanNode, Conditional, RepeatNode, WhileNode, ForNode } from '../../index';
import { Option } from 'space-lift';
export declare namespace Parser {
    /**
     * to be moved to Pants
     * number parses numbers by repeatedly applying the digit parser
     */
    function number(): Primitives.IParser<number>;
    /**
     * to be moved to Pants
     * string is an arbitrary string parser that repeatedly applies the letter primitive
     * returns a CharStream representing the entire parsed string
     */
    function string(): Primitives.IParser<CharUtil.CharStream>;
    /**
     * to be moved to Pants
     * punctuation parses all possible punctuation characters
     */
    function punctuation(): Primitives.IParser<CharUtil.CharStream>;
    /**
     * parse is a function that wraps the input text in a CharStream
     * and passes it to the upper-level parse function
     * @param program a string representing program text
     */
    function parse(program: string): Option<Expression<any>>;
    /**
     * Expression parser first searches for the first expression of a sequence and either
     * another expression or the end of the program (NOP) and returns a sequence node
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    let ExpressionParser: Primitives.IParser<Expression<any>>;
    /**
     * Searches through all possible expressions except for sequences
     * used to avoid infinite looping in upper level parse
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    let ExpressionParserNoSeq: Primitives.IParser<Expression<{}>>;
    /**
     * Searches through all possible expressions except for binOp expressions
     * used to avoid infinite looping in the binary expression parser
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    let ExpressionParserNoBinOp: Primitives.IParser<Expression<{}>>;
    /**
     * Searches through all possible expressions except for logical expressions
     * used to avoid infinite looping in the logical expression parser
     * @param i a nonsense parameter used to avoid bug of eager parsing
     */
    let ExpressionParserNoLogic: Primitives.IParser<Expression<{}>>;
    /**
     * lNumber is used to wrap parsed numbers in NumberNodes for the AST
     */
    function lNumber(): Primitives.IParser<Expression<{}>>;
    /**
     * binOpsChar parses all possible binary operators, such as + or -
     */
    function binOpsChar(): Primitives.IParser<CharUtil.CharStream>;
    /**
     * binOpsShort returns a tuple where the first element is the binary operator (CharStream)
     * and the second element is the expression to the right of the operator (Expression<{}>)
     */
    function binOpShort(): (cs: CharUtil.CharStream) => Primitives.Outcome<[CharUtil.CharStream, Expression<{}>]>;
    /**
     * binOpExpr parses all possible binary operation expressions and returns the
     * corresponding AST node construct (also parses postfix increments/decrements like i++)
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    let binOpExpr: Primitives.IParser<Expression<any>>;
    /**
     * unOpsChar parses all possible unary operators
     * Only negations are supported, but more can be added as needed
     * @param i nonsense parameter used to avoid the bug with eager evaluation
     */
    let unOpsChar: Primitives.IParser<CharUtil.CharStream>;
    /**
     * unOpsExpr wraps a unary operation expression in the corresponding
     * AST node and returns it
     * @param i nonsense parameter used to avoid the bug with eager evaluation
     */
    let unOpsExpr: Primitives.IParser<UnaryOperation<{}>>;
    /**
     * lstring parses valid strings in the SWELL language
     * a valid string is surrounded by quotations and consists of letters, numbers, punctuation, and/or whitespace
     */
    function lstring(): (istream: CharUtil.CharStream) => Primitives.Outcome<CharUtil.CharStream>;
    /**
     * lstring2 wraps strings parsed by lstring in StrinNode objects and returns them
     */
    function lstring2(): (istream: CharUtil.CharStream) => Primitives.Failure | Primitives.Success<StringNode>;
    /**
     * varNameParse parses valid variable names
     * variable names in SWELL begin with a lowercase char and are followed
     * by letters or digits
     */
    function varNameParse(): Primitives.IParser<VariableNode>;
    /**
     * varDecParse parses valid variable declarations in the form "var x"
     * the parser then wraps the parsed value in a variable node for the AST
     */
    function varDecParse(): Primitives.IParser<VariableNode>;
    /**
     * Declare parses variable declarations in the form "var x = 2"
     * and returns a DeclareOp node
     */
    function Declare(): Primitives.IParser<DeclareOp<any>>;
    /**
     * ListHead parses all lists in the SWELL language, including empty lists
     * Lists are surrounded by square brackets and each element is separated by a comma
     * returns a listNode object
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    let ListHead: Primitives.IParser<ListNode>;
    /**
     * List Tail parses second through last elements of a list, each separated by a comma
     * returns an array of Expressions that will be accessed by ListHead
     */
    function ListTail(): Primitives.IParser<Expression<any>[]>;
    /**
     * funDefArgList parses argument lists for function definitions,
     * surrounded by parens and separated by commas
     * returns an array of the parameters
     */
    function funDefArgList(): Primitives.IParser<string[]>;
    /**
     * funAppArgList parses argument lists for function applications, including empty args lists
     * the parser returns an array of Expression objects that represent the arguments
     */
    function funAppArgList(): Primitives.IParser<Expression<any>[]>;
    /**
     * returnParser parses valid return statements in the form "return x"
     * wraps the parsed value in a Return node for the AST
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    let returnParser: Primitives.IParser<Return>;
    /**
     * funDef parses valid function definitions in the form "fun functionName(argList){ body;}"
     * the parser returns a funDef node for the AST
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    let funDef: Primitives.IParser<FunDef<any>>;
    function getNonOverlappingCoords(): [number, number];
    /**
     * funApp parses valid function applications in the form "functionName(argsList)" and returns a funApp node
     * parser checks for built-in functions, like print, ellipse, and rect; and returns the valid AST node
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    let funApp: Primitives.IParser<Expression<any>>;
    /**
     * BoolParse parses valid booleans, true and false, and returns a BooleanNode
     */
    function BoolParse(): Primitives.IParser<BooleanNode>;
    /**
     * logicChar parses all logical operators in the SWELL language and returns the consumed operator
     */
    function logicChar(): Primitives.IParser<CharUtil.CharStream>;
    /**
     * logicShort returns a tuple, where the first element represents the logical operator and
     * the second element is the expression to the right of the operator
     */
    function logicShort(): Primitives.IParser<[CharUtil.CharStream, Expression<any>]>;
    /**
     * logicExpr parses logical expressions and returns the corresponding AST node
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    function LogicExpr(): Primitives.IParser<Expression<any>>;
    /**
     * IfParse parses valid if statements in the form "if(condition){ body; }"
     * returns an array where the first elem is the condition and the second is the body
     */
    function IfParse(): Primitives.IParser<Expression<any>[]>;
    /**
      * IfElseParse parses valid if else statements in the form "if(condition){ body; } else{ body2;}"
      * returns an array where the first elem is the condition and the second is the first body and the third is body2
      */
    function IfElseParse(): Primitives.IParser<Expression<any>[]>;
    /**
     * condParse parses possible conditional statements, including if and if/else statements
     * returns a Conditional node
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    let condParse: Primitives.IParser<Conditional>;
    /**
     * RepeatLoop parses valid repeat statement of the form "repeat(n){ body; }"
     * returns an array where the first elem is number of repeats and the second is the body
     */
    function RepeatLoop(): Primitives.IParser<Expression<any>[]>;
    /**
     * loopParse parses possible loop statements, is a helper for RepeatLoop
     * returns a RepeatNode
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    let loopParse: Primitives.IParser<RepeatNode>;
    /**
     * WhileLoop parses valid while loops in the form "while(condition) { body;}"
     * returns a WhileNode for the AST
     */
    let WhileLoop: Primitives.IParser<WhileNode>;
    /**
     * ForLoop parses valid for loops in the form "for(initial, condition, post) { body;}" and returns a ForNode
     * @param i a nonsense parameter used to avoid the bug with eager evaluation
     */
    let ForLoop: Primitives.IParser<ForNode>;
    function singleComment(): Primitives.IParser<CharUtil.CharStream>;
    function multiLineComment(): Primitives.IParser<{}>;
}
