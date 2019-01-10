import { Parser } from '../lib/parser/parser';
import { assert, expect } from 'chai';
import 'mocha';
import { CharUtil, Primitives } from 'pants/lib';
import { SequenceNode, StringNode, Return, Scope, NumberNode, BooleanNode, WhileNode, ForNode, Conditional, ListNode, FunDef, FunApp, PrintNode, VariableNode, NegOp, NOP, Dimensions, EllipseNode,
    RectangleNode, Equals, NotEqual, And, Or, GreaterThan, LessThan, Not, GreaterThanEq, LessThanEq, AssignOp, PlusOp, Decrement, DeclareOp, Increment, EphNode } from '../index';

describe('Number Parser test', () =>{
    it('should return a node with digit value', () => {
        let result= Parser.parse("54;");
        let node= new SequenceNode(new NumberNode(54),new NOP());
        if(result.isDefined()){
            expect(result.get()).to.eql(node);
        }
        else{
            assert.fail();
        }
    });
});

describe('Parse function test', () =>{
    it('should not parse program text, now will only parse if contains numbers',() => {
        const s = "";
        let result= Parser.parse(s);
        let check=result.isDefined();
        if(check)
        {
            assert.fail();
        }
        else{
            assert(true);
        }
    });
});

// describe('binOps parser test', () =>{
//     it('should succesfully parse a binary operator', () =>{
//         const input= new CharUtil.CharStream('+2');
//         let result=Parser.binOpsChar()(input);
//         switch(result.tag){
//             case "success":
//                 expect(result.inputstream.toString()).to.equal('2');
//                 break;
//             case "failure":
//                 assert.fail();
//         }
//     });
//     it('should fail if no binOps are present',()=>{
//         const input= new CharUtil.CharStream("hello");
//         let result= Parser.binOpsChar()(input);
//         switch(result.tag){
//             case "failure":
//                 assert(true);
//                 break;
//             case "success":
//                 assert.fail();
//         }
//     });
// });

// describe('binOpShort parser test', () => {
//     it('should not parse a binary expression with invalid operands', () =>{
//         const input= new CharUtil.CharStream('+ hello ');
//         let result= Parser.binOpShort()(input);
//         //console.log(result);
//         switch(result.tag){
//             case "failure":
//                 assert(true);
//                 break;
//             case "success":
//                 assert.fail();
//         }
//     });
//     it('should parse the second half of a binary expression', () => {
//         const input= new CharUtil.CharStream("+   2"); //extra whitespace included to make sure white space parser works right
//         let result= Parser.binOpShort()(input);
//         //const test= ["+", new NumberNode(2)];
//         switch(result.tag){
//             case "success":
//             break;
//             case "failure":
//                 assert.fail();
//         }
//     });
// });

describe('binOpExpr parser test', () => {
    it("should parse an entire binary expression", () => {
        const input = "6 - 3;";
        let result = Parser.parse(input);
        if(result.isDefined()){
            //console.log(result.get().toString());
        }
    });

    it("should parse an increment expression", () => {
        const input = new CharUtil.CharStream("i++");
        let result = Parser.binOpExpr(input);
        switch(result.tag){
            case "success":
                //console.log(result.result.toString());
                expect(result.result).to.eql(new Increment(new VariableNode('i')));
                break;
            case "failure":
                assert.fail();
        }
    });
    it("should parse an increment expression", () => {
        const input = new CharUtil.CharStream("  2++");
        let result = Parser.binOpExpr(input);
        switch(result.tag){
            case "success":
                //console.log(result.result.toString());
                expect(result.result).to.eql(new Increment(new NumberNode(2), "  "));
                expect(result.result.eval(null)).to.eql(new NumberNode(3));
                break;
            case "failure":
                assert.fail();
        }
    });
    it("should parse an decrement expression", () => {
        const input = new CharUtil.CharStream("i--");
        let result = Parser.binOpExpr(input);
        switch(result.tag){
            case "success":
                //console.log(result.result.toString());
                expect(result.result).to.eql(new Decrement(new VariableNode('i')));
                break;
            case "failure":
                assert.fail();
        }
    });
    it("should parse an decrement expression", () => {
        const input = new CharUtil.CharStream("  2--");
        let result = Parser.binOpExpr(input);
        switch(result.tag){
            case "success":
                //console.log(result.result.toString());
                expect(result.result).to.eql(new Decrement(new NumberNode(2), "  "));
                expect(result.result.eval(null)).to.eql(new NumberNode(1));
                break;
            case "failure":
                assert.fail();
        }
    });
    it("should parse an entire binary expression", () => {
        const input = new CharUtil.CharStream("6 - 3 + 5 * 1");
        let result = Parser.binOpExpr(input);
        switch(result.tag){
            case "success":
                console.log(result.result.toString());
                //expect(result.result.eval(null)).to.deep.equal(new NumberNode(3));
                break;
            case "failure":
                assert.fail();
        }
    });
        it("should parse an assignment expression", () => {
            const input = "var i = 0;";
            let result = Parser.parse(input);
            if(result.isDefined()) {
                //console.log(result.get().toString());
                expect(result.get()).to.eql(new SequenceNode(new AssignOp(new VariableNode('i'), new NumberNode(0)), new NOP()));
            }
            else {
                assert.fail();
            }
    });
    it("should parse an assignment expression", () => {
        const input = "var i = 0;\n i = 2;";
        let result = Parser.parse(input);
        let test = new SequenceNode(new DeclareOp(new VariableNode('i'), new NumberNode(0)), new SequenceNode(new AssignOp(new VariableNode('i'), new NumberNode(2)), new NOP()));
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
});
});


describe('unOpExpr parser test', () => {
    it('should successfully parse a unary expression (negation)', () => {
        const input=new CharUtil.CharStream('- 2;');
        let result=Parser.ExpressionParser(input);
        switch(result.tag){
            case "success":
                //console.log(result.result.toString());
                expect(result.result).to.eql(new SequenceNode(new NegOp(new NumberNode(2)), new NOP()));
                break;
            case "failure":
                assert.fail();
        }
    });
});

describe('Arbitrary string Parser', () => {
    it('should be able to parse string between whitespaces', () => {
        const input= new CharUtil.CharStream('   input ');
        let result= Parser.string()(input);
        switch(result.tag){
            case "success":
                expect(result.result.toString()).to.eql("input");
                break;
            case "failure":
                assert.fail();
        }
    });
});

describe('String parser', () => {
    it ('should be able to parse an empty string' , () => {
        let result= Parser.parse("\"\";");
        var test= new SequenceNode(new StringNode(''), new NOP());
        if(result.isDefined()){
            expect(result.get()).to.eql(test);
        }
        else {
            assert.fail();
        }
    });
    it ('should be able to parse a string surrounded by quotations' , () => {
        let result= Parser.parse("\"hello world!\";");
        var test= new SequenceNode(new StringNode('hello world!'), new NOP());
        if(result.isDefined()){
            expect(result.get()).to.eql(test);
        }
        else {
            assert.fail();
        }
    });
    it ('should be able to parse a string surrounded by quotations' , () => {
        let result= Parser.parse("\"Kiersten's hello world!\";");
        var test= new SequenceNode(new StringNode("Kiersten's hello world!"), new NOP());
        if(result.isDefined()){
            expect(result.get()).to.eql(test);
        }
        else {
            assert.fail();
        }
    });
    it('should not parse a string with incorrect number of quotation marks', () => {
        let result= Parser.parse("\"hello;");
        if(result.isDefined()){
            assert.fail();
        }
        else{
            assert(true);
        }
    });
});

describe('String parser to String Node', () => {
    it ('should be able to parse a string surrounded by quotations' , () => {
        let result= Parser.parse("\"hello\";");
        var test= new SequenceNode(new StringNode('hello'), new NOP());
        if(result.isDefined()){
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
});

describe('Variable declaration parser', () =>{
   it('should parse a variable declaration with proper syntax', () =>{
       let result= Parser.parse('var input1 ;');
       var test= new SequenceNode(new VariableNode('input1'), new NOP());
        if (result.isDefined()){
            expect(result.get()).to.deep.equal(test);
        }
        else {
            assert.fail();
        }
   });
});

// describe("Variable assignment parser", () => {
//     it('should parse a numeric variable assignment with proper syntax', () => {
//         const input = 'var input = 2;';
//         let result = Parser.parse(input);
//         var test= new SequenceNode(new AssignOp(new VariableNode('input'), new NumberNode(2)), new NOP())
//         if(result.isDefined()){
//             console.log(result.get().toString());
//             expect(result.get()).to.eql(test);
//         }
//         else{
//             assert.fail();
//         }
//     });
//     it ('should parse a string variable assignment with proper syntax', () => {
//         const input= "var input = \"hello\"";
//         let result = Parser.parse(input);
//         var test= new SequenceNode(new AssignOp(new VariableNode('input'), new StringNode('hello')), new NOP())
//         if(result.isDefined()){
//             console.log(result.get().toString());
//             expect(result.get()).to.eql(test);
//         }
//         else{
//             assert.fail();
//         }
//     });
//     // it('should not parse assignments missing the var keyword', () => {
//     //     const input= 'input = 2;';
//     //     let result = Parser.parse(input);
//     //     if(result.isDefined()){
//     //         assert.fail();
//     //     }
//     //     else{
//     //         assert(true);
//     //     }
//     // });
// });

describe('List Parser Test', () =>{
    it('should correctly parse an empty list', () => {
        let result= Parser.parse('[];');
        var test= new SequenceNode(new ListNode([]), new NOP());
        if(result.isDefined()){
            expect(result.get()).to.deep.equal(test);
        }
        else{
            assert.fail();
        }
    });
    it('should correctly parse a list', () => {
        let result= Parser.parse('  [ 4 , 3 , 2 , 1];');
        var test= new SequenceNode(new ListNode([new NumberNode(4), new NumberNode(3), new NumberNode(2) , new NumberNode(1)], "  "), new NOP());
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
    it('should correctly parse a list with one', () => {
        let result= Parser.parse('[1];');
        var test= new SequenceNode(new ListNode([new NumberNode(1)]), new NOP());
        if(result.isDefined()){
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
});

describe('Function declaration arg list parser', () => {
    it('should parse an empty argument list', () => {
        const input= new CharUtil.CharStream("()");
        let result= Parser.funDefArgList()(input);
        switch(result.tag){
            case "success":
                expect(result.result).to.eql([]);
                break;
            case "failure":
                assert.fail();
                break;
        }
    });
    it('should parse an argument list of multiple elements', () => {
        const input= new CharUtil.CharStream('(name, date, year)');
        let result= Parser.funDefArgList()(input);
        switch(result.tag){
            case "success":
                expect(result.result).to.eql(["name", "date", "year"]);
                break;
            case "failure":
                assert.fail();
        }
    });
});

describe('Function application arg list parser', () => {
    it('should parse an empty argument list', () => {
        const input= new CharUtil.CharStream("()");
        let result= Parser.funAppArgList()(input);
        switch(result.tag){
            case "success":
                expect(result.result).to.eql([]);
                break;
            case "failure":
                assert.fail();
                break;
        }
    });
    it('should parse an argument list of multiple elements', () => {
        const input= new CharUtil.CharStream('(1, 2, 3)');
        let result= Parser.funAppArgList()(input);
        switch(result.tag){
            case "success":
                expect(result.result).to.eql([new NumberNode(1),new NumberNode(2),new NumberNode(3)]);
                break;
            case "failure":
                assert.fail();
        }
    });
});

describe('Sequence Node Parser', () => {
    it('should be able to read multiple lines of code', () => {
        const input= '1;\n 2;'
        let result= Parser.parse(input);
        if(result.isDefined()){
            expect(result.get()).to.eql(new SequenceNode(new NumberNode(1), new SequenceNode(new NumberNode(2), new NOP())));
        }
        else{
            assert.fail();
        }
    });
    it('should be able to read multiple lines of code', () => {
        const input= "\"hello\";\n\"goodbye\";";
        let result= Parser.parse(input);
        if(result.isDefined()){
            expect(result.get()).to.eql(new SequenceNode(new StringNode('hello'), new SequenceNode(new StringNode('goodbye'), new NOP())));
        }
        else{
            assert.fail();
        }
    });
 });

describe('Return statement parser', () => {
    it('should parse the return statement and create return node', () => {
        const input= '  return 1;';
        let result= Parser.parse(input);
        var test = new SequenceNode(new Return(new NumberNode(1), "  "), new NOP());
        if(result.isDefined()){
            expect(result.get()).to.eql(test);
        }
        else {
            assert.fail();
        }
    });
    it('should parse the return statement and create return node', () => {
        const input= "return \"hello\";";
        let result= Parser.parse(input);
        var test= new SequenceNode(new Return(new StringNode('hello')), new NOP());
        if(result.isDefined()){
            expect(result.get()).to.eql(test);
        }
        else {
            assert.fail();
        }
    });
});

describe('Function Definition parser', () => {
    it('should be able to parse and return a function definition', () => {
        const input = 'fun foo (name, date, age){ return 1; }\n';
        const result = Parser.parse(input);
        var test= new SequenceNode(new FunDef("foo", (new SequenceNode(new Return(new NumberNode(1)), new NOP())), ['name', 'date', 'age']), new NOP());
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
});

describe('Function Application parser', () => {
    it('should be able to parse and return a function application', () => {
        const input = '  foo(1,2,3);';
        const result = Parser.parse(input);
        var test= new SequenceNode(new FunApp('foo',[new NumberNode(1), new NumberNode(2), new NumberNode(3)], "  "), new NOP());
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
    it('should be able to parse a print statement and return a PrintNode (special case)', () => {
        const input = '    print("hello");';
        const result = Parser.parse(input);
        //console.log(result);
        var test= new SequenceNode(new PrintNode(new StringNode('hello'), true, new Dimensions(new NumberNode(100), new NumberNode(100), new NumberNode(1)), "    "), new NOP());
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
});

describe('Boolean Parser', () => {
    it('should be able to parse a boolean with val true', () => {
        let result= Parser.parse('true;');
        var test= new SequenceNode(new BooleanNode(true), new NOP());
        if(result.isDefined()){
                expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
    it('should be able to parse a boolean with val false', () => {
        let result= Parser.parse('false;');
        var test= new SequenceNode(new BooleanNode(false), new NOP());
        if(result.isDefined()){
                expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
});

describe('While Loop Parser', () => {
    it('should be able to parse a simple while loop construct', () => {
        const input= '   while( true ) {\n"goodbye"; }';
        let result= Parser.parse(input);
        let test= new SequenceNode(new WhileNode(new BooleanNode(true), new SequenceNode(new StringNode('goodbye'), new NOP()), "   "), new NOP());
        if (result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
});

describe('If Statement Parser', () => {
    it('should be able to parse a simple if statement', () => {
        const input= 'if( true ) {\n"goodbye"; }';
        let result= Parser.parse(input);
        var test = new SequenceNode(new Conditional(new BooleanNode(true), new SequenceNode(new StringNode('goodbye'), new NOP())), new NOP());
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
    it('should be able to parse a simple if statement', () => {
        const input= 'if    ( true ) {\n"goodbye"; }';
        let result= Parser.parse(input);
        var test = new SequenceNode(new Conditional(new BooleanNode(true), new SequenceNode(new StringNode('goodbye'), new NOP())), new NOP());
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
    it('should be able to parse a simple if statement', () => {
        const input= 'if ( true ) {\n"goodbye"; }';
        let result= Parser.parse(input);
        var test = new SequenceNode(new Conditional(new BooleanNode(true), new SequenceNode(new StringNode('goodbye'), new NOP())), new NOP());
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
    it('should be able to parse a simple if statement', () => {
        const input= 'if( true ) {\n"goodbye"; }\n if ( false ) {\n "hello"; }';
        let result= Parser.condParse(new CharUtil.CharStream(input));
        switch(result.tag){
            case "success":
                console.log(result.result.toString());
                console.log(result.result.falseBranch);
                break;
            //expect(result.get()).to.eql(test);
            case "failure":
                assert.fail();
        }
    });
    it('should be able to parse an if/else statement', () => {
        const input= 'if( true ) {\n"goodbye"; }\n else {\n"hello"; }';
        let result= Parser.parse(input);
        var test=
            new SequenceNode(
                new Conditional(
                    new BooleanNode(true),
                    new SequenceNode(
                        new StringNode('goodbye'),
                        new NOP()
                    ),
                    new SequenceNode(
                        new StringNode('hello'),
                        new NOP()
                    )
                ),
                new NOP()
            );
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
});

describe('Logical Expressions parser test', () => {
    it("should parse an equality logical expression", () => {
        const input = "2 equals 2;";
        let result = Parser.parse(input);
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(new SequenceNode(new Equals(new NumberNode(2), new NumberNode(2)), new NOP()));
        }
        else {
            assert.fail();
        }
    });
    it("should parse an equality logical expression", () => {
        const input = "2 == 3;";
        let result = Parser.parse(input);
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(new SequenceNode(new Equals(new NumberNode(2), new NumberNode(3)), new NOP()));
        }
        else {
            assert.fail();
        }
    });
    it("should parse a not equals logical expression", () => {
        const input = "1 not equals 2;";
        let result = Parser.parse(input);
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(new SequenceNode(new NotEqual(new NumberNode(1), new NumberNode(2)), new NOP()));
        }
        else {
            assert.fail();
        }
    });
    it("should parse an and logical expression", () => {
        const input = "true and false;";
        let result = Parser.parse(input);
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(new SequenceNode(new And(new BooleanNode(true), new BooleanNode(false)), new NOP()));
        }
        else {
            assert.fail();
        }
    });
    it("should parse an or logical expression", () => {
        const input = "true or false;";
        let result = Parser.parse(input);
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(new SequenceNode(new Or(new BooleanNode(true), new BooleanNode(false)), new NOP()));
        }
        else {
            assert.fail();
        }
    });
    it("should parse a greater than logical expression", () => {
        const input = "2 > 3;";
        let result = Parser.parse(input);
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(new SequenceNode(new GreaterThan(new NumberNode(2), new NumberNode(3)), new NOP()));
        }
        else {
            assert.fail();
        }
    });
    it("should parse a less than logical expression", () => {
        const input = "2 < 3;";
        let result = Parser.parse(input);
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(new SequenceNode(new LessThan(new NumberNode(2), new NumberNode(3)), new NOP()));
        }
        else {
            assert.fail();
        }
    });
    it("should parse a not logical expression", () => {
        const input = "not true;";
        let result = Parser.parse(input);
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(new SequenceNode(new Not(new BooleanNode(true, " ")), new NOP()));
        }
        else {
            assert.fail();
        }
    });
    it("should parse a greater than/equals logical expression", () => {
        const input = "2 >= 3;";
        let result = Parser.parse(input);
        if(result.isDefined()){
           // console.log(result.get().toString());
            expect(result.get()).to.eql(new SequenceNode(new GreaterThanEq(new NumberNode(2), new NumberNode(3)), new NOP()));
        }
        else {
            assert.fail();
        }
    });
    it("should parse a less than/equals logical expression", () => {
        const input = "2 <= 3;";
        let result = Parser.parse(input);
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(new SequenceNode(new LessThanEq(new NumberNode(2), new NumberNode(3)), new NOP()));
        }
        else {
            assert.fail();
        }
    });
});

describe('For Loop Parser test', () => {
    it('should be able to parse a valid for loop construct (with new line)', () => {
        let input= '   for( "hello" , true, "yes") {\n "goodbye"; }';
        let result= Parser.parse(input);
        var test = new SequenceNode(new ForNode(new StringNode('hello'), new BooleanNode(true), new StringNode('yes'), new SequenceNode(new StringNode('goodbye'), new NOP()), "   "), new NOP());
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
    it('should be able to parse a valid for loop construct (with new line)', () => {
        let input= 'var x = 0;\nfor(var i = 0 , i < 10, i++) {\n x++; }';
        let result= Parser.parse(input);
        let body = new SequenceNode(new Increment(new VariableNode('x')), new NOP());
        let arg1= new DeclareOp(new VariableNode('i'), new NumberNode(0));
        let arg2 = new LessThan(new VariableNode('i'), new NumberNode(10));
        let arg3 = new Increment(new VariableNode('i'));
        let test = new SequenceNode(new DeclareOp(new VariableNode('x'), new NumberNode(0)), new SequenceNode(new ForNode(arg1, arg2, arg3, body), new NOP()));
        if(result.isDefined()){
            //console.log(result.get());
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
    it('should be able to parse a valid for loop construct (Without new line)', () => {
        let input= 'for( "hello" , true, "yes") { "goodbye"; }';
        let result= Parser.parse(input);
        var test = new SequenceNode(new ForNode(new StringNode('hello'), new BooleanNode(true), new StringNode('yes'), new SequenceNode(new StringNode('goodbye'), new NOP())), new NOP());
        if(result.isDefined()){
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
});

describe('Ellipse parser', () => {
    it('should parse an ellipse function application with proper syntax', () => {
        let input = '  ellipse( 5 , 5);'
        let result= Parser.parse(input);
        var test= new SequenceNode(new EllipseNode(new NumberNode(5), new NumberNode(5), "  "), new NOP());
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
    it('should parse an ellipse function application with proper syntax', () => {
        let input = 'print(ellipse( 5 , 5));'
        let result= Parser.parse(input);
        var ellipse= new EllipseNode(new NumberNode(5), new NumberNode(5), "")
        var test= new SequenceNode(new PrintNode(ellipse, true, new Dimensions(new NumberNode(200), new NumberNode(125), new NumberNode(1))), new NOP());
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
});

describe('function definition and application test', () => {
    it('should parse a sequential function definiton and application', () => {
        let input = 'fun foo() {\n print("hello world");}\n foo();'
        let result = Parser.parse(input);
        if(result.isDefined()){
            //console.log(result.get());
            //console.log(result.get().toString());
        }
        else{
            assert.fail();
        }
    });
});

describe('Rectangle parser', () => {
    it('should parse a rectangle function application with proper syntax', () => {
        let input = '  rect( 5 , 5);'
        let result= Parser.parse(input);
        var test= new SequenceNode(new RectangleNode(new NumberNode(5), new NumberNode(5), "  "), new NOP());
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
    it('should parse a rectangle function application with proper syntax', () => {
        let input = 'print(rect( 5 , 5));'
        let result= Parser.parse(input);
        var rect= new RectangleNode(new NumberNode(5), new NumberNode(5))
        var test= new SequenceNode(new PrintNode(rect, true, new Dimensions(new NumberNode(100), new NumberNode(175), new NumberNode(1))), new NOP());
        if(result.isDefined()){
            expect(result.get()).to.eql(test);
        }
        else{
            assert.fail();
        }
    });
});

describe("Variable Name Parser", () => {
    it("should parse a valid variable name", () => {
        let input= new CharUtil.CharStream('paRser123');
        let result= Parser.varNameParse()(input);
        switch(result.tag){
            case "success":
                //console.log(result.result.toString())
                expect(result.result).to.eql(new VariableNode('paRser123'));
                break;
            case "failure":
                assert.fail();
        }
    });
    it("should not parse an invalid variable name", () => {
        let input= new CharUtil.CharStream('1try');
        let result= Parser.varNameParse()(input);
        switch(result.tag){
            case "success":
                assert.fail();
            case "failure":
                assert(true);
                break;
        }
    });
    it('should be able to reference declared variables', () => {
        const input = 'var i = 0;\n var j = i + 1;';
        var leftAssign = new AssignOp(new VariableNode('i'), new NumberNode(0));
        var rightAssign = new AssignOp(new VariableNode('j'), new PlusOp(new VariableNode('i'), new NumberNode(1)));
        var test = new SequenceNode(leftAssign, new SequenceNode(rightAssign, new NOP()));
        let result= Parser.parse(input);
        if(result.isDefined()){
            //console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else {
            assert.fail();
        }
    });
});

describe('Ephelia easter egg test', () => {
    it('should parse a print ephelia statement', () => {
        const input = 'print(eph(10, 10));';
        let test = new SequenceNode(new PrintNode(new EphNode(new NumberNode(10), new NumberNode(10)), true, new Dimensions(new NumberNode(200),new NumberNode(200), new NumberNode(1))), new NOP());
        let result = Parser.parse(input);
        if(result.isDefined()){
            console.log(result.get().toString());
            expect(result.get()).to.eql(test);
        }
        else {
            assert.fail();
        }
    });
});

describe('parsing a string containing numbers', () => {
  it('should parse successfully', () => {
    const input = '"9"';
    let test = new SequenceNode(new StringNode("9"), new NOP());
    let result = Parser.parse(input);
    //const cs = new CharUtil.CharStream(input);

    if (result.isDefined()) {
       console.log(result.get().toString());
       expect(result.get()).to.eql(test);
    } else {
       assert.fail();
    }
/*
    let o = Parser.lstring()(cs);
    switch(o.tag){
        case "success":
          let result = o.result;
          console.log(result.toString());
          expect(result).to.eql(test);
        case "failure":
          assert.fail();
          */
  });
});

describe('Comment parser', () => {
    // it("should parse a single line comment (between backslashes and newline)", () => {
    //     //let input = new CharUtil.CharStream("// this is an example comment\n");
    //     let input = new CharUtil.CharStream('hi there');
    //     let result= Parser.singleComment()(input);
    //     //console.log(result);
    //     switch(result.tag){
    //         case "success":
    //             console.log(result.result);
    //             //expect(result.result).to.eql(' this is an example comment');
    //             break;
    //         case 'failure':
    //             assert.fail();
    //     }
    // });
    // it('should parse multi-line comments', () => {
    //     let input = new CharUtil.CharStream("\/**hello*\/")
    //     let result= Parser.multiLineComment()(input);
    //     console.log(result);
    // });
});
// describe('Demo Test', () => {
//     it('should parse the demo program correctly and be able to return back to program text', () => {
//         const input = 'print("hello");\n print(ellipse(20, 20), 50, 100)\n print(rect(50, 50), 100, 100);';
//         let result = Parser.parse(input);
//         //console.log(result);
//         if(result.isDefined()){
//             console.log(result.get().toString());
//         }
//         else{
//             assert.fail();
//         }
//     });
// });
