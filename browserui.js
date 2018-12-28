(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scope_1 = require("./lib/structural/Scope");
exports.Scope = Scope_1.Scope;
/* BINARY OPS */
var AssignOp_1 = require("./lib/binops/AssignOp");
exports.AssignOp = AssignOp_1.AssignOp;
var BinaryOperation_1 = require("./lib/binops/BinaryOperation");
exports.BinaryOperation = BinaryOperation_1.BinaryOperation;
var DivOp_1 = require("./lib/binops/DivOp");
exports.DivOp = DivOp_1.DivOp;
var MinusOp_1 = require("./lib/binops/MinusOp");
exports.MinusOp = MinusOp_1.MinusOp;
var MulOp_1 = require("./lib/binops/MulOp");
exports.MulOp = MulOp_1.MulOp;
var PlusOp_1 = require("./lib/binops/PlusOp");
exports.PlusOp = PlusOp_1.PlusOp;
var GreaterThan_1 = require("./lib/logic/GreaterThan");
exports.GreaterThan = GreaterThan_1.GreaterThan;
var GreaterThanEq_1 = require("./lib/logic/GreaterThanEq");
exports.GreaterThanEq = GreaterThanEq_1.GreaterThanEq;
var LessThan_1 = require("./lib/logic/LessThan");
exports.LessThan = LessThan_1.LessThan;
var LessThanEq_1 = require("./lib/logic/LessThanEq");
exports.LessThanEq = LessThanEq_1.LessThanEq;
var DeclareOp_1 = require("./lib/binops/DeclareOp");
exports.DeclareOp = DeclareOp_1.DeclareOp;
var And_1 = require("./lib/logic/And");
exports.And = And_1.And;
var Or_1 = require("./lib/logic/Or");
exports.Or = Or_1.Or;
var Equals_1 = require("./lib/logic/Equals");
exports.Equals = Equals_1.Equals;
var NotEqual_1 = require("./lib/logic/NotEqual");
exports.NotEqual = NotEqual_1.NotEqual;
var Increment_1 = require("./lib/binops/Increment");
exports.Increment = Increment_1.Increment;
var Decrement_1 = require("./lib/binops/Decrement");
exports.Decrement = Decrement_1.Decrement;
/* UNARY OPS */
var UnaryOperation_1 = require("./lib/unops/UnaryOperation");
exports.UnaryOperation = UnaryOperation_1.UnaryOperation;
var NegOp_1 = require("./lib/unops/NegOp");
exports.NegOp = NegOp_1.NegOp;
var Not_1 = require("./lib/logic/Not");
exports.Not = Not_1.Not;
/* DATA TYPES */
var ListNode_1 = require("./lib/lists/ListNode");
exports.ListNode = ListNode_1.ListNode;
var NumberNode_1 = require("./lib/prims/NumberNode");
exports.NumberNode = NumberNode_1.NumberNode;
var StringNode_1 = require("./lib/prims/StringNode");
exports.StringNode = StringNode_1.StringNode;
var BooleanNode_1 = require("./lib/prims/BooleanNode");
exports.BooleanNode = BooleanNode_1.BooleanNode;
var NOP_1 = require("./lib/prims/NOP");
exports.NOP = NOP_1.NOP;
/* VARIABLES */
var VariableNode_1 = require("./lib/vars/VariableNode");
exports.VariableNode = VariableNode_1.VariableNode;
/* CONTROL CONSTRUCTS */
var Conditional_1 = require("./lib/conditionals/Conditional");
exports.Conditional = Conditional_1.Conditional;
var FunApp_1 = require("./lib/funhouse/FunApp");
exports.FunApp = FunApp_1.FunApp;
var FunDef_1 = require("./lib/funhouse/FunDef");
exports.FunDef = FunDef_1.FunDef;
var SequenceNode_1 = require("./lib/structural/SequenceNode");
exports.SequenceNode = SequenceNode_1.SequenceNode;
var WhileNode_1 = require("./lib/loops/WhileNode");
exports.WhileNode = WhileNode_1.WhileNode;
var ForNode_1 = require("./lib/loops/ForNode");
exports.ForNode = ForNode_1.ForNode;
/* BUILTIN FUNCTIONS */
var ColorNode_1 = require("./lib/shapes/ColorNode");
exports.ColorNode = ColorNode_1.ColorNode;
var EllipseNode_1 = require("./lib/shapes/EllipseNode");
exports.EllipseNode = EllipseNode_1.EllipseNode;
var RectangleNode_1 = require("./lib/shapes/RectangleNode");
exports.RectangleNode = RectangleNode_1.RectangleNode;
var LineNode_1 = require("./lib/shapes/LineNode");
exports.LineNode = LineNode_1.LineNode;
var CurveNode_1 = require("./lib/shapes/CurveNode");
exports.CurveNode = CurveNode_1.CurveNode;
var EphNode_1 = require("./lib/shapes/EphNode");
exports.EphNode = EphNode_1.EphNode;
var PrintNode_1 = require("./lib/structural/PrintNode");
exports.PrintNode = PrintNode_1.PrintNode;
var Return_1 = require("./lib/structural/Return");
exports.Return = Return_1.Return;
var ReturnError_1 = require("./lib/structural/ReturnError");
exports.ReturnError = ReturnError_1.ReturnError;
var EllipseEffect_1 = require("./lib/effects/EllipseEffect");
exports.EllipseEffect = EllipseEffect_1.EllipseEffect;
var NumberEffect_1 = require("./lib/effects/NumberEffect");
exports.NumberEffect = NumberEffect_1.NumberEffect;
var StringEffect_1 = require("./lib/effects/StringEffect");
exports.StringEffect = StringEffect_1.StringEffect;
var Dimensions_1 = require("./lib/structural/Dimensions");
exports.Dimensions = Dimensions_1.Dimensions;
var RectangleEffect_1 = require("./lib/effects/RectangleEffect");
exports.RectangleEffect = RectangleEffect_1.RectangleEffect;
var LineEffect_1 = require("./lib/effects/LineEffect");
exports.LineEffect = LineEffect_1.LineEffect;
var CurveEffect_1 = require("./lib/effects/CurveEffect");
exports.CurveEffect = CurveEffect_1.CurveEffect;
var EphEffect_1 = require("./lib/effects/EphEffect");
exports.EphEffect = EphEffect_1.EphEffect;
/* EVENTS */
var LogEvent_1 = require("./lib/logging/LogEvent");
exports.LogEvent = LogEvent_1.LogEvent;
var ClearEvent_1 = require("./lib/logging/ClearEvent");
exports.ClearEvent = ClearEvent_1.ClearEvent;
var DragEvent_1 = require("./lib/logging/DragEvent");
exports.DragEvent = DragEvent_1.DragEvent;
var PaintEvent_1 = require("./lib/logging/PaintEvent");
exports.PaintEvent = PaintEvent_1.PaintEvent;
var ResizeEvent_1 = require("./lib/logging/ResizeEvent");
exports.ResizeEvent = ResizeEvent_1.ResizeEvent;
var SelectEvent_1 = require("./lib/logging/SelectEvent");
exports.SelectEvent = SelectEvent_1.SelectEvent;
var IDEvent_1 = require("./lib/logging/IDEvent");
exports.IDEvent = IDEvent_1.IDEvent;
/* MODULES */
var Module_1 = require("./lib/modules/Module");
exports.Module = Module_1.Module;
var ModuleGenerator_1 = require("./lib/modules/ModuleGenerator");
exports.ModuleGenerator = ModuleGenerator_1.ModuleGenerator;
var LessonOneCpOne_1 = require("./lib/modules/LessonOneCpOne");
exports.LessonOneCpOne = LessonOneCpOne_1.LessonOneCpOne;
var LessonOneCpTwo_1 = require("./lib/modules/LessonOneCpTwo");
exports.LessonOneCpTwo = LessonOneCpTwo_1.LessonOneCpTwo;
var LessonOneCpThree_1 = require("./lib/modules/LessonOneCpThree");
exports.LessonOneCpThree = LessonOneCpThree_1.LessonOneCpThree;
var LessonOneCpFour_1 = require("./lib/modules/LessonOneCpFour");
exports.LessonOneCpFour = LessonOneCpFour_1.LessonOneCpFour;
var LessonTwoCpOne_1 = require("./lib/modules/LessonTwoCpOne");
exports.LessonTwoCpOne = LessonTwoCpOne_1.LessonTwoCpOne;
var LessonTwoCpTwo_1 = require("./lib/modules/LessonTwoCpTwo");
exports.LessonTwoCpTwo = LessonTwoCpTwo_1.LessonTwoCpTwo;
var LessonTwoCpThree_1 = require("./lib/modules/LessonTwoCpThree");
exports.LessonTwoCpThree = LessonTwoCpThree_1.LessonTwoCpThree;
var LessonTwoCpFour_1 = require("./lib/modules/LessonTwoCpFour");
exports.LessonTwoCpFour = LessonTwoCpFour_1.LessonTwoCpFour;
var LessonTwoCpFive_1 = require("./lib/modules/LessonTwoCpFive");
exports.LessonTwoCpFive = LessonTwoCpFive_1.LessonTwoCpFive;
var LessonTwoCpSix_1 = require("./lib/modules/LessonTwoCpSix");
exports.LessonTwoCpSix = LessonTwoCpSix_1.LessonTwoCpSix;
var LessonTwoCpSeven_1 = require("./lib/modules/LessonTwoCpSeven");
exports.LessonTwoCpSeven = LessonTwoCpSeven_1.LessonTwoCpSeven;
var LessonThreeCpOne_1 = require("./lib/modules/LessonThreeCpOne");
exports.LessonThreeCpOne = LessonThreeCpOne_1.LessonThreeCpOne;
var LessonThreeCpTwo_1 = require("./lib/modules/LessonThreeCpTwo");
exports.LessonThreeCpTwo = LessonThreeCpTwo_1.LessonThreeCpTwo;
var LessonThreeCpThree_1 = require("./lib/modules/LessonThreeCpThree");
exports.LessonThreeCpThree = LessonThreeCpThree_1.LessonThreeCpThree;
var LessonThreeCpFour_1 = require("./lib/modules/LessonThreeCpFour");
exports.LessonThreeCpFour = LessonThreeCpFour_1.LessonThreeCpFour;
var LessonThreeCpFive_1 = require("./lib/modules/LessonThreeCpFive");
exports.LessonThreeCpFive = LessonThreeCpFive_1.LessonThreeCpFive;
var LessonThreeCpSix_1 = require("./lib/modules/LessonThreeCpSix");
exports.LessonThreeCpSix = LessonThreeCpSix_1.LessonThreeCpSix;
var LessonFourCpOne_1 = require("./lib/modules/LessonFourCpOne");
exports.LessonFourCpOne = LessonFourCpOne_1.LessonFourCpOne;
var LessonFourCpTwo_1 = require("./lib/modules/LessonFourCpTwo");
exports.LessonFourCpTwo = LessonFourCpTwo_1.LessonFourCpTwo;
/* PARSER */
var parser_1 = require("./lib/parser/parser");
exports.Parser = parser_1.Parser;

},{"./lib/binops/AssignOp":2,"./lib/binops/BinaryOperation":3,"./lib/binops/DeclareOp":4,"./lib/binops/Decrement":5,"./lib/binops/DivOp":6,"./lib/binops/Increment":7,"./lib/binops/MinusOp":8,"./lib/binops/MulOp":9,"./lib/binops/PlusOp":10,"./lib/conditionals/Conditional":11,"./lib/effects/CurveEffect":12,"./lib/effects/EllipseEffect":13,"./lib/effects/EphEffect":14,"./lib/effects/LineEffect":15,"./lib/effects/NumberEffect":16,"./lib/effects/RectangleEffect":17,"./lib/effects/StringEffect":18,"./lib/funhouse/FunApp":19,"./lib/funhouse/FunDef":20,"./lib/lists/ListNode":21,"./lib/logging/ClearEvent":22,"./lib/logging/DragEvent":24,"./lib/logging/IDEvent":25,"./lib/logging/LogEvent":26,"./lib/logging/PaintEvent":27,"./lib/logging/ResizeEvent":28,"./lib/logging/SelectEvent":29,"./lib/logic/And":30,"./lib/logic/Equals":31,"./lib/logic/GreaterThan":32,"./lib/logic/GreaterThanEq":33,"./lib/logic/LessThan":34,"./lib/logic/LessThanEq":35,"./lib/logic/Not":36,"./lib/logic/NotEqual":37,"./lib/logic/Or":38,"./lib/loops/ForNode":39,"./lib/loops/WhileNode":40,"./lib/modules/LessonFourCpOne":42,"./lib/modules/LessonFourCpTwo":43,"./lib/modules/LessonOneCpFour":44,"./lib/modules/LessonOneCpOne":45,"./lib/modules/LessonOneCpThree":46,"./lib/modules/LessonOneCpTwo":47,"./lib/modules/LessonThreeCpFive":48,"./lib/modules/LessonThreeCpFour":49,"./lib/modules/LessonThreeCpOne":50,"./lib/modules/LessonThreeCpSix":51,"./lib/modules/LessonThreeCpThree":52,"./lib/modules/LessonThreeCpTwo":53,"./lib/modules/LessonTwoCpFive":54,"./lib/modules/LessonTwoCpFour":55,"./lib/modules/LessonTwoCpOne":56,"./lib/modules/LessonTwoCpSeven":57,"./lib/modules/LessonTwoCpSix":58,"./lib/modules/LessonTwoCpThree":59,"./lib/modules/LessonTwoCpTwo":60,"./lib/modules/Module":61,"./lib/modules/ModuleGenerator":62,"./lib/parser/parser":63,"./lib/prims/BooleanNode":64,"./lib/prims/NOP":65,"./lib/prims/NumberNode":66,"./lib/prims/StringNode":67,"./lib/shapes/ColorNode":68,"./lib/shapes/CurveNode":69,"./lib/shapes/EllipseNode":70,"./lib/shapes/EphNode":71,"./lib/shapes/LineNode":72,"./lib/shapes/RectangleNode":73,"./lib/structural/Dimensions":74,"./lib/structural/PrintNode":75,"./lib/structural/Return":76,"./lib/structural/ReturnError":77,"./lib/structural/Scope":78,"./lib/structural/SequenceNode":79,"./lib/unops/NegOp":81,"./lib/unops/UnaryOperation":82,"./lib/vars/VariableNode":83}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const VariableNode_1 = require("../vars/VariableNode");
// left side is variable, right side is val
// Reassign new value to var
class AssignOp extends BinaryOperation_1.BinaryOperation {
    /**
     * Constructor for an assignment operation
     * @param left The left side of the assignment (the var)
     * @param right The right side of the assignment (the value)
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        super(left, right);
        if (!(left instanceof VariableNode_1.VariableNode)) {
            throw new Error("The left hand side of the assignment must be a variable.");
        }
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates assign op by assigning value to var
     * @param context The current context
     */
    eval(context) {
        if (this.left instanceof VariableNode_1.VariableNode) {
            let r = this.right.eval(context);
            context.assign(this.left.name, r);
            return r;
        }
        throw new Error("HALP (in AssignOp)");
    }
    /**
     * Returns a string representation of the AssignOp
     */
    toString() {
        return this._ws + this.left.toString() + ' = ' + this.right.toString();
    }
    /**
     * AssignOps can't be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals can't be called directly on AssignOp
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.AssignOp = AssignOp;

},{"../vars/VariableNode":83,"./BinaryOperation":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryOperation {
    /**
     * Constructor for the BinOp abstract class
     * @param _left The left side of the binary operation
     * @param _right The right side of the binary operation
     */
    constructor(_left, _right) {
        this._left = _left;
        this._right = _right;
        this._newLine = false;
    }
    ;
    /**
     * Draws the binary operation, if applicable
     * @param context The current program context
     * @param dims The dimensions
     * @param ast The AST
     */
    draw(context, dims, ast) { }
    /**
     * Checks if equal to another expression
     * @param right The right side of the equality
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on BinOp");
    }
    /**
     * Returns a string representation of the binary operation
     */
    toString() { return ""; }
    ;
    /**
     * Gets left side of the binary operation
     */
    get left() {
        return this._left;
    }
    /**
     * Sets left side of the binary operation
     */
    set left(left) {
        this._left = left;
    }
    /**
     * Gets right side of the binary operation
     */
    get right() {
        return this._right;
    }
    /**
     * Sets right side of the binary operation
     */
    set right(right) {
        this._right = right;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.BinaryOperation = BinaryOperation;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const VariableNode_1 = require("../vars/VariableNode");
// left side is variable, right side is val
// Declares new val
class DeclareOp extends BinaryOperation_1.BinaryOperation {
    /**
     * Constructor for the declare operation, which declares a variable for the first time
     * @param left The left side of the declare op (the variable)
     * @param right The right side of the op (the value)
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        super(left, right);
        if (!(left instanceof VariableNode_1.VariableNode)) {
            throw new Error("The left hand side of the assignment must be a variable.");
        }
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the declaration by declaring the variable in the context and assigning the value
     * @param context The current program context
     */
    eval(context) {
        if (this.left instanceof VariableNode_1.VariableNode) {
            context.declare(this.left.name);
            let r = this.right.eval(context);
            context.assign(this.left.name, r);
            return r;
        }
        throw new Error("HALP (in DeclareOp)");
    }
    /**
     * Returns a string representation of the declare op
     */
    toString() {
        return this._ws + "var " + this.left.toString() + ' = ' + this.right.toString();
    }
    /**
     * DeclareOps cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals can't be called direcly on a DeclareOp
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.DeclareOp = DeclareOp;

},{"../vars/VariableNode":83,"./BinaryOperation":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const MinusOp_1 = require("./MinusOp");
const AssignOp_1 = require("./AssignOp");
const VariableNode_1 = require("../vars/VariableNode");
class Decrement {
    /**
     * Constructor for the decrement operation
     * @param variable The expression to be decremented
     * @param ws Preceding whitespace
     */
    constructor(variable, ws) {
        this.expr = variable;
        if (variable instanceof VariableNode_1.VariableNode) {
            this.innerRep = new AssignOp_1.AssignOp(variable, new MinusOp_1.MinusOp(variable, new NumberNode_1.NumberNode(1)));
        }
        else {
            this.innerRep = new MinusOp_1.MinusOp(variable, new NumberNode_1.NumberNode(1));
        }
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the decrement op to a NumberNode
     * @param context The current program context
     */
    eval(context) {
        return this.innerRep.eval(context);
    }
    /**
     * Returns a string representation of the decrement op
     */
    toString() {
        return this._ws + this.expr.toString() + "--";
    }
    /**
     * Decrement ops can't be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals can't be called directly on decrement
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.Decrement = Decrement;

},{"../prims/NumberNode":66,"../vars/VariableNode":83,"./AssignOp":2,"./MinusOp":8}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
class DivOp extends BinaryOperation_1.BinaryOperation {
    /**
     * Constructor for the division operation
     * @param left The dividend
     * @param right The divisor
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        super(left, right);
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs the division and evaluates into a single NumberNode
     * @param context The current program context
     */
    eval(context) {
        return new NumberNode_1.NumberNode(this.left.eval(new Scope_1.Scope(context)).eval(context).val / this.right.eval(new Scope_1.Scope(context)).eval(context).val);
    }
    /**
     * Division ops can't be directly drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals can't be called directly on a division op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns a string representation of the division
     */
    toString() {
        return this._ws + this.left.toString() + ' / ' + this.right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.DivOp = DivOp;

},{"../prims/NumberNode":66,"../structural/Scope":78,"./BinaryOperation":3}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const PlusOp_1 = require("./PlusOp");
const AssignOp_1 = require("./AssignOp");
const VariableNode_1 = require("../vars/VariableNode");
class Increment {
    /**
     * Constructor for Increment
     * @param variable The expression to increment
     * @param ws Tracks preceding whitespace
     */
    constructor(variable, ws) {
        this.expr = variable;
        if (variable instanceof VariableNode_1.VariableNode) {
            this.innerRep = new AssignOp_1.AssignOp(variable, new PlusOp_1.PlusOp(variable, new NumberNode_1.NumberNode(1)));
        }
        else {
            this.innerRep = new PlusOp_1.PlusOp(variable, new NumberNode_1.NumberNode(1, ""));
        }
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates increment into a number node
     * @param context The function scope
     */
    eval(context) {
        return this.innerRep.eval(context);
    }
    /**
     * Increments cannot be drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Cannot call equals directly on binops
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns a string representation of the increment expression
     */
    toString() {
        return this._ws + this.expr.toString() + "++";
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.Increment = Increment;

},{"../prims/NumberNode":66,"../vars/VariableNode":83,"./AssignOp":2,"./PlusOp":10}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
class MinusOp extends BinaryOperation_1.BinaryOperation {
    /**
     * The constructor for the subtraction operation
     * @param left The minuend
     * @param right The subrahend
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        super(left, right);
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs the subtraction and evaluates to a single NumberNode
     * @param context The current program context
     */
    eval(context) {
        return new NumberNode_1.NumberNode(this.left.eval(new Scope_1.Scope(context)).eval(context).val - this.right.eval(new Scope_1.Scope(context)).eval(context).val);
    }
    /**
     * Subtraction ops can't be directly drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals can't be called directly on subtraction
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns a string representation of the subtraction op
     */
    toString() {
        return this._ws + this.left.toString() + ' - ' + this.right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.MinusOp = MinusOp;

},{"../prims/NumberNode":66,"../structural/Scope":78,"./BinaryOperation":3}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
class MulOp extends BinaryOperation_1.BinaryOperation {
    /**
     * Constructor for the multiplication operation
     * @param left The multiplicand
     * @param right The multiplier
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        super(left, right);
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs the multiplication and returns a single NumberNode
     * @param context The current program context
     */
    eval(context) {
        return new NumberNode_1.NumberNode(this.left.eval(new Scope_1.Scope(context)).eval(context).val * this.right.eval(new Scope_1.Scope(context)).eval(context).val);
    }
    /**
     * Returns a string representation of the multiplication op
     */
    toString() {
        return this._ws + this.left.toString() + ' * ' + this.right.toString();
    }
    /**
     * Multiplication ops cannot be directly drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals cannot be called directly on a multiplicaiton operation
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.MulOp = MulOp;

},{"../prims/NumberNode":66,"../structural/Scope":78,"./BinaryOperation":3}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
// left and right are both expressions
class PlusOp extends BinaryOperation_1.BinaryOperation {
    /**
     * Constructor for the addition operation
     * @param left The first addend
     * @param right The second addend
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        super(left, right);
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs the addition and returns a single NumberNode
     * @param context The current program context
     */
    eval(context) {
        return new NumberNode_1.NumberNode(this.left.eval(new Scope_1.Scope(context)).eval(context).val + this.right.eval(new Scope_1.Scope(context)).eval(context).val);
    }
    /**
     * Addition ops cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals cannot be called directly on an addition op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns a string representation of the addition op
     */
    toString() {
        return this._ws + this.left.toString() + ' + ' + this.right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.PlusOp = PlusOp;

},{"../prims/NumberNode":66,"../structural/Scope":78,"./BinaryOperation":3}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../structural/Scope");
const BooleanNode_1 = require("../prims/BooleanNode");
const space_lift_1 = require("space-lift");
class Conditional {
    /**
     * The constructor for conditionals (if, else if, and else statements)
     * @param test The condition of the statement
     * @param trueBranch The branch to follow if the condition evaluates to true
     * @param falseBranch The branch to follow if the condition evaluates to false
     */
    constructor(test, trueBranch, falseBranch) {
        this._newLine = true;
        this._test = test;
        this._trueBranch = trueBranch;
        this._falseBranch = falseBranch;
    }
    /**
     * Checks the test result and returns the result of the true or false branch, depending on the test
     * @param context The current program context
     */
    eval(context) {
        let childCtx = new Scope_1.Scope(context, context.effects, context.eventLog);
        childCtx.canvas = space_lift_1.Some(context.canvas.get());
        let res = this._test.eval(childCtx);
        if (!(res instanceof BooleanNode_1.BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }
        if (res.val) {
            return this._trueBranch.eval(childCtx);
        }
        else if (this._falseBranch != null) { // check if else/else if is null or undefined
            return this._falseBranch.eval(childCtx); // possibly a bad idea
        }
    }
    /**
     * Returns a string representation of the conditional statement
     */
    toString() {
        let res = 'if(' + this._test.toString() + ") {\n " + this._trueBranch.toString() + "}";
        if (this._falseBranch !== undefined) {
            res += '\nelse {\n ' + this._falseBranch.toString() + '}';
        }
        return res;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Returns the true branch of the conditional
     */
    get trueBranch() {
        return this._trueBranch;
    }
    /**
     * Returns the false branch of the conditional
     */
    get falseBranch() {
        return this._falseBranch;
    }
    /**
     * Conditionals cannot be drawn directly
     */
    draw() {
        throw new Error("Not implemented");
    }
    /**
     * Equals cannot be called directly on a conditional
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on conditionals");
    }
}
exports.Conditional = Conditional;

},{"../prims/BooleanNode":64,"../structural/Scope":78,"space-lift":93}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const PaintEvent_1 = require("../logging/PaintEvent");
const ResizeEvent_1 = require("../logging/ResizeEvent");
const ClickEvent_1 = require("../logging/ClickEvent");
class CurveEffect {
    constructor(curve) {
        this._corner = 0;
        this._isSelected = false; // private bools
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._isSelectingMultiple = false;
        this._justDragged = false;
        this._ratio = 0;
        this._dragoffx = 0;
        this._dragoffy = 0;
        this._initDistance = 0;
        this._mouse = {
            x: 0,
            y: 0
        };
        this._curve = curve;
    }
    /**
     * The method that is called when evaluating nodes (StringNode, EllipseNode, etc)
     * This method assigns all params to private variables and draws the initial object to the canvas
     * by calling update()
     * @param context The parent Scope that contains the canvas among other things
     * @param dims The object's dimensions including x and y position
     * @param ast Unnecessary now, used to be the parent AST
     */
    draw(context, dims, ast) {
        if (context.canvas.isDefined()) {
            this._dims = dims;
            this._canvas = context.canvas.get();
            this._context = context;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this._ratio = this.w / this.h;
            this.update();
        }
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
    }
    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update() {
        let x = this.x;
        let y = this.y;
        let width = this.w;
        let height = this.h;
        let curvature = this.curvature;
        this._ctx.beginPath();
        this._ctx.moveTo(x, y);
        let v = this.perpendicularVector(width, height);
        this._ctx.quadraticCurveTo((x + width / 2) + curvature * v[0], (y + height / 2) + curvature * v[1], x + width, y + height);
        this._ctx.strokeStyle = "#673AB7";
        this._ctx.stroke();
        if (this._isSelected) {
            this.drawGuides(x, y, width, height, this._corner);
        }
    }
    //a * w + b * h = 0
    perpendicularVector(w, h) {
        if (w == 0 && h == 0) {
            return [0, 0];
        }
        else if (w == 0) {
            return [1, 0];
        }
        else if (h == 0) {
            return [0, 1];
        }
        return [1, (-w) / h];
    }
    /**
     * Adds all the necessary event listeners in one fell swoop
     */
    addEventListeners() {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this)); // bind in order to maintain the meaning of 'this'
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    }
    /**
     * Removes all the necessary event listeners in another fell swoop
     */
    removeEventListeners() {
    }
    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx, my) {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        if (mx > x && mx < x + w && my > y && my < y + h) {
            return true;
        }
        else
            return false;
    }
    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx, my) {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        let xdif = mx - x;
        let ydif = my - y;
        /* Corner Guides */
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top left
            return 1;
        }
        xdif = mx - (x + w);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top right
            return 2;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom right
            return 3;
        }
        xdif = mx - x;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom left
            return 4;
        }
        /* Middle Guides */
        xdif = mx - (x + w / 2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top middle
            return 5;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle right
            return 6;
        }
        xdif = mx - (x + w / 2);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom middle
            return 7;
        }
        xdif = mx - x;
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle left
            return 8;
        }
        else
            return 0;
    }
    /**
     * Draws the bounding rectangle and guides for the object when the object is selected
     * If one of the guides is selected, it colors that guide blue
     * @param x the x coordinate for where the rectangle will originate from (top left corner)
     * @param y the y coordinate for where the rectangle will originate from (top left corner)
     * @param w the width of the bounding rectangle
     * @param h the height of the bounding rectangle
     * @param corner the number of the corner to be colored blue (if any at all, if 0, all are white)
     */
    drawGuides(x, y, w, h, corner) {
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if (corner !== 0 && corner <= 4) { // a corner guide is selected
            switch (corner) { //colors the correct guide blue
                case 1:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'blue'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 2:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 3:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 4:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
            }
        }
        else if (corner !== 0) { // a middle guide is selected
            switch (corner) { //colors the correct guide blue
                case 5:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'blue'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 6:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 7:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 8:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle left
                    break;
            }
        }
        else { //if no guides are selected, colors everything white
            this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
            this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
            this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
            this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
            this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
            this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
            this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
        }
    }
    /**
     * Simple method that draws a rectangle
     * @param x x coordinate for the top left corner of the rectangle
     * @param y y coordinate for the top left corner of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param color color of the rectangle's fill
     */
    drawSquare(x, y, w, h, color) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }
    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event) {
        this.getMousePosition();
        if (this._isDragging && this._isSelected) {
            this.modifyDrag();
        }
        else if (this._isResizing && this._isSelected) {
            this.modifyResize(this.w < 10, this.h < 10);
        }
        else if (this._isChangingDims && this._isSelected) {
            this.modifyChangeDims(this.w < 10, this.h < 10);
        }
    }
    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event) {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y), this.contains(this._mouse.x, this._mouse.y));
    }
    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    onMouseUp(event) {
        this.modifyReset();
    }
    /**
     * Called whenever a key is pressed down
     * Toggles the isSelectingMultiple boolean if the key pressed is the shift key
     * @param event the keydown event
     */
    onShiftDown(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }
    /**
     * Called whenever a key is released
     * Toggles the isSelectingMultiple boolean if the key released is the shift key
     * @param event the keydown event
     */
    onShiftUp(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }
    /* Modification functions */
    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    modifyDrag() {
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    /**
     * Changes the size of the object when called (when a corner guide is clicked and dragged).
     *
     * If any of width or height is too small, it sets them equal to 10 and the other equal to
     * 10 divided or multiplied by the ratio of width/height to keep it the same.
     *
     * The work of changing the size is done by calling the helper method modifyResizeHelper.
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyResize(widthTooSmall, heightTooSmall) {
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._curve.dx = new NumberNode_1.NumberNode(10); // set for the prodirect manipulation
            this._dims.height.eval(this._context).val = 10 / this._ratio;
            this._curve.dy = new NumberNode_1.NumberNode(Math.round(10 / this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this.modifyResizeHelper(newDistance);
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._curve.dy = new NumberNode_1.NumberNode(10); // set for the prodirect manipulation
            this._dims.width.eval(this._context).val = 10 * this._ratio;
            this._curve.dx = new NumberNode_1.NumberNode(Math.round(10 * this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this.modifyResizeHelper(newDistance);
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this.modifyResizeHelper(newDistance);
        }
    }
    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 1, 2, or 4 are selected
     *
     * @param newDistance the distance between the mouse and the location opposite to it
     * (if top right guide is clicked, the distance between that and the bottom left guide is newDistance)
     */
    modifyResizeHelper(newDistance) {
        if (this.w > 10 && this.h > 10) {
            switch (this._corner) {
                case 1:
                    this._dims.y.eval(this._context).val -= Math.round((newDistance - this._initDistance) / this._ratio);
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                    break;
                case 2:
                    this._dims.y.eval(this._context).val -= Math.round((newDistance - this._initDistance) / this._ratio);
                    break;
                case 4:
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                    break;
            }
        }
        this._dims.width.eval(this._context).val += newDistance - this._initDistance;
        this._curve.dx = new NumberNode_1.NumberNode(Math.round(this.w));
        this._dims.height.eval(this._context).val += (newDistance - this._initDistance) / this._ratio;
        this._curve.dy = new NumberNode_1.NumberNode(Math.round(this.h));
        this._initDistance = newDistance;
    }
    /**
     * Changes the dimensions of the object when called.
     * If any of width or height is too small, it sets them equal to 10.
     * Calls modifyChangeDimsHelper to actually do the work
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyChangeDims(widthTooSmall, heightTooSmall) {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._curve.dx = new NumberNode_1.NumberNode(10);
            if (newDistance - this._initDistance > 0) {
                this.modifyChangeDimsHelper();
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._curve.dy = new NumberNode_1.NumberNode(10);
            if (newDistance - this._initDistance > 0) {
                this.modifyChangeDimsHelper();
            }
        }
        else {
            this.modifyChangeDimsHelper();
        }
    }
    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 5 or 8 are selected
     */
    modifyChangeDimsHelper() {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        switch (this._corner) {
            case 5:
                if (this.h > 10) { //as long as the height is > 10
                    this._dims.y.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._curve.dy = new NumberNode_1.NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 6:
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._curve.dx = new NumberNode_1.NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 7:
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._curve.dy = new NumberNode_1.NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 8:
                if (this.w > 10) { // as long as width is > 10
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._curve.dx = new NumberNode_1.NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
        }
    }
    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains, contains) {
        this._justDragged = false;
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        if (this._isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - x;
                this._dragoffy = this._mouse.y - y;
            }
            else {
                this._dragoffx = this._mouse.x - x;
                this._dragoffy = this._mouse.y - y;
                this._isDragging = true;
            }
        }
        else if (guideContains > 0 && guideContains <= 4) { //resizing
            this._isSelected = true;
            this._isResizing = true;
            this._context.eventLog.push(this.logClick());
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._height1 = this.h;
            this._width1 = this.w;
            //this._size1 = Math.sqrt(Math.pow(w,2) + Math.pow(h,2)); // size is diagonal length
            switch (this._corner) { // sets the offsets depending on which corner is selected
                case 1: // top left
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h);
                    this._dragoffx = x + w; // offset is bottom right
                    this._dragoffy = y + h;
                    break;
                case 2: // top right
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h);
                    this._dragoffx = x;
                    this._dragoffy = y + h; // offset is bottom left, etc
                    break;
                case 3:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y);
                    this._dragoffx = x;
                    this._dragoffy = y;
                    break;
                case 4:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y);
                    this._dragoffx = x + w;
                    this._dragoffy = y;
                    break;
            }
        }
        else if (guideContains > 4) { //changing shape dimensions
            this._isSelected = true;
            this._isChangingDims = true;
            this._corner = guideContains;
            switch (this._corner) { // sets the offsets depending on which middle guide is selected
                case 5: // top middle
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y + h);
                    this._dragoffx = x + w / 2; // offset is bottom middle
                    this._dragoffy = y + h;
                    break;
                case 6: //right middle
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h / 2);
                    this._dragoffx = x;
                    this._dragoffy = y + h / 2; // offset is left middle etc
                    break;
                case 7:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y);
                    this._dragoffx = x + w / 2;
                    this._dragoffy = y;
                    break;
                case 8:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h / 2);
                    this._dragoffx = x + w;
                    this._dragoffy = y + h / 2;
                    break;
            }
        }
        else if (contains) { // dragging
            this._x1 = x; // Saving original x and y
            this._y1 = y;
            this._context.eventLog.push(this.logClick());
            this._isSelected = true;
            this._isDragging = true;
            this._dragoffx = this._mouse.x - x;
            this._dragoffy = this._mouse.y - y;
        }
        else if (!this._isSelectingMultiple) { // not selected
            this._isSelected = false;
            this._isDragging = false;
        }
    }
    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset() {
        if (this._isDragging && this._isSelected) {
            this._isDragging = false;
            if (Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
                this._justDragged = true;
            }
        }
        else if ((this._isResizing || this._isChangingDims) && this._isSelected) {
            this._isResizing = false;
            let size2 = Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2));
            if ((Math.abs(this._width1 - this.w) > 0) || (Math.abs(this._height1 - this.h) > 0)) {
                this._context.eventLog.push(this.logResize());
            }
        }
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._corner = 0;
    }
    /**
     * Gets the current x and y coordinates of the mouse
     */
    getMousePosition() {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }
    /**
     * Sets isDragging, isResizing, isChangingDims, and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    isMouseOutside(event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = this._canvas.getBoundingClientRect();
        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            this._isDragging = false;
            this._isResizing = false;
            this._isChangingDims = false;
            this._isSelected = false;
            this._corner = 0;
        }
    }
    /**
     * Logs a rectangle paint event
     */
    logPaint() {
        return new PaintEvent_1.PaintEvent("rectangle", this.x, this.y);
    }
    /**
     * Logs a rectangle resize event
     */
    logResize() {
        return new ResizeEvent_1.ResizeEvent("rectangle with ID " + this.getID().toString(), Math.round(this._width1 * 100) / 100, Math.round(this._height1 * 100) / 100, Math.round(this.w * 100) / 100, Math.round(this.h * 100) / 100);
    }
    /**
     * Logs a rectangle click event
     */
    logClick() {
        return new ClickEvent_1.ClickEvent("rectangle with ID " + this.getID().toString(), this.x, this.y);
    }
    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id) {
        this.idObj = { _id: id };
    }
    ast() {
        throw new Error("Method not implemented.");
    }
    /**
     * Returns the x position of the rect
     */
    get x() {
        return this._dims.x.eval(this._context).val;
    }
    /**
     * Returns the y position of the rect
     */
    get y() {
        return this._dims.y.eval(this._context).val;
    }
    /**
     * Returns the width of the rect
     */
    get w() {
        return this._dims.width.eval(this._context).val;
    }
    /**
     * Returns the height of the rect
     */
    get h() {
        return this._dims.height.eval(this._context).val;
    }
    /**
     * Returns the curvature of the curve
     */
    get curvature() {
        return this._dims.curvature.eval(this._context).val;
    }
    /**
     * Returns the Dimensions object
     */
    get dims() {
        return this._dims;
    }
    /**
     * Returns whether or not the rect is selected
     */
    get selected() {
        return this._isSelected;
    }
    /**
     * Returns the ID of the rect
     */
    getID() {
        return this.idObj._id;
    }
    /**
     * Returns whether or not the rect has just been dragged
     */
    getJustDragged() {
        return this._justDragged;
    }
    /**
     * Sets whether or not the rect has just been dragged
     * @param val The value to be assigned
     */
    setJustDragged(val) {
        this._justDragged = val;
    }
    /**
     * Returns whether or not the rect is dragging
     */
    get isDragging() {
        return this._isDragging;
    }
    /**
     * Assembles a string for selection events
     */
    toSelString() {
        return " rectangle with ID " + this.getID().toString() + " at " + this.x + ", " + this.y;
    }
    /**
    * Assembles a string for drag events
    */
    toDragString() {
        return ("rectangle with ID " + this.getID().toString() + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }
    /**
     * Assembles a string for ID assignment events
     */
    toIDString() {
        return (this.idObj._id.toString() + " to rectangle at " + this.x + ", " + this.y);
    }
}
exports.CurveEffect = CurveEffect;
/**
 * Gets the mouse x and y coordinates in relation to the canvas
 * @param canvas the canvas object
 * @param event the mousemove event
 */
function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
/**
 * Computes the distance between two points
 * @param x1 x coordinate of first point
 * @param y1 y coordinate of first point
 * @param x2 x coordinate of second point
 * @param y2 y coordinate of second point
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

},{"../logging/ClickEvent":23,"../logging/PaintEvent":27,"../logging/ResizeEvent":28,"../prims/NumberNode":66}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaintEvent_1 = require("../logging/PaintEvent");
const ResizeEvent_1 = require("../logging/ResizeEvent");
const NumberNode_1 = require("../prims/NumberNode");
const ClickEvent_1 = require("../logging/ClickEvent");
class EllipseEffect {
    constructor(circle) {
        this._corner = 0;
        this._isSelected = false; // Private bools
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._isSelectingMultiple = false;
        this._justDragged = false; // Has this object just been dragged?
        this._ratio = 0;
        this._dragoffx = 0;
        this._dragoffy = 0;
        this._initDistance = 0;
        this._mouse = {
            x: 0,
            y: 0
        };
        this._circle = circle;
    }
    /**
     * The method that is called when evaluating nodes (StringNode, EllipseNode, etc)
     * This method assigns all params to private variables and draws the initial object to the canvas
     * by calling update()
     * @param context The parent Scope that contains the canvas among other things
     * @param dims The object's dimensions including x and y position
     * @param ast Unnecessary now, used to be the parent AST
     */
    draw(context, dims, ast) {
        if (context.canvas.isDefined()) {
            this._dims = dims;
            this._canvas = context.canvas.get();
            this._context = context;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this._ratio = this.w / this.h;
            this.update();
        }
        // logging
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
    }
    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update() {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        this._ctx.beginPath();
        this._ctx.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2, false);
        //this._ctx.strokeStyle = "black";
        //this._ctx.stroke();
        this._ctx.fillStyle = "#D5B8FF";
        this._ctx.shadowColor = "#6C6C6C";
        this._ctx.shadowBlur = 15;
        //this._ctx.shadowOffsetX = 2;
        //this._ctx.shadowOffsetY = 2;
        this._ctx.fill();
        if (this._isSelected) {
            this.drawGuides(x - w / 2, y - h / 2, w, h, this._corner);
        }
    }
    /*
        private mouseMove = this.onMouseMove.bind(this);
        private mouseDown = this.onMouseDown.bind(this);
        private mouseUp = this.onMouseUp.bind(this);
        private shiftDown = this.onShiftDown.bind(this);
        private shiftUp = this.onShiftUp.bind(this);
        private mouseOutside = this.isMouseOutside.bind(this);
        private selectStart = function(e:any) { e.preventDefault(); return false; };
    */
    /**
     * Adds all the necessary event listeners in one fell swoop
     */
    addEventListeners() {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this)); // bind in order to maintain the meaning of 'this'
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    }
    removeEventListeners() {
        /*
        console.log("removing EventListners");
          this._canvas.removeEventListener('mousemove', this.mouseMove); // bind in order to maintain the meaning of 'this'
          this._canvas.removeEventListener('mousedown', this.mouseDown);
          this._canvas.removeEventListener('mouseup', this.mouseUp);
          window.removeEventListener('keydown', this.shiftDown);
          window.removeEventListener('keyup', this.shiftUp);
          window.removeEventListener('mousedown', this.mouseOutside);
          //makes it so that double clicking doesn't select text on the page
          this._canvas.removeEventListener('selectstart', this.selectStart, false);
          */
    }
    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx, my) {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        return Math.pow(mx - x, 2) / Math.pow(w / 2, 2) + Math.pow(my - y, 2) / Math.pow(h / 2, 2) <= 1;
    }
    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx, my) {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        let xdif = mx - (x - w / 2);
        let ydif = my - (y - h / 2);
        /* Corner Guides */
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top left
            return 1;
        }
        xdif = mx - (x + w / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top right
            return 2;
        }
        xdif = mx - (x + w / 2);
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom right
            return 3;
        }
        xdif = mx - (x - w / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom left
            return 4;
        }
        /* Middle Guides */
        xdif = mx - x;
        ydif = my - (y - h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top middle
            return 5;
        }
        xdif = mx - (x + w / 2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle right
            return 6;
        }
        xdif = mx - x;
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom middle
            return 7;
        }
        xdif = mx - (x - w / 2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle left
            return 8;
        }
        else
            return 0;
    }
    /**
     * Draws the bounding rectangle and guides for the object when the object is selected
     * If one of the guides is selected, it colors that guide blue
     * @param x the x coordinate for where the rectangle will originate from (top left corner)
     * @param y the y coordinate for where the rectangle will originate from (top left corner)
     * @param w the width of the bounding rectangle
     * @param h the height of the bounding rectangle
     * @param corner the number of the corner to be colored blue (if any at all, if 0, all are white)
     */
    drawGuides(x, y, w, h, corner) {
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if (corner !== 0 && corner <= 4) {
            switch (corner) { //colors the correct guide blue
                case 1:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'blue'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 2:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 3:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 4:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
            }
        }
        else if (corner !== 0 && corner > 4) {
            switch (corner) { //colors the correct guide blue
                case 5:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'blue'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 6:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 7:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 8:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle left
                    break;
            }
        }
        else {
            this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
            this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
            this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
            this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
            this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
            this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
            this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
        }
    }
    /**
     * Simple method that draws a rectangle
     * @param x x coordinate for the top left corner of the rectangle
     * @param y y coordinate for the top left corner of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param color color of the rectangle's fill
     */
    drawSquare(x, y, w, h, color) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }
    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event) {
        this.getMousePosition();
        if (this._isDragging && this._isSelected) {
            this.modifyDrag();
        }
        else if (this._isResizing && this._isSelected) {
            this.modifyResize(this.w < 14, this.h < 14);
        }
        else if (this._isChangingDims && this._isSelected) {
            this.modifyChangeDims(this.w < 14, this.h < 14);
        }
    }
    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event) {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y), this.contains(this._mouse.x, this._mouse.y));
    }
    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    onMouseUp(event) {
        //console.log("I'm an ellipse!");
        this.modifyReset();
    }
    /**
     * Called whenever a key is pressed down
     * Toggles the isSelectingMultiple boolean if the key pressed is the shift key
     * @param event the keydown event
     */
    onShiftDown(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }
    /**
     * Called whenever a key is released
     * Toggles the isSelectingMultiple boolean if the key released is the shift key
     * @param event the keydown event
     */
    onShiftUp(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }
    /* Modification functions */
    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    modifyDrag() {
        //console.log("ellipse dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    /**
     * Changes the size of the object when called (when a corner guide is clicked and dragged).
     *
     * If any of width or height is too small, it sets them equal to 14 and the other equal to
     * 10 divided or multiplied by the ratio of width/height to keep it the same.
     * @param widthTooSmall true if the width dimension is < 14
     * @param heightTooSmall true if the height dimension is < 14
     */
    modifyResize(widthTooSmall, heightTooSmall) {
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 14;
            this._circle.width = new NumberNode_1.NumberNode(14); // set for the prodirect manipulation
            this._dims.height.eval(this._context).val = 14 / this._ratio;
            this._circle.height = new NumberNode_1.NumberNode(Math.round(14 / this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                this._circle.width = new NumberNode_1.NumberNode(Math.round(this.w));
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                this._circle.height = new NumberNode_1.NumberNode(Math.round(this.h));
                this._initDistance = newDistance;
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 14;
            this._circle.height = new NumberNode_1.NumberNode(14); // set for the prodirect manipulation
            this._dims.width.eval(this._context).val = 14 * this._ratio;
            this._circle.width = new NumberNode_1.NumberNode(Math.round(14 * this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                this._circle.width = new NumberNode_1.NumberNode(Math.round(this.w));
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                this._circle.height = new NumberNode_1.NumberNode(Math.round(this.h));
                this._initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
            this._circle.width = new NumberNode_1.NumberNode(Math.round(this.w));
            this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
            this._circle.height = new NumberNode_1.NumberNode(Math.round(this.h));
            this._initDistance = newDistance;
        }
    }
    /**
     * Changes the dimensions of the object when called.
     * If any of width or height is too small, it sets them equal to 10.
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyChangeDims(widthTooSmall, heightTooSmall) {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        if (this._corner == 5 || this._corner == 7) { // if modifying height
            if (!heightTooSmall) {
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                this._circle.height = new NumberNode_1.NumberNode(Math.round(this.h));
                this._initDistance = newDistance;
                this._ratio = this.w / this.h; // setting width/height ratio = to the new ratio
            }
            else {
                this._dims.height.eval(this._context).val = 14;
                this._circle.height = new NumberNode_1.NumberNode(14);
                this._ratio = this.w / this.h;
                if (newDistance - this._initDistance > 0) {
                    this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                    this._circle.height = new NumberNode_1.NumberNode(Math.round(this.h));
                    this._initDistance = newDistance;
                    this._ratio = this.w / this.h;
                }
            }
        }
        else { // modifying width
            if (!widthTooSmall) {
                this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                this._circle.width = new NumberNode_1.NumberNode(Math.round(this.w));
                this._initDistance = newDistance;
                this._ratio = this.w / this.h;
            }
            else {
                this._dims.width.eval(this._context).val = 14;
                this._circle.width = new NumberNode_1.NumberNode(14);
                this._ratio = this.w / this.h;
                if (newDistance - this._initDistance > 0) {
                    this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                    this._circle.width = new NumberNode_1.NumberNode(Math.round(this.w));
                    this._initDistance = newDistance;
                    this._ratio = this.w / this.h;
                }
            }
        }
    }
    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains, contains) {
        this._justDragged = false;
        if (this._isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - this.x;
                this._dragoffy = this._mouse.y - this.y;
            }
            else {
                this._dragoffx = this._mouse.x - this.x;
                this._dragoffy = this._mouse.y - this.y;
                this._isDragging = true;
            }
        }
        else if (guideContains > 0 && guideContains <= 4) { //resizing
            this._isSelected = true;
            this._isResizing = true;
            this._context.eventLog.push(this.logClick());
            this._corner = guideContains;
            this._dragoffx = this.x;
            this._dragoffy = this.y;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this.x, this.y);
            this._width1 = this.w;
            this._height1 = this.h;
            //this._size1 = Math.sqrt(Math.pow(this.w,2) + Math.pow(this.h,2)); // saving old size
        }
        else if (guideContains > 4) { //changing shape dimensions
            this._isSelected = true;
            this._isChangingDims = true;
            this._corner = guideContains;
            this._dragoffx = this.x;
            this._dragoffy = this.y;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this.x, this.y);
        }
        else if (contains) { //simply selecting the shape or dragging
            this._x1 = this.x; // Saving original x and y
            this._y1 = this.y;
            this._isSelected = true;
            this._isDragging = true;
            this._context.eventLog.push(this.logClick());
            this._dragoffx = this._mouse.x - this.x;
            this._dragoffy = this._mouse.y - this.y;
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
        }
    }
    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset() {
        if (this._isDragging && this._isSelected) { // probs only need dragging but oh well | isSel || selMul?
            this._isDragging = false;
            if (Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
                this._justDragged = true;
                //this._context.eventLog.push(this.logMove());
            }
        }
        else if ((this._isResizing || this._isChangingDims) && this._isSelected) {
            //console.log("resizing ellipse");
            this._isResizing = false;
            //let size2 = Math.sqrt(Math.pow(this.w,2) + Math.pow(this.h,2));
            //console.log("Size diff: " + Math.abs(this._size1 - size2));
            if ((Math.abs(this._width1 - this.w) > 0) || (Math.abs(this._height1 - this.h) > 0)) {
                this._context.eventLog.push(this.logResize());
            }
        }
        // if(this._isSelectingMultiple){
        //     if(Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
        //         this._context.eventLog.push(this.logMove());
        //     }
        // }
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._corner = 0;
    }
    /**
     * Gets the current x and y coordinates of the mouse
     */
    getMousePosition() {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }
    /**
     * Sets isDragging, isResizing, isChangingDims, and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    isMouseOutside(event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = this._canvas.getBoundingClientRect();
        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            this._isDragging = false;
            this._isResizing = false;
            this._isSelected = false;
            this._corner = 0;
        }
    }
    /**
     * Logs a paint event
     */
    logPaint() {
        return new PaintEvent_1.PaintEvent("ellipse", this.x, this.y);
    }
    /**
     * Logs a resize event
     */
    logResize() {
        return new ResizeEvent_1.ResizeEvent("ellipse with ID " + this.getID().toString(), Math.round(this._width1 * 100) / 100, Math.round(this._height1 * 100) / 100, Math.round(this.w * 100) / 100, Math.round(this.h * 100) / 100);
        //Math.round(this._size1*100)/100, Math.round((Math.sqrt(Math.pow(this.w,2) + Math.pow(this.h,2))*100))/100);
    }
    /**
     * Logs a click event
     */
    logClick() {
        return new ClickEvent_1.ClickEvent("ellipse with ID " + this.getID().toString(), this.x, this.y);
    }
    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id) {
        this.idObj = { _id: id };
    }
    ast() {
        throw new Error("Method not implemented.");
    }
    /**
     * Returns the x position of the ellipse
     */
    get x() {
        return this._dims.x.eval(this._context).val;
    }
    /**
     * Returns the y position of the ellipse
     */
    get y() {
        return this._dims.y.eval(this._context).val;
    }
    /**
     * Returns the width of the ellipse
     */
    get w() {
        return this._dims.width.eval(this._context).val;
    }
    /**
     * Returns the height of the ellipse
     */
    get h() {
        return this._dims.height.eval(this._context).val;
    }
    /**
     * Returns the Dimensions object
     */
    get dims() {
        return this._dims;
    }
    /**
     * Returns whether or not the ellipse is selected
     */
    get selected() {
        return this._isSelected;
    }
    /**
     * Returns the ID of the ellipse
     */
    getID() {
        return this.idObj._id;
    }
    /**
     * Returns whether or not the ellipse has just been dragged
     */
    getJustDragged() {
        return this._justDragged;
    }
    /**
     * Sets whether or not the ellipse has just been dragged
     * @param val The value to be assigned
     */
    setJustDragged(val) {
        this._justDragged = val;
    }
    /**
     * Returns whether or not the ellipse is dragging
     */
    get isDragging() {
        return this._isDragging;
    }
    /**
     * Assembles a string for selection events
     */
    toSelString() {
        return (" ellipse with ID " + this.getID().toString() + " at " + this.x + ", " + this.y);
    }
    /**
    * Assembles a string for drag events
    */
    toDragString() {
        return ("ellipse with ID " + this.getID().toString() + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }
    /**
     * Assembles a string for ID assignment events
     */
    toIDString() {
        return (this.idObj._id.toString() + " to ellipse at " + this.x + ", " + this.y);
    }
}
exports.EllipseEffect = EllipseEffect;
/**
 * Get's the mouse x and y coordinates in relation to the canvas
 * @param canvas the canvas object
 * @param event the mousemove event
 */
function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
/**
 * Computes the distance between two points
 * @param x1 x coordinate of first point
 * @param y1 y coordinate of first point
 * @param x2 x coordinate of second point
 * @param y2 y coordinate of second point
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

},{"../logging/ClickEvent":23,"../logging/PaintEvent":27,"../logging/ResizeEvent":28,"../prims/NumberNode":66}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const PaintEvent_1 = require("../logging/PaintEvent");
const ResizeEvent_1 = require("../logging/ResizeEvent");
const ClickEvent_1 = require("../logging/ClickEvent");
class EphEffect {
    constructor(eph) {
        this._corner = 0;
        this._isSelected = false; // private bools
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._isSelectingMultiple = false;
        this._justDragged = false;
        this._ratio = 0;
        this._dragoffx = 0;
        this._dragoffy = 0;
        this._initDistance = 0;
        this._mouse = {
            x: 0,
            y: 0
        };
        this._eph = eph;
    }
    /**
     * The method that is called when evaluating nodes (StringNode, EllipseNode, etc)
     * This method assigns all params to private variables and draws the initial object to the canvas
     * by calling update()
     * @param context The parent Scope that contains the canvas among other things
     * @param dims The object's dimensions including x and y position
     * @param ast Unnecessary now, used to be the parent AST
     */
    draw(context, dims, ast) {
        if (context.canvas.isDefined()) {
            this._dims = dims;
            this._canvas = context.canvas.get();
            this._context = context;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this._ephImg = new Image();
            this._ephImg.src = './pics/demoncow.png';
            this._ratio = this.w / this.h;
            this.update();
        }
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
    }
    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update() {
        let x = this.x;
        let y = this.y;
        let width = this.w;
        let height = this.h;
        this._ctx.beginPath();
        //var imgObj = new Image();
        //let ctx = this._canvas.getContext('2d');
        // this._ephImg = new Image();
        // this._ephImg.src = './pics/demoncow.png';
        //imgObj.onload = function(){
        //this._ephImg.onload = function(){
        this._ctx.drawImage(this._ephImg, this.x, this.y, width, height);
        //this._ephImg.onload = function(){
        // this._ephImg.width = width;
        // this._ephImg.height = height;
        //}
        //}
        if (this._isSelected) {
            this.drawGuides(x, y, width, height, this._corner);
        }
    }
    /**
     * Adds all the necessary event listeners in one fell swoop
     */
    addEventListeners() {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    }
    /**
     * Removes all the necessary event listeners in another fell swoop
     */
    removeEventListeners() {
    }
    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx, my) {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        if (mx > x && mx < x + w && my > y && my < y + h) {
            return true;
        }
        else
            return false;
    }
    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx, my) {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        let xdif = mx - x;
        let ydif = my - y;
        /* Corner Guides */
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top left
            return 1;
        }
        xdif = mx - (x + w);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top right
            return 2;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom right
            return 3;
        }
        xdif = mx - x;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom left
            return 4;
        }
        /* Middle Guides */
        xdif = mx - (x + w / 2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top middle
            return 5;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle right
            return 6;
        }
        xdif = mx - (x + w / 2);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom middle
            return 7;
        }
        xdif = mx - x;
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle left
            return 8;
        }
        else
            return 0;
    }
    /**
     * Draws the bounding rectangle and guides for the object when the object is selected
     * If one of the guides is selected, it colors that guide blue
     * @param x the x coordinate for where the rectangle will originate from (top left corner)
     * @param y the y coordinate for where the rectangle will originate from (top left corner)
     * @param w the width of the bounding rectangle
     * @param h the height of the bounding rectangle
     * @param corner the number of the corner to be colored blue (if any at all, if 0, all are white)
     */
    drawGuides(x, y, w, h, corner) {
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if (corner !== 0 && corner <= 4) {
            switch (corner) { //colors the coreph guide blue
                case 1:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'blue'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 2:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 3:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 4:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
            }
        }
        else if (corner !== 0) {
            switch (corner) { //colors the coreph guide blue
                case 5:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'blue'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 6:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 7:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 8:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle left
                    break;
            }
        }
        else {
            this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
            this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
            this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
            this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
            this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
            this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
            this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
        }
    }
    /**
     * Simple method that draws a rectangle
     * @param x x coordinate for the top left corner of the rectangle
     * @param y y coordinate for the top left corner of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param color color of the rectangle's fill
     */
    drawSquare(x, y, w, h, color) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }
    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event) {
        this.getMousePosition();
        if (this._isDragging && this._isSelected) {
            this.modifyDrag();
        }
        else if (this._isResizing && this._isSelected) {
            this.modifyResize(this.w < 10, this.h < 10);
        }
        else if (this._isChangingDims && this._isSelected) {
            this.modifyChangeDims(this.w < 10, this.h < 10);
        }
    }
    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event) {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y), this.contains(this._mouse.x, this._mouse.y));
    }
    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    onMouseUp(event) {
        this.modifyReset();
    }
    /**
     * Called whenever a key is pressed down
     * Toggles the isSelectingMultiple boolean if the key pressed is the shift key
     * @param event the keydown event
     */
    onShiftDown(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }
    /**
     * @param event
     */
    onShiftUp(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }
    /* Modification functions */
    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    modifyDrag() {
        //console.log("ephangle dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    /**
     * Changes the size of the object when called (when a corner guide is clicked and dragged).
     *
     * If any of width or height is too small, it sets them equal to 10 and the other equal to
     * 10 divided or multiplied by the ratio of width/height to keep it the same.
     *
     * The work of changing the size is done by calling the helper method modifyResizeHelper.
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyResize(widthTooSmall, heightTooSmall) {
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._eph.width = new NumberNode_1.NumberNode(10);
            this._dims.height.eval(this._context).val = 10 / this._ratio;
            this._eph.height = new NumberNode_1.NumberNode(Math.round(10 / this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this.modifyResizeHelper(newDistance);
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._eph.height = new NumberNode_1.NumberNode(10);
            this._dims.width.eval(this._context).val = 10 * this._ratio;
            this._eph.width = new NumberNode_1.NumberNode(Math.round(10 * this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this.modifyResizeHelper(newDistance);
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this.modifyResizeHelper(newDistance);
        }
    }
    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 1, 2, or 4 are selected
     *
     * @param newDistance the distance between the mouse and the location opposite to it
     * (if top right guide is clicked, the distance between that and the bottom left guide is newDistance)
     */
    modifyResizeHelper(newDistance) {
        if (this.w > 10 && this.h > 10) {
            switch (this._corner) {
                case 1:
                    this._dims.y.eval(this._context).val -= Math.round((newDistance - this._initDistance) / this._ratio);
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                    break;
                case 2:
                    this._dims.y.eval(this._context).val -= Math.round((newDistance - this._initDistance) / this._ratio);
                    break;
                case 4:
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                    break;
            }
        }
        this._dims.width.eval(this._context).val += newDistance - this._initDistance;
        this._eph.width = new NumberNode_1.NumberNode(Math.round(this.w));
        this._dims.height.eval(this._context).val += (newDistance - this._initDistance) / this._ratio;
        this._eph.height = new NumberNode_1.NumberNode(Math.round(this.h));
        this._initDistance = newDistance;
    }
    /**
     * Changes the dimensions of the object when called.
     * If any of width or height is too small, it sets them equal to 10.
     * Calls modifyChangeDimsHelper to actually do the work
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyChangeDims(widthTooSmall, heightTooSmall) {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._eph.width = new NumberNode_1.NumberNode(10);
            if (newDistance - this._initDistance > 0) {
                this.modifyChangeDimsHelper();
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._eph.height = new NumberNode_1.NumberNode(10);
            if (newDistance - this._initDistance > 0) {
                this.modifyChangeDimsHelper();
            }
        }
        else {
            this.modifyChangeDimsHelper();
        }
    }
    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 5 or 8 are selected
     */
    modifyChangeDimsHelper() {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        switch (this._corner) {
            case 5:
                if (this.w > 10 && this.h > 10) {
                    this._dims.y.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._eph.height = new NumberNode_1.NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 6:
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._eph.width = new NumberNode_1.NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 7:
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._eph.height = new NumberNode_1.NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 8:
                if (this.w > 10 && this.h > 10) {
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._eph.width = new NumberNode_1.NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
        }
    }
    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains, contains) {
        this._justDragged = false;
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        if (this._isSelectingMultiple) {
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - x;
                this._dragoffy = this._mouse.y - y;
            }
            else {
                this._dragoffx = this._mouse.x - x;
                this._dragoffy = this._mouse.y - y;
                this._isDragging = true;
            }
        }
        else if (guideContains > 0 && guideContains <= 4) { //resizing
            this._isSelected = true;
            this._isResizing = true;
            this._context.eventLog.push(this.logClick());
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._height1 = this.h;
            this._width1 = this.w;
            //this._size1 = Math.sqrt(Math.pow(w,2) + Math.pow(h,2)); // size is diagonal length
            switch (this._corner) {
                case 1:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h);
                    this._dragoffx = x + w;
                    this._dragoffy = y + h;
                    break;
                case 2:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h);
                    this._dragoffx = x;
                    this._dragoffy = y + h;
                    break;
                case 3:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y);
                    this._dragoffx = x;
                    this._dragoffy = y;
                    break;
                case 4:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y);
                    this._dragoffx = x + w;
                    this._dragoffy = y;
                    break;
            }
            //this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y + h / 2);
        }
        else if (guideContains > 4) { //changing shape dimensions
            this._isSelected = true;
            this._isChangingDims = true;
            this._corner = guideContains;
            switch (this._corner) {
                case 5:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y + h);
                    this._dragoffx = x + w / 2;
                    this._dragoffy = y + h;
                    break;
                case 6:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h / 2);
                    this._dragoffx = x;
                    this._dragoffy = y + h / 2;
                    break;
                case 7:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y);
                    this._dragoffx = x + w / 2;
                    this._dragoffy = y;
                    break;
                case 8:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h / 2);
                    this._dragoffx = x + w;
                    this._dragoffy = y + h / 2;
                    break;
            }
        }
        else if (contains) {
            this._x1 = x; // Saving original x and y
            this._y1 = y;
            this._context.eventLog.push(this.logClick());
            this._isSelected = true;
            this._isDragging = true;
            this._dragoffx = this._mouse.x - x;
            this._dragoffy = this._mouse.y - y;
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
        }
    }
    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset() {
        if (this._isDragging && this._isSelected) {
            this._isDragging = false;
            if (Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
                this._justDragged = true;
            }
        }
        else if ((this._isResizing || this._isChangingDims) && this._isSelected) {
            this._isResizing = false;
            let size2 = Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2));
            if ((Math.abs(this._width1 - this.w) > 0) || (Math.abs(this._height1 - this.h) > 0)) {
                this._context.eventLog.push(this.logResize());
            }
        }
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._corner = 0;
    }
    /**
     * Gets the current x and y coordinates of the mouse
     */
    getMousePosition() {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }
    /**
     * Sets isDragging, isResizing, isChangingDims, and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    isMouseOutside(event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let eph = this._canvas.getBoundingClientRect();
        if (mouseX < eph.left || mouseX > eph.right || mouseY < eph.top || mouseY > eph.bottom) {
            this._isDragging = false;
            this._isResizing = false;
            this._isSelected = false;
            this._corner = 0;
        }
    }
    /**
     * Logs an eph paint event
     */
    logPaint() {
        return new PaintEvent_1.PaintEvent("eph", this.x, this.y);
    }
    /**
     * Logs an eph resize event
     */
    logResize() {
        return new ResizeEvent_1.ResizeEvent("eph with ID " + this.getID().toString(), Math.round(this._width1 * 100) / 100, Math.round(this._height1 * 100) / 100, Math.round(this.w * 100) / 100, Math.round(this.h * 100) / 100);
    }
    /**
     * Logs an eph click event
     */
    logClick() {
        return new ClickEvent_1.ClickEvent("eph with ID " + this.getID().toString(), this.x, this.y);
    }
    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id) {
        this.idObj = { _id: id };
    }
    ast() {
        throw new Error("Not implemented");
    }
    updateAST() {
        throw new Error("Not implemented");
    }
    /**
     * Returns the x position of the eph
     */
    get x() {
        return this._dims.x.eval(this._context).val;
    }
    /**
     * Returns the y position of the eph
     */
    get y() {
        return this._dims.y.eval(this._context).val;
    }
    /**
     * Returns the width of the eph
     */
    get w() {
        return this._dims.width.eval(this._context).val;
    }
    /**
     * Returns the height of the eph
     */
    get h() {
        return this._dims.height.eval(this._context).val;
    }
    /**
     * Returns the Dimensions object
     */
    get dims() {
        return this._dims;
    }
    /**
     * Returns whether or not the eph is selected
     */
    get selected() {
        return this._isSelected;
    }
    /**
     * Returns the image
     */
    get image() {
        return this._ephImg;
    }
    /**
     * Returns the ID of the eph
     */
    getID() {
        return this.idObj._id;
    }
    /**
     * Returns whether or not the eph has just been dragged
     */
    getJustDragged() {
        return this._justDragged;
    }
    /**
     * Sets whether or not the eph has just been dragged
     * @param val The value to be assigned
     */
    setJustDragged(val) {
        this._justDragged = val;
    }
    /**
     * Returns whether or not the eph is dragging
     */
    get isDragging() {
        return this._isDragging;
    }
    /**
     * Assembles a string for selection events
     */
    toSelString() {
        return " eph with ID " + this.getID().toString() + " at " + this.x + ", " + this.y;
    }
    /**
    * Assembles a string for drag events
    */
    toDragString() {
        return ("eph with ID " + this.getID().toString() + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }
    /**
     * Assembles a string for ID assignment events
     */
    toIDString() {
        return (this.idObj._id.toString() + " to eph at " + this.x + ", " + this.y);
    }
}
exports.EphEffect = EphEffect;
/**
 * Gets the mouse x and y coordinates in relation to the canvas
 * @param canvas the canvas object
 * @param event the mousemove event
 */
function getMousePos(canvas, event) {
    let eph = canvas.getBoundingClientRect();
    return {
        x: event.clientX - eph.left,
        y: event.clientY - eph.top
    };
}
/**
 * Computes the distance between two points
 * @param x1 x coordinate of first point
 * @param y1 y coordinate of first point
 * @param x2 x coordinate of second point
 * @param y2 y coordinate of second point
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

},{"../logging/ClickEvent":23,"../logging/PaintEvent":27,"../logging/ResizeEvent":28,"../prims/NumberNode":66}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const PaintEvent_1 = require("../logging/PaintEvent");
const ResizeEvent_1 = require("../logging/ResizeEvent");
const ClickEvent_1 = require("../logging/ClickEvent");
class LineEffect {
    constructor(line) {
        this._corner = 0;
        this._isSelected = false; // private bools
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._isSelectingMultiple = false;
        this._justDragged = false;
        this._ratio = 0;
        this._dragoffx = 0;
        this._dragoffy = 0;
        this._initDistance = 0;
        this._mouse = {
            x: 0,
            y: 0
        };
        this._line = line;
    }
    /**
     * The method that is called when evaluating nodes (StringNode, EllipseNode, etc)
     * This method assigns all params to private variables and draws the initial object to the canvas
     * by calling update()
     * @param context The parent Scope that contains the canvas among other things
     * @param dims The object's dimensions including x and y position
     * @param ast Unnecessary now, used to be the parent AST
     */
    draw(context, dims, ast) {
        if (context.canvas.isDefined()) {
            this._dims = dims;
            this._canvas = context.canvas.get();
            this._context = context;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this._ratio = this.w / this.h;
            this.update();
        }
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
    }
    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update() {
        let x = this.x;
        let y = this.y;
        let width = this.w;
        let height = this.h;
        this._ctx.beginPath();
        this._ctx.moveTo(x, y);
        this._ctx.lineTo(x + width, y + height);
        this._ctx.strokeStyle = "#673AB7";
        this._ctx.stroke();
        if (this._isSelected) {
            this.drawGuides(x, y, width, height, this._corner);
        }
    }
    /**
     * Adds all the necessary event listeners in one fell swoop
     */
    addEventListeners() {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this)); // bind in order to maintain the meaning of 'this'
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    }
    /**
     * Removes all the necessary event listeners in another fell swoop
     */
    removeEventListeners() {
    }
    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx, my) {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        if (mx > x && mx < x + w && my > y && my < y + h) {
            return true;
        }
        else
            return false;
    }
    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx, my) {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        let xdif = mx - x;
        let ydif = my - y;
        /* Corner Guides */
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top left
            return 1;
        }
        xdif = mx - (x + w);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top right
            return 2;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom right
            return 3;
        }
        xdif = mx - x;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom left
            return 4;
        }
        /* Middle Guides */
        xdif = mx - (x + w / 2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top middle
            return 5;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle right
            return 6;
        }
        xdif = mx - (x + w / 2);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom middle
            return 7;
        }
        xdif = mx - x;
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle left
            return 8;
        }
        else
            return 0;
    }
    /**
     * Draws the bounding rectangle and guides for the object when the object is selected
     * If one of the guides is selected, it colors that guide blue
     * @param x the x coordinate for where the rectangle will originate from (top left corner)
     * @param y the y coordinate for where the rectangle will originate from (top left corner)
     * @param w the width of the bounding rectangle
     * @param h the height of the bounding rectangle
     * @param corner the number of the corner to be colored blue (if any at all, if 0, all are white)
     */
    drawGuides(x, y, w, h, corner) {
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if (corner !== 0 && corner <= 4) { // a corner guide is selected
            switch (corner) { //colors the correct guide blue
                case 1:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'blue'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 2:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 3:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 4:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
            }
        }
        else if (corner !== 0) { // a middle guide is selected
            switch (corner) { //colors the correct guide blue
                case 5:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'blue'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 6:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 7:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 8:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle left
                    break;
            }
        }
        else { //if no guides are selected, colors everything white
            this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
            this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
            this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
            this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
            this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
            this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
            this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
        }
    }
    /**
     * Simple method that draws a rectangle
     * @param x x coordinate for the top left corner of the rectangle
     * @param y y coordinate for the top left corner of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param color color of the rectangle's fill
     */
    drawSquare(x, y, w, h, color) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }
    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event) {
        this.getMousePosition();
        if (this._isDragging && this._isSelected) {
            this.modifyDrag();
        }
        else if (this._isResizing && this._isSelected) {
            this.modifyResize(this.w < 10, this.h < 10);
        }
        else if (this._isChangingDims && this._isSelected) {
            this.modifyChangeDims(this.w < 10, this.h < 10);
        }
    }
    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event) {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y), this.contains(this._mouse.x, this._mouse.y));
    }
    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    onMouseUp(event) {
        this.modifyReset();
    }
    /**
     * Called whenever a key is pressed down
     * Toggles the isSelectingMultiple boolean if the key pressed is the shift key
     * @param event the keydown event
     */
    onShiftDown(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }
    /**
     * Called whenever a key is released
     * Toggles the isSelectingMultiple boolean if the key released is the shift key
     * @param event the keydown event
     */
    onShiftUp(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }
    /* Modification functions */
    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    modifyDrag() {
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    /**
     * Changes the size of the object when called (when a corner guide is clicked and dragged).
     *
     * If any of width or height is too small, it sets them equal to 10 and the other equal to
     * 10 divided or multiplied by the ratio of width/height to keep it the same.
     *
     * The work of changing the size is done by calling the helper method modifyResizeHelper.
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyResize(widthTooSmall, heightTooSmall) {
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._line.dx = new NumberNode_1.NumberNode(10); // set for the prodirect manipulation
            this._dims.height.eval(this._context).val = 10 / this._ratio;
            this._line.dy = new NumberNode_1.NumberNode(Math.round(10 / this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this.modifyResizeHelper(newDistance);
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._line.dy = new NumberNode_1.NumberNode(10); // set for the prodirect manipulation
            this._dims.width.eval(this._context).val = 10 * this._ratio;
            this._line.dx = new NumberNode_1.NumberNode(Math.round(10 * this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this.modifyResizeHelper(newDistance);
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this.modifyResizeHelper(newDistance);
        }
    }
    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 1, 2, or 4 are selected
     *
     * @param newDistance the distance between the mouse and the location opposite to it
     * (if top right guide is clicked, the distance between that and the bottom left guide is newDistance)
     */
    modifyResizeHelper(newDistance) {
        if (this.w > 10 && this.h > 10) {
            switch (this._corner) {
                case 1:
                    this._dims.y.eval(this._context).val -= Math.round((newDistance - this._initDistance) / this._ratio);
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                    break;
                case 2:
                    this._dims.y.eval(this._context).val -= Math.round((newDistance - this._initDistance) / this._ratio);
                    break;
                case 4:
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                    break;
            }
        }
        this._dims.width.eval(this._context).val += newDistance - this._initDistance;
        this._line.dx = new NumberNode_1.NumberNode(Math.round(this.w));
        this._dims.height.eval(this._context).val += (newDistance - this._initDistance) / this._ratio;
        this._line.dy = new NumberNode_1.NumberNode(Math.round(this.h));
        this._initDistance = newDistance;
    }
    /**
     * Changes the dimensions of the object when called.
     * If any of width or height is too small, it sets them equal to 10.
     * Calls modifyChangeDimsHelper to actually do the work
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyChangeDims(widthTooSmall, heightTooSmall) {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._line.dx = new NumberNode_1.NumberNode(10);
            if (newDistance - this._initDistance > 0) {
                this.modifyChangeDimsHelper();
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._line.dy = new NumberNode_1.NumberNode(10);
            if (newDistance - this._initDistance > 0) {
                this.modifyChangeDimsHelper();
            }
        }
        else {
            this.modifyChangeDimsHelper();
        }
    }
    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 5 or 8 are selected
     */
    modifyChangeDimsHelper() {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        switch (this._corner) {
            case 5:
                if (this.h > 10) { //as long as the height is > 10
                    this._dims.y.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._line.dy = new NumberNode_1.NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 6:
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._line.dx = new NumberNode_1.NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 7:
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._line.dy = new NumberNode_1.NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 8:
                if (this.w > 10) { // as long as width is > 10
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._line.dx = new NumberNode_1.NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
        }
    }
    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains, contains) {
        this._justDragged = false;
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        if (this._isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - x;
                this._dragoffy = this._mouse.y - y;
            }
            else {
                this._dragoffx = this._mouse.x - x;
                this._dragoffy = this._mouse.y - y;
                this._isDragging = true;
            }
        }
        else if (guideContains > 0 && guideContains <= 4) { //resizing
            this._isSelected = true;
            this._isResizing = true;
            this._context.eventLog.push(this.logClick());
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._height1 = this.h;
            this._width1 = this.w;
            //this._size1 = Math.sqrt(Math.pow(w,2) + Math.pow(h,2)); // size is diagonal length
            switch (this._corner) { // sets the offsets depending on which corner is selected
                case 1: // top left
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h);
                    this._dragoffx = x + w; // offset is bottom right
                    this._dragoffy = y + h;
                    break;
                case 2: // top right
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h);
                    this._dragoffx = x;
                    this._dragoffy = y + h; // offset is bottom left, etc
                    break;
                case 3:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y);
                    this._dragoffx = x;
                    this._dragoffy = y;
                    break;
                case 4:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y);
                    this._dragoffx = x + w;
                    this._dragoffy = y;
                    break;
            }
        }
        else if (guideContains > 4) { //changing shape dimensions
            this._isSelected = true;
            this._isChangingDims = true;
            this._corner = guideContains;
            switch (this._corner) { // sets the offsets depending on which middle guide is selected
                case 5: // top middle
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y + h);
                    this._dragoffx = x + w / 2; // offset is bottom middle
                    this._dragoffy = y + h;
                    break;
                case 6: //right middle
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h / 2);
                    this._dragoffx = x;
                    this._dragoffy = y + h / 2; // offset is left middle etc
                    break;
                case 7:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y);
                    this._dragoffx = x + w / 2;
                    this._dragoffy = y;
                    break;
                case 8:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h / 2);
                    this._dragoffx = x + w;
                    this._dragoffy = y + h / 2;
                    break;
            }
        }
        else if (contains) { // dragging
            this._x1 = x; // Saving original x and y
            this._y1 = y;
            this._context.eventLog.push(this.logClick());
            this._isSelected = true;
            this._isDragging = true;
            this._dragoffx = this._mouse.x - x;
            this._dragoffy = this._mouse.y - y;
        }
        else if (!this._isSelectingMultiple) { // not selected
            this._isSelected = false;
            this._isDragging = false;
        }
    }
    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset() {
        if (this._isDragging && this._isSelected) {
            this._isDragging = false;
            if (Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
                this._justDragged = true;
            }
        }
        else if ((this._isResizing || this._isChangingDims) && this._isSelected) {
            this._isResizing = false;
            let size2 = Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2));
            if ((Math.abs(this._width1 - this.w) > 0) || (Math.abs(this._height1 - this.h) > 0)) {
                this._context.eventLog.push(this.logResize());
            }
        }
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._corner = 0;
    }
    /**
     * Gets the current x and y coordinates of the mouse
     */
    getMousePosition() {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }
    /**
     * Sets isDragging, isResizing, isChangingDims, and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    isMouseOutside(event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = this._canvas.getBoundingClientRect();
        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            this._isDragging = false;
            this._isResizing = false;
            this._isChangingDims = false;
            this._isSelected = false;
            this._corner = 0;
        }
    }
    /**
     * Logs a rectangle paint event
     */
    logPaint() {
        return new PaintEvent_1.PaintEvent("rectangle", this.x, this.y);
    }
    /**
     * Logs a rectangle resize event
     */
    logResize() {
        return new ResizeEvent_1.ResizeEvent("rectangle with ID " + this.getID().toString(), Math.round(this._width1 * 100) / 100, Math.round(this._height1 * 100) / 100, Math.round(this.w * 100) / 100, Math.round(this.h * 100) / 100);
    }
    /**
     * Logs a rectangle click event
     */
    logClick() {
        return new ClickEvent_1.ClickEvent("rectangle with ID " + this.getID().toString(), this.x, this.y);
    }
    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id) {
        this.idObj = { _id: id };
    }
    ast() {
        throw new Error("Method not implemented.");
    }
    /**
     * Returns the x position of the rect
     */
    get x() {
        return this._dims.x.eval(this._context).val;
    }
    /**
     * Returns the y position of the rect
     */
    get y() {
        return this._dims.y.eval(this._context).val;
    }
    /**
     * Returns the width of the rect
     */
    get w() {
        return this._dims.width.eval(this._context).val;
    }
    /**
     * Returns the height of the rect
     */
    get h() {
        return this._dims.height.eval(this._context).val;
    }
    /**
     * Returns the Dimensions object
     */
    get dims() {
        return this._dims;
    }
    /**
     * Returns whether or not the rect is selected
     */
    get selected() {
        return this._isSelected;
    }
    /**
     * Returns the ID of the rect
     */
    getID() {
        return this.idObj._id;
    }
    /**
     * Returns whether or not the rect has just been dragged
     */
    getJustDragged() {
        return this._justDragged;
    }
    /**
     * Sets whether or not the rect has just been dragged
     * @param val The value to be assigned
     */
    setJustDragged(val) {
        this._justDragged = val;
    }
    /**
     * Returns whether or not the rect is dragging
     */
    get isDragging() {
        return this._isDragging;
    }
    /**
     * Assembles a string for selection events
     */
    toSelString() {
        return " rectangle with ID " + this.getID().toString() + " at " + this.x + ", " + this.y;
    }
    /**
    * Assembles a string for drag events
    */
    toDragString() {
        return ("rectangle with ID " + this.getID().toString() + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }
    /**
     * Assembles a string for ID assignment events
     */
    toIDString() {
        return (this.idObj._id.toString() + " to rectangle at " + this.x + ", " + this.y);
    }
}
exports.LineEffect = LineEffect;
/**
 * Gets the mouse x and y coordinates in relation to the canvas
 * @param canvas the canvas object
 * @param event the mousemove event
 */
function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
/**
 * Computes the distance between two points
 * @param x1 x coordinate of first point
 * @param y1 y coordinate of first point
 * @param x2 x coordinate of second point
 * @param y2 y coordinate of second point
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

},{"../logging/ClickEvent":23,"../logging/PaintEvent":27,"../logging/ResizeEvent":28,"../prims/NumberNode":66}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaintEvent_1 = require("../logging/PaintEvent");
const ResizeEvent_1 = require("../logging/ResizeEvent");
const ClickEvent_1 = require("../logging/ClickEvent");
class NumberEffect {
    constructor(num) {
        this._fontSize = 20;
        this._corner = 0;
        this._isEditing = false;
        this._isListening = false;
        this._isDragging = false;
        this._isResizing = false;
        this._isSelectingMultiple = false;
        this._dragoffx = 0;
        this._dragoffy = 0;
        this._initDistance = 0;
        this._mouse = {
            x: 0,
            y: 0
        };
        this._numberMetrics = {
            width: 0,
            height: 0,
            interval: 0,
            str: "",
            initMousePos: 0,
            cursorPos: 0
        };
        this._num = num;
    }
    /**
     * The method that is called when evaluating nodes (StringNode, EllipseNode, etc)
     * This method assigns all params to private variables and draws the initial object to the canvas
     * by calling update()
     * @param context The parent Scope that contains the canvas among other things
     * @param dims The object's dimensions including x and y position
     * @param ast Unnecessary now, used to be the parent AST
     */
    draw(context, dims, ast) {
        if (context.canvas != undefined) {
            this._context = context;
            this._canvas = context.canvas.get();
            this._dims = dims;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this.update();
            // logging
            this._context.eventLog.push(this.logPaint()); // this.context or context?
            context.effects.push(this);
            this.addEventListeners();
        }
        else {
            console.log("canvas is NOT defined");
        }
    }
    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update() {
        let fontDeets = this._fontSize + "px Courier New";
        this._ctx.font = fontDeets;
        this._ctx.fillStyle = "#673AB7";
        let str = this._num.toString();
        this._ctx.fillText(str, this.x, this.y);
        let numberDims = this._ctx.measureText(str);
        this._numberMetrics.width = numberDims.width;
        this._numberMetrics.height = this._fontSize;
        this._numberMetrics.str = str;
        this._numberMetrics.interval = this._numberMetrics.width / this._numberMetrics.str.length;
        if (this._isSelected) {
            this.drawTextGuides(this.x, this.y - this._fontSize, this._numberMetrics.width, this._numberMetrics.height, this._corner);
        }
        if (this._isEditing) {
            this.modifyTextCursor();
        }
    }
    /**
     * Adds all the necessary event listeners in one fell swoop
     */
    addEventListeners() {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this)); // bind in order to maintain the meaning of 'this'
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    }
    /**
     * Removes all the necessary event listeners in another fell swoop
     */
    removeEventListeners() {
    }
    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx, my) {
        return (this.x <= mx) && (this.x + this._numberMetrics.width >= mx) &&
            (this.y - this._fontSize <= my) && (this.y >= my);
    }
    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx, my) {
        let xdif = mx - (this.x + this._numberMetrics.width);
        let ydif = my - (this.y - this._fontSize);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) {
            this._isEditing = false;
            return 2;
        }
        else
            return 0;
    }
    /**
     * Draws the bounding rectangle and guides for the object when the object is selected
     * If one of the guides is selected, it colors that guide blue
     * @param x the x coordinate for where the rectangle will originate from (top left corner)
     * @param y the y coordinate for where the rectangle will originate from (top left corner)
     * @param w the width of the bounding rectangle
     * @param h the height of the bounding rectangle
     * @param corner the number of the corner to be colored blue (if any at all, if 0, all are white)
     */
    drawTextGuides(x, y, w, h, corner) {
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if (corner !== 0) {
            switch (corner) { //colors the guide blue if selected
                case 2:
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue');
                    break;
            }
        }
        else {
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white');
        }
    }
    /**
     * Simple method that draws a rectangle
     * @param x x coordinate for the top left corner of the rectangle
     * @param y y coordinate for the top left corner of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param color color of the rectangle's fill
     */
    drawSquare(x, y, w, h, color) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }
    /* Event listener functions */
    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event) {
        this.getMousePosition();
        if (this._isSelected && this._isDragging) {
            this.modifyDrag();
        }
        else if (this._isResizing && this._isSelected) {
            this.modifyResize(this._fontSize < 15);
        }
    }
    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event) {
        if (!this._isSelectingMultiple && this._isSelected && this.contains(this._mouse.x, this._mouse.y)) { //text editing
            if (!this._isListening) {
                window.addEventListener('keydown', this.modifyText.bind(this));
            }
            this._isListening = true;
            this._isEditing = true;
            this._isDragging = false;
            this._numberMetrics.initMousePos = this._mouse.x;
            this.modifyTextCursor();
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isEditing = false;
        }
        else {
            this._isEditing = false;
        }
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y) > 0, this.contains(this._mouse.x, this._mouse.y));
    }
    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    onMouseUp(event) {
        this.modifyReset();
    }
    /**
     * Called whenever a key is pressed down
     * Toggles the isSelectingMultiple boolean if the key pressed is the shift key
     * @param event the keydown event
     */
    onShiftDown(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }
    /**
     * Called whenever a key is released
     * Toggles the isSelectingMultiple boolean if the key released is the shift key
     * @param event the keydown event
     */
    onShiftUp(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }
    /* Modification functions */
    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    modifyDrag() {
        //("string dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    /**
     * Creates and moves the text edit cursor based on where the mouse is clicked
     */
    modifyTextCursor() {
        let leftWall = this.x; // the x position of the left most side of the bounding rectangle
        let xDif = this._numberMetrics.initMousePos - leftWall; // difference between mouse x and left wall
        let interval = this._numberMetrics.interval; // the text width divided by the length of the string
        let moveFactor = 0;
        if (xDif >= interval / 2 && xDif <= interval) {
            moveFactor = leftWall + interval;
            this._numberMetrics.cursorPos = interval;
        }
        else if (xDif <= interval / 2) {
            moveFactor = leftWall;
            this._numberMetrics.cursorPos = 0;
        }
        else if (xDif % interval >= interval / 2) {
            moveFactor = leftWall + interval * Math.ceil(xDif / interval);
            this._numberMetrics.cursorPos = interval * Math.ceil(xDif / interval);
        }
        else if (xDif % interval < interval / 2) {
            moveFactor = leftWall + interval * Math.floor(xDif / interval);
            this._numberMetrics.cursorPos = interval * Math.floor(xDif / interval);
        }
        this._ctx.moveTo(moveFactor, this.y - this._fontSize);
        this._ctx.lineTo(moveFactor, this.y);
        this._ctx.strokeStyle = "grey";
        this._ctx.stroke();
    }
    /**
     * This edits the string when editing text
     * @param event keydown event
     */
    modifyText(event) {
        if (this._isEditing) {
            let firstHalf;
            let secondHalf;
            let str = this._num.toString();
            let breakPoint = this._numberMetrics.cursorPos / this._numberMetrics.interval;
            firstHalf = str.substring(0, breakPoint);
            secondHalf = str.substring(breakPoint);
            if (event.keyCode == 37 && this._numberMetrics.initMousePos > this.x + this._numberMetrics.interval / 2) {
                this._numberMetrics.initMousePos -= this._numberMetrics.interval;
                this.modifyTextCursor();
            }
            else if (event.keyCode == 39 && this._numberMetrics.initMousePos < this.x + this._numberMetrics.width) {
                this._numberMetrics.initMousePos += this._numberMetrics.interval;
                this.modifyTextCursor();
            }
            else if (event.keyCode == 8 && str.length > 0) {
                firstHalf = firstHalf.substring(0, firstHalf.length - 1);
                str = firstHalf + secondHalf;
                this._num.val = Number(str);
                this._numberMetrics.initMousePos -= this._numberMetrics.interval;
                this.modifyTextCursor();
            }
            else {
                let keyName = event.key;
                if (keyName.length == 1) {
                    firstHalf += keyName;
                    str = firstHalf + secondHalf;
                    this._num.val = Number(str);
                    this._numberMetrics.initMousePos += this._numberMetrics.interval;
                    this.modifyTextCursor();
                }
            }
        }
    }
    /**
     * Modifies the font size of the text
     * If the text font is smaller than 15pt, it set's it equal to 15pt
     * @param isTooSmall true if the font size is < 15
     */
    modifyResize(isTooSmall) {
        if (isTooSmall) {
            this._fontSize = 15;
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this._fontSize += (newDistance - this._initDistance) * 0.2;
                this._initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this._fontSize += (newDistance - this._initDistance) * 0.2;
            this._initDistance = newDistance;
        }
    }
    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains, contains) {
        this._justDragged = false;
        if (this._isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this._x = this.x;
                this._y = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - this.x;
                this._dragoffy = this._mouse.y - this.y;
            }
            else {
                this._dragoffx = this._mouse.x - this.x;
                this._dragoffy = this._mouse.y - this.y;
                this._isDragging = true;
            }
            // if(this._context.mulSelected.mulSel){
            //     console.log("string effect mulSelected: " + this._context.mulSelected.mulSel);
            //     //if(this._context.mulSelected.val){
            //     this._context.eventLog.push(this.logSelected());
            //     //this.logSelected();
            // }
        }
        else if (guideContains) { //if the corner guides contain the mouse we are resizing
            this._isSelected = true;
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._context.eventLog.push(this.logClick());
            this._dragoffx = this.x;
            this._dragoffy = this.y;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this.x, this.y);
            this._isResizing = true;
            this._size1 = this._fontSize; // saving old font size
        }
        else if (contains) {
            this._x = this.x; // Saving original x and y
            this._y = this.y;
            this._isSelected = true;
            this._context.eventLog.push(this.logClick());
            this._dragoffx = this._mouse.x - this.x;
            this._dragoffy = this._mouse.y - this.y;
            if (!this._isEditing) {
                this._isDragging = true;
            }
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
            this._isEditing = false;
        }
    }
    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset() {
        if (this._isDragging && this._isSelected) {
            this._isDragging = false;
            if (Math.abs(this._x - this.x) > 1 || Math.abs(this._y - this.y) > 1) {
                this._justDragged = true;
                //this._context.eventLog.push(this.logMove());
            }
        }
        else if (this._isResizing && this._isSelected) {
            this._isResizing = false;
            if (Math.abs(this._size1 - this._fontSize) > 0) {
                this._context.eventLog.push(this.logResize());
            }
        }
        this._isDragging = false;
        this._isResizing = false;
        this._corner = 0;
        // console.log("string effect mulSelected: " + this._context.mulSelected.val);
        // if(this._context.mulSelected.val){
        //     this.logSelected();
        // }
        // if(this.isMultipleSelected){
        //     context.eventLog.push(new SelectEvent(selectedElems));
        //     masterLog.push(context.eventLog[context.eventLog.length - 1]);
        //     //console.log("multiple selected");
        // }
        // //this._context.eventLog.push(this.logMove());
    }
    /**
     * Gets the current x and y coordinates of the mouse
     */
    getMousePosition() {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }
    /**
     * Sets isDragging, isResizing, isChangingDims, and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    isMouseOutside(event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = this._canvas.getBoundingClientRect();
        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            this._isDragging = false;
            this._isResizing = false;
            this._isSelected = false;
            this._isEditing = false;
            this._corner = 0;
        }
    }
    /**
     * Logs a paint event
     */
    logPaint() {
        return new PaintEvent_1.PaintEvent(this._num.toString(), this.x, this.y);
    }
    /**
     * Logs a resize event
     */
    logResize() {
        return new ResizeEvent_1.ResizeEvent(this._num.toString() + " with ID " + this.getID().toString(), Math.round(this._size1 * 100) / 100, Math.round(this._fontSize * 100) / 100);
    }
    /**
     * Logs a click event
     */
    logClick() {
        return new ClickEvent_1.ClickEvent(this._num.toString() + " with ID " + this.getID().toString(), this.x, this.y);
    }
    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id) {
        this.idObj = { _id: id, };
    }
    /**
     * Returns the canvas
     */
    get canvas() {
        return this._canvas;
    }
    /**
     * Sets the canvas
     * @param canvas The canvas to be assigned
     */
    set canvas(canvas) {
        this._canvas = canvas;
    }
    ast() {
        throw new Error("Method not implemented.");
    }
    /**
     * Returns the x position of the number
     */
    get x() {
        return this._dims.x.eval(this._context).val;
    }
    /**
     * Returns the y position of the number
     */
    get y() {
        return this._dims.y.eval(this._context).val;
    }
    /**
     * Returns the Dimensions object
     */
    get dims() {
        return this._dims;
    }
    /**
    * Returns whether or not the ellipse has just been dragged
    */
    getJustDragged() {
        return this._justDragged;
    }
    /**
     * Sets whether or not the ellipse has just been dragged
     * @param val The value to be assigned
     */
    setJustDragged(val) {
        this._justDragged = val;
    }
    /**
     * Returns whether or not the ellipse is dragging
     */
    get isDragging() {
        return this._isDragging;
    }
    /**
     * Returns whether or not this is selected
     */
    get selected() {
        return this._isSelected;
    }
    /**
     * Returns the number
     */
    get num() {
        return this._num.val;
    }
    /**
     * Returns the object ID
     */
    getID() {
        return this.idObj._id;
    }
    /**
     * Assembles a string for selection events
     */
    toSelString() {
        return " " + this._num.toString() + " with ID " + this.getID().toString() + " at " + this.x + ", " + this.y;
    }
    /**
    * Assembles a string for drag events
    */
    toDragString() {
        return (this._num.toString() + " with ID " + this.getID().toString() + " from " + this._x + ", " + this._y + " to " + this.x + ", " + this.y);
    }
    /**
     * Assembles a string for ID assignment events
     */
    toIDString() {
        return (this.idObj._id.toString() + " to " + this._num.toString() + " at " + this.x + ", " + this.y);
    }
}
exports.NumberEffect = NumberEffect;
/**
 * Get's the mouse x and y coordinates in relation to the canvas
 * @param canvas the canvas object
 * @param event the mousemove event
 */
function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
/**
 * Computes the distance between two points
 * @param x1 x coordinate of first point
 * @param y1 y coordinate of first point
 * @param x2 x coordinate of second point
 * @param y2 y coordinate of second point
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

},{"../logging/ClickEvent":23,"../logging/PaintEvent":27,"../logging/ResizeEvent":28}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const PaintEvent_1 = require("../logging/PaintEvent");
const ResizeEvent_1 = require("../logging/ResizeEvent");
const ClickEvent_1 = require("../logging/ClickEvent");
class RectangleEffect {
    constructor(rect) {
        this._corner = 0;
        this._isSelected = false; // private bools
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._isSelectingMultiple = false;
        this._justDragged = false;
        this._ratio = 0;
        this._dragoffx = 0;
        this._dragoffy = 0;
        this._initDistance = 0;
        this._mouse = {
            x: 0,
            y: 0
        };
        this._rect = rect;
    }
    /**
     * The method that is called when evaluating nodes (StringNode, EllipseNode, etc)
     * This method assigns all params to private variables and draws the initial object to the canvas
     * by calling update()
     * @param context The parent Scope that contains the canvas among other things
     * @param dims The object's dimensions including x and y position
     * @param ast Unnecessary now, used to be the parent AST
     */
    draw(context, dims, ast) {
        if (context.canvas.isDefined()) {
            this._dims = dims;
            this._canvas = context.canvas.get();
            this._context = context;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this._ratio = this.w / this.h;
            this.update();
        }
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
    }
    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update() {
        let x = this.x;
        let y = this.y;
        let width = this.w;
        let height = this.h;
        this._ctx.beginPath();
        this._ctx.rect(x, y, width, height);
        //this._ctx.strokeStyle = "black";
        //this._ctx.stroke();
        this._ctx.fillStyle = "#d5b8ff";
        this._ctx.shadowColor = "#6C6C6C";
        this._ctx.shadowBlur = 15;
        //this._ctx.shadowOffsetX = 2;
        //this._ctx.shadowOffsetY = 2;
        this._ctx.fill();
        if (this._isSelected) {
            this.drawGuides(x, y, width, height, this._corner);
        }
    }
    /**
     * Adds all the necessary event listeners in one fell swoop
     */
    addEventListeners() {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this)); // bind in order to maintain the meaning of 'this'
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    }
    /**
     * Removes all the necessary event listeners in another fell swoop
     */
    removeEventListeners() {
    }
    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx, my) {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        if (mx > x && mx < x + w && my > y && my < y + h) {
            return true;
        }
        else
            return false;
    }
    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx, my) {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        let xdif = mx - x;
        let ydif = my - y;
        /* Corner Guides */
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top left
            return 1;
        }
        xdif = mx - (x + w);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top right
            return 2;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom right
            return 3;
        }
        xdif = mx - x;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom left
            return 4;
        }
        /* Middle Guides */
        xdif = mx - (x + w / 2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top middle
            return 5;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle right
            return 6;
        }
        xdif = mx - (x + w / 2);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom middle
            return 7;
        }
        xdif = mx - x;
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle left
            return 8;
        }
        else
            return 0;
    }
    /**
     * Draws the bounding rectangle and guides for the object when the object is selected
     * If one of the guides is selected, it colors that guide blue
     * @param x the x coordinate for where the rectangle will originate from (top left corner)
     * @param y the y coordinate for where the rectangle will originate from (top left corner)
     * @param w the width of the bounding rectangle
     * @param h the height of the bounding rectangle
     * @param corner the number of the corner to be colored blue (if any at all, if 0, all are white)
     */
    drawGuides(x, y, w, h, corner) {
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if (corner !== 0 && corner <= 4) { // a corner guide is selected
            switch (corner) { //colors the correct guide blue
                case 1:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'blue'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 2:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 3:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 4:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
            }
        }
        else if (corner !== 0) { // a middle guide is selected
            switch (corner) { //colors the correct guide blue
                case 5:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'blue'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 6:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 7:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 8:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle left
                    break;
            }
        }
        else { //if no guides are selected, colors everything white
            this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
            this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
            this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
            this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
            this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
            this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
            this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
        }
    }
    /**
     * Simple method that draws a rectangle
     * @param x x coordinate for the top left corner of the rectangle
     * @param y y coordinate for the top left corner of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param color color of the rectangle's fill
     */
    drawSquare(x, y, w, h, color) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }
    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event) {
        this.getMousePosition();
        if (this._isDragging && this._isSelected) {
            this.modifyDrag();
        }
        else if (this._isResizing && this._isSelected) {
            this.modifyResize(this.w < 10, this.h < 10);
        }
        else if (this._isChangingDims && this._isSelected) {
            this.modifyChangeDims(this.w < 10, this.h < 10);
        }
    }
    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event) {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y), this.contains(this._mouse.x, this._mouse.y));
    }
    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    onMouseUp(event) {
        this.modifyReset();
    }
    /**
     * Called whenever a key is pressed down
     * Toggles the isSelectingMultiple boolean if the key pressed is the shift key
     * @param event the keydown event
     */
    onShiftDown(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }
    /**
     * Called whenever a key is released
     * Toggles the isSelectingMultiple boolean if the key released is the shift key
     * @param event the keydown event
     */
    onShiftUp(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }
    /* Modification functions */
    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    modifyDrag() {
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    /**
     * Changes the size of the object when called (when a corner guide is clicked and dragged).
     *
     * If any of width or height is too small, it sets them equal to 10 and the other equal to
     * 10 divided or multiplied by the ratio of width/height to keep it the same.
     *
     * The work of changing the size is done by calling the helper method modifyResizeHelper.
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyResize(widthTooSmall, heightTooSmall) {
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._rect.width = new NumberNode_1.NumberNode(10); // set for the prodirect manipulation
            this._dims.height.eval(this._context).val = 10 / this._ratio;
            this._rect.height = new NumberNode_1.NumberNode(Math.round(10 / this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this.modifyResizeHelper(newDistance);
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._rect.height = new NumberNode_1.NumberNode(10); // set for the prodirect manipulation
            this._dims.width.eval(this._context).val = 10 * this._ratio;
            this._rect.width = new NumberNode_1.NumberNode(Math.round(10 * this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this.modifyResizeHelper(newDistance);
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this.modifyResizeHelper(newDistance);
        }
    }
    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 1, 2, or 4 are selected
     *
     * @param newDistance the distance between the mouse and the location opposite to it
     * (if top right guide is clicked, the distance between that and the bottom left guide is newDistance)
     */
    modifyResizeHelper(newDistance) {
        if (this.w > 10 && this.h > 10) {
            switch (this._corner) {
                case 1:
                    this._dims.y.eval(this._context).val -= Math.round((newDistance - this._initDistance) / this._ratio);
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                    break;
                case 2:
                    this._dims.y.eval(this._context).val -= Math.round((newDistance - this._initDistance) / this._ratio);
                    break;
                case 4:
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                    break;
            }
        }
        this._dims.width.eval(this._context).val += newDistance - this._initDistance;
        this._rect.width = new NumberNode_1.NumberNode(Math.round(this.w));
        this._dims.height.eval(this._context).val += (newDistance - this._initDistance) / this._ratio;
        this._rect.height = new NumberNode_1.NumberNode(Math.round(this.h));
        this._initDistance = newDistance;
    }
    /**
     * Changes the dimensions of the object when called.
     * If any of width or height is too small, it sets them equal to 10.
     * Calls modifyChangeDimsHelper to actually do the work
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyChangeDims(widthTooSmall, heightTooSmall) {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._rect.width = new NumberNode_1.NumberNode(10);
            if (newDistance - this._initDistance > 0) {
                this.modifyChangeDimsHelper();
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._rect.height = new NumberNode_1.NumberNode(10);
            if (newDistance - this._initDistance > 0) {
                this.modifyChangeDimsHelper();
            }
        }
        else {
            this.modifyChangeDimsHelper();
        }
    }
    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 5 or 8 are selected
     */
    modifyChangeDimsHelper() {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        switch (this._corner) {
            case 5:
                if (this.h > 10) { //as long as the height is > 10
                    this._dims.y.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._rect.height = new NumberNode_1.NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 6:
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._rect.width = new NumberNode_1.NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 7:
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._rect.height = new NumberNode_1.NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 8:
                if (this.w > 10) { // as long as width is > 10
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._rect.width = new NumberNode_1.NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
        }
    }
    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains, contains) {
        this._justDragged = false;
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        if (this._isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - x;
                this._dragoffy = this._mouse.y - y;
            }
            else {
                this._dragoffx = this._mouse.x - x;
                this._dragoffy = this._mouse.y - y;
                this._isDragging = true;
            }
        }
        else if (guideContains > 0 && guideContains <= 4) { //resizing
            this._isSelected = true;
            this._isResizing = true;
            this._context.eventLog.push(this.logClick());
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._height1 = this.h;
            this._width1 = this.w;
            //this._size1 = Math.sqrt(Math.pow(w,2) + Math.pow(h,2)); // size is diagonal length
            switch (this._corner) { // sets the offsets depending on which corner is selected
                case 1: // top left
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h);
                    this._dragoffx = x + w; // offset is bottom right
                    this._dragoffy = y + h;
                    break;
                case 2: // top right
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h);
                    this._dragoffx = x;
                    this._dragoffy = y + h; // offset is bottom left, etc
                    break;
                case 3:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y);
                    this._dragoffx = x;
                    this._dragoffy = y;
                    break;
                case 4:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y);
                    this._dragoffx = x + w;
                    this._dragoffy = y;
                    break;
            }
        }
        else if (guideContains > 4) { //changing shape dimensions
            this._isSelected = true;
            this._isChangingDims = true;
            this._corner = guideContains;
            switch (this._corner) { // sets the offsets depending on which middle guide is selected
                case 5: // top middle
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y + h);
                    this._dragoffx = x + w / 2; // offset is bottom middle
                    this._dragoffy = y + h;
                    break;
                case 6: //right middle
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h / 2);
                    this._dragoffx = x;
                    this._dragoffy = y + h / 2; // offset is left middle etc
                    break;
                case 7:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y);
                    this._dragoffx = x + w / 2;
                    this._dragoffy = y;
                    break;
                case 8:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h / 2);
                    this._dragoffx = x + w;
                    this._dragoffy = y + h / 2;
                    break;
            }
        }
        else if (contains) { // dragging
            this._x1 = x; // Saving original x and y
            this._y1 = y;
            this._context.eventLog.push(this.logClick());
            this._isSelected = true;
            this._isDragging = true;
            this._dragoffx = this._mouse.x - x;
            this._dragoffy = this._mouse.y - y;
        }
        else if (!this._isSelectingMultiple) { // not selected
            this._isSelected = false;
            this._isDragging = false;
        }
    }
    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset() {
        if (this._isDragging && this._isSelected) {
            this._isDragging = false;
            if (Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
                this._justDragged = true;
            }
        }
        else if ((this._isResizing || this._isChangingDims) && this._isSelected) {
            this._isResizing = false;
            let size2 = Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2));
            if ((Math.abs(this._width1 - this.w) > 0) || (Math.abs(this._height1 - this.h) > 0)) {
                this._context.eventLog.push(this.logResize());
            }
        }
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._corner = 0;
    }
    /**
     * Gets the current x and y coordinates of the mouse
     */
    getMousePosition() {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }
    /**
     * Sets isDragging, isResizing, isChangingDims, and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    isMouseOutside(event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = this._canvas.getBoundingClientRect();
        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            this._isDragging = false;
            this._isResizing = false;
            this._isChangingDims = false;
            this._isSelected = false;
            this._corner = 0;
        }
    }
    /**
     * Logs a rectangle paint event
     */
    logPaint() {
        return new PaintEvent_1.PaintEvent("rectangle", this.x, this.y);
    }
    /**
     * Logs a rectangle resize event
     */
    logResize() {
        return new ResizeEvent_1.ResizeEvent("rectangle with ID " + this.getID().toString(), Math.round(this._width1 * 100) / 100, Math.round(this._height1 * 100) / 100, Math.round(this.w * 100) / 100, Math.round(this.h * 100) / 100);
    }
    /**
     * Logs a rectangle click event
     */
    logClick() {
        return new ClickEvent_1.ClickEvent("rectangle with ID " + this.getID().toString(), this.x, this.y);
    }
    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id) {
        this.idObj = { _id: id };
    }
    ast() {
        throw new Error("Method not implemented.");
    }
    /**
     * Returns the x position of the rect
     */
    get x() {
        return this._dims.x.eval(this._context).val;
    }
    /**
     * Returns the y position of the rect
     */
    get y() {
        return this._dims.y.eval(this._context).val;
    }
    /**
     * Returns the width of the rect
     */
    get w() {
        return this._dims.width.eval(this._context).val;
    }
    /**
     * Returns the height of the rect
     */
    get h() {
        return this._dims.height.eval(this._context).val;
    }
    /**
     * Returns the Dimensions object
     */
    get dims() {
        return this._dims;
    }
    /**
     * Returns whether or not the rect is selected
     */
    get selected() {
        return this._isSelected;
    }
    /**
     * Returns the ID of the rect
     */
    getID() {
        return this.idObj._id;
    }
    /**
     * Returns whether or not the rect has just been dragged
     */
    getJustDragged() {
        return this._justDragged;
    }
    /**
     * Sets whether or not the rect has just been dragged
     * @param val The value to be assigned
     */
    setJustDragged(val) {
        this._justDragged = val;
    }
    /**
     * Returns whether or not the rect is dragging
     */
    get isDragging() {
        return this._isDragging;
    }
    /**
     * Assembles a string for selection events
     */
    toSelString() {
        return " rectangle with ID " + this.getID().toString() + " at " + this.x + ", " + this.y;
    }
    /**
    * Assembles a string for drag events
    */
    toDragString() {
        return ("rectangle with ID " + this.getID().toString() + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }
    /**
     * Assembles a string for ID assignment events
     */
    toIDString() {
        return (this.idObj._id.toString() + " to rectangle at " + this.x + ", " + this.y);
    }
}
exports.RectangleEffect = RectangleEffect;
/**
 * Gets the mouse x and y coordinates in relation to the canvas
 * @param canvas the canvas object
 * @param event the mousemove event
 */
function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
/**
 * Computes the distance between two points
 * @param x1 x coordinate of first point
 * @param y1 y coordinate of first point
 * @param x2 x coordinate of second point
 * @param y2 y coordinate of second point
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

},{"../logging/ClickEvent":23,"../logging/PaintEvent":27,"../logging/ResizeEvent":28,"../prims/NumberNode":66}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaintEvent_1 = require("../logging/PaintEvent");
const ResizeEvent_1 = require("../logging/ResizeEvent");
const ClickEvent_1 = require("../logging/ClickEvent");
class StringEffect {
    constructor(str) {
        this._fontSize = 20;
        //private _size2: number;
        this._corner = 0;
        this._isSelected = false; // Private bools
        this._isEditing = false;
        this._isListening = false;
        this._isDragging = false;
        this._isResizing = false;
        this._isSelectingMultiple = false;
        this._justDragged = false; // Has this object just been dragged?
        //private _log: string[];
        this._dragoffx = 0;
        this._dragoffy = 0;
        this._initDistance = 0;
        this._mouse = {
            x: 0,
            y: 0
        };
        this._textMetrics = {
            width: 0,
            height: 0,
            interval: 0,
            str: "",
            initMousePos: 0,
            cursorPos: 0
        };
        this._str = str;
    }
    /**
     * The method that is called when evaluating nodes (StringNode, EllipseNode, etc)
     * This method assigns all params to private variables and draws the initial object to the canvas
     * by calling update()
     * @param context The parent Scope that contains the canvas among other things
     * @param dims The object's dimensions including x and y position
     * @param ast Unnecessary now, used to be the parent AST
     */
    draw(context, dims, ast) {
        if (context.canvas != undefined) {
            this._context = context;
            this._canvas = context.canvas.get();
            this._dims = dims;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this.update();
            // logging
            this._context.eventLog.push(this.logPaint()); // this.context or context?
            context.effects.push(this);
            this.addEventListeners();
        }
        else {
            console.log("canvas is NOT defined");
        }
    }
    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update() {
        let fontDeets = this._fontSize + "px Courier New";
        this._ctx.font = fontDeets;
        this._ctx.fillStyle = "#673AB7";
        this._ctx.fillText(this._str.val, this.x, this.y);
        let textDims = this._ctx.measureText(this._str.val);
        this._textMetrics.width = textDims.width;
        this._textMetrics.height = this._fontSize;
        this._textMetrics.str = this._str.val;
        this._textMetrics.interval = this._textMetrics.width / this._textMetrics.str.length;
        if (this._isSelected) {
            this.drawTextGuides(this.x, this.y - this._fontSize, this._textMetrics.width, this._textMetrics.height, this._corner);
        }
        if (this._isEditing) {
            this.modifyTextCursor();
        }
    }
    /**
     * Adds all the necessary event listeners in one fell swoop
     */
    addEventListeners() {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this)); // bind in order to maintain the meaning of 'this'
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    }
    /**
     * Removes all the necessary event listeners in another fell swoop
     */
    removeEventListeners() {
    }
    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx, my) {
        return (this.x <= mx) && (this.x + this._textMetrics.width >= mx) &&
            (this.y - this._fontSize <= my) && (this.y >= my);
    }
    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx, my) {
        let xdif = mx - (this.x + this._textMetrics.width);
        let ydif = my - (this.y - this._fontSize);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) {
            this._isEditing = false;
            return 2;
        }
        else
            return 0;
    }
    /**
     * Draws the bounding rectangle and guides for the object when the object is selected
     * If one of the guides is selected, it colors that guide blue
     * @param x the x coordinate for where the rectangle will originate from (top left corner)
     * @param y the y coordinate for where the rectangle will originate from (top left corner)
     * @param w the width of the bounding rectangle
     * @param h the height of the bounding rectangle
     * @param corner the number of the corner to be colored blue (if any at all, if 0, all are white)
     */
    drawTextGuides(x, y, w, h, corner) {
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if (corner !== 0) {
            switch (corner) { //colors the guide blue if selected
                case 2:
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue');
                    break;
            }
        }
        else {
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white');
        }
    }
    /**
     * Simple method that draws a rectangle
     * @param x x coordinate for the top left corner of the rectangle
     * @param y y coordinate for the top left corner of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param color color of the rectangle's fill
     */
    drawSquare(x, y, w, h, color) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }
    /* Event listener functions */
    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event) {
        this.getMousePosition();
        if (this._isSelected && this._isDragging) {
            //console.log(this._str.val + " is being dragged.");
            this.modifyDrag();
        }
        else if (this._isResizing && this._isSelected) {
            this.modifyResize(this._fontSize < 15);
        }
    }
    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event) {
        if (!this._isSelectingMultiple && this._isSelected && this.contains(this._mouse.x, this._mouse.y)) { //text editing
            if (!this._isListening) {
                window.addEventListener('keydown', this.modifyText.bind(this));
            }
            this._isListening = true;
            this._isEditing = true;
            this._isDragging = false;
            //console.log(this._str.val + " is setting dragging to false");
            this._textMetrics.initMousePos = this._mouse.x;
            this.modifyTextCursor();
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isEditing = false;
        }
        else {
            this._isEditing = false;
        }
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y) > 0, this.contains(this._mouse.x, this._mouse.y));
    }
    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    onMouseUp(event) {
        this.modifyReset();
    }
    /**
     * Called whenever a key is pressed down
     * Toggles the isSelectingMultiple boolean if the key pressed is the shift key
     * @param event the keydown event
     */
    onShiftDown(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }
    /**
     * Called whenever a key is released
     * Toggles the isSelectingMultiple boolean if the key released is the shift key
     * @param event the keydown event
     */
    onShiftUp(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }
    /* Modification functions */
    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    modifyDrag() {
        //("string dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    /**
     * Creates and moves the text edit cursor based on where the mouse is clicked
     */
    modifyTextCursor() {
        let leftWall = this.x; // the x position of the left most side of the bounding rectangle
        let xDif = this._textMetrics.initMousePos - leftWall; // difference between mouse x and left wall
        let interval = this._textMetrics.interval; // the text width divided by the length of the string
        let moveFactor = 0;
        if (xDif >= interval / 2 && xDif <= interval) {
            moveFactor = leftWall + interval;
            this._textMetrics.cursorPos = interval;
        }
        else if (xDif <= interval / 2) {
            moveFactor = leftWall;
            this._textMetrics.cursorPos = 0;
        }
        else if (xDif % interval >= interval / 2) {
            moveFactor = leftWall + interval * Math.ceil(xDif / interval);
            this._textMetrics.cursorPos = interval * Math.ceil(xDif / interval);
        }
        else if (xDif % interval < interval / 2) {
            moveFactor = leftWall + interval * Math.floor(xDif / interval);
            this._textMetrics.cursorPos = interval * Math.floor(xDif / interval);
        }
        this._ctx.moveTo(moveFactor, this.y - this._fontSize);
        this._ctx.lineTo(moveFactor, this.y);
        this._ctx.strokeStyle = "grey";
        this._ctx.stroke();
    }
    /**
     * This edits the string when editing text
     * @param event keydown event
     */
    modifyText(event) {
        if (this._isEditing) {
            let firstHalf;
            let secondHalf;
            let breakPoint = this._textMetrics.cursorPos / this._textMetrics.interval;
            firstHalf = this._str.val.substring(0, breakPoint);
            secondHalf = this._str.val.substring(breakPoint);
            if (event.keyCode == 37 && this._textMetrics.initMousePos > this.x + this._textMetrics.interval / 2) {
                this._textMetrics.initMousePos -= this._textMetrics.interval;
                this.modifyTextCursor();
            }
            else if (event.keyCode == 39 && this._textMetrics.initMousePos < this.x + this._textMetrics.width) {
                this._textMetrics.initMousePos += this._textMetrics.interval;
                this.modifyTextCursor();
            }
            else if (event.keyCode == 8 && this._str.val.length > 0) {
                firstHalf = firstHalf.substring(0, firstHalf.length - 1);
                this._str.str = firstHalf + secondHalf;
                this._textMetrics.initMousePos -= this._textMetrics.interval;
                this.modifyTextCursor();
            }
            else {
                let keyName = event.key;
                if (keyName.length == 1) {
                    firstHalf += keyName;
                    this._str.str = firstHalf + secondHalf;
                    this._textMetrics.initMousePos += this._textMetrics.interval;
                    this.modifyTextCursor();
                }
            }
        }
    }
    /**
     * Modifies the font size of the text
     * If the text font is smaller than 15pt, it set's it equal to 15pt
     * @param isTooSmall true if the font size is < 15
     */
    modifyResize(isTooSmall) {
        if (isTooSmall) {
            this._fontSize = 15;
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this._fontSize += (newDistance - this._initDistance) * 0.2;
                this._initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this._fontSize += (newDistance - this._initDistance) * 0.2;
            this._initDistance = newDistance;
        }
    }
    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains, contains) {
        this._justDragged = false;
        if (this._isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - this.x;
                this._dragoffy = this._mouse.y - this.y;
            }
            else {
                this._dragoffx = this._mouse.x - this.x;
                this._dragoffy = this._mouse.y - this.y;
                this._isDragging = true;
            }
            // if(this._context.mulSelected.mulSel){
            //     console.log("string effect mulSelected: " + this._context.mulSelected.mulSel);
            //     //if(this._context.mulSelected.val){
            //     this._context.eventLog.push(this.logSelected());
            //     //this.logSelected();
            // }
        }
        else if (guideContains) { //if the corner guides contain the mouse we are resizing
            this._isSelected = true;
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._context.eventLog.push(this.logClick());
            //console.log(this._str.val + "is selected?" + this._selected);
            //console.log("state selection is " + this._str.val);
            this._dragoffx = this.x;
            this._dragoffy = this.y;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this.x, this.y);
            this._isResizing = true;
            this._size1 = this._fontSize; // saving old font size
        }
        else if (contains) {
            this._x1 = this.x; // Saving original x and y
            this._y1 = this.y;
            this._isSelected = true;
            this._context.eventLog.push(this.logClick());
            //console.log(this._str.val + "is selected?" + this._selected);
            //console.log("state selection is " + this._str.val);
            this._dragoffx = this._mouse.x - this.x;
            this._dragoffy = this._mouse.y - this.y;
            if (!this._isEditing) {
                this._isDragging = true;
                //console.log(this._str.val + " is dragging? " + this._isDragging);
            }
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
            this._isEditing = false;
        }
    }
    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset() {
        if (this._isDragging && this._isSelected) {
            //console.log(this._str.val + " logging drag");
            this._isDragging = false;
            if (Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
                this._justDragged = true;
                //this._context.eventLog.push(this.logMove());
            }
        }
        else if (this._isResizing && this._isSelected) {
            //console.log(this._str.val + " logging resize");
            this._isResizing = false;
            if (Math.abs(this._size1 - this._fontSize) > 0) {
                this._context.eventLog.push(this.logResize());
            }
        }
        this._isDragging = false;
        this._isResizing = false;
        this._corner = 0;
        // console.log("string effect mulSelected: " + this._context.mulSelected.val);
        // if(this._context.mulSelected.val){
        //     this.logSelected();
        // }
        // if(this.isMultipleSelected){
        //     context.eventLog.push(new SelectEvent(selectedElems));
        //     masterLog.push(context.eventLog[context.eventLog.length - 1]);
        //     //console.log("multiple selected");
        // }
        // //this._context.eventLog.push(this.logMove());
    }
    /**
     * Gets the current x and y coordinates of the mouse
     */
    getMousePosition() {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }
    /**
     * Sets isDragging, isResizing, isChangingDims, and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    isMouseOutside(event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = this._canvas.getBoundingClientRect();
        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            this._isDragging = false;
            this._isResizing = false;
            this._isSelected = false;
            this._isEditing = false;
            this._corner = 0;
        }
    }
    /**
     * Logs a paint event
     */
    logPaint() {
        return new PaintEvent_1.PaintEvent(this._str.val, this.x, this.y);
    }
    /**
     * Logs a resize event
     */
    logResize() {
        return new ResizeEvent_1.ResizeEvent(this._str.val + " with ID " + this.getID().toString(), Math.round(this._size1 * 100) / 100, Math.round(this._fontSize * 100) / 100);
    }
    /**
     * Logs a click event
     */
    logClick() {
        return new ClickEvent_1.ClickEvent(this._str.val + " with ID " + this.getID().toString(), this.x, this.y);
    }
    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id) {
        this.idObj = { _id: id, };
    }
    /**
     * Returns the canvas
     */
    get canvas() {
        return this._canvas;
    }
    /**
     * Sets the canvas
     * @param canvas The canvas to be assigned
     */
    set canvas(canvas) {
        this._canvas = canvas;
    }
    ast() {
        throw new Error("Method not implemented.");
    }
    /**
     * Returns the x position of the ellipse
     */
    get x() {
        return this._dims.x.eval(this._context).val;
    }
    /**
     * Returns the y position of the ellipse
     */
    get y() {
        return this._dims.y.eval(this._context).val;
    }
    /**
     * Returns the Dimensions object
     */
    get dims() {
        return this._dims;
    }
    /**
    * Returns whether or not the ellipse has just been dragged
    */
    getJustDragged() {
        return this._justDragged;
    }
    /**
     * Sets whether or not the ellipse has just been dragged
     * @param val The value to be assigned
     */
    setJustDragged(val) {
        this._justDragged = val;
    }
    /**
     * Returns whether or not the ellipse is dragging
     */
    get isDragging() {
        return this._isDragging;
    }
    /**
     * Returns whether or not this is selected
     */
    get selected() {
        return this._isSelected;
    }
    /**
     * Returns the string
     */
    get str() {
        return this._str.val;
    }
    /**
     * Returns the object ID
     */
    getID() {
        return this.idObj._id;
    }
    /**
     * Assembles a string for selection events
     */
    toSelString() {
        return " " + this._str.val + " with ID " + this.getID().toString() + " at " + this.x + ", " + this.y;
    }
    /**
    * Assembles a string for drag events
    */
    toDragString() {
        return (this._str.val + " with ID " + this.getID().toString() + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }
    /**
     * Assembles a string for ID assignment events
     */
    toIDString() {
        return (this.idObj._id.toString() + " to " + this._str.val + " at " + this.x + ", " + this.y);
    }
}
exports.StringEffect = StringEffect;
/**
 * Get's the mouse x and y coordinates in relation to the canvas
 * @param canvas the canvas object
 * @param event the mousemove event
 */
function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
/**
 * Computes the distance between two points
 * @param x1 x coordinate of first point
 * @param y1 y coordinate of first point
 * @param x2 x coordinate of second point
 * @param y2 y coordinate of second point
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

},{"../logging/ClickEvent":23,"../logging/PaintEvent":27,"../logging/ResizeEvent":28}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnError_1 = require("../structural/ReturnError");
const space_lift_1 = require("space-lift");
// Application of a function. Assumes arg values passed in same order as FunDef args
class FunApp {
    /**
     * The constructor for a function application
     * @param name The name of the function
     * @param args Function arguments, if applicable
     * @param ws Preceding whitespace
     * @param defaultValue The default return value of the function, if any
     */
    constructor(name, args, ws, defaultValue) {
        this._defaultValue = undefined;
        this._newLine = false;
        this._name = name;
        this._args = args;
        this._defaultValue = defaultValue;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the function application
     * @param context
     */
    eval(context) {
        let fundef = context.lookup(this._name, context); // looking up function
        //let child = new Scope(fundef.scope); // avoiding overwrite; need to toss after returning
        let child = fundef.scope.copy(); // Copying definition scope
        // Assigns arg values to definition arguments
        if (this._args != null) {
            for (let i = 0; i < this._args.length; i++) { //lookups?
                //child.declare(this._funct.args[i]); // redeclare?
                child.assign(fundef.args[i], this._args[i]);
            }
        }
        let id = context.globalFunID; // Assigns an ID to the function
        context.globalFunID++;
        child.retValID = space_lift_1.Some(id); // new method
        // we only return a value with function application
        // if it is explicitly returned using a return statement;
        // we abuse JS exceptions for this purpose
        try {
            child.hadFunEval = true;
            fundef.body.eval(child);
            return this._defaultValue;
        }
        catch (e) {
            // make sure that we catch only the error intended for us
            if (e instanceof ReturnError_1.ReturnError && parseInt(e.ID) == id) {
                return e.retVal;
            }
            // error was not intended for us; rethrow
            throw e;
        }
        //return fundef.body.eval(child);
    }
    /**
     * Returns a string representation of the function application
     */
    toString() {
        let argsList = '';
        if (this._args.length > 0) {
            for (let i = 0; i < this._args.length - 1; i++) {
                argsList += this._args[i].toString() + ", ";
            }
            argsList += this._args[this._args.length - 1].toString();
        }
        return this._ws + this.name + '(' + argsList + ")";
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Function applications cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals cannot be called directly on a function application
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on functions");
    }
    /**
     * Returns the name of the function
     */
    get name() {
        return this._name;
    }
    /**
     * Returns the arguments of the function
     */
    get args() {
        return this._args;
    }
}
exports.FunApp = FunApp;

},{"../structural/ReturnError":77,"space-lift":93}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../structural/Scope");
class FunDef {
    constructor(name, body, args, ws) {
        this._newLine = true;
        this._name = name;
        this._body = body;
        this._args = args;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    ;
    // Binds args in context of definition; no values
    // Binds name to parent context (cur context is new context)
    eval(context) {
        this._funScope = new Scope_1.Scope(context); // ************* copy????
        this._funScope.canvas = context.canvas;
        this._funScope.eventLog = context.eventLog;
        this._funScope.effects = context.effects;
        /*
        if(this._args != null){
            for(let entry of this._args){
                this._funScope.declare(entry);
            }
        }
        */
        context.declare(this._name); // assign with val function
        context.assign(this._name, this); // parent or current?
        return null;
    }
    newLine() {
        return this._newLine;
    }
    toString() {
        let argsList = '';
        if (this._args.length > 0) {
            for (let i = 0; i < this._args.length - 1; i++) {
                argsList += this._args[i] + ", ";
            }
            argsList += this._args[this._args.length - 1];
        }
        return this._ws + "fun " + this._name + "(" + argsList + ')' + ' {\n ' + this._body.toString() + '}';
    }
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    equalsVal(right) {
        throw new Error("Cannot call equals directly on functions");
    }
    // Get methods
    get name() {
        return this._name;
    }
    get body() {
        return this._body;
    }
    get args() {
        return this._args;
    }
    get scope() {
        return this._funScope;
    }
}
exports.FunDef = FunDef;

},{"../structural/Scope":78}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
    /**
     * Constructor for an array-like list
     * @param list The list, stored in a TS array
     * @param ws Preceding whitespace
     */
    constructor(list, ws) {
        this._newLine = false;
        this._list = list;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates each element of the list and pushes it onto the internal representation
     * @param context
     */
    eval(context) {
        let evalList = [];
        for (let expr of this._list) {
            evalList.push(expr.eval(context));
        }
        return new ListNode(evalList);
    }
    /**
     * Returns a string representation of the list
     */
    toString() {
        let list = '';
        for (let i = 0; i < this._list.length - 1; i++) {
            list += this._list[i].toString() + ", ";
        }
        list += this._list[this._list.length - 1].toString();
        return this._ws + '[' + list + ']';
    }
    /**
     * Returns whether the list equals another list
     * @param right The right side of the equality (must be a ListNode)
     */
    equalsVal(right) {
        if (right instanceof ListNode) {
            for (let i = 0; i < this.list.length; i++) {
                if (!(this.list[i].equalsVal(right.list[i]))) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    /**
     * Draw cannot be called directly on a list
     */
    draw() {
        throw new Error("Cannot draw a ListNode");
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Returns the internal representation of the list
     */
    get list() {
        return this._list;
    }
}
exports.ListNode = ListNode;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class ClearEvent extends LogEvent_1.LogEvent {
    /**
     * Constructor for the Clear Event, which logs when the canvas is cleared
     * @param toLog What to log (spoiler: nothing)
     */
    constructor(toLog) {
        super(toLog);
        this.tag = "clear";
    }
    /**
     * Assembles and returns message "Console cleared" with date and time attached
     */
    assembleLog() {
        let toPrint = "Console cleared";
        return this.logItem(toPrint);
    }
}
exports.ClearEvent = ClearEvent;

},{"./LogEvent":26}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class ClickEvent extends LogEvent_1.LogEvent {
    /**
     * Constructor for a Click Event, which logs when an object on the canvas is clicked
     * @param toLog The string representation of the object to log
     * @param x1 The x coordinate of the object to log
     * @param y1 The y coordinate of the object to log
     */
    constructor(toLog, x1, y1) {
        super(toLog, x1, y1);
        this.tag = "click";
    }
    /**
     * Assembles and returns message of form "Clicked on obj at x, y" with date and time attached
     */
    assembleLog() {
        let toPrint = "Clicked on " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }
}
exports.ClickEvent = ClickEvent;

},{"./LogEvent":26}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class DragEvent extends LogEvent_1.LogEvent {
    /**
     * Constructor for a Drag Event, which logs when an object on the canvas is dragged
     * @param toLog The effect to log
     */
    constructor(toLog) {
        super(toLog);
        this.tag = "drag";
        this._toPrint = this.assembleString();
    }
    /**
     * Assembles a log string using the Effect's toDragString() method
     */
    assembleString() {
        this._toPrint = this.toLog.toDragString();
        return this._toPrint;
    }
    /**
     * Assembles and returns final log message of form "Dragged obj from x1, y1 to x2, y2"
     * with date and time attached
     */
    assembleLog() {
        let print = "Dragged " + this._toPrint;
        return this.logItem(print);
    }
}
exports.DragEvent = DragEvent;

},{"./LogEvent":26}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class IDEvent extends LogEvent_1.LogEvent {
    /**
     * A constructor for an ID event, used when an object gets assigned an ID
     * @param toLog The effect to log
     */
    constructor(toLog) {
        super(toLog);
        this.tag = "ID";
        this._toPrint = this.assembleString();
    }
    /**
     * Assembles string using the effect's toIDString() method
     */
    assembleString() {
        this._toPrint = this.toLog.toIDString();
        return this._toPrint;
    }
    /**
     * Assembles message of form "Assigned ID # to obj at x, y" with date and time attached
     */
    assembleLog() {
        let print = "Assigned ID " + this._toPrint;
        return this.logItem(print);
    }
}
exports.IDEvent = IDEvent;

},{"./LogEvent":26}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogEvent {
    /**
     * Abstract class constructor for a Log Event. Registers event time.
     * @param toLog The string, object, or array of objects to be logged
     * @param x1 Initial x position, if applicable
     * @param y1 Initial y position, if applicable
     * @param x2 Final x position, if applicable
     * @param y2 Final y position, if applicable
     */
    constructor(toLog, x1, y1, x2, y2) {
        let today = new Date();
        this._date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this._time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this._dateTime = this._date + ' ' + this._time;
        this._toLog = toLog;
        //this._toLogArray = toLogArray;
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
    }
    /**
     * Attaches date and time to log message
     * @param toLog The log message
     */
    logItem(toLog) {
        return " " + this._dateTime + ": " + toLog;
    }
    /**
     * Returns date-time string
     */
    get dateTime() {
        return this._dateTime;
    }
    /**
     * Returns string or effect(s) to be logged
     */
    get toLog() {
        return this._toLog;
    }
    /**
     * Returns event tag
     */
    get tag() {
        return this._tag;
    }
    /**
     * Sets tag string
     */
    set tag(tag) {
        this._tag = tag;
    }
    /**
     * Returns x1
     */
    get x1() {
        return this._x1;
    }
    /**
     * Returns y1
     */
    get y1() {
        return this._y1;
    }
    /**
     * Returns x2
     */
    get x2() {
        return this._x2;
    }
    /**
     * Returns y2
     */
    get y2() {
        return this._y2;
    }
}
exports.LogEvent = LogEvent;

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class PaintEvent extends LogEvent_1.LogEvent {
    /**
     * Constructor for a Paint Event, used when an object is painted on the canvas
     * @param toLog The string representation of the object to be logged
     * @param x1 The x position of the object
     * @param y1 The y position of the object
     */
    constructor(toLog, x1, y1) {
        super(toLog, x1, y1);
        this.tag = "paint";
    }
    /**
     * Assembles and returns message of form "Painted obj at x, y" with date and time attached
     */
    assembleLog() {
        let toPrint = "Painted " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }
}
exports.PaintEvent = PaintEvent;

},{"./LogEvent":26}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class ResizeEvent extends LogEvent_1.LogEvent {
    /**
     * Constructor for Resize Event, used when an object on the canvas is resized
     * @param toLog String representation of the object to be logged
     * @param x1 Initial x dimension of the object, or initial font size
     * @param y1 Initial y dimension of the object, or final font size
     * @param x2 Final x dimension of the object
     * @param y2 Final y dimension of the object
     */
    constructor(toLog, x1, y1, x2, y2) {
        super(toLog, x1, y1, x2, y2);
        this.tag = "resize";
    }
    /**
     * Assembles log message of form "Resized obj from size x1, y1 to size x1, y2" for rects and ellipses
     * or of form "Resized obj from size x1 to size y1" for strings
     * Has date and time attached
     */
    assembleLog() {
        if (this.x2 != undefined && this.y2 != undefined) {
            this.toPrint = "Resized " + this.toLog + " from size " + this.x1.toString() + " by " + this.y1.toString()
                + " to size " + this.x2.toString() + " by " + this.y2.toString();
        }
        else {
            this.toPrint = "Resized " + this.toLog + " from size " + this.x1.toString() + " to size " + this.y1.toString();
        }
        return this.logItem(this.toPrint);
    }
}
exports.ResizeEvent = ResizeEvent;

},{"./LogEvent":26}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class SelectEvent extends LogEvent_1.LogEvent {
    /**
     * Constructor for a Selection Event, used when multiple objects on the canvas are selected
     * @param toLog The array of objects selected
     */
    constructor(toLog) {
        super(toLog);
        this.tag = "select";
        this._toPrint = this.assembleStrings();
    }
    /**
     * Assembles and returns a string representation of all the objects selected
     */
    assembleStrings() {
        let logStrings = [];
        for (let elem of this.toLog) {
            logStrings.push(elem.toSelString());
        }
        return "Selected" + logStrings;
    }
    /**
     * Returns the message with date and time attached
     */
    assembleLog() {
        return this.logItem(this._toPrint);
    }
}
exports.SelectEvent = SelectEvent;

},{"./LogEvent":26}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
class And {
    /**
     * Constructor for logical 'and' (&&) operation
     * @param left The left side of the operation
     * @param right The right side of the operation
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        this._newLine = false;
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs the operation and returns a boolean of the result
     * @param context The current program context
     */
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof BooleanNode_1.BooleanNode && rhs instanceof BooleanNode_1.BooleanNode) {
            return new BooleanNode_1.BooleanNode(lhs.val && rhs.val);
        }
        else {
            throw new Error("The arguments to the 'and' operator must be booleans.");
        }
    }
    /**
     * Returns a string representation of the operation
     */
    toString() {
        return this._ws + this._left.toString() + ' and ' + this._right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals cannot be called directly on the 'and' op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    /**
     * The 'and' operation cannot be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns the left side of the op
     */
    get left() {
        return this._left;
    }
    /**
     * Returns the right side of the op
     */
    get right() {
        return this._right;
    }
}
exports.And = And;

},{"../prims/BooleanNode":64}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
class Equals {
    /**
     * Constructor for equality (==) operation
     * @param left The left side of the equality
     * @param right The right side of the equality
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        this._newLine = false;
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs the comparison and evaluates to a BooleanNode
     * @param context
     */
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        return new BooleanNode_1.BooleanNode(lhs.equalsVal(rhs));
    }
    /**
     * Returns a string representation of the equality op
     */
    toString() {
        return this._ws + this._left.toString() + ' equals ' + this._right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals can't be called directly on an equality op
     * @param right
     */
    equalsVal(right) {
        throw new Error("well this is meta");
    }
    /**
     * Equality ops can't be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns left side of operation
     */
    get left() {
        return this._left;
    }
    /**
     * Returns right side of operation
     */
    get right() {
        return this._right;
    }
}
exports.Equals = Equals;

},{"../prims/BooleanNode":64}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
const NumberNode_1 = require("../prims/NumberNode");
class GreaterThan {
    /**
     * Constructor for GreaterThan (>) op
     * @param left Left side of operation
     * @param right Right side of operation
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        this._newLine = false;
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs GreaterThan comparison and returns BooleanNode representation of result
     * @param context The current program context
     */
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode_1.NumberNode && rhs instanceof NumberNode_1.NumberNode) {
            return (new BooleanNode_1.BooleanNode(lhs.val > rhs.val));
        }
        else {
            throw new Error("The arguments to the > operator must be numeric.");
        }
    }
    /**
     * Returns a string representation of the operation
     */
    toString() {
        return this._ws + this._left.toString() + " > " + this._right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals cannot be called directly on GreaterThan op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    /**
     * GreaterThan op cannot be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns left side of operation
     */
    get left() {
        return this._left;
    }
    /**
     * Returns right side of operation
     */
    get right() {
        return this._right;
    }
}
exports.GreaterThan = GreaterThan;

},{"../prims/BooleanNode":64,"../prims/NumberNode":66}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
const NumberNode_1 = require("../prims/NumberNode");
class GreaterThanEq {
    /**
     * Constructor for GreaterThanEq (greater than or equal to, >=) operation
     * @param left Left side of operation
     * @param right Right side of operation
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        this._newLine = false;
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs GreaterThanEq operation and returns BooleanNode with result
     * @param context
     */
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode_1.NumberNode && rhs instanceof NumberNode_1.NumberNode) {
            return (new BooleanNode_1.BooleanNode(lhs.val >= rhs.val));
        }
        else {
            throw new Error("The arguments to the >= operator must be numeric.");
        }
    }
    /**
     * Returns a string representation of the operation
     */
    toString() {
        return this._ws + this._left.toString() + ' >= ' + this._right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals cannot be called directly on GreaterThanEq op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    /**
     * GreaterThanEq op cannot be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns left side of operation
     */
    get left() {
        return this._left;
    }
    /**
     * Returns right side of operation
     */
    get right() {
        return this._right;
    }
}
exports.GreaterThanEq = GreaterThanEq;

},{"../prims/BooleanNode":64,"../prims/NumberNode":66}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
const NumberNode_1 = require("../prims/NumberNode");
class LessThan {
    /**
     * Constructor for LessThan (<) operation
     * @param left Left side of operation
     * @param right Right side of operation
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        this._newLine = false;
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs the LessThan comparison and returns BooleanNode with result
     * @param context The current program context
     */
    eval(context) {
        //console.log(this._left.eval(context) + " is less than " + this._right.eval(context));
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode_1.NumberNode && rhs instanceof NumberNode_1.NumberNode) {
            //console.log("They're both number nodes");
            //console.log(lhs.val + "<" + rhs.val);
            //let bool: boolean = lhs.val < rhs.val;
            //console.log("bool: " + bool);
            return (new BooleanNode_1.BooleanNode(lhs.val < rhs.val));
        }
        else {
            throw new Error("Arguments to less than must produce numeric values.");
        }
    }
    /**
     * Returns string representation of operation
     */
    toString() {
        return this._left.toString() + ' < ' + this._right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals cannot be called directly on LessThan op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    /**
     * LessThan op cannot be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns left side of operation
     */
    get left() {
        return this._left;
    }
    /**
     * Returns right side of operation
     */
    get right() {
        return this._right;
    }
}
exports.LessThan = LessThan;

},{"../prims/BooleanNode":64,"../prims/NumberNode":66}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
const NumberNode_1 = require("../prims/NumberNode");
class LessThanEq {
    /**
     * Constructor for LessThanEq (less than or equal to, <=) operation
     * @param left The left side of the operation
     * @param right The right side of the operation
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        this._newLine = false;
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs the LessThanEq comparison and returns BooleanNode with result
     * @param context The current program context
     */
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode_1.NumberNode && rhs instanceof NumberNode_1.NumberNode) {
            return (new BooleanNode_1.BooleanNode(lhs.val <= rhs.val));
        }
        else {
            throw new Error("The arguments to the <= operator must be numeric.");
        }
    }
    /**
     * Returns a string representation of the operation
     */
    toString() {
        return this._ws + this._left.toString() + " <= " + this._right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals cannot be called directly on LessThanEq op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    /**
     * LessThanEq ops cannot be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns left side of operation
     */
    get left() {
        return this._left;
    }
    /**
     * Returns right side of operation
     */
    get right() {
        return this._right;
    }
}
exports.LessThanEq = LessThanEq;

},{"../prims/BooleanNode":64,"../prims/NumberNode":66}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
class Not {
    /**
     * Constructor for the logical Not (!) operation
     * @param expr The expression to be operated on (must be a BooleanNode)
     * @param ws Preceding whitespace
     */
    constructor(expr, ws) {
        this._newLine = false;
        this._expr = expr;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs the Not operation and returns BooleanNode with result
     * @param context The current program context
     */
    eval(context) {
        let e = this._expr.eval(context);
        if (e instanceof BooleanNode_1.BooleanNode) {
            return new BooleanNode_1.BooleanNode(!e.val);
        }
        else {
            throw new Error("The argument to the ! operator must be boolean.");
        }
    }
    /**
     * Returns a string representation of the operation
     */
    toString() {
        return this._ws + "not " + this._expr.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals cannot be called directly on a Not op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    /**
     * Not operations cannot be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns expression to be operated on
     */
    get expr() {
        return this._expr;
    }
}
exports.Not = Not;

},{"../prims/BooleanNode":64}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
const NumberNode_1 = require("../prims/NumberNode");
class NotEqual {
    /**
     * Constructor for NotEqual (!=) operation
     * @param left Left side of operation
     * @param right Right side of operation
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        this._newLine = false;
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs NotEqual operation and returns BooleanNode with result
     * @param context The current program context
     */
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode_1.NumberNode && rhs instanceof NumberNode_1.NumberNode) {
            return (new BooleanNode_1.BooleanNode(lhs.val !== rhs.val));
        }
        else {
            throw new Error("The arguments to the != operator must be numeric.");
        }
    }
    /**
     * Returns string representation of operation
     */
    toString() {
        return this._ws + this._left.toString() + " not equals " + this._right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals cannot be called directly on a NotEqual op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    /**
     * NotEqual ops cannot be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns left side of operation
     */
    get left() {
        return this._left;
    }
    /**
     * Returns right side of operation
     */
    get right() {
        return this._right;
    }
}
exports.NotEqual = NotEqual;

},{"../prims/BooleanNode":64,"../prims/NumberNode":66}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
class Or {
    /**
     * Constructor for logical 'or' (||) operation
     * @param left Left side of operation
     * @param right Right side of operation
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        this._newLine = false;
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs Or operation and returns BooleanNode with result
     * @param context Current program context
     */
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof BooleanNode_1.BooleanNode && rhs instanceof BooleanNode_1.BooleanNode) {
            return new BooleanNode_1.BooleanNode(lhs.val || rhs.val);
        }
        else {
            throw new Error("The arguments to the 'or' operator must be booleans.");
        }
    }
    /**
     * Returns string representation of operation
     */
    toString() {
        return this._ws + this._left.toString() + ' or ' + this._right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals cannot be called directly on Or operation
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    /**
     * Or operations cannot be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns left side of operation
     */
    get left() {
        return this._left;
    }
    /**
     * Returns right side of operation
     */
    get right() {
        return this._right;
    }
}
exports.Or = Or;

},{"../prims/BooleanNode":64}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../structural/Scope");
const BooleanNode_1 = require("../prims/BooleanNode");
const space_lift_1 = require("space-lift");
class ForNode {
    /**
     * Constructor for a For loop
     * @param init Initializes the variable used in the condition
     * @param cond The condition (must evaluate to BooleanNode)
     * @param post The postevaluation condition
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(init, cond, post, body, ws) {
        this._newLine = true;
        this._init = init;
        this._cond = cond;
        this._post = post;
        this._body = body;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the For loop
     * @param context The current program context
     */
    eval(context) {
        let childCtx = new Scope_1.Scope(context, context.effects, context.eventLog);
        childCtx.canvas = space_lift_1.Some(context.canvas.get());
        this._init.eval(childCtx); // initialize var
        let res = this._cond.eval(childCtx);
        if (!(res instanceof BooleanNode_1.BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }
        let ret;
        while (res.val) {
            ret = this._body.eval(childCtx);
            this._post.eval(childCtx);
            res = this._cond.eval(childCtx);
        }
        return ret;
    }
    /**
     * Equals cannot be called directly on ForNode
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on For loop");
    }
    /**
     * ForNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        return "Cannot call draw on For loop";
    }
    /**
     * Returns a string representation of the for loop
     */
    toString() {
        return this._ws + 'for(' + this._init.toString() + ", " + this._cond.toString() + ", " + this._post.toString() + ") {\n "
            + this._body.toString() + "}";
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.ForNode = ForNode;

},{"../prims/BooleanNode":64,"../structural/Scope":78,"space-lift":93}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../structural/Scope");
const BooleanNode_1 = require("../prims/BooleanNode");
const space_lift_1 = require("space-lift");
class WhileNode {
    /**
     * Constructor for a While loop
     * @param cond The While loop condition
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(cond, body, ws) {
        this._newLine = true;
        this._cond = cond;
        this._body = body;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the body of the loop while the condition is true
     * @param context
     */
    eval(context) {
        let childCtx = new Scope_1.Scope(context, context.effects, context.eventLog);
        childCtx.canvas = space_lift_1.Some(context.canvas.get());
        let res = this._cond.eval(childCtx);
        if (!(res instanceof BooleanNode_1.BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }
        let ret;
        while (res.val) {
            ret = this._body.eval(childCtx);
            res = this._cond.eval(childCtx);
        }
        return ret;
    }
    /**
     * Equals cannot be called directly on WhileNodes
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on While loop");
    }
    /**
     * WhileNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        return "Cannot call draw on While loop";
    }
    /**
     * Returns a string representation of the While loop
     */
    toString() {
        return this._ws + "while(" + this._cond.toString() + ") {\n " + this._body.toString() + "}";
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.WhileNode = WhileNode;

},{"../prims/BooleanNode":64,"../structural/Scope":78,"space-lift":93}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Instruction {
    constructor(location, content, top, left) {
        this._location = location;
        this._content = content;
        this._top = top;
        this._left = left;
    }
}
exports.Instruction = Instruction;

},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonFourCpOne extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l4c1";
        this._nextModule = 'l4c2';
        this._constraint = 'none';
        this._instructions = `<p> You've made it to the FINAL CHALLENGES! Complete these challenges to earn ETERNAL GLORY! </p>
    <p> Throughout this Hour of Code, you have learned: </p>
    <p> - How to print a word, circle, rectangle, and curve. </p>
    <p> - How to store any of the value above in a variable. </p>
    <p> - How to use if/else statement to check a condition about a variable. </p>
    <p> Each of the following challenges will test these concepts. Let's dive right in! </p>
    <p> Print a circle and put its height and width in one of the boxes to the side. Then print a rectangle and put its height and width in the box. </p>
    <p> CHALLENGE: Print a circle and rectangle. Put their respective width and height in the boxes provided. </p>`;
    }
    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = this.editor.getValue();
        let regex = /print\s*\(\s*ellipse\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/;
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;
        //check for correct CANVAS effects
        let canvasIsCorrect = true;
        for (let effect of effects) {
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonFourCpOne = LessonFourCpOne;

},{"../effects/EllipseEffect":13,"./Module":61}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonFourCpTwo extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l4c2";
        this._nextModule = 'l4c2';
        this._constraint = 'none';
        this._instructions = `<p> Yes! You got this! </p>
    <p> Now let's put those skills in if/else statements to work! </p>
    <p> Create a pair of if/else statements to print out to the CANVAS a claim of whether the circle is positioned ABOVE or BELOW the rectangle. </p>
    <p> CHALLENGE: Print a claim that states whether circle is ABOVE or BELOW the rectangle. </p>
    <p> HINT: Remember that the numbers in the print() statements determine the position of the shapes being printed. </p>`;
    }
    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = this.editor.getValue();
        let regex = /print\s*\(\s*ellipse\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/;
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;
        //check for correct CANVAS effects
        let canvasIsCorrect = true;
        for (let effect of effects) {
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonFourCpTwo = LessonFourCpTwo;

},{"../effects/EllipseEffect":13,"./Module":61}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpFour extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l1c4";
        this._prevModule = 'l1c2';
        this._nextModule = 'l2c1';
        this._constraint = 'canvas';
        this._instructions = `<p> CHALLENGE: Print the word "moo" on the CANVAS, and put it inside the box at the center of the CANVAS. </p>`;
        this._latestInstrIndex = 3;
        this.square_size = 100;
        this.font_size = 20;
        this.x = Math.round((ctx.canvas.width - this.square_size) / 2);
        this.y = Math.round((ctx.canvas.height - this.square_size) / 2);
        let content = "In real life, computer scientists often can only change their CODE to affect the CANVAS, instead of interacting with the CANVAS directly.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = "Anyone, including you, is cut out to be a computer scientist! Let's have a challenge.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = "The CANVAS is temporarily frozen. You can no longer interact with objects drawn on it.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "80%", "10%"));
        content = "Can you figure out how to write CODE to print the word 'moo' inside the box at the center of the CANVAS?";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "80%", "10%"));
        content = "Congratulations! You finished your first coding challenge!";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "80%", "10%"));
    }
    drawGuides() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();
        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Put word", this.x, this.y - 2 * this.font_size);
        this.ctx.fillText("in here", this.x, this.y - this.font_size);
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        switch (this._latestInstrIndex) {
            case 0:
            case 1:
            case 2:
                return false;
            case 3:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str === "moo") {
                        if ((effect.x > this.x && effect.x < this.x + this.square_size) && (effect.y > this.y && effect.y < this.y + this.square_size)) {
                            this._latestInstrIndex++;
                            this.renderLatestInstruction(document);
                        }
                    }
                }
                return false;
            default:
                return true;
        }
    }
}
exports.LessonOneCpFour = LessonOneCpFour;

},{"../effects/StringEffect":18,"./Instruction":41,"./Module":61}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
class LessonOneCpOne extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l1c1";
        this._nextModule = 'l1c2';
        this._constraint = 'none';
        this._instructions = `<p> GOAL: Write 'Hello' on the CANVAS. </p>`;
        this._latestInstrIndex = 0;
        let content = "First, let's tell the computer to print something on the CANVAS. Click on the CODE box.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "70%", "10%"));
        content = 'Great! Now type `print("Hello")` in this CODE box.';
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = 'Notice that what you typed causes the computer to print the word "Hello" on the CANVAS here. Congratulations! You just wrote your first line of code!';
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "65%", "10%"));
    }
    /**
     * A lesson to print a string
     * goals: write any string on CANVAS
     * @param document The HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        switch (this._latestInstrIndex) {
            case 0:
                if (document.activeElement === this.editor.getInputField() && this._latestInstrIndex == 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            case 1:
                let regex = /print\s*\(\s*\"Hello\"\s*\)/;
                let match = this.editor.getValue().match(regex);
                if (match != null && match.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            default:
                return true;
        }
    }
}
exports.LessonOneCpOne = LessonOneCpOne;

},{"./Instruction":41,"./Module":61}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpThree extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l1c3";
        this._prevModule = 'l1c2';
        this._nextModule = 'l1c4';
        this._constraint = 'canvas';
        this._instructions = `<p> GOAL: Move the word around the CANVAS solely by changing your CODE. </p>`;
        this._starterCode = `print("Hello", 100, 100)`;
        this._latestInstrIndex = 0;
        this.y = 10;
        this.square_size = 100;
        this.font_size = 20;
        this.x = ctx.canvas.width - this.square_size - this.y;
        let content = "Moving things on the CANVAS changes the CODE. What if we change the CODE? In the print statement above, change the first 100 to 200. Observe the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = "Changing those numbers in the CODE moves the word on CANVAS! Now, try move this word inside the top-right box by changing your CODE alone.";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
        content = "Yay! You've learned how to tell the computer to write for you!";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
    }
    drawGuides() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();
        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Put word", this.x, this.y - 2 * this.font_size);
        this.ctx.fillText("in here", this.x, this.y - this.font_size);
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        switch (this._latestInstrIndex) {
            case 0:
                let regex = /print\s*\(\s*\".*\"\s*,\s*200\s*,\s*100\s*\)/;
                let match = this.editor.getValue().match(regex);
                if (match != null && match.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
                break;
            case 1:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str !== "") {
                        if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
                            this._latestInstrIndex++;
                            this.renderLatestInstruction(document);
                        }
                    }
                }
                return false;
                break;
            default:
                return true;
                break;
        }
        return false;
    }
}
exports.LessonOneCpThree = LessonOneCpThree;

},{"../effects/StringEffect":18,"./Instruction":41,"./Module":61}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpTwo extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l1c2";
        this._prevModule = 'l1c2';
        this._nextModule = 'l1c3';
        this._constraint = 'code';
        this._instructions = `<p> GOAL: Move the words you just created to explore how it affects your code. </p>`;
        this._starterCode = `print("Hello", 100, 100)`;
        this._latestInstrIndex = 1;
        this.y = 10;
        this.square_size = 100;
        this.font_size = 20;
        this.x = ctx.canvas.width - this.square_size - this.y;
        let content = "Notice the numbers added inside the () of your print statement? They specify where your computer should write the word on the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = "To understand what they do, first click on the word currently on the CANVAS and drag it around.";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
        content = "Now drag the word into the top-right box on the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "80%", "10%"));
        content = "Did you notice that the numbers inside the print statement change? Now drag the word into the top-left box on the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = 'These numbers indicate the location on the CANVAS where the computer should draw the word! The first number changes when the word moves left and right. The second number changes when the word moves up and down.';
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
    }
    drawGuides() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();
        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Put word", this.x, this.y + this.square_size + this.font_size);
        this.ctx.fillText("in here", this.x, this.y + this.square_size + 2 * this.font_size);
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        switch (this._latestInstrIndex) {
            case 0:
                return false;
            case 1:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str !== "" && effect.selected) {
                        this._latestInstrIndex++;
                        this.renderLatestInstruction(document);
                    }
                }
                return false;
            case 2:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str !== "") {
                        if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
                            this.x = 10;
                            this._latestInstrIndex++;
                            this.renderLatestInstruction(document);
                        }
                    }
                }
                return false;
            case 3:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str !== "") {
                        if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
                            this._latestInstrIndex++;
                            this.renderLatestInstruction(document);
                        }
                    }
                }
                return false;
            default:
                return true;
        }
    }
}
exports.LessonOneCpTwo = LessonOneCpTwo;

},{"../effects/StringEffect":18,"./Instruction":41,"./Module":61}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpFive extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l3c5";
        this._nextModule = 'l3c6';
        this._constraint = 'none';
        this._instructions = `<p> So we print a message to the CANVAS anytime c is exactly equal to 8. </p>
    <p> What if we want to print another message, "c is not equal to 8" any time c is not equal to 8? </p>
    <p> We do so by using an else statement. Observe the CODE above. </p>
    <p> When the condition inside the if() statement is satisfied, the code block inside the {} right after it would run. </p>
    <p> When that condition is not satisfied, the code block inside the {} after the else statement would run. </p>
    <p> GOAL: Change the value of c so that the line "c is NOT equal to 8." is printed on the CANVAS. </p>`;
        this._starterCode = `c = 8;
if(c == 8) {
\tprint("c is equal to 8.", 103, 143);
} else {
\tprint("c is NOT equal to 8.", 103, 143);
}`;
    }
    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = this.editor.getValue();
        let regex = /c\s*=\s*[^8]\s*/;
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;
        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect && effect.str === "c is NOT equal to 8.") {
                canvasIsCorrect = true;
                break;
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonThreeCpFive = LessonThreeCpFive;

},{"../effects/StringEffect":18,"./Module":61}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpFour extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l3c4";
        this._nextModule = 'l3c5';
        this._constraint = 'none';
        this._instructions = `<p> You can put an inequality condition in the if() clause, such as "a < 5" or "b > 20". </p>
    <p> You can also use an equality condition. Observe the CODE above with "c == 8". The 2 equal signs mean that you are checking whether c is exactly equal to 8 or not. </p>
    <p> Change the value of c so that the line "c is equal to 8." is printed on the CANVAS. </p>
    <p> GOAL: Change the value of c so that the line "c is equal to 8." is printed on the CANVAS. </p>`;
        this._starterCode = `c = 100;
if(c == 8) {
\tprint("c is equal to 8.", 103, 143);
}`;
    }
    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = this.editor.getValue();
        let regex = /c\s*=\s*8\s*/;
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;
        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect && effect.str === "c is equal to 8.") {
                canvasIsCorrect = true;
                break;
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonThreeCpFour = LessonThreeCpFour;

},{"../effects/StringEffect":18,"./Module":61}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpOne extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l3c1";
        this._nextModule = 'l3c2';
        this._constraint = 'none';
        this._instructions = `<p> We learned to tell the computer to print a lot of things. Unfortunately, the computer is kinda bad at math. </p>
    <p> Look at the CODE above. We let a = 5, then we print the value of a to the CANVAS. Then we print the line "a is less than 10". </p>
    <p> Since a = 5, and 5 < 10, we know that a is less than 10. But what would happen if we change the value of a to, say, 12? </p>
    <p> GOAL: change the value of a to 12. </p>
    <p> HINT: You can do this by changing the line a = 5 in the CODE area, or you can click on the number 5 on the CANVAS. </p>`;
        this._starterCode = `a = 5;
print(a, 118, 63);
print("a is less than 10", 103, 143);`;
    }
    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = this.editor.getValue();
        let regex = /a\s*=\s*12\s*/;
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;
        //check for correct CANVAS effects
        let canvasIsCorrect = true;
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect && effect.str === "a is less than 10") {
                //canvasIsCorrect = true;
                //break;
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonThreeCpOne = LessonThreeCpOne;

},{"../effects/StringEffect":18,"./Module":61}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpSix extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l3c6";
        this._nextModule = 'l4c1';
        this._constraint = 'none';
        this._instructions = `<p> Now that you know how to use if/else statements, let's put them all together! </p>
    <p> Above we have the CODE to draw 2 circles: circle A has height and width a, and circle B has height and width b. </p>
    <p> However, currently the claim that "Circle A is smaller than circle B." regardless of the circles' actual sizes. </p>
    <p> Create an if/else statement to print "Circle A is smaller than circle B." when it is actually so, and print "Circle A is bigger than circle B" otherwise. </p>
    <p> CHALLENGE: Create an if/else statement to print the correct claim about the sizes of the 2 circles. </p>`;
        this.font_size = 20;
        this.a_size = Math.round(Math.min(ctx.canvas.width, ctx.canvas.height) * 0.4);
        this.b_size = Math.round(this.a_size / 2);
        this.square_size = this.a_size + Math.round(Math.min(ctx.canvas.width, ctx.canvas.height) * 0.1);
        this.yA = Math.round((ctx.canvas.height - this.square_size) / 2);
        this.yB = this.yA;
        this.xA = Math.round(ctx.canvas.width / 2) - this.square_size - 10;
        this.xB = this.xA + this.square_size + 10;
        let square_mid = Math.round(this.square_size / 2);
        let circ_xA = this.xA + square_mid;
        let circ_yA = this.yA + square_mid;
        let circ_xB = this.xB + square_mid;
        let circ_yB = this.yB + square_mid;
        this._starterCode =
            `a = ${this.a_size};
print(a, ${this.xA}, ${this.yA - 2 * this.font_size});
print(ellipse(a, a), ${circ_xA}, ${circ_yA});
b = ${this.b_size};
print(b, ${this.xB}, ${this.yA - 2 * this.font_size});
print(ellipse(b, b), ${circ_xB}, ${circ_yB});
print("Circle A is smaller than circle B.", ${this.xA}, ${this.yA + this.square_size + this.font_size});`;
    }
    drawGuides() {
        this.ctx.beginPath();
        this.ctx.rect(this.xA, this.yA, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();
        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Circle A", this.xA, this.yA - this.font_size);
        this.ctx.beginPath();
        this.ctx.rect(this.xB, this.yB, this.square_size, this.square_size);
        this.ctx.stroke();
        this.ctx.fillText("Circle B", this.xB, this.yB - this.font_size);
    }
    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = this.editor.getValue();
        let regex1 = /if\s*\(\s*a\s*[<>]\s*b\s*\)/;
        let regex2 = /if\s*\(\s*b\s*[<>]\s*a\s*\)/;
        let match1 = code.match(regex1);
        let match2 = code.match(regex2);
        codeIsCorrect = (match1 != null && match1.length > 0) || (match2 != null && match2.length > 0);
        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        let circleA = null;
        let circleB = null;
        //look for circles A and B
        for (let effect of effects) {
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
                if (effect.x > this.xA && effect.x < this.xA + this.square_size && effect.y > this.yA && effect.y < this.yA + this.square_size) {
                    circleA = effect;
                }
                else if (effect.x > this.xB && effect.x < this.xB + this.square_size && effect.y > this.yB && effect.y < this.yB + this.square_size) {
                    circleB = effect;
                }
            }
        }
        if (circleA != null && circleB != null) {
            for (let effect of effects) {
                if (effect instanceof StringEffect_1.StringEffect) {
                    let str = effect.str;
                    if ((str === "Circle A is smaller than circle B." && circleA.w < circleB.w && circleA.h < circleB.h)
                        || (str === "Circle A is bigger than circle B." && circleA.w > circleB.w && circleA.h > circleB.h)) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonThreeCpSix = LessonThreeCpSix;

},{"../effects/EllipseEffect":13,"../effects/StringEffect":18,"./Module":61}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpThree extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l3c3";
        this._nextModule = 'l3c4';
        this._constraint = 'none';
        this._instructions = `<p> if statements allow you to run a block of code inside the curly braces {} ONLY when the condition inside the if() clause is true. </p>
    <p> Let's have a quick challenge: observe the CODE above. Make it so that the line "b is greater than 20" is only printed on the CANVAS when b is actually greater than 20. </p>
    <p> GOAL: Make the line "b is greater than 20" only be printed on the CANVAS when b is actually greater than 20. Change b to test the if() statement. </p>`;
        this._starterCode = `b = 8;
if(b < 10) {
\tprint("b is greater than 20.", 103, 143);
}`;
    }
    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = this.editor.getValue();
        let regex = /if\s*\(\s*b\s*>\s*20\s*\)/;
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;
        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect && effect.str === "b is greater than 20.") {
                canvasIsCorrect = true;
                break;
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonThreeCpThree = LessonThreeCpThree;

},{"../effects/StringEffect":18,"./Module":61}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpTwo extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l3c2";
        this._nextModule = 'l3c3';
        this._constraint = 'none';
        this._instructions = `<p> Did you notice the claim that "a is less than 10" did not change? a is now 12 and clearly greater than 10! </p>
    <p> What we want is for the computer to only print "a is less than 10" ONLY when the value of a is truly less than 10. </p>
    <p> To do so, we use an if statement. Observe the CODE above. All we changed was to put in an if statement that checks whether a < 10. If a is, the code inside the curly braces {} are executed. </p>
    <p> Change the value of a to 12, 10, 8 and observe what happens. </p>
    <p> GOAL: RUN the CODE with a = 12 or 10 or 8. </p>`;
        this._starterCode = `a = 12;
print(a, 118, 63);
if(a < 10) {
\tprint("a is less than 10", 103, 143);
}`;
    }
    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = this.editor.getValue();
        let regex = /a\s*=\s*8\s*/;
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;
        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect && effect.str === "a is less than 10") {
                canvasIsCorrect = true;
                break;
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonThreeCpTwo = LessonThreeCpTwo;

},{"../effects/StringEffect":18,"./Module":61}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpFive extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l2c5";
        this._nextModule = 'l2c6';
        this._constraint = 'none';
        this._instructions = `<p> Did you see the CANVAS changed? </p>
    <p> In our code, we make variable a refer to the words "moo moo", and variable b refer to an ellipse(100, 100). </p>
    <p> As a result, when we tell the computer to print a, it will print "moo moo", and when we tell the computer to print b, it will print a circle. </p>
    <p> Let's take this one step further: Create a new variable c, and make it refer to an ellipse(100, 100). Then write 2 statements to print c. What do you think would happen? </p>
    <p> GOAL: Create a variable c referring to an ellipse(100, 100), then write 2 print statements to print c. </p>`;
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = this.editor.getValue();
        let assignment = /c\s*=\s*ellipse\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*/g;
        let matchAssign = code.match(assignment);
        let print = /print\s*\(\s*c\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)/g;
        let matchPrint = code.match(print);
        codeIsCorrect = matchAssign != null && matchAssign.length > 0 && matchPrint != null && matchPrint.length >= 2;
        //check for correct CANVAS effects
        let circleCount = 0;
        for (let effect of effects) {
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
                circleCount += 1;
            }
        }
        return codeIsCorrect && circleCount >= 2;
    }
}
exports.LessonTwoCpFive = LessonTwoCpFive;

},{"../effects/EllipseEffect":13,"./Module":61}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpFour extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l2c4";
        this._nextModule = 'l2c5';
        this._constraint = 'none';
        this._instructions = `<p> There's no limit to how many print statements the computer can understand, so you can write 1000 print statements, and the computer will draw 1000 things on the CANVAS for you! </p>
    <p> Time to take your coding to the next level. Let's learn about variables. </p>
    <p> Variables are simply names you give to the things that you draw. </p>
    <p> For example, take a look at the code above. Change the a in the print statement to b, and observe what happened on the CANVAS. </p>
    <p> GOAL: Change a to b in the print statement. </p>`;
        this._starterCode = `a = "moo moo";
b = ellipse(100, 100);
print(a, 100, 100);`;
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = this.editor.getValue();
        let regex = /print\s*\(\s*b\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/;
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;
        //check for correct CANVAS effects
        let canvasIsCorrect = true;
        for (let effect of effects) {
            if (!canvasIsCorrect && effect instanceof EllipseEffect_1.EllipseEffect) {
                canvasIsCorrect = true;
                break;
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonTwoCpFour = LessonTwoCpFour;

},{"../effects/EllipseEffect":13,"./Module":61}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const EllipseEffect_1 = require("../effects/EllipseEffect");
const RectangleEffect_1 = require("../effects/RectangleEffect");
const LineEffect_1 = require("../effects/LineEffect");
class LessonTwoCpOne extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l2c1";
        this._nextModule = 'l2c2';
        this._constraint = 'none';
        this._instructions = `<p> GOAL: replace "moo" in the print statement to draw different shapes. </p>`;
        this._starterCode = `print("moo", 100, 100)`;
        this._latestInstrIndex = 0;
        let content = "Now let's learn to print shapes on the CANVAS! In the print statement above, replace 'moo' with ellipse(100,100). Observe what happened on the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = "Yep! You told the computer to draw a circle on the CANVAS. Now in the print statement, replace the word ellipse with rect.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = "Finally, replace the word rect with line.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = "By putting different things inside the print statement, you can tell the computer to draw different things on the CANVAS. Remember this lesson!";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
    }
    /**
     *
     * @param document The HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        let code = this.editor.getValue();
        switch (this._latestInstrIndex) {
            case 0:
                if (this.checkCodeAndCanvasEffect(code, "ellipse", effects)) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            case 1:
                if (this.checkCodeAndCanvasEffect(code, "rect", effects)) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            case 2:
                if (this.checkCodeAndCanvasEffect(code, "line", effects)) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            default:
                return true;
        }
    }
    checkCodeAndCanvasEffect(code, f, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let regex = new RegExp('print\\s*\\(\\s*' + f + '\\s*\\(\\s*[1-9][0-9]*\\s*,\\s*[1-9][0-9]*\\s*\\)\\s*,\\s*[1-9][0-9]*\\s*,\\s*[1-9][0-9]*\\s*\\)');
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;
        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        switch (f) {
            case "ellipse":
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect_1.EllipseEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                break;
            case "rect":
                for (let effect of effects) {
                    if (effect instanceof RectangleEffect_1.RectangleEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                break;
            case "line":
                for (let effect of effects) {
                    if (effect instanceof LineEffect_1.LineEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                break;
        }
        if (codeIsCorrect && canvasIsCorrect) {
            console.log("moving on to next instruction");
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonTwoCpOne = LessonTwoCpOne;

},{"../effects/EllipseEffect":13,"../effects/LineEffect":15,"../effects/RectangleEffect":17,"./Instruction":41,"./Module":61}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const NumberEffect_1 = require("../effects/NumberEffect");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpSeven extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l2c7";
        this._nextModule = 'l3c1';
        this._constraint = 'none';
        this._instructions = `<p> Changing one circle changes c, which will then in turn change the other circle! </p>
    <p> Now let's put all we have learned to practice. </p>
    <p> Create a circle, and print out the size of that circle in the given box. </p>
    <p> IF we ever change the circle, we want the number in the box to change, too! </p>
    <p> CHALLENGE: Create a circle and print its size in the given box. </p>`;
        this.x = 10;
        this.square_size = 100;
        this.font_size = 20;
        this.y = ctx.canvas.height - this.square_size - this.x;
    }
    drawGuides() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();
        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Put circle's size", this.x, this.y - 2 * this.font_size);
        this.ctx.fillText("in here", this.x, this.y - this.font_size);
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        for (let effect of effects) {
            if (effect instanceof NumberEffect_1.NumberEffect && effect.num != null) {
                if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
                    let val = effect.num;
                    for (let effect2 of effects) {
                        if (effect2 instanceof EllipseEffect_1.EllipseEffect && (val == effect2.w || val == effect2.h)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}
exports.LessonTwoCpSeven = LessonTwoCpSeven;

},{"../effects/EllipseEffect":13,"../effects/NumberEffect":16,"./Module":61}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpSix extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l2c6";
        this._nextModule = 'l2c7';
        this._constraint = 'code';
        this._instructions = `<p> Now that you have drawn 2 circles both are called c, let's see what happens when you try to modify one of them. </p>
    <p> Click on one of the circles on the CANVAS, and try make it bigger. Observe what happens to your declaration of c. </p>
    <p> GOAL: Enlarge one of the circles referred to by c on the CANVAS. </p>`;
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        for (let effect of effects) {
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
                if (effect.w > 250 && effect.h > 250) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.LessonTwoCpSix = LessonTwoCpSix;

},{"../effects/EllipseEffect":13,"./Module":61}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
const StringEffect_1 = require("../effects/StringEffect");
class LessonTwoCpThree extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l2c3";
        this._nextModule = 'l2c4';
        this._constraint = 'none';
        this._instructions = `<p> So we can draw a circle and change it. But what if we want to draw both circles and words? </p>
    <p> Well, simple! Just write more print statements in the CODE area! </p>
    <p> GOAL: Draw 2 circles and a word on the CANVAS. </p>
    <p> HINT: Remember that the numbers right inside the ellipse(_,_) statement change the circle's sizes.`;
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        let stringExists = false;
        let circleCount = 0;
        for (let effect of effects) {
            if (!stringExists) {
                stringExists = effect instanceof StringEffect_1.StringEffect && effect.str !== "";
            }
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
                circleCount += 1;
            }
        }
        return stringExists && circleCount >= 2;
    }
}
exports.LessonTwoCpThree = LessonTwoCpThree;

},{"../effects/EllipseEffect":13,"../effects/StringEffect":18,"./Module":61}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpTwo extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l2c2";
        this._nextModule = 'l2c3';
        this._constraint = 'none';
        this._instructions = `<p> GOAL: Fit the circle inside the given box. </p>`;
        this._starterCode = `print(ellipse(100, 100), 120, 150)`;
        this._latestInstrIndex = 0;
        this.y = 10;
        this.rect_h = 50;
        this.rect_w = 100;
        this.font_size = 20;
        this.x = Math.round((ctx.canvas.width - this.rect_w) / 2);
        let content = "What are the numbers (100, 100) next to ellipse for? Let's find out by first clicking on the circle on the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "80%", "10%"));
        content = "Now drag the 8 tips around the cirlce to resize it, then drag it inside the given box. Observe the CODE above.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = "Yep! Those numbers inside ellipse(_,_) change the dimension of the circle! Note that you can also directly retype these numbers in the CODE area, without touching the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
    }
    drawGuides() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.rect_w, this.rect_h);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();
        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Fit circle", this.x, this.y - 2 * this.font_size);
        this.ctx.fillText("in here", this.x, this.y - this.font_size);
    }
    /**
     *
     * @param document The HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        switch (this._latestInstrIndex) {
            case 0:
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect_1.EllipseEffect && effect.selected) {
                        this._latestInstrIndex++;
                        this.renderLatestInstruction(document);
                    }
                }
                return false;
            case 1:
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect_1.EllipseEffect) {
                        if (effect.x > this.x && effect.x < this.x + this.rect_w
                            && effect.y > this.y && effect.y < this.y + this.rect_h
                            && effect.w < this.rect_w && effect.h < this.rect_h) {
                            this._latestInstrIndex++;
                            this.renderLatestInstruction(document);
                        }
                    }
                }
                return false;
            default:
                return true;
        }
    }
}
exports.LessonTwoCpTwo = LessonTwoCpTwo;

},{"../effects/EllipseEffect":13,"./Instruction":41,"./Module":61}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Module {
    constructor(ctx, editor) {
        this._instrBoxes = []; //series of tutorial instructions
        this._instrIndex = 0; //index of current instruction being displayed
        this._latestInstrIndex = 0; //furthest instruction reached within this checkpoint
        this.ctx = ctx;
        this.editor = editor;
    }
    /**
     * Create guides to help lesson instructions
     * @param ctx the canvas 2D context
     */
    drawGuides() { }
    ;
    renderLatestInstruction(document) {
        this._instrIndex = this._latestInstrIndex;
        this.renderInstruction(document);
    }
    renderNextInstruction(document) {
        this._instrIndex = (this._instrIndex + 1 < this._instrBoxes.length) ? this._instrIndex + 1 : this._instrIndex;
        this.renderInstruction(document);
    }
    renderPrevInstruction(document) {
        this._instrIndex = (this._instrIndex - 1 >= 0) ? this._instrIndex - 1 : this._instrIndex;
        this.renderInstruction(document);
    }
    /**
     * render the current instruction of this checkpoint
     * @param document The HTML document
     */
    renderInstruction(document) {
        let curInstruction = document.getElementById("instruction");
        if (curInstruction != null) {
            curInstruction.remove();
        }
        console.log("instrIndex " + this._instrIndex);
        let instruction = this._instrBoxes[this._instrIndex];
        let instrDiv = document.createElement("div");
        instrDiv.className = "instruction";
        instrDiv.id = 'instruction';
        instrDiv.innerText = instruction._content;
        instrDiv.style.top = instruction._top;
        instrDiv.style.left = instruction._left;
        instrDiv.style.display = "block";
        let prevInstr = document.createElement("button");
        prevInstr.id = 'previous-instruction';
        prevInstr.innerText = "<";
        let thisModule = this;
        prevInstr.onclick = function () {
            thisModule.renderPrevInstruction(document);
        };
        if (this._instrIndex == 0) {
            prevInstr.style.background = "#D8D8D8";
            prevInstr.disabled = true;
        }
        instrDiv.appendChild(prevInstr);
        let nextInstr = document.createElement("button");
        nextInstr.id = 'next-instruction';
        nextInstr.innerText = ">";
        nextInstr.onclick = function () {
            thisModule.renderNextInstruction(document);
        };
        if (this._instrIndex == this._instrBoxes.length || this._instrIndex == this._latestInstrIndex) {
            nextInstr.style.background = "#D8D8D8";
            nextInstr.disabled = true;
        }
        instrDiv.appendChild(nextInstr);
        document.getElementById(instruction._location).appendChild(instrDiv);
    }
    get numInstructions() {
        return this._instrBoxes.length;
    }
    /**
     * Returns the module name
     */
    get name() {
        return this._name;
    }
    /**
     * Returns the module instructions
     */
    get instructions() {
        return this._instructions;
    }
}
exports.Module = Module;

},{}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const index_2 = require("../../index");
const index_3 = require("../../index");
const index_4 = require("../../index");
class ModuleGenerator {
    constructor() {
        this.curConstructors = new Map([
            ['l1c1', (ctx, editor) => new index_1.LessonOneCpOne(ctx, editor)],
            ['l1c2', (ctx, editor) => new index_1.LessonOneCpTwo(ctx, editor)],
            ['l1c3', (ctx, editor) => new index_1.LessonOneCpThree(ctx, editor)],
            ['l1c4', (ctx, editor) => new index_1.LessonOneCpFour(ctx, editor)],
            ['l2c1', (ctx, editor) => new index_2.LessonTwoCpOne(ctx, editor)],
            ['l2c2', (ctx, editor) => new index_2.LessonTwoCpTwo(ctx, editor)],
            ['l2c3', (ctx, editor) => new index_2.LessonTwoCpThree(ctx, editor)],
            ['l2c4', (ctx, editor) => new index_2.LessonTwoCpFour(ctx, editor)],
            ['l2c5', (ctx, editor) => new index_2.LessonTwoCpFive(ctx, editor)],
            ['l2c6', (ctx, editor) => new index_2.LessonTwoCpSix(ctx, editor)],
            ['l2c7', (ctx, editor) => new index_2.LessonTwoCpSeven(ctx, editor)],
            ['l3c1', (ctx, editor) => new index_3.LessonThreeCpOne(ctx, editor)],
            ['l3c2', (ctx, editor) => new index_3.LessonThreeCpTwo(ctx, editor)],
            ['l3c3', (ctx, editor) => new index_3.LessonThreeCpThree(ctx, editor)],
            ['l3c4', (ctx, editor) => new index_3.LessonThreeCpFour(ctx, editor)],
            ['l3c5', (ctx, editor) => new index_3.LessonThreeCpFive(ctx, editor)],
            ['l3c6', (ctx, editor) => new index_3.LessonThreeCpSix(ctx, editor)],
            ['l4c1', (ctx, editor) => new index_4.LessonFourCpOne(ctx, editor)],
            ['l4c2', (ctx, editor) => new index_4.LessonFourCpTwo(ctx, editor)]
        ]);
        this.checkpoints = new Map([
            ['l1c1', null],
            ['l1c2', null],
            ['l1c3', null],
            ['l1c4', null],
            ['l2c1', null],
            ['l2c2', null],
            ['l2c3', null],
            ['l2c4', null],
            ['l2c5', null],
            ['l2c6', null],
            ['l2c7', null],
            ['l3c1', null],
            ['l3c2', null],
            ['l3c3', null],
            ['l3c4', null],
            ['l3c5', null],
            ['l3c6', null],
            ['l4c1', null],
            ['l4c2', null]
        ]);
    }
    createModule(cp, ctx, editor) {
        let checkpoint = this.checkpoints.get(cp);
        if (checkpoint != null) {
            return checkpoint;
        }
        checkpoint = this.curConstructors.get(cp)(ctx, editor);
        this.checkpoints.set(cp, checkpoint);
        return checkpoint;
    }
}
exports.ModuleGenerator = ModuleGenerator;

},{"../../index":1}],63:[function(require,module,exports){
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
    //let effects: Effect<any>[] = [];
    /**
     * parse is a function that wraps the input text in a CharStream
     * and passes it to the upper-level parse function
     * @param program a string representing program text
     */
    function parse(program) {
        program += "\n";
        //printOffset = -1;
        //this.effects = effects;
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
    let boundingRects = [];
    //TODO
    function getNonOverlappingCoords() {
        return [0, 0];
    }
    Parser.getNonOverlappingCoords = getNonOverlappingCoords;
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
                        //boundingRects.push([tup[1][0].width, tup[1][0].height, tup[1][1], tup[1][2]]);
                        return new index_1.PrintNode(tup[1][0], new index_1.Dimensions(tup[1][1], tup[1][2], new index_1.NumberNode(1)), ws);
                    }
                    printOffset = (printOffset + 1) % 12;
                    console.log("printOffset: " + printOffset);
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

},{"../../index":1,"pants":87,"space-lift":93}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BooleanNode {
    /**
     * Constructor for BooleanNode, a node representing a boolean
     * @param val The boolean value of the BooleanNode
     * @param ws Preceding white space
     */
    constructor(val, ws) {
        this._newLine = false;
        this._val = val;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    ;
    /**
     * Returns the BooleanNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * BooleanNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Returns whether this BooleanNode equals another
     * @param right The right side of the equality
     */
    equalsVal(right) {
        if (right instanceof BooleanNode) {
            return this.val === right.val;
        }
        return false;
    }
    /**
     * Returns a string representation of the BooleanNode
     */
    toString() {
        return this._ws + this._val;
    }
    /**
     * Returns the boolean value
     */
    get val() {
        return this._val;
    }
    /**
     * Sets the boolean value
     */
    set val(value) {
        this._val = value;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.BooleanNode = BooleanNode;

},{}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NOP {
    constructor() {
        /* A NOP is a placeholder operation that evaluates to nothing */
        this._newLine = true;
    }
    /**
     * Returns the NOP
     * @param context
     */
    eval(context) {
        return this;
    }
    /**
     * NOPs cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("NOPs cannot be drawn.");
    }
    /**
     * Returns a string representation of the NOP
     */
    toString() {
        return "";
    }
    /**
     * Returns whether this NOP equals another (spoiler: it doesn't)
     * @param right
     */
    equalsVal(right) {
        return false;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.NOP = NOP;

},{}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberEffect_1 = require("../effects/NumberEffect");
// Nodes representing numbers
// Should abstract Node class implement Expression?
class NumberNode {
    /**
     * Constructor for a NumberNode, a node representing a number
     * @param val The number value
     * @param ws Preceding whitespace
     */
    constructor(val, ws) {
        this._newLine = false;
        this._val = val;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    ;
    /**
     * Returns this NumberNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * NumberNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        let e = new NumberEffect_1.NumberEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this NumberNode equals another NumberNode
     * @param right The right side of the equality (must be a NumberNode)
     */
    equalsVal(right) {
        if (right instanceof NumberNode) {
            return this.val === right.val;
        }
        return false;
    }
    /**
     * Returns a string representation of the NumberNode
     */
    toString() {
        return this._ws + this._val;
    }
    /**
     * Returns the number stored in the node
     */
    get val() {
        return this._val;
    }
    /**
     * Sets the value of the number stored in the node
     */
    set val(value) {
        this._val = value;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.NumberNode = NumberNode;

},{"../effects/NumberEffect":16}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class StringNode {
    /**
     * Constructor for a StringNode, a node representing a string
     * @param str The string stored in the node
     * @param ws Preceding whitespace
     */
    constructor(str, ws) {
        this._newLine = false;
        this._str = str;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Returns this StringNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the String using StringEffect
     * @param context The current program context
     * @param dims The dimensions of the string to be drawn
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        let e = new StringEffect_1.StringEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this StringNode equals another StringNode
     * @param right The right side of the equality, must be a StringNode
     */
    equalsVal(right) {
        if (right instanceof StringNode) {
            return this.val === right.val;
        }
        return false;
    }
    /**
     * Returns a string representation of the StringNode
     */
    toString() {
        return this._ws + '\"' + this._str + '\"';
    }
    /**
     * Sets the string stored in the node
     */
    set str(value) {
        this._str = value;
    }
    /**
     * Returns the string stored in the node
     */
    get val() {
        return this._str;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.StringNode = StringNode;

},{"../effects/StringEffect":18}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ColorNode {
    /**
     * Constructor for a ColorNode, a node representing an RGB color
     */
    constructor(red, green, blue) {
        this._newLine = false;
        this._red = red;
        this._green = green;
        this._blue = blue;
    }
    ;
    /**
     * Evaluates into a string RGB value
     * @param context The current program context
     */
    eval(context) {
        return this._red + " " + this._green + " " + this._blue;
    }
    /**
     * ColorNodes cannot currently be drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Returns whether this ColorNode equals another ColorNode
     * @param right The right side of the equality (must be a BooleanNode)
     */
    equalsVal(right) {
        if (right instanceof ColorNode) {
            return (this.red === right.red && this.green === right.green && this.blue === right.blue);
        }
        return false;
    }
    /**
     * Returns a string representation of the ColorNode
     */
    toString() {
        return "";
    }
    /**
     * Returns the red value
     */
    get red() {
        return this._red;
    }
    /**
     * Sets the red value
     */
    set red(red) {
        this._red = red;
    }
    /**
     * Returns the green value
     */
    get green() {
        return this._green;
    }
    /**
     * Sets the green value
     */
    set green(green) {
        this._green = green;
    }
    /**
     * Returns the blue value
     */
    get blue() {
        return this._blue;
    }
    /**
     * Sets the blue value
     */
    set blue(blue) {
        this._blue = blue;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.ColorNode = ColorNode;

},{}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const CurveEffect_1 = require("../effects/CurveEffect");
class CurveNode {
    /**
     * Constructor for a CurveNode, a node representing a curve
     * @param dx the run of the curve
     * @param dy the rise of the curve
     * @param curvature how much the curve, umm, curves
     * @param ws Preceding whitespace
     */
    constructor(dx, dy, curvature, ws) {
        this._newLine = false;
        this._dx = dx;
        this._dy = dy;
        this._curvature = curvature;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Returns this CurveNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the curve using CurveEffect
     * @param context The current program context
     * @param dims The line dimensions
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        dims.width = new NumberNode_1.NumberNode(this._dx.eval(context).val, "");
        dims.height = new NumberNode_1.NumberNode(this._dy.eval(context).val, "");
        dims.curvature = new NumberNode_1.NumberNode(this._curvature.eval(context).val, "");
        let e = new CurveEffect_1.CurveEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this CurveNode equals another (if their dx, dy, and curvature are equal)
     * @param right The right side of the equality (must be a CurveNode)
     */
    equalsVal(right) {
        if (right instanceof CurveNode) {
            return (this.dx.equalsVal(right.dx) && this.dy.equalsVal(right.dy) && this.curvature.equalsVal(right.curvature));
        }
        return false;
    }
    move() { }
    /**
     * Returns a string representation of the curve
     */
    toString() {
        return this._ws + "curve(" + this._dx.toString() + ", " + this._dy.toString() + ", " + this._curvature.toString() + ")";
    }
    /**
     * Returns the run of the curve
     */
    get dx() {
        return this._dx;
    }
    /**
     * Sets the run of the curve
     */
    set dx(dx) {
        this._dx = dx;
    }
    /**
     * Returns the rise of the curve
     */
    get dy() {
        return this._dy;
    }
    /**
     * Sets the rise of the curve
     */
    set dy(dy) {
        this._dy = dy;
    }
    /**
     * Returns the curvature of the curve
     */
    get curvature() {
        return this._curvature;
    }
    /**
     * Sets the curvature of the curve
     */
    set curvature(curvature) {
        this._curvature = curvature;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.CurveNode = CurveNode;

},{"../effects/CurveEffect":12,"../prims/NumberNode":66}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
class EllipseNode {
    /**
     * Constructor for an EllipseNode, a node representing an ellipse
     * @param width The width of the ellipse
     * @param height The height of the ellipse
     * @param ws Preceding whitespace
     */
    constructor(width, height, ws) {
        this._newLine = false;
        this._width = width;
        this._height = height;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Returns this EllipseNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the ellipse on the canvas using EllipseEffect
     * @param context The current program context
     * @param dims The dimensions of the ellipse
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        dims.width = this._width;
        dims.height = this._height;
        let e = new EllipseEffect_1.EllipseEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this EllipseNode equals another EllipseNode (if their widths and heights are equal)
     * @param right The right side of the equality (must be an EllipseNode)
     */
    equalsVal(right) {
        if (right instanceof EllipseNode) {
            return (this.width.equalsVal(right.width) && this.height.equalsVal(right.height));
        }
        return false;
    }
    /**
     * Returns a string representation of the ellipse
     */
    toString() {
        return this._ws + "ellipse(" + this._width.toString() + ", " + this._height.toString() + ")";
    }
    move() { }
    /**
     * Returns the ellipse width
     */
    get width() {
        return this._width;
    }
    /**
     * Sets the ellipse width
     */
    set width(width) {
        this._width = width;
    }
    /**
    * Returns the ellipse height
    */
    get height() {
        return this._height;
    }
    /**
     * Sets the ellipse height
     */
    set height(height) {
        this._height = height;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.EllipseNode = EllipseNode;

},{"../effects/EllipseEffect":13}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const EphEffect_1 = require("../effects/EphEffect");
class EphNode {
    /**
     * Constructor for an EphNode, a node representing something very special
     * @param width The width of the EphNode
     * @param height The height of the EphNode
     * @param ws Preceding whitespace
     */
    constructor(width, height, ws) {
        this._newLine = false;
        //this._image = image;
        this._width = width;
        this._height = height;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Returns this EphNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the rectangle using EphEffect
     * @param context The current program context
     * @param dims The rectangle dimensions
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        dims.width = new NumberNode_1.NumberNode(this._width.eval(context).val, "");
        dims.height = new NumberNode_1.NumberNode(this._height.eval(context).val, "");
        let e = new EphEffect_1.EphEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this EphNode equals another (if their widths and heights are equal)
     * @param right The right side of the equality (must be an EphNode)
     */
    equalsVal(right) {
        if (right instanceof EphNode) {
            return (this.width.equalsVal(right.width) && this.height.equalsVal(right.height));
        }
        return false;
    }
    move() { }
    /**
     * Returns a string representation of the EphNode
     */
    toString() {
        return this._ws + "eph(" + this._width.toString() + ", " + this._height.toString() + ")";
    }
    /**
     * Returns the width of the EphNode
     */
    get width() {
        return this._width;
    }
    /**
     * Sets the width of the EphNode
     */
    set width(width) {
        this._width = width;
    }
    /**
     * Returns the height of the EphNode
     */
    get height() {
        return this._height;
    }
    /**
     * Sets the height of the EphNode
     */
    set height(height) {
        this._height = height;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.EphNode = EphNode;

},{"../effects/EphEffect":14,"../prims/NumberNode":66}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const LineEffect_1 = require("../effects/LineEffect");
class LineNode {
    /**
     * Constructor for a LineNode, a node representing a line
     * @param dx the run of the line
     * @param dy the rise of the line
     * @param ws Preceding whitespace
     */
    constructor(dx, dy, ws) {
        this._newLine = false;
        this._dx = dx;
        this._dy = dy;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Returns this LineNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the line using LineEffect
     * @param context The current program context
     * @param dims The line dimensions
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        dims.width = new NumberNode_1.NumberNode(this._dx.eval(context).val, "");
        dims.height = new NumberNode_1.NumberNode(this._dy.eval(context).val, "");
        let e = new LineEffect_1.LineEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this LineNode equals another (if their dx and dy are equal)
     * @param right The right side of the equality (must be a LineNode)
     */
    equalsVal(right) {
        if (right instanceof LineNode) {
            return (this.dx.equalsVal(right.dx) && this.dy.equalsVal(right.dy));
        }
        return false;
    }
    move() { }
    /**
     * Returns a string representation of the line
     */
    toString() {
        return this._ws + "line(" + this._dx.toString() + ", " + this._dy.toString() + ")";
    }
    /**
     * Returns the run of the line
     */
    get dx() {
        return this._dx;
    }
    /**
     * Sets the run of the line
     */
    set dx(dx) {
        this._dx = dx;
    }
    /**
     * Returns the rise of the line
     */
    get dy() {
        return this._dy;
    }
    /**
     * Sets the rise of the line
     */
    set dy(dy) {
        this._dy = dy;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.LineNode = LineNode;

},{"../effects/LineEffect":15,"../prims/NumberNode":66}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const RectangleEffect_1 = require("../effects/RectangleEffect");
class RectangleNode {
    /**
     * Constructor for a RectangleNode, a node representing a rectangle
     * @param width The width of the rectangle
     * @param height The height of the rectangle
     * @param ws Preceding whitespace
     */
    constructor(width, height, ws) {
        this._newLine = false;
        this._width = width;
        this._height = height;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Returns this RectangleNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the rectangle using RectangleEffect
     * @param context The current program context
     * @param dims The rectangle dimensions
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        dims.width = new NumberNode_1.NumberNode(this._width.eval(context).val, "");
        dims.height = new NumberNode_1.NumberNode(this._height.eval(context).val, "");
        let e = new RectangleEffect_1.RectangleEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this RectangleNode equals another (if their widths and heights are equal)
     * @param right The right side of the equality (must be a RectangleNode)
     */
    equalsVal(right) {
        if (right instanceof RectangleNode) {
            return (this.width.equalsVal(right.width) && this.height.equalsVal(right.height));
        }
        return false;
    }
    move() { }
    /**
     * Returns a string representation of the rectangle
     */
    toString() {
        return this._ws + "rect(" + this._width.toString() + ", " + this._height.toString() + ")";
    }
    /**
     * Returns the width of the rectangle
     */
    get width() {
        return this._width;
    }
    /**
     * Sets the width of the rectangle
     */
    set width(width) {
        this._width = width;
    }
    /**
     * Returns the height of the rectangle
     */
    get height() {
        return this._height;
    }
    /**
     * Sets the height of the rectangle
     */
    set height(height) {
        this._height = height;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.RectangleNode = RectangleNode;

},{"../effects/RectangleEffect":17,"../prims/NumberNode":66}],74:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
class Dimensions {
    /**
     * Constructor for Dimensions, which stores object dimensions
     * @param x The x coordinate of the object
     * @param y The y coordinate of the object
     * @param scale The scale of the object
     * @param radius The radius of the object
     */
    constructor(x, y, scale, radius) {
        this._x = x;
        this._y = y;
        this._scale = scale;
        this._radius = radius || new NumberNode_1.NumberNode(30, "");
    }
    /**
     * Returns a string representation of the dimensions
     */
    toString() {
        return this.x.toString() + ", " + this.y.toString();
    }
    /**
     * Returns the x coordinate of the object
     */
    get x() {
        return this._x;
    }
    /**
     * Sets the x coordinate of the object
     */
    set x(val) {
        this._x = val;
    }
    /**
     * Returns the y coordinate of the object
     */
    get y() {
        return this._y;
    }
    /**
     * Sets the y coordinate of the object
     */
    set y(val) {
        this._y = val;
    }
    /**
     * Returns the radius of the object
     */
    get radius() {
        return this._radius;
    }
    /**
     * Sets the radius of the object
     */
    set radius(val) {
        this._radius = val;
    }
    /**
     * Returns the scale of the object
     */
    get scale() {
        return this._scale;
    }
    /**
     * Sets the scale of the object
     */
    set scale(val) {
        this._scale = val;
    }
    /**
     * Returns the width of the object
     */
    get width() {
        return this._width;
    }
    /**
     * Sets the width of the object
     */
    set width(val) {
        this._width = val;
    }
    /**
     * Returns the height of the object
     */
    get height() {
        return this._height;
    }
    /**
     * Sets the height of the object
     */
    set height(val) {
        this._height = val;
    }
    /**
     * Returns the curvature of the object
     */
    get curvature() {
        return this._curvature;
    }
    /**
     * Sets the curvature of the object
     */
    set curvature(val) {
        this._curvature = val;
    }
}
exports.Dimensions = Dimensions;

},{"../prims/NumberNode":66}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrintNode {
    /**
     * Constructor for a PrintNode, representing an object to be printed
     * @param toPrint The object to be printed
     * @param dimensions The dimensions of the object to be printed
     * @param ws Preceding whitespace
     */
    constructor(toPrint, dimensions, ws) {
        this._scale = 1;
        this._newLine = false;
        this._toPrint = toPrint;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
        this._dims = dimensions || null;
    }
    /**
     * Returns a string representation of the object to be printed
     */
    toString() {
        return this._ws + "print(" + this.toPrint.toString() + ", " + this.dims.toString() + ")";
    }
    /**
     * Equals cannot be called directly on a PrintNode
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on PrintNode");
    }
    /**
     * PrintNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Cannot call draw() on printOp");
    }
    /**
     * Evaluates the object to be printed and draws it
     * @param context
     */
    eval(context) {
        let res = this._toPrint.eval(context);
        res.draw(context, this._dims, this);
        return res;
    }
    /**
     * Returns the object to be printed
     */
    get toPrint() {
        return this._toPrint;
    }
    /**
     * Returns the dimensions of the object to be printed
     */
    get dims() {
        return this._dims;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.PrintNode = PrintNode;

},{}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnError_1 = require("./ReturnError");
class Return {
    /**
     * Constructor for a Return object, representing something to be returned in a function
     * @param expr The expression to be returned
     * @param ws Preceding whitespace
     */
    constructor(expr, ws) {
        this._newLine = false;
        this._expr = expr;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the expression to be returned and returns via a ReturnErro
     * @param context The current program context
     */
    eval(context) {
        // If return val is a var, returns that var's value
        let result = this._expr.eval(context);
        throw new ReturnError_1.ReturnError(result, context.retIDLookup());
    }
    /**
     * Equals cannot be called directly on Return nodes
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on Return");
    }
    /**
     * Returns a string representation of the Return node
     */
    toString() {
        return this._ws + "return " + this._expr.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Return nodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Cannot call draw on Return");
    }
}
exports.Return = Return;

},{"./ReturnError":77}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReturnError extends Error {
    /**
     * Constructor for ReturnError, a custom error class that we abuse to return values
     * @param retVal The value to be returned
     * @param ID The ID of the value to be returned
     */
    constructor(retVal, ID) {
        super(ID);
        this.retVal = retVal;
        this.ID = ID;
        Object.setPrototypeOf(this, ReturnError.prototype);
    }
}
exports.ReturnError = ReturnError;

},{}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const space_lift_1 = require("space-lift");
class Scope {
    /**
     * Constructor for Scope, an object keeping track of objects within a particular context
     * @param parent The parent Scope
     * @param effects Effects within this Scope
     * @param myState The scope state
     * @param eventLog The log of events that occurred
     */
    constructor(parent, effects, eventLog) {
        this._retValID = space_lift_1.None;
        this._canvas = space_lift_1.None;
        this._eventLog = []; // The event log
        this._hadFunEval = false; // Was this created in a function?
        //public globalFunID = Math.random();
        this.globalFunID = 10000000; // The global ID for functions in this context
        this._varBindings = new Map();
        this._parent = parent;
        this._effects = effects || null;
        this._eventLog = eventLog;
        if (this._parent != null && this._parent._hadFunEval)
            this._hadFunEval = true; // copy function eval flag from parent
    }
    /**
     * Copies information from this Scope into another Scope and returns the new Scope
     */
    copy() {
        let s = new Scope(this._parent, this._effects, this._eventLog);
        s.varBindings = new Map(this._varBindings);
        s.canvas = this.canvas;
        s.eventLog = this.eventLog;
        return s;
    }
    /**
     * Declares a new variable
     * @param name The name of the variable to be declared
     */
    declare(name) {
        if (this._varBindings.has(name)) {
            throw new Error("Scope already has var with name " + name);
        }
        this._varBindings.set(name, space_lift_1.None);
    }
    /**
     * Assigns a value to a variable in this Context
     * @param name The name of the variable
     * @param val The value of the variable
     */
    assign(name, val) {
        this._varBindings.set(name, space_lift_1.Some(val)); //Some(val)?
    }
    /**
     * Looks up a value within the Scope and all its ancestor Scopes
     * @param name The name of the value
     * @param context The context to search within
     */
    lookup(name, context) {
        if (context.varBindings.has(name)) {
            if (context.varBindings.get(name).isDefined()) {
                return (context.varBindings.get(name).get()); //extra get to manage Some()
            }
        }
        if (!(context.parent == null)) {
            return this.lookup(name, context.parent);
        }
        throw new Error("Variable could not be found.");
    }
    /**
     * Looks up and returns the return ID value
     */
    retIDLookup() {
        if (this._retValID.isDefined()) {
            return this._retValID.get();
        }
        else {
            if (this._parent) {
                return this._parent.retIDLookup();
            }
            else {
                throw new Error("Unknown caller.");
            }
        }
    }
    /**
     * Returns the Map of variable bindings
     */
    get varBindings() {
        return this._varBindings;
    }
    /**
     * Sets the Map of variable bindings
     */
    set varBindings(m) {
        this._varBindings = m;
    }
    /**
     * Returns the parent Scope
     */
    get parent() {
        return this._parent;
    }
    /**
     * Returns the return value ID
     */
    get retValID() {
        return this._retValID;
    }
    /**
     * Sets the return value ID
     */
    set retValID(val) {
        this._retValID = val;
    }
    /**
     * Returns the HTML canvas
     */
    get canvas() {
        return this._canvas;
    }
    /**
     * Sets the HTML canvas
     */
    set canvas(val) {
        this._canvas = val;
    }
    /**
     * Returns the effects array
     */
    get effects() {
        return this._effects;
    }
    /**
     * Sets the effects array
     */
    set effects(arr) {
        this._effects = arr;
    }
    /**
     * Returns the event log
     */
    get eventLog() {
        return this._eventLog;
    }
    /**
     * Sets the event log
     */
    set eventLog(update) {
        this._eventLog = update;
    }
    /**
     * Returns the array of effects
     */
    get mulSelArray() {
        return this._mulSelArray;
    }
    /**
     * Sets the array of effects
     */
    set mulSelArray(update) {
        this._mulSelArray = update;
    }
    /**
     * Returns whether this Scope was created in a function
     */
    get hadFunEval() {
        return this._hadFunEval;
    }
    /**
     * Sets whether this Scope was created in a function
     */
    set hadFunEval(val) {
        this._hadFunEval = val;
    }
}
exports.Scope = Scope;

},{"space-lift":93}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("./Scope");
const space_lift_1 = require("space-lift");
class SequenceNode {
    /**
     * Constructor for a SequenceNode, the building block of the AST
     * @param left The left side of the Sequence
     * @param right The right side of the Sequence
     */
    constructor(left, right) {
        this._newLine = true;
        this._left = left;
        this._right = right;
    }
    /**
     * Evaluates the children in postorder (left, right, parent)
     * @param context The current program context
     */
    eval(context) {
        let leftScope = new Scope_1.Scope(context, context.effects, context.eventLog);
        leftScope.canvas = space_lift_1.Some(context.canvas.get());
        //throwing away after evaling
        this._leftVal = this._left.eval(leftScope);
        this._rightVal = this._right.eval(leftScope); // leftScope may be modified now
    }
    /**
     * SequenceNodes cannot be directly drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Cannot call draw() on SequenceNodes");
    }
    /**
     * Equals cannot be directly called on SequenceNodes
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on SequenceNode");
    }
    /**
     * Returns a string representation of the AST
     */
    toString() {
        let result = this._left.toString();
        if (this._left.newLine() == true) {
            result += '\n';
        }
        else {
            result += ";\n";
        }
        if (this._right.newLine() == false) {
            result += this._right.toString() + ";";
        }
        else {
            result += this._right.toString();
        }
        return result;
    }
    /**
     * Returns the left child
     */
    set left(left) {
        this._left = left;
    }
    /**
     * Sets the left child
     */
    get left() {
        return this._left;
    }
    /**
     * Returns the right child
     */
    set right(right) {
        this._right = right;
    }
    /**
     * Sets the right child
     */
    get right() {
        return this._right;
    }
    /**
     * Returns the value of the left chile
     */
    get leftVal() {
        return this._leftVal;
    }
    /**
     * Returns the value of the right chile
     */
    get rightVal() {
        return this._rightVal;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.SequenceNode = SequenceNode;

},{"./Scope":78,"space-lift":93}],80:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const index_2 = require("../../index");
const space_lift_1 = require("space-lift");
const diff_1 = require("diff");
(function () {
    let editor = ((e) => { return e.CodeMirror; })(document.getElementById("input"));
    let editorWrapper = editor.getWrapperElement();
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let lastCursorPos = editor.getCursor();
    let lastProgram = ""; // Used for comparing and highlighting diffs
    let effects = [];
    let ast;
    let context;
    let masterLog = [];
    let alreadyLogged = false;
    let numLogged = 0;
    let selectedElems = [];
    let selected = 0; // the number of selected effects if multiply selecting
    let isCanvasSelected = false; // Check if mouse is clicked on canvas
    let isDoingDM = false; // Check if direct manipulating effects
    let checkpoint = null;
    let modGen = new index_2.ModuleGenerator();
    let checkpointIsActive = false;
    let canvasIsDisabled = false;
    let globalID = 1;
    let highlightTimer = null;
    let parseTimer = null;
    /* Logging, parsing & rendering */
    function printLog() {
        console.log("Log: ");
        for (let elem of masterLog) {
            console.log(elem.assembleLog());
        }
    }
    function parse() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let inputText = editor.getValue();
        let astOpt = index_1.Parser.parse(inputText);
        effects.length = 0; // slightly sketch clearing method to maintain reference to original array
        if (astOpt.isDefined()) {
            ast = astOpt.get();
            context = new index_2.Scope(null, effects, masterLog);
            context.canvas = space_lift_1.Some(canvas);
            ast.eval(context); //this is where we draw the objects to the screen
        }
        else {
            ast = undefined;
        }
        printLog();
    }
    /**
     * The animation function that basically recursively calls itself, clearing and
     * redrawing to the canvas at 60fps.
     */
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clears canvas
        selected = 0;
        for (let i = 0; i < effects.length; i++) {
            effects[i].update();
            if (effects[i].selected) {
                selectedElems.push(effects[i]);
                selected++;
            }
            if (effects[i].getJustDragged()) { // Logs drag event
                context.eventLog.push(new index_2.DragEvent(effects[i]));
                masterLog.push(context.eventLog[context.eventLog.length - 1]);
                effects[i].setJustDragged(false);
            }
            if (effects[i].idObj == undefined) { // Gives object an ID if it doesn't have one
                effects[i].initID(globalID);
                context.eventLog.push(new index_2.IDEvent(effects[i])); // Logs ID
                globalID++;
            }
        }
        // at this point, have iterated through all effects and have complete list to log
        if (selected != numLogged) { // if selections have changed, should log again
            alreadyLogged = false;
        }
        if (!alreadyLogged && selected >= 2) { // logs if hasn't already
            numLogged = selected;
            context.eventLog.push(new index_2.SelectEvent(selectedElems));
            masterLog.push(context.eventLog[context.eventLog.length - 1]);
            alreadyLogged = true;
        }
        selectedElems = [];
        updateProgramText(); // ProDirect Manipulation
        // Draw check points
        if (checkpointIsActive) {
            checkpointChecksGoal();
        }
        if (checkpoint != null && checkpoint.drawGuides != null) {
            checkpoint.drawGuides();
        }
    }
    /**
     * Update the program text and highlight all the changes
    **/
    function updateProgramText() {
        if (!ast || !isDoingDM) {
            return;
        }
        let newProgram = ast.toString();
        if (lastProgram != newProgram) {
            editor.setValue(newProgram);
            highlightDiff(newProgram);
        }
        else if (!isCanvasSelected) {
            isDoingDM = false;
        }
    }
    /**
     * Highlight diffs in editor
     * @param newProgram New program text to highlight
     * @param update Whether or not to update last program with new program
     */
    function highlightDiff(newProgram, update) {
        let curLine = 0;
        let curChar = 0;
        diff_1.diffChars(lastProgram, newProgram).forEach((result) => {
            if (result.removed) {
                return;
            }
            let lines = result.value.split(/\r?\n/g);
            let endLine = curLine + lines.length - 1;
            let endChar = (endLine == curLine ? curChar : 0) + lines[lines.length - 1].length;
            if (result.added) {
                // Extends the highlighted section all the way to the left
                let startHighlightChar = curChar;
                let firstLine = editor.getLine(curLine);
                while (startHighlightChar >= 1) {
                    // Check if alphanumeric
                    if (!/^[a-z0-9]+$/i.test(firstLine[startHighlightChar - 1])) {
                        break;
                    }
                    startHighlightChar--;
                }
                // Extends to the right
                let endHightLightChar = endChar;
                let lastLine = editor.getLine(endLine);
                while (endHightLightChar < lastLine.length) {
                    if (!/^[a-z0-9]+$/i.test(lastLine[endHightLightChar])) {
                        break;
                    }
                    endHightLightChar++;
                }
                editor.markText(// Highlight text
                { line: curLine, ch: startHighlightChar }, // Starting point
                { line: endLine, ch: endHightLightChar }, // Inclusive line, exclusive char
                { className: "highlighted-text" });
            }
            curLine = endLine;
            curChar = endChar;
        });
        // Set the clear highlight timer
        if (highlightTimer != null) {
            clearTimeout(highlightTimer);
        }
        highlightTimer = setTimeout(function () {
            editor.getAllMarks().forEach((mark) => {
                mark.clear();
            });
        }, 500);
        // Update last program if necessary
        if (update) {
            lastProgram = newProgram;
        }
    }
    /* Event listeners */
    editor.on("keyup", function () {
        // Check if editor has been modified, only parses if modified
        if (editor.isClean()) {
            return;
        }
        else {
            editor.markClean();
        }
        if (parseTimer != null) {
            clearTimeout(parseTimer);
        }
        parseTimer = setTimeout(parse, 200);
    });
    editor.on("blur", function () {
        lastCursorPos = editor.getCursor();
    });
    //Mousedown event for window element
    window.addEventListener('mousedown', function (event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        // Check if canvas is selected
        let rect = canvas.getBoundingClientRect();
        if (canvasIsDisabled && mouseX > rect.left && mouseX < rect.right &&
            mouseY > rect.top && mouseY < rect.bottom) {
            popUp.style.display = 'block';
        }
        else {
            popUp.style.display = 'none';
        }
    });
    // Canvas mouse events
    let popUp = document.getElementById('popup');
    canvas.addEventListener("mousedown", function () {
        lastProgram = editor.getValue();
        isCanvasSelected = true;
        isDoingDM = true;
    });
    canvas.addEventListener("mouseup", function () {
        lastProgram = editor.getValue();
        isCanvasSelected = false;
    });
    /* Palette */
    let paletteButtons = [
        "ellipse", "rect", "string", "number",
        "line", "curve"
    ];
    for (let buttonName of paletteButtons) {
        let paletteButton = document.getElementById(buttonName);
        paletteButton.onclick = () => insertNode(buttonName);
    }
    /**
     * Insert new node at the current cursor position and update the cursor
     **/
    function insertNode(buttonName) {
        let newNode = "";
        switch (buttonName) {
            case "ellipse":
                newNode = "print(ellipse(100, 100));\n";
                break;
            case "rect":
                newNode = "print(rect(100, 100));\n";
                break;
            case "string":
                newNode = 'print("newWord");\n';
                break;
            case "number":
                newNode = "print(10);\n";
                break;
            case "line":
                newNode = "print(line(100, 100));\n";
                break;
            case "curve":
                newNode = "print(curve(100, 100, 100));\n";
                break;
            default:
                console.log("Problem with " + buttonName);
                return;
        }
        // Insert at cursor position & highlight changes
        editor.replaceRange(newNode, lastCursorPos);
        highlightDiff(editor.getValue(), true);
        // Update cursor & refocus editor
        lastCursorPos.line++;
        lastCursorPos.ch = 0;
        editor.focus();
        editor.setCursor(lastCursorPos);
        // Parse
        parse();
    }
    //reset checkpoint
    let resetButton = document.getElementById('reset');
    resetButton.onclick = function () {
        if (checkpoint._starterCode != null) {
            editor.setValue(checkpoint._starterCode);
            parse();
        }
        context.eventLog.push(new index_2.ClearEvent());
        masterLog.push(context.eventLog[context.eventLog.length - 1]); // Does this actually work?
        printLog();
    };
    /* Modules */
    let instructions = document.getElementById('goal');
    let rewardBox = document.getElementById('reward-container');
    let instrLabel = document.getElementById('instr-label');
    //Map maintaining code last used at a checkpoint
    let cpCode = new Map([
        ['l1c1', ""],
        ['l1c2', ""],
        ['l1c3', ""],
        ['l1c4', ""],
        ['l2c1', ""],
        ['l2c2', ""],
        ['l2c3', ""],
        ['l2c4', ""],
        ['l2c5', ""],
        ['l2c6', ""],
        ['l2c7', ""],
        ['l3c1', ""],
        ['l3c2', ""],
        ['l3c3', ""],
        ['l3c4', ""],
        ['l3c5', ""],
        ['l3c6', ""],
        ['l4c1', ""],
        ['l4c2', ""]
    ]);
    //Map maintaining whether a checkpoint has been completed
    let cpCompletion = new Map([
        ['l1c1', false],
        ['l1c2', false],
        ['l1c3', false],
        ['l1c4', false],
        ['l2c1', false],
        ['l2c2', false],
        ['l2c3', false],
        ['l2c4', false],
        ['l2c5', false],
        ['l2c6', false],
        ['l2c7', false],
        ['l3c1', false],
        ['l3c2', false],
        ['l3c3', false],
        ['l3c4', false],
        ['l3c5', false],
        ['l3c6', false],
        ['l4c1', false],
        ['l4c2', false]
    ]);
    let cpNames = [
        'l1c1', 'l1c2', 'l1c3', 'l1c4',
        'l2c1', 'l2c2', 'l2c3', 'l2c4', 'l2c5', 'l2c6', 'l2c7',
        'l3c1', 'l3c2', 'l3c3', 'l3c4', 'l3c5', 'l3c6'
    ];
    //this is for testing tutorials
    let workingCp = [
        'l1c1', 'l1c2', 'l1c3', 'l1c4', 'l2c1'
    ];
    for (let cp of cpNames) {
        let cpButton = document.getElementById(cp);
        cpButton.onclick = function () {
            lastProgram = "";
            initCheckpoint(cp);
        };
    }
    /**
     * Creates a module corresponding to a checkpoint passed in.
     * Sets up the instruction, CODE area, and goal box accordingly.
     * @param cp: the name of the checkpoint
     */
    function initCheckpoint(cp) {
        //store CODE of old checkpoint
        if (checkpoint != null) {
            cpCode.set(checkpoint._name, editor.getValue());
        }
        console.log("Initiating checkpoint " + cp);
        checkpoint = modGen.createModule(cp, ctx, editor);
        instrLabel.innerHTML = cp + " - GOAL";
        instructions.innerHTML = checkpoint._instructions;
        //set up the CODE and CANVAS areas
        if (checkpoint._constraint == 'code') {
            editor.setOption("readOnly", true);
            editorWrapper.style.opacity = '0.5';
            canvas.style.pointerEvents = "auto";
            canvas.style.background = 'white';
            canvasIsDisabled = false;
        }
        else if (checkpoint._constraint == 'canvas') {
            editor.setOption("readOnly", false);
            editorWrapper.style.opacity = '1.0';
            canvas.style.pointerEvents = "none";
            canvas.style.background = '#C0C0C0';
            canvasIsDisabled = true;
        }
        else {
            editor.setOption("readOnly", false);
            editorWrapper.style.opacity = '1.0';
            canvas.style.pointerEvents = "auto";
            canvas.style.background = 'white';
            canvasIsDisabled = false;
        }
        let popUp = document.getElementById('popup');
        popUp.style.display = 'none';
        if (cpCode.get(checkpoint._name) !== "") {
            editor.setValue(cpCode.get(checkpoint._name));
            parse();
        }
        //set up the instruction and goal boxes
        if (cpCompletion.get(cp)) {
            updateRewardBox();
        }
        else {
            if (checkpoint._starterCode != null) {
                editor.setValue(checkpoint._starterCode);
                parse();
            }
            let curInstruction = document.getElementById("instruction");
            if (curInstruction != null) {
                curInstruction.remove();
            }
            if (checkpoint.numInstructions > 0) {
                checkpoint.renderInstruction(document);
            }
            rewardBox.style.background = '#C0C0C0';
            let reward = document.getElementById('reward-text');
            reward.style.color = 'black';
            reward.innerHTML = 'Complete goal to earn a star!';
            let rewardImg = document.getElementById('reward-image');
            rewardImg.src = 'pics/greystar.svg';
            rewardImg.alt = 'a star to be earned';
            let nextBtn = document.getElementById('next');
            nextBtn.style.display = 'none';
            instructions.scrollTop = 0;
            checkpointIsActive = true;
        }
    }
    function checkpointChecksGoal() {
        if (checkpoint.checkGoal(document, effects)) {
            updateRewardBox();
            cpCompletion.set(checkpoint._name, true);
        }
    }
    function updateRewardBox() {
        rewardBox.style.background = '#673AB7';
        console.log(document);
        let rewardText = document.getElementById('reward-text');
        rewardText.style.color = '#D8D8D8';
        rewardText.innerHTML = "Goal met! Click 'Next' to go to next checkpoint!";
        let rewardImg = document.getElementById('reward-image');
        rewardImg.src = 'pics/star.svg';
        rewardImg.alt = 'star earned';
        let nextBtn = document.getElementById('next');
        nextBtn.style.display = 'block';
        instructions.scrollTop = instructions.scrollHeight;
        checkpointIsActive = false;
    }
    let nextButton = document.getElementById('next');
    nextButton.onclick = function () {
        let nextModule = checkpoint._nextModule;
        if (nextModule != '') {
            initCheckpoint(nextModule);
        }
    };
    let prevButton = document.getElementById('prev');
    prevButton.onclick = function () {
        let prevModule = checkpoint._prevModule;
        if (prevModule != '') {
            initCheckpoint(prevModule);
        }
    };
    //call to animate
    animate();
})();

},{"../../index":1,"diff":84,"space-lift":93}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnaryOperation_1 = require("./UnaryOperation");
const NumberNode_1 = require("../prims/NumberNode");
class NegOp extends UnaryOperation_1.UnaryOperation {
    /**
     * Constructor for a NegationOperation
     * @param val The value to be negated (must be a NumberNode)
     * @param ws Preceding whitespace
     */
    constructor(val, ws) {
        super(val);
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the value into the negative version
     * @param context The current program context
     */
    eval(context) {
        let v = this.val.eval(context);
        return new NumberNode_1.NumberNode(-v.val, "");
    }
    /**
     * NegOps cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Negation ops cannot be drawn directly");
    }
    /**
     * Equals cannot be called directly on a NegOp
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on NegOp");
    }
    /**
     * Returns a string representation of the NegOp
     */
    toString() {
        return this._ws + "-" + this.val;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.NegOp = NegOp;

},{"../prims/NumberNode":66,"./UnaryOperation":82}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnaryOperation {
    /**
     * Abstract class constructor for Unary Operations
     * @param _val The object to be operated on
     */
    constructor(_val) {
        this._val = _val;
        this._newLine = false;
    }
    ;
    /**
     * Abstract draw method for undrawable UnaryOps
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Unary Operations cannot be drawn directly");
    }
    /**
     * Equals cannot be called directly on UnaryOps
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on UnaryOp");
    }
    ;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Returns the UnaryOp value
     */
    get val() {
        return this._val;
    }
    /**
     * Sets the UnaryOp value
     */
    set val(value) {
        this._val = value;
    }
}
exports.UnaryOperation = UnaryOperation;

},{}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VariableNode {
    /**
     * Constructor for a VariableNode, a node representing a variable
     * @param name The variable name
     * @param ws Preceding whitespace
     */
    constructor(name, ws) {
        this._newLine = false;
        this._name = name;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Looks up the value of the variable in the context
     * @param context The current program context
     */
    eval(context) {
        return context.lookup(this._name, context);
    }
    /**
     * VariableNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Cannot call draw on variable nodes");
    }
    /**
     * Equals cannot be called directly on VariableNodes
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot directly compare vars, eval first");
    }
    /**
     * Returns a string representation of the VariableNode
     */
    toString() {
        return this._ws + this._name;
    }
    /**
     * Returns the name of the variable
     */
    get name() {
        return this._name;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.VariableNode = VariableNode;

},{}],84:[function(require,module,exports){
/*!

 diff v3.5.0

Software License Agreement (BSD License)

Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>

All rights reserved.

Redistribution and use of this software in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above
  copyright notice, this list of conditions and the
  following disclaimer.

* Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the
  following disclaimer in the documentation and/or other
  materials provided with the distribution.

* Neither the name of Kevin Decker nor the names of its
  contributors may be used to endorse or promote products
  derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
@license
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JsDiff"] = factory();
	else
		root["JsDiff"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.canonicalize = exports.convertChangesToXML = exports.convertChangesToDMP = exports.merge = exports.parsePatch = exports.applyPatches = exports.applyPatch = exports.createPatch = exports.createTwoFilesPatch = exports.structuredPatch = exports.diffArrays = exports.diffJson = exports.diffCss = exports.diffSentences = exports.diffTrimmedLines = exports.diffLines = exports.diffWordsWithSpace = exports.diffWords = exports.diffChars = exports.Diff = undefined;

	/*istanbul ignore end*/var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	/*istanbul ignore end*/var /*istanbul ignore start*/_character = __webpack_require__(2) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_word = __webpack_require__(3) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_line = __webpack_require__(5) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_sentence = __webpack_require__(6) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_css = __webpack_require__(7) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_json = __webpack_require__(8) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_array = __webpack_require__(9) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_apply = __webpack_require__(10) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_parse = __webpack_require__(11) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_merge = __webpack_require__(13) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_create = __webpack_require__(14) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_dmp = __webpack_require__(16) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_xml = __webpack_require__(17) /*istanbul ignore end*/;

	/*istanbul ignore start*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/* See LICENSE file for terms of use */

	/*
	 * Text diff implementation.
	 *
	 * This library supports the following APIS:
	 * JsDiff.diffChars: Character by character diff
	 * JsDiff.diffWords: Word (as defined by \b regex) diff which ignores whitespace
	 * JsDiff.diffLines: Line based diff
	 *
	 * JsDiff.diffCss: Diff targeted at CSS content
	 *
	 * These methods are based on the implementation proposed in
	 * "An O(ND) Difference Algorithm and its Variations" (Myers, 1986).
	 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927
	 */
	exports. /*istanbul ignore end*/Diff = _base2['default'];
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffChars = _character.diffChars;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWords = _word.diffWords;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWordsWithSpace = _word.diffWordsWithSpace;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffLines = _line.diffLines;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffTrimmedLines = _line.diffTrimmedLines;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffSentences = _sentence.diffSentences;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffCss = _css.diffCss;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffJson = _json.diffJson;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffArrays = _array.diffArrays;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/structuredPatch = _create.structuredPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/createTwoFilesPatch = _create.createTwoFilesPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/createPatch = _create.createPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatch = _apply.applyPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatches = _apply.applyPatches;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/parsePatch = _parse.parsePatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/merge = _merge.merge;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/convertChangesToDMP = _dmp.convertChangesToDMP;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/convertChangesToXML = _xml.convertChangesToXML;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/canonicalize = _json.canonicalize;



/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports['default'] = /*istanbul ignore end*/Diff;
	function Diff() {}

	Diff.prototype = {
	  /*istanbul ignore start*/ /*istanbul ignore end*/diff: function diff(oldString, newString) {
	    /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var callback = options.callback;
	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    this.options = options;

	    var self = this;

	    function done(value) {
	      if (callback) {
	        setTimeout(function () {
	          callback(undefined, value);
	        }, 0);
	        return true;
	      } else {
	        return value;
	      }
	    }

	    // Allow subclasses to massage the input prior to running
	    oldString = this.castInput(oldString);
	    newString = this.castInput(newString);

	    oldString = this.removeEmpty(this.tokenize(oldString));
	    newString = this.removeEmpty(this.tokenize(newString));

	    var newLen = newString.length,
	        oldLen = oldString.length;
	    var editLength = 1;
	    var maxEditLength = newLen + oldLen;
	    var bestPath = [{ newPos: -1, components: [] }];

	    // Seed editLength = 0, i.e. the content starts with the same values
	    var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
	    if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
	      // Identity per the equality and tokenizer
	      return done([{ value: this.join(newString), count: newString.length }]);
	    }

	    // Main worker method. checks all permutations of a given edit length for acceptance.
	    function execEditLength() {
	      for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
	        var basePath = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
	        var addPath = bestPath[diagonalPath - 1],
	            removePath = bestPath[diagonalPath + 1],
	            _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
	        if (addPath) {
	          // No one else is going to attempt to use this value, clear it
	          bestPath[diagonalPath - 1] = undefined;
	        }

	        var canAdd = addPath && addPath.newPos + 1 < newLen,
	            canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
	        if (!canAdd && !canRemove) {
	          // If this path is a terminal then prune
	          bestPath[diagonalPath] = undefined;
	          continue;
	        }

	        // Select the diagonal that we want to branch from. We select the prior
	        // path whose position in the new string is the farthest from the origin
	        // and does not pass the bounds of the diff graph
	        if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
	          basePath = clonePath(removePath);
	          self.pushComponent(basePath.components, undefined, true);
	        } else {
	          basePath = addPath; // No need to clone, we've pulled it from the list
	          basePath.newPos++;
	          self.pushComponent(basePath.components, true, undefined);
	        }

	        _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);

	        // If we have hit the end of both strings, then we are done
	        if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
	          return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
	        } else {
	          // Otherwise track this path as a potential candidate and continue.
	          bestPath[diagonalPath] = basePath;
	        }
	      }

	      editLength++;
	    }

	    // Performs the length of edit iteration. Is a bit fugly as this has to support the
	    // sync and async mode which is never fun. Loops over execEditLength until a value
	    // is produced.
	    if (callback) {
	      (function exec() {
	        setTimeout(function () {
	          // This should not happen, but we want to be safe.
	          /* istanbul ignore next */
	          if (editLength > maxEditLength) {
	            return callback();
	          }

	          if (!execEditLength()) {
	            exec();
	          }
	        }, 0);
	      })();
	    } else {
	      while (editLength <= maxEditLength) {
	        var ret = execEditLength();
	        if (ret) {
	          return ret;
	        }
	      }
	    }
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/pushComponent: function pushComponent(components, added, removed) {
	    var last = components[components.length - 1];
	    if (last && last.added === added && last.removed === removed) {
	      // We need to clone here as the component clone operation is just
	      // as shallow array clone
	      components[components.length - 1] = { count: last.count + 1, added: added, removed: removed };
	    } else {
	      components.push({ count: 1, added: added, removed: removed });
	    }
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
	    var newLen = newString.length,
	        oldLen = oldString.length,
	        newPos = basePath.newPos,
	        oldPos = newPos - diagonalPath,
	        commonCount = 0;
	    while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
	      newPos++;
	      oldPos++;
	      commonCount++;
	    }

	    if (commonCount) {
	      basePath.components.push({ count: commonCount });
	    }

	    basePath.newPos = newPos;
	    return oldPos;
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/equals: function equals(left, right) {
	    if (this.options.comparator) {
	      return this.options.comparator(left, right);
	    } else {
	      return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
	    }
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/removeEmpty: function removeEmpty(array) {
	    var ret = [];
	    for (var i = 0; i < array.length; i++) {
	      if (array[i]) {
	        ret.push(array[i]);
	      }
	    }
	    return ret;
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/castInput: function castInput(value) {
	    return value;
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/tokenize: function tokenize(value) {
	    return value.split('');
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/join: function join(chars) {
	    return chars.join('');
	  }
	};

	function buildValues(diff, components, newString, oldString, useLongestToken) {
	  var componentPos = 0,
	      componentLen = components.length,
	      newPos = 0,
	      oldPos = 0;

	  for (; componentPos < componentLen; componentPos++) {
	    var component = components[componentPos];
	    if (!component.removed) {
	      if (!component.added && useLongestToken) {
	        var value = newString.slice(newPos, newPos + component.count);
	        value = value.map(function (value, i) {
	          var oldValue = oldString[oldPos + i];
	          return oldValue.length > value.length ? oldValue : value;
	        });

	        component.value = diff.join(value);
	      } else {
	        component.value = diff.join(newString.slice(newPos, newPos + component.count));
	      }
	      newPos += component.count;

	      // Common case
	      if (!component.added) {
	        oldPos += component.count;
	      }
	    } else {
	      component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
	      oldPos += component.count;

	      // Reverse add and remove so removes are output first to match common convention
	      // The diffing algorithm is tied to add then remove output and this is the simplest
	      // route to get the desired output with minimal overhead.
	      if (componentPos && components[componentPos - 1].added) {
	        var tmp = components[componentPos - 1];
	        components[componentPos - 1] = components[componentPos];
	        components[componentPos] = tmp;
	      }
	    }
	  }

	  // Special case handle for when one terminal is ignored (i.e. whitespace).
	  // For this case we merge the terminal into the prior string and drop the change.
	  // This is only available for string mode.
	  var lastComponent = components[componentLen - 1];
	  if (componentLen > 1 && typeof lastComponent.value === 'string' && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
	    components[componentLen - 2].value += lastComponent.value;
	    components.pop();
	  }

	  return components;
	}

	function clonePath(path) {
	  return { newPos: path.newPos, components: path.components.slice(0) };
	}



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.characterDiff = undefined;
	exports. /*istanbul ignore end*/diffChars = diffChars;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/var characterDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/characterDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	function diffChars(oldStr, newStr, options) {
	  return characterDiff.diff(oldStr, newStr, options);
	}



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.wordDiff = undefined;
	exports. /*istanbul ignore end*/diffWords = diffWords;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWordsWithSpace = diffWordsWithSpace;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	/*istanbul ignore end*/var /*istanbul ignore start*/_params = __webpack_require__(4) /*istanbul ignore end*/;

	/*istanbul ignore start*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/ // Based on https://en.wikipedia.org/wiki/Latin_script_in_Unicode
	//
	// Ranges and exceptions:
	// Latin-1 Supplement, 0080–00FF
	//  - U+00D7  × Multiplication sign
	//  - U+00F7  ÷ Division sign
	// Latin Extended-A, 0100–017F
	// Latin Extended-B, 0180–024F
	// IPA Extensions, 0250–02AF
	// Spacing Modifier Letters, 02B0–02FF
	//  - U+02C7  ˇ &#711;  Caron
	//  - U+02D8  ˘ &#728;  Breve
	//  - U+02D9  ˙ &#729;  Dot Above
	//  - U+02DA  ˚ &#730;  Ring Above
	//  - U+02DB  ˛ &#731;  Ogonek
	//  - U+02DC  ˜ &#732;  Small Tilde
	//  - U+02DD  ˝ &#733;  Double Acute Accent
	// Latin Extended Additional, 1E00–1EFF
	var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;

	var reWhitespace = /\S/;

	var wordDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/wordDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	wordDiff.equals = function (left, right) {
	  if (this.options.ignoreCase) {
	    left = left.toLowerCase();
	    right = right.toLowerCase();
	  }
	  return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
	};
	wordDiff.tokenize = function (value) {
	  var tokens = value.split(/(\s+|\b)/);

	  // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.
	  for (var i = 0; i < tokens.length - 1; i++) {
	    // If we have an empty string in the next field and we have only word chars before and after, merge
	    if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
	      tokens[i] += tokens[i + 2];
	      tokens.splice(i + 1, 2);
	      i--;
	    }
	  }

	  return tokens;
	};

	function diffWords(oldStr, newStr, options) {
	  options = /*istanbul ignore start*/(0, _params.generateOptions) /*istanbul ignore end*/(options, { ignoreWhitespace: true });
	  return wordDiff.diff(oldStr, newStr, options);
	}

	function diffWordsWithSpace(oldStr, newStr, options) {
	  return wordDiff.diff(oldStr, newStr, options);
	}



/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/generateOptions = generateOptions;
	function generateOptions(options, defaults) {
	  if (typeof options === 'function') {
	    defaults.callback = options;
	  } else if (options) {
	    for (var name in options) {
	      /* istanbul ignore else */
	      if (options.hasOwnProperty(name)) {
	        defaults[name] = options[name];
	      }
	    }
	  }
	  return defaults;
	}



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.lineDiff = undefined;
	exports. /*istanbul ignore end*/diffLines = diffLines;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffTrimmedLines = diffTrimmedLines;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	/*istanbul ignore end*/var /*istanbul ignore start*/_params = __webpack_require__(4) /*istanbul ignore end*/;

	/*istanbul ignore start*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/var lineDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/lineDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	lineDiff.tokenize = function (value) {
	  var retLines = [],
	      linesAndNewlines = value.split(/(\n|\r\n)/);

	  // Ignore the final empty token that occurs if the string ends with a new line
	  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
	    linesAndNewlines.pop();
	  }

	  // Merge the content and line separators into single tokens
	  for (var i = 0; i < linesAndNewlines.length; i++) {
	    var line = linesAndNewlines[i];

	    if (i % 2 && !this.options.newlineIsToken) {
	      retLines[retLines.length - 1] += line;
	    } else {
	      if (this.options.ignoreWhitespace) {
	        line = line.trim();
	      }
	      retLines.push(line);
	    }
	  }

	  return retLines;
	};

	function diffLines(oldStr, newStr, callback) {
	  return lineDiff.diff(oldStr, newStr, callback);
	}
	function diffTrimmedLines(oldStr, newStr, callback) {
	  var options = /*istanbul ignore start*/(0, _params.generateOptions) /*istanbul ignore end*/(callback, { ignoreWhitespace: true });
	  return lineDiff.diff(oldStr, newStr, options);
	}



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.sentenceDiff = undefined;
	exports. /*istanbul ignore end*/diffSentences = diffSentences;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/var sentenceDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/sentenceDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	sentenceDiff.tokenize = function (value) {
	  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
	};

	function diffSentences(oldStr, newStr, callback) {
	  return sentenceDiff.diff(oldStr, newStr, callback);
	}



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.cssDiff = undefined;
	exports. /*istanbul ignore end*/diffCss = diffCss;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/var cssDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/cssDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	cssDiff.tokenize = function (value) {
	  return value.split(/([{}:;,]|\s+)/);
	};

	function diffCss(oldStr, newStr, callback) {
	  return cssDiff.diff(oldStr, newStr, callback);
	}



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.jsonDiff = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports. /*istanbul ignore end*/diffJson = diffJson;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/canonicalize = canonicalize;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	/*istanbul ignore end*/var /*istanbul ignore start*/_line = __webpack_require__(5) /*istanbul ignore end*/;

	/*istanbul ignore start*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/var objectPrototypeToString = Object.prototype.toString;

	var jsonDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/jsonDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	// Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
	// dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:
	jsonDiff.useLongestToken = true;

	jsonDiff.tokenize = /*istanbul ignore start*/_line.lineDiff /*istanbul ignore end*/.tokenize;
	jsonDiff.castInput = function (value) {
	  /*istanbul ignore start*/var _options = /*istanbul ignore end*/this.options,
	      undefinedReplacement = _options.undefinedReplacement,
	      _options$stringifyRep = _options.stringifyReplacer,
	      stringifyReplacer = _options$stringifyRep === undefined ? function (k, v) /*istanbul ignore start*/{
	    return (/*istanbul ignore end*/typeof v === 'undefined' ? undefinedReplacement : v
	    );
	  } : _options$stringifyRep;


	  return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');
	};
	jsonDiff.equals = function (left, right) {
	  return (/*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'))
	  );
	};

	function diffJson(oldObj, newObj, options) {
	  return jsonDiff.diff(oldObj, newObj, options);
	}

	// This function handles the presence of circular references by bailing out when encountering an
	// object that is already on the "stack" of items being processed. Accepts an optional replacer
	function canonicalize(obj, stack, replacementStack, replacer, key) {
	  stack = stack || [];
	  replacementStack = replacementStack || [];

	  if (replacer) {
	    obj = replacer(key, obj);
	  }

	  var i = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;

	  for (i = 0; i < stack.length; i += 1) {
	    if (stack[i] === obj) {
	      return replacementStack[i];
	    }
	  }

	  var canonicalizedObj = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;

	  if ('[object Array]' === objectPrototypeToString.call(obj)) {
	    stack.push(obj);
	    canonicalizedObj = new Array(obj.length);
	    replacementStack.push(canonicalizedObj);
	    for (i = 0; i < obj.length; i += 1) {
	      canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
	    }
	    stack.pop();
	    replacementStack.pop();
	    return canonicalizedObj;
	  }

	  if (obj && obj.toJSON) {
	    obj = obj.toJSON();
	  }

	  if ( /*istanbul ignore start*/(typeof /*istanbul ignore end*/obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
	    stack.push(obj);
	    canonicalizedObj = {};
	    replacementStack.push(canonicalizedObj);
	    var sortedKeys = [],
	        _key = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
	    for (_key in obj) {
	      /* istanbul ignore else */
	      if (obj.hasOwnProperty(_key)) {
	        sortedKeys.push(_key);
	      }
	    }
	    sortedKeys.sort();
	    for (i = 0; i < sortedKeys.length; i += 1) {
	      _key = sortedKeys[i];
	      canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
	    }
	    stack.pop();
	    replacementStack.pop();
	  } else {
	    canonicalizedObj = obj;
	  }
	  return canonicalizedObj;
	}



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.arrayDiff = undefined;
	exports. /*istanbul ignore end*/diffArrays = diffArrays;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/var arrayDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/arrayDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	arrayDiff.tokenize = function (value) {
	  return value.slice();
	};
	arrayDiff.join = arrayDiff.removeEmpty = function (value) {
	  return value;
	};

	function diffArrays(oldArr, newArr, callback) {
	  return arrayDiff.diff(oldArr, newArr, callback);
	}



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/applyPatch = applyPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatches = applyPatches;

	var /*istanbul ignore start*/_parse = __webpack_require__(11) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_distanceIterator = __webpack_require__(12) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _distanceIterator2 = _interopRequireDefault(_distanceIterator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/function applyPatch(source, uniDiff) {
	  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  if (typeof uniDiff === 'string') {
	    uniDiff = /*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(uniDiff);
	  }

	  if (Array.isArray(uniDiff)) {
	    if (uniDiff.length > 1) {
	      throw new Error('applyPatch only works with a single input.');
	    }

	    uniDiff = uniDiff[0];
	  }

	  // Apply the diff to the input
	  var lines = source.split(/\r\n|[\n\v\f\r\x85]/),
	      delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [],
	      hunks = uniDiff.hunks,
	      compareLine = options.compareLine || function (lineNumber, line, operation, patchContent) /*istanbul ignore start*/{
	    return (/*istanbul ignore end*/line === patchContent
	    );
	  },
	      errorCount = 0,
	      fuzzFactor = options.fuzzFactor || 0,
	      minLine = 0,
	      offset = 0,
	      removeEOFNL = /*istanbul ignore start*/void 0 /*istanbul ignore end*/,
	      addEOFNL = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;

	  /**
	   * Checks if the hunk exactly fits on the provided location
	   */
	  function hunkFits(hunk, toPos) {
	    for (var j = 0; j < hunk.lines.length; j++) {
	      var line = hunk.lines[j],
	          operation = line.length > 0 ? line[0] : ' ',
	          content = line.length > 0 ? line.substr(1) : line;

	      if (operation === ' ' || operation === '-') {
	        // Context sanity check
	        if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
	          errorCount++;

	          if (errorCount > fuzzFactor) {
	            return false;
	          }
	        }
	        toPos++;
	      }
	    }

	    return true;
	  }

	  // Search best fit offsets for each hunk based on the previous ones
	  for (var i = 0; i < hunks.length; i++) {
	    var hunk = hunks[i],
	        maxLine = lines.length - hunk.oldLines,
	        localOffset = 0,
	        toPos = offset + hunk.oldStart - 1;

	    var iterator = /*istanbul ignore start*/(0, _distanceIterator2['default']) /*istanbul ignore end*/(toPos, minLine, maxLine);

	    for (; localOffset !== undefined; localOffset = iterator()) {
	      if (hunkFits(hunk, toPos + localOffset)) {
	        hunk.offset = offset += localOffset;
	        break;
	      }
	    }

	    if (localOffset === undefined) {
	      return false;
	    }

	    // Set lower text limit to end of the current hunk, so next ones don't try
	    // to fit over already patched text
	    minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
	  }

	  // Apply patch hunks
	  var diffOffset = 0;
	  for (var _i = 0; _i < hunks.length; _i++) {
	    var _hunk = hunks[_i],
	        _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;
	    diffOffset += _hunk.newLines - _hunk.oldLines;

	    if (_toPos < 0) {
	      // Creating a new file
	      _toPos = 0;
	    }

	    for (var j = 0; j < _hunk.lines.length; j++) {
	      var line = _hunk.lines[j],
	          operation = line.length > 0 ? line[0] : ' ',
	          content = line.length > 0 ? line.substr(1) : line,
	          delimiter = _hunk.linedelimiters[j];

	      if (operation === ' ') {
	        _toPos++;
	      } else if (operation === '-') {
	        lines.splice(_toPos, 1);
	        delimiters.splice(_toPos, 1);
	        /* istanbul ignore else */
	      } else if (operation === '+') {
	        lines.splice(_toPos, 0, content);
	        delimiters.splice(_toPos, 0, delimiter);
	        _toPos++;
	      } else if (operation === '\\') {
	        var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;
	        if (previousOperation === '+') {
	          removeEOFNL = true;
	        } else if (previousOperation === '-') {
	          addEOFNL = true;
	        }
	      }
	    }
	  }

	  // Handle EOFNL insertion/removal
	  if (removeEOFNL) {
	    while (!lines[lines.length - 1]) {
	      lines.pop();
	      delimiters.pop();
	    }
	  } else if (addEOFNL) {
	    lines.push('');
	    delimiters.push('\n');
	  }
	  for (var _k = 0; _k < lines.length - 1; _k++) {
	    lines[_k] = lines[_k] + delimiters[_k];
	  }
	  return lines.join('');
	}

	// Wrapper that supports multiple file patches via callbacks.
	function applyPatches(uniDiff, options) {
	  if (typeof uniDiff === 'string') {
	    uniDiff = /*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(uniDiff);
	  }

	  var currentIndex = 0;
	  function processIndex() {
	    var index = uniDiff[currentIndex++];
	    if (!index) {
	      return options.complete();
	    }

	    options.loadFile(index, function (err, data) {
	      if (err) {
	        return options.complete(err);
	      }

	      var updatedContent = applyPatch(data, index, options);
	      options.patched(index, updatedContent, function (err) {
	        if (err) {
	          return options.complete(err);
	        }

	        processIndex();
	      });
	    });
	  }
	  processIndex();
	}



/***/ }),
/* 11 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/parsePatch = parsePatch;
	function parsePatch(uniDiff) {
	  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/),
	      delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [],
	      list = [],
	      i = 0;

	  function parseIndex() {
	    var index = {};
	    list.push(index);

	    // Parse diff metadata
	    while (i < diffstr.length) {
	      var line = diffstr[i];

	      // File header found, end parsing diff metadata
	      if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
	        break;
	      }

	      // Diff index
	      var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);
	      if (header) {
	        index.index = header[1];
	      }

	      i++;
	    }

	    // Parse file headers if they are defined. Unified diff requires them, but
	    // there's no technical issues to have an isolated hunk without file header
	    parseFileHeader(index);
	    parseFileHeader(index);

	    // Parse hunks
	    index.hunks = [];

	    while (i < diffstr.length) {
	      var _line = diffstr[i];

	      if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
	        break;
	      } else if (/^@@/.test(_line)) {
	        index.hunks.push(parseHunk());
	      } else if (_line && options.strict) {
	        // Ignore unexpected content unless in strict mode
	        throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
	      } else {
	        i++;
	      }
	    }
	  }

	  // Parses the --- and +++ headers, if none are found, no lines
	  // are consumed.
	  function parseFileHeader(index) {
	    var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);
	    if (fileHeader) {
	      var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
	      var data = fileHeader[2].split('\t', 2);
	      var fileName = data[0].replace(/\\\\/g, '\\');
	      if (/^".*"$/.test(fileName)) {
	        fileName = fileName.substr(1, fileName.length - 2);
	      }
	      index[keyPrefix + 'FileName'] = fileName;
	      index[keyPrefix + 'Header'] = (data[1] || '').trim();

	      i++;
	    }
	  }

	  // Parses a hunk
	  // This assumes that we are at the start of a hunk.
	  function parseHunk() {
	    var chunkHeaderIndex = i,
	        chunkHeaderLine = diffstr[i++],
	        chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);

	    var hunk = {
	      oldStart: +chunkHeader[1],
	      oldLines: +chunkHeader[2] || 1,
	      newStart: +chunkHeader[3],
	      newLines: +chunkHeader[4] || 1,
	      lines: [],
	      linedelimiters: []
	    };

	    var addCount = 0,
	        removeCount = 0;
	    for (; i < diffstr.length; i++) {
	      // Lines starting with '---' could be mistaken for the "remove line" operation
	      // But they could be the header for the next file. Therefore prune such cases out.
	      if (diffstr[i].indexOf('--- ') === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf('+++ ') === 0 && diffstr[i + 2].indexOf('@@') === 0) {
	        break;
	      }
	      var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? ' ' : diffstr[i][0];

	      if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
	        hunk.lines.push(diffstr[i]);
	        hunk.linedelimiters.push(delimiters[i] || '\n');

	        if (operation === '+') {
	          addCount++;
	        } else if (operation === '-') {
	          removeCount++;
	        } else if (operation === ' ') {
	          addCount++;
	          removeCount++;
	        }
	      } else {
	        break;
	      }
	    }

	    // Handle the empty block count case
	    if (!addCount && hunk.newLines === 1) {
	      hunk.newLines = 0;
	    }
	    if (!removeCount && hunk.oldLines === 1) {
	      hunk.oldLines = 0;
	    }

	    // Perform optional sanity checking
	    if (options.strict) {
	      if (addCount !== hunk.newLines) {
	        throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
	      }
	      if (removeCount !== hunk.oldLines) {
	        throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
	      }
	    }

	    return hunk;
	  }

	  while (i < diffstr.length) {
	    parseIndex();
	  }

	  return list;
	}



/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/"use strict";

	exports.__esModule = true;

	exports["default"] = /*istanbul ignore end*/function (start, minLine, maxLine) {
	  var wantForward = true,
	      backwardExhausted = false,
	      forwardExhausted = false,
	      localOffset = 1;

	  return function iterator() {
	    if (wantForward && !forwardExhausted) {
	      if (backwardExhausted) {
	        localOffset++;
	      } else {
	        wantForward = false;
	      }

	      // Check if trying to fit beyond text length, and if not, check it fits
	      // after offset location (or desired location on first iteration)
	      if (start + localOffset <= maxLine) {
	        return localOffset;
	      }

	      forwardExhausted = true;
	    }

	    if (!backwardExhausted) {
	      if (!forwardExhausted) {
	        wantForward = true;
	      }

	      // Check if trying to fit before text beginning, and if not, check it fits
	      // before offset location
	      if (minLine <= start - localOffset) {
	        return -localOffset++;
	      }

	      backwardExhausted = true;
	      return iterator();
	    }

	    // We tried to fit hunk before text beginning and beyond text length, then
	    // hunk can't fit on the text. Return undefined
	  };
	};



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/calcLineCount = calcLineCount;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/merge = merge;

	var /*istanbul ignore start*/_create = __webpack_require__(14) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_parse = __webpack_require__(11) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_array = __webpack_require__(15) /*istanbul ignore end*/;

	/*istanbul ignore start*/function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/*istanbul ignore end*/function calcLineCount(hunk) {
	  /*istanbul ignore start*/var _calcOldNewLineCount = /*istanbul ignore end*/calcOldNewLineCount(hunk.lines),
	      oldLines = _calcOldNewLineCount.oldLines,
	      newLines = _calcOldNewLineCount.newLines;

	  if (oldLines !== undefined) {
	    hunk.oldLines = oldLines;
	  } else {
	    delete hunk.oldLines;
	  }

	  if (newLines !== undefined) {
	    hunk.newLines = newLines;
	  } else {
	    delete hunk.newLines;
	  }
	}

	function merge(mine, theirs, base) {
	  mine = loadPatch(mine, base);
	  theirs = loadPatch(theirs, base);

	  var ret = {};

	  // For index we just let it pass through as it doesn't have any necessary meaning.
	  // Leaving sanity checks on this to the API consumer that may know more about the
	  // meaning in their own context.
	  if (mine.index || theirs.index) {
	    ret.index = mine.index || theirs.index;
	  }

	  if (mine.newFileName || theirs.newFileName) {
	    if (!fileNameChanged(mine)) {
	      // No header or no change in ours, use theirs (and ours if theirs does not exist)
	      ret.oldFileName = theirs.oldFileName || mine.oldFileName;
	      ret.newFileName = theirs.newFileName || mine.newFileName;
	      ret.oldHeader = theirs.oldHeader || mine.oldHeader;
	      ret.newHeader = theirs.newHeader || mine.newHeader;
	    } else if (!fileNameChanged(theirs)) {
	      // No header or no change in theirs, use ours
	      ret.oldFileName = mine.oldFileName;
	      ret.newFileName = mine.newFileName;
	      ret.oldHeader = mine.oldHeader;
	      ret.newHeader = mine.newHeader;
	    } else {
	      // Both changed... figure it out
	      ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
	      ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
	      ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
	      ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
	    }
	  }

	  ret.hunks = [];

	  var mineIndex = 0,
	      theirsIndex = 0,
	      mineOffset = 0,
	      theirsOffset = 0;

	  while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
	    var mineCurrent = mine.hunks[mineIndex] || { oldStart: Infinity },
	        theirsCurrent = theirs.hunks[theirsIndex] || { oldStart: Infinity };

	    if (hunkBefore(mineCurrent, theirsCurrent)) {
	      // This patch does not overlap with any of the others, yay.
	      ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
	      mineIndex++;
	      theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
	    } else if (hunkBefore(theirsCurrent, mineCurrent)) {
	      // This patch does not overlap with any of the others, yay.
	      ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
	      theirsIndex++;
	      mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
	    } else {
	      // Overlap, merge as best we can
	      var mergedHunk = {
	        oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
	        oldLines: 0,
	        newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
	        newLines: 0,
	        lines: []
	      };
	      mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
	      theirsIndex++;
	      mineIndex++;

	      ret.hunks.push(mergedHunk);
	    }
	  }

	  return ret;
	}

	function loadPatch(param, base) {
	  if (typeof param === 'string') {
	    if (/^@@/m.test(param) || /^Index:/m.test(param)) {
	      return (/*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(param)[0]
	      );
	    }

	    if (!base) {
	      throw new Error('Must provide a base reference or pass in a patch');
	    }
	    return (/*istanbul ignore start*/(0, _create.structuredPatch) /*istanbul ignore end*/(undefined, undefined, base, param)
	    );
	  }

	  return param;
	}

	function fileNameChanged(patch) {
	  return patch.newFileName && patch.newFileName !== patch.oldFileName;
	}

	function selectField(index, mine, theirs) {
	  if (mine === theirs) {
	    return mine;
	  } else {
	    index.conflict = true;
	    return { mine: mine, theirs: theirs };
	  }
	}

	function hunkBefore(test, check) {
	  return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
	}

	function cloneHunk(hunk, offset) {
	  return {
	    oldStart: hunk.oldStart, oldLines: hunk.oldLines,
	    newStart: hunk.newStart + offset, newLines: hunk.newLines,
	    lines: hunk.lines
	  };
	}

	function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
	  // This will generally result in a conflicted hunk, but there are cases where the context
	  // is the only overlap where we can successfully merge the content here.
	  var mine = { offset: mineOffset, lines: mineLines, index: 0 },
	      their = { offset: theirOffset, lines: theirLines, index: 0 };

	  // Handle any leading content
	  insertLeading(hunk, mine, their);
	  insertLeading(hunk, their, mine);

	  // Now in the overlap content. Scan through and select the best changes from each.
	  while (mine.index < mine.lines.length && their.index < their.lines.length) {
	    var mineCurrent = mine.lines[mine.index],
	        theirCurrent = their.lines[their.index];

	    if ((mineCurrent[0] === '-' || mineCurrent[0] === '+') && (theirCurrent[0] === '-' || theirCurrent[0] === '+')) {
	      // Both modified ...
	      mutualChange(hunk, mine, their);
	    } else if (mineCurrent[0] === '+' && theirCurrent[0] === ' ') {
	      /*istanbul ignore start*/var _hunk$lines;

	      /*istanbul ignore end*/ // Mine inserted
	      /*istanbul ignore start*/(_hunk$lines = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/collectChange(mine)));
	    } else if (theirCurrent[0] === '+' && mineCurrent[0] === ' ') {
	      /*istanbul ignore start*/var _hunk$lines2;

	      /*istanbul ignore end*/ // Theirs inserted
	      /*istanbul ignore start*/(_hunk$lines2 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines2 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/collectChange(their)));
	    } else if (mineCurrent[0] === '-' && theirCurrent[0] === ' ') {
	      // Mine removed or edited
	      removal(hunk, mine, their);
	    } else if (theirCurrent[0] === '-' && mineCurrent[0] === ' ') {
	      // Their removed or edited
	      removal(hunk, their, mine, true);
	    } else if (mineCurrent === theirCurrent) {
	      // Context identity
	      hunk.lines.push(mineCurrent);
	      mine.index++;
	      their.index++;
	    } else {
	      // Context mismatch
	      conflict(hunk, collectChange(mine), collectChange(their));
	    }
	  }

	  // Now push anything that may be remaining
	  insertTrailing(hunk, mine);
	  insertTrailing(hunk, their);

	  calcLineCount(hunk);
	}

	function mutualChange(hunk, mine, their) {
	  var myChanges = collectChange(mine),
	      theirChanges = collectChange(their);

	  if (allRemoves(myChanges) && allRemoves(theirChanges)) {
	    // Special case for remove changes that are supersets of one another
	    if ( /*istanbul ignore start*/(0, _array.arrayStartsWith) /*istanbul ignore end*/(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {
	      /*istanbul ignore start*/var _hunk$lines3;

	      /*istanbul ignore end*/ /*istanbul ignore start*/(_hunk$lines3 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines3 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/myChanges));
	      return;
	    } else if ( /*istanbul ignore start*/(0, _array.arrayStartsWith) /*istanbul ignore end*/(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {
	      /*istanbul ignore start*/var _hunk$lines4;

	      /*istanbul ignore end*/ /*istanbul ignore start*/(_hunk$lines4 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines4 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/theirChanges));
	      return;
	    }
	  } else if ( /*istanbul ignore start*/(0, _array.arrayEqual) /*istanbul ignore end*/(myChanges, theirChanges)) {
	    /*istanbul ignore start*/var _hunk$lines5;

	    /*istanbul ignore end*/ /*istanbul ignore start*/(_hunk$lines5 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines5 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/myChanges));
	    return;
	  }

	  conflict(hunk, myChanges, theirChanges);
	}

	function removal(hunk, mine, their, swap) {
	  var myChanges = collectChange(mine),
	      theirChanges = collectContext(their, myChanges);
	  if (theirChanges.merged) {
	    /*istanbul ignore start*/var _hunk$lines6;

	    /*istanbul ignore end*/ /*istanbul ignore start*/(_hunk$lines6 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines6 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/theirChanges.merged));
	  } else {
	    conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
	  }
	}

	function conflict(hunk, mine, their) {
	  hunk.conflict = true;
	  hunk.lines.push({
	    conflict: true,
	    mine: mine,
	    theirs: their
	  });
	}

	function insertLeading(hunk, insert, their) {
	  while (insert.offset < their.offset && insert.index < insert.lines.length) {
	    var line = insert.lines[insert.index++];
	    hunk.lines.push(line);
	    insert.offset++;
	  }
	}
	function insertTrailing(hunk, insert) {
	  while (insert.index < insert.lines.length) {
	    var line = insert.lines[insert.index++];
	    hunk.lines.push(line);
	  }
	}

	function collectChange(state) {
	  var ret = [],
	      operation = state.lines[state.index][0];
	  while (state.index < state.lines.length) {
	    var line = state.lines[state.index];

	    // Group additions that are immediately after subtractions and treat them as one "atomic" modify change.
	    if (operation === '-' && line[0] === '+') {
	      operation = '+';
	    }

	    if (operation === line[0]) {
	      ret.push(line);
	      state.index++;
	    } else {
	      break;
	    }
	  }

	  return ret;
	}
	function collectContext(state, matchChanges) {
	  var changes = [],
	      merged = [],
	      matchIndex = 0,
	      contextChanges = false,
	      conflicted = false;
	  while (matchIndex < matchChanges.length && state.index < state.lines.length) {
	    var change = state.lines[state.index],
	        match = matchChanges[matchIndex];

	    // Once we've hit our add, then we are done
	    if (match[0] === '+') {
	      break;
	    }

	    contextChanges = contextChanges || change[0] !== ' ';

	    merged.push(match);
	    matchIndex++;

	    // Consume any additions in the other block as a conflict to attempt
	    // to pull in the remaining context after this
	    if (change[0] === '+') {
	      conflicted = true;

	      while (change[0] === '+') {
	        changes.push(change);
	        change = state.lines[++state.index];
	      }
	    }

	    if (match.substr(1) === change.substr(1)) {
	      changes.push(change);
	      state.index++;
	    } else {
	      conflicted = true;
	    }
	  }

	  if ((matchChanges[matchIndex] || '')[0] === '+' && contextChanges) {
	    conflicted = true;
	  }

	  if (conflicted) {
	    return changes;
	  }

	  while (matchIndex < matchChanges.length) {
	    merged.push(matchChanges[matchIndex++]);
	  }

	  return {
	    merged: merged,
	    changes: changes
	  };
	}

	function allRemoves(changes) {
	  return changes.reduce(function (prev, change) {
	    return prev && change[0] === '-';
	  }, true);
	}
	function skipRemoveSuperset(state, removeChanges, delta) {
	  for (var i = 0; i < delta; i++) {
	    var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);
	    if (state.lines[state.index + i] !== ' ' + changeContent) {
	      return false;
	    }
	  }

	  state.index += delta;
	  return true;
	}

	function calcOldNewLineCount(lines) {
	  var oldLines = 0;
	  var newLines = 0;

	  lines.forEach(function (line) {
	    if (typeof line !== 'string') {
	      var myCount = calcOldNewLineCount(line.mine);
	      var theirCount = calcOldNewLineCount(line.theirs);

	      if (oldLines !== undefined) {
	        if (myCount.oldLines === theirCount.oldLines) {
	          oldLines += myCount.oldLines;
	        } else {
	          oldLines = undefined;
	        }
	      }

	      if (newLines !== undefined) {
	        if (myCount.newLines === theirCount.newLines) {
	          newLines += myCount.newLines;
	        } else {
	          newLines = undefined;
	        }
	      }
	    } else {
	      if (newLines !== undefined && (line[0] === '+' || line[0] === ' ')) {
	        newLines++;
	      }
	      if (oldLines !== undefined && (line[0] === '-' || line[0] === ' ')) {
	        oldLines++;
	      }
	    }
	  });

	  return { oldLines: oldLines, newLines: newLines };
	}



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/structuredPatch = structuredPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/createTwoFilesPatch = createTwoFilesPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/createPatch = createPatch;

	var /*istanbul ignore start*/_line = __webpack_require__(5) /*istanbul ignore end*/;

	/*istanbul ignore start*/function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/*istanbul ignore end*/function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
	  if (!options) {
	    options = {};
	  }
	  if (typeof options.context === 'undefined') {
	    options.context = 4;
	  }

	  var diff = /*istanbul ignore start*/(0, _line.diffLines) /*istanbul ignore end*/(oldStr, newStr, options);
	  diff.push({ value: '', lines: [] }); // Append an empty value to make cleanup easier

	  function contextLines(lines) {
	    return lines.map(function (entry) {
	      return ' ' + entry;
	    });
	  }

	  var hunks = [];
	  var oldRangeStart = 0,
	      newRangeStart = 0,
	      curRange = [],
	      oldLine = 1,
	      newLine = 1;

	  /*istanbul ignore start*/var _loop = function _loop( /*istanbul ignore end*/i) {
	    var current = diff[i],
	        lines = current.lines || current.value.replace(/\n$/, '').split('\n');
	    current.lines = lines;

	    if (current.added || current.removed) {
	      /*istanbul ignore start*/var _curRange;

	      /*istanbul ignore end*/ // If we have previous context, start with that
	      if (!oldRangeStart) {
	        var prev = diff[i - 1];
	        oldRangeStart = oldLine;
	        newRangeStart = newLine;

	        if (prev) {
	          curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
	          oldRangeStart -= curRange.length;
	          newRangeStart -= curRange.length;
	        }
	      }

	      // Output our changes
	      /*istanbul ignore start*/(_curRange = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/lines.map(function (entry) {
	        return (current.added ? '+' : '-') + entry;
	      })));

	      // Track the updated file position
	      if (current.added) {
	        newLine += lines.length;
	      } else {
	        oldLine += lines.length;
	      }
	    } else {
	      // Identical context lines. Track line changes
	      if (oldRangeStart) {
	        // Close out any changes that have been output (or join overlapping)
	        if (lines.length <= options.context * 2 && i < diff.length - 2) {
	          /*istanbul ignore start*/var _curRange2;

	          /*istanbul ignore end*/ // Overlapping
	          /*istanbul ignore start*/(_curRange2 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange2 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines)));
	        } else {
	          /*istanbul ignore start*/var _curRange3;

	          /*istanbul ignore end*/ // end the range and output
	          var contextSize = Math.min(lines.length, options.context);
	          /*istanbul ignore start*/(_curRange3 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange3 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines.slice(0, contextSize))));

	          var hunk = {
	            oldStart: oldRangeStart,
	            oldLines: oldLine - oldRangeStart + contextSize,
	            newStart: newRangeStart,
	            newLines: newLine - newRangeStart + contextSize,
	            lines: curRange
	          };
	          if (i >= diff.length - 2 && lines.length <= options.context) {
	            // EOF is inside this hunk
	            var oldEOFNewline = /\n$/.test(oldStr);
	            var newEOFNewline = /\n$/.test(newStr);
	            if (lines.length == 0 && !oldEOFNewline) {
	              // special case: old has no eol and no trailing context; no-nl can end up before adds
	              curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
	            } else if (!oldEOFNewline || !newEOFNewline) {
	              curRange.push('\\ No newline at end of file');
	            }
	          }
	          hunks.push(hunk);

	          oldRangeStart = 0;
	          newRangeStart = 0;
	          curRange = [];
	        }
	      }
	      oldLine += lines.length;
	      newLine += lines.length;
	    }
	  };

	  for (var i = 0; i < diff.length; i++) {
	    /*istanbul ignore start*/_loop( /*istanbul ignore end*/i);
	  }

	  return {
	    oldFileName: oldFileName, newFileName: newFileName,
	    oldHeader: oldHeader, newHeader: newHeader,
	    hunks: hunks
	  };
	}

	function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
	  var diff = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);

	  var ret = [];
	  if (oldFileName == newFileName) {
	    ret.push('Index: ' + oldFileName);
	  }
	  ret.push('===================================================================');
	  ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
	  ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

	  for (var i = 0; i < diff.hunks.length; i++) {
	    var hunk = diff.hunks[i];
	    ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
	    ret.push.apply(ret, hunk.lines);
	  }

	  return ret.join('\n') + '\n';
	}

	function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
	  return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
	}



/***/ }),
/* 15 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/"use strict";

	exports.__esModule = true;
	exports. /*istanbul ignore end*/arrayEqual = arrayEqual;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/arrayStartsWith = arrayStartsWith;
	function arrayEqual(a, b) {
	  if (a.length !== b.length) {
	    return false;
	  }

	  return arrayStartsWith(a, b);
	}

	function arrayStartsWith(array, start) {
	  if (start.length > array.length) {
	    return false;
	  }

	  for (var i = 0; i < start.length; i++) {
	    if (start[i] !== array[i]) {
	      return false;
	    }
	  }

	  return true;
	}



/***/ }),
/* 16 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/"use strict";

	exports.__esModule = true;
	exports. /*istanbul ignore end*/convertChangesToDMP = convertChangesToDMP;
	// See: http://code.google.com/p/google-diff-match-patch/wiki/API
	function convertChangesToDMP(changes) {
	  var ret = [],
	      change = /*istanbul ignore start*/void 0 /*istanbul ignore end*/,
	      operation = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
	  for (var i = 0; i < changes.length; i++) {
	    change = changes[i];
	    if (change.added) {
	      operation = 1;
	    } else if (change.removed) {
	      operation = -1;
	    } else {
	      operation = 0;
	    }

	    ret.push([operation, change.value]);
	  }
	  return ret;
	}



/***/ }),
/* 17 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/convertChangesToXML = convertChangesToXML;
	function convertChangesToXML(changes) {
	  var ret = [];
	  for (var i = 0; i < changes.length; i++) {
	    var change = changes[i];
	    if (change.added) {
	      ret.push('<ins>');
	    } else if (change.removed) {
	      ret.push('<del>');
	    }

	    ret.push(escapeHTML(change.value));

	    if (change.added) {
	      ret.push('</ins>');
	    } else if (change.removed) {
	      ret.push('</del>');
	    }
	  }
	  return ret.join('');
	}

	function escapeHTML(s) {
	  var n = s;
	  n = n.replace(/&/g, '&amp;');
	  n = n.replace(/</g, '&lt;');
	  n = n.replace(/>/g, '&gt;');
	  n = n.replace(/"/g, '&quot;');

	  return n;
	}



/***/ })
/******/ ])
});
;
},{}],85:[function(require,module,exports){
"use strict";
//--------------------------------------
//  Shallow update
//--------------------------------------
exports.__esModule = true;
/** Performs a shallow update of an object using a partial object of the same shape. A new object is returned. */
function update(host, spec) {
    var result = clone(host);
    for (var key in spec) {
        var specValue = spec[key];
        if (specValue === exports.DELETE) {
            delete result[key];
        }
        else {
            result[key] = specValue;
        }
    }
    return result;
}
exports.update = update;
// We lie about the public type so that only a property that is optional or that can be assigned to undefined can be DELETE'd
/** Marker used to delete a key */
exports.DELETE = {};
var _Updater = /** @class */ (function () {
    function _Updater(data) {
        this.data = data;
    }
    _Updater.prototype.at = function (keyOrIndex) {
        return new _Updater({ type: 'at', parent: this, field: keyOrIndex });
    };
    _Updater.prototype.set = function (value) {
        var _this = this;
        var doSet = function (target) {
            var result = _this.cloneForUpdate(target);
            if (result.name === 'aborted')
                return target;
            var clonedTarget = result.clonedTarget, leafHost = result.leafHost, field = result.field;
            value === exports.DELETE ? delete leafHost[field] : leafHost[field] = value;
            return clonedTarget;
        };
        var boundTarget = this.findBoundTarget();
        return boundTarget
            ? doSet(boundTarget)
            : doSet;
    };
    _Updater.prototype.modify = function (modifier) {
        var _this = this;
        var doModify = function (target) {
            var result = _this.cloneForUpdate(target);
            if (result.name === 'aborted')
                return target;
            var clonedTarget = result.clonedTarget, leafHost = result.leafHost, field = result.field;
            var value = modifier(leafHost[field]);
            value === exports.DELETE ? delete leafHost[field] : leafHost[field] = value;
            return clonedTarget;
        };
        var boundTarget = this.findBoundTarget();
        return boundTarget
            ? doModify(boundTarget)
            : doModify;
    };
    _Updater.prototype.withDefault = function (value) {
        return new _Updater({ type: 'withDefault', parent: this, defaultValue: value });
    };
    _Updater.prototype.abortIfUndef = function () {
        return new _Updater({ type: 'abortIfUndef', parent: this });
    };
    _Updater.prototype.findBoundTarget = function () {
        var current = this;
        while (true) {
            if (current.data.type === 'root')
                return current.data.boundTarget;
            current = current.data.parent;
        }
    };
    _Updater.prototype.parentUpdaters = function () {
        var updaters = [this];
        var parentUpdater = this.data.parent;
        // Ignore the root updater
        while (parentUpdater && parentUpdater.data.parent) {
            updaters.unshift(parentUpdater);
            parentUpdater = parentUpdater.data.parent;
        }
        return updaters;
    };
    _Updater.prototype.getNextValue = function (previousHost, host, field, isLast) {
        if (this.data.type === 'at') {
            var newField = this.data.field;
            var value_1 = host[newField];
            var nextValue = isObjectOrArray(value_1) ? clone(value_1) : value_1;
            var newHost_1 = isLast ? host : nextValue;
            host[this.data.field] = nextValue;
            return { host: newHost_1, field: newField };
        }
        var value = previousHost[field];
        if (this.data.type === 'abortIfUndef' && value === undefined) {
            return { host: host, field: field, aborted: true };
        }
        if (this.data.type === 'withDefault' && value === undefined) {
            var nextValue = this.data.defaultValue;
            var newHost_2 = isLast ? previousHost : nextValue;
            previousHost[field] = nextValue;
            return { host: newHost_2, field: field };
        }
        var newHost = isLast ? previousHost : host;
        return { host: newHost, field: field };
    };
    _Updater.prototype.cloneForUpdate = function (target) {
        var updaters = this.parentUpdaters();
        var obj = clone(target);
        var previousHost = obj;
        var host = obj;
        var field = '';
        for (var i = 0; i < updaters.length; i++) {
            var result = updaters[i].getNextValue(previousHost, host, field, i === updaters.length - 1);
            if (result.aborted)
                return { name: 'aborted' };
            previousHost = host;
            host = result.host;
            field = result.field;
        }
        return {
            name: 'result',
            clonedTarget: obj,
            leafHost: host,
            field: field
        };
    };
    return _Updater;
}());
function isObjectOrArray(obj) {
    return obj !== null && typeof obj === 'object';
}
function clone(obj) {
    if (Array.isArray(obj))
        return obj.slice();
    var cloned = {};
    Object.keys(obj).forEach(function (key) { cloned[key] = obj[key]; });
    return cloned;
}
function deepUpdate(target) {
    return new _Updater({ type: 'root', boundTarget: target });
}
exports.deepUpdate = deepUpdate;

},{}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharUtil;
(function (CharUtil) {
    class CharStream {
        constructor(s, startpos, endpos, hasEOF) {
            this.hasEOF = true;
            this.input = s;
            if (hasEOF != undefined) {
                this.hasEOF = hasEOF;
            }
            if (startpos == undefined) {
                this.startpos = 0; // not specified; set default
            }
            else if (startpos > s.length) {
                this.startpos = s.length; // seek too far; set EOF
            }
            else {
                this.startpos = startpos; // specified and in bounds
            }
            if (endpos == undefined) {
                this.endpos = s.length; // not specified; set default
            }
            else if (endpos > s.length) {
                this.endpos = s.length; // seek too far; set EOF
            }
            else {
                this.endpos = endpos; // specified and in bounds
            }
            if (this.startpos > this.endpos) {
                this.startpos = this.endpos; // if the user flipped positions
            }
        }
        /**
         * Returns true of the end of the input has been reached.
         */
        isEOF() {
            return this.hasEOF && this.startpos == this.input.length;
        }
        /**
         * Returns a Javscript primitive string of the slice of input
         * represented by this CharStream.
         */
        toString() {
            return this.input.substring(this.startpos, this.endpos);
        }
        /**
         * Returns a new CharStream representing the input from the
         * current start position to an end position num chars from
         * the current start position.  If startpos + num > endpos,
         * the current CharStream is returned.
         * @param num
         */
        peek(num) {
            if (this.startpos + num > this.endpos) {
                return this;
            }
            else {
                let newHasEOF = this.startpos + num == this.endpos && this.hasEOF;
                return new CharStream(this.input, this.startpos, this.startpos + num, newHasEOF);
            }
        }
        /**
         * Returns a new CharStream representing the string after
         * seeking num characters from the current position.
         * @param num
         */
        seek(num) {
            if (this.startpos + num > this.endpos) {
                return new CharStream(this.input, this.endpos, this.endpos, this.hasEOF);
            }
            else {
                return new CharStream(this.input, this.startpos + num, this.endpos, this.hasEOF);
            }
        }
        /**
         * Returns a new CharStream representing the head of the input at
         * the current position.  Throws an exception if the CharStream is
         * empty.
         */
        head() {
            if (!this.isEmpty()) {
                const newHasEOF = this.startpos + 1 == this.endpos && this.hasEOF;
                return new CharStream(this.input, this.startpos, this.startpos + 1, newHasEOF);
            }
            else {
                throw new Error("Cannot get the head of an empty string.");
            }
        }
        /**
         * Returns a new CharStream representing the tail of the input at
         * the current position.  Throws an exception if the CharStream is
         * empty.
         */
        tail() {
            if (!this.isEmpty()) {
                return new CharStream(this.input, this.startpos + 1, this.endpos, this.hasEOF);
            }
            else {
                throw new Error("Cannot get the tail of an empty string.");
            }
        }
        /**
         * Returns true if the input at the current position is empty. Note
         * that a CharStream at the end of the input contains an empty
         * string but that an empty string may not be the end-of-file (i.e.,
         * isEOF is false).
         */
        isEmpty() {
            return this.startpos == this.endpos;
        }
        /**
         * Returns the number of characters remaining at
         * the current position.
         */
        length() {
            return this.endpos - this.startpos;
        }
        /**
         * Returns the substring between start and end at the
         * current position.
         * @param start the start index of the substring, inclusive
         * @param end the end index of the substring, exclusive
         */
        substring(start, end) {
            const start2 = this.startpos + start;
            const end2 = this.startpos + end;
            const newHasEOF = this.endpos == end2 && this.hasEOF;
            return new CharStream(this.input, start2, end2, newHasEOF);
        }
        /**
         * Returns the concatenation of the current CharStream with
         * the given CharStream. Note: returned object does not
         * reuse original input string, and startpos and endpos
         * are reset. If the given CharStream contains EOF, the
         * concatenated CharStream will also contain EOF.
         * @param cs the CharStream to concat to this CharStream
         */
        concat(cs) {
            const s = this.toString() + cs.toString();
            return new CharStream(s, 0, s.length, cs.hasEOF);
        }
        /**
         * Concatenate an array of CharStream objects into a single
         * CharStream object.
         * @param css a CharStream[]
         */
        static concat(css) {
            if (css.length == 0) {
                return new CharStream("", 0, 0, false);
            }
            else {
                let cs = css[0];
                for (let i = 1; i < css.length; i++) {
                    cs = cs.concat(css[i]);
                }
                return cs;
            }
        }
    }
    CharUtil.CharStream = CharStream;
})(CharUtil = exports.CharUtil || (exports.CharUtil = {}));

},{}],87:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var primitives_1 = require("./primitives");
exports.Primitives = primitives_1.Primitives;
var charstream_1 = require("./charstream");
exports.CharUtil = charstream_1.CharUtil;

},{"./charstream":86,"./primitives":88}],88:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const charstream_1 = require("./charstream");
var Primitives;
(function (Primitives) {
    class EOFMark {
        constructor() { }
        static get Instance() {
            return this._instance || (this._instance = new this());
        }
    }
    Primitives.EOFMark = EOFMark;
    Primitives.EOF = EOFMark.Instance;
    /**
     * Represents a successful parse.
     */
    class Success {
        /**
         * Returns an object representing a successful parse.
         * @param istream The remaining string.
         * @param res The result of the parse
         */
        constructor(istream, res) {
            this.tag = "success";
            this.inputstream = istream;
            this.result = res;
        }
    }
    Primitives.Success = Success;
    /**
     * Represents a failed parse.
     */
    class Failure {
        /**
         * Returns an object representing a failed parse.
         * @param istream The string, unmodified, that was given to the parser.
         */
        constructor(istream) {
            this.tag = "failure";
            this.inputstream = istream;
        }
    }
    Primitives.Failure = Failure;
    /**
     * result succeeds without consuming any input, and returns v.
     * @param v The result of the parse.
     */
    function result(v) {
        return (istream) => new Success(istream, v);
    }
    Primitives.result = result;
    /**
     * zero fails without consuming any input.
     */
    function zero() {
        return (istream) => new Failure(istream);
    }
    Primitives.zero = zero;
    /**
     * item successfully consumes the first character if the input
     * string is non-empty, otherwise it fails.
     */
    function item() {
        return (istream) => {
            if (istream.isEmpty()) {
                return new Failure(istream);
            }
            else {
                return new Success(istream.tail(), istream.head());
            }
        };
    }
    Primitives.item = item;
    /**
     * bind is a curried function that takes a parser p and returns
     * a function that takes a parser f which returns the composition
     * of p and f.  If _any_ of the parsers fail, the original inputstream
     * is returned in the Failure object (i.e., bind backtracks).
     * @param p A parser
     */
    function bind(p) {
        return (f) => {
            return (istream) => {
                let r = p(istream);
                switch (r.tag) {
                    case "success":
                        let o = f(r.result)(r.inputstream);
                        switch (o.tag) {
                            case "success": return o;
                            case "failure":
                                // note: backtracks, returning original istream
                                return new Failure(istream);
                        }
                    case "failure": return new Failure(istream);
                }
            };
        };
    }
    Primitives.bind = bind;
    function delay(p) {
        return () => p;
    }
    Primitives.delay = delay;
    /**
     * seq is a curried function that takes a parser p, a parser q,
     * and a function f. It applies p to the input, passing the
     * remaining input stream to q; q is then applied.  The function
     * f takes the result of p and q, as a tuple, and returns
     * a single result.
     * @param p A parser
     */
    // export let seq = function<T,U,V>(p: IParser<T>) {
    //     return (q: IParser<U>) => {
    //         return (f: (e: [T,U]) => V) => {
    //             return bind<T,V>(p)((x) => {
    //                 return bind<U,V>(q)((y) => {
    //                     let tup : [T,U] = [x,y];
    //                     return result<V>(f(tup));
    //                 });
    //             });
    //         }
    //     };
    // }
    function seq(p) {
        return (q) => {
            return (f) => {
                return bind(p)((x) => {
                    return bind(q)((y) => {
                        let tup = [x, y];
                        return result(f(tup));
                    });
                });
            };
        };
    }
    Primitives.seq = seq;
    /**
     * sat takes a predicate and yields a parser that consumes a
     * single character if the character satisfies the predicate,
     * otherwise it fails.
     * @param pred a character predicate
     */
    function sat(pred) {
        let pred2 = (cs) => pred(cs.toString());
        let a = item();
        let b = (x) => {
            if (pred2(x)) {
                return result(x);
            }
            else {
                return zero();
            }
        };
        return bind(a)(b);
    }
    Primitives.sat = sat;
    /**
     * char takes a character and yields a parser that consume
     * that character. The returned parser succeeds if the next
     * character in the input stream is c, otherwise it fails.
     * @param c
     */
    function char(c) {
        if (c.length != 1) {
            throw new Error("char parser takes a string of length 1 (i.e., a char)");
        }
        return sat(x => x == c);
    }
    Primitives.char = char;
    /**
     * letter returns a parser that consumes a single alphabetic
     * character, from a-z, regardless of case.
     */
    function letter() {
        let contains_letter = (x) => {
            let a_letter = /[A-Za-z]/;
            return x.match(a_letter) != undefined;
        };
        return sat(contains_letter);
    }
    Primitives.letter = letter;
    /**
     * digit returns a parser that consumes a single numeric
     * character, from 0-9.  Note that the type of the result
     * is a string, not a number.
     */
    function digit() {
        return sat(x => x == "0"
            || x == "1"
            || x == "2"
            || x == "3"
            || x == "4"
            || x == "5"
            || x == "6"
            || x == "7"
            || x == "8"
            || x == "9");
    }
    Primitives.digit = digit;
    /**
     * upper returns a parser that consumes a single character
     * if that character is uppercase.
     */
    function upper() {
        return (istream) => {
            let o1 = letter()(istream);
            switch (o1.tag) {
                case "success":
                    let o2 = sat(x => x == x.toUpperCase())(o1.result);
                    switch (o2.tag) {
                        case "success":
                            return o1;
                        case "failure":
                            return new Failure(istream);
                    }
                    break;
                case "failure":
                    return o1;
            }
            throw new Error("never happens");
        };
    }
    Primitives.upper = upper;
    /**
     * lower returns a parser that consumes a single character
     * if that character is lowercase.
     */
    function lower() {
        return (istream) => {
            let o1 = letter()(istream);
            switch (o1.tag) {
                case "success":
                    let o2 = sat(x => x == x.toLowerCase())(o1.result);
                    switch (o2.tag) {
                        case "success":
                            return o1;
                        case "failure":
                            return new Failure(istream);
                    }
                    break;
                case "failure":
                    return o1;
            }
            throw new Error("never happens");
        };
    }
    Primitives.lower = lower;
    /**
     * choice specifies an ordered choice between two parsers,
     * p1 and p2. The returned parser will first apply
     * parser p1.  If p1 succeeds, p1's Outcome is returned.
     * If p1 fails, p2 is applied and the Outcome of p2 is returned.
     * Note that the input stream given to p1 and p2 is exactly
     * the same input stream.
     * @param p1 A parser.
     */
    function choice(p1) {
        return (p2) => {
            return (istream) => {
                let o = p1(istream);
                switch (o.tag) {
                    case "success":
                        return o;
                    case "failure":
                        return p2(istream);
                }
            };
        };
    }
    Primitives.choice = choice;
    /**
     * appfun allows the user to apply a function f to
     * the result of a parser p, assuming that p is successful.
     * @param p A parser.  This is the same as the |>>
     * function from FParsec.
     */
    function appfun(p) {
        return (f) => {
            return (istream) => {
                let o = p(istream);
                switch (o.tag) {
                    case "success":
                        return new Success(o.inputstream, f(o.result));
                    case "failure":
                        return o;
                }
            };
        };
    }
    Primitives.appfun = appfun;
    /**
     * many repeatedly applies the parser p until p fails. many always
     * succeeds, even if it matches nothing.  many tries to guard
     * against an infinite loop by raising an exception if p succeeds
     * without changing the parser state.
     * @param p
     */
    function many(p) {
        return (istream) => {
            let istream2 = istream;
            let outputs = [];
            let succeeds = true;
            while (!istream2.isEmpty() && succeeds) {
                let o = p(istream2);
                switch (o.tag) {
                    case "success":
                        if (istream2 == o.inputstream) {
                            throw new Error("Parser loops infinitely.");
                        }
                        istream2 = o.inputstream;
                        outputs.push(o.result);
                        break;
                    case "failure":
                        succeeds = false;
                        break;
                }
            }
            return new Success(istream2, outputs);
        };
    }
    Primitives.many = many;
    /**
     * many1 repeatedly applies the parser p until p fails. many1 must
     * succeed at least once.  many1 tries to guard against an infinite
     * loop by raising an exception if p succeeds without changing the
     * parser state.
     * @param p
     */
    function many1(p) {
        return (istream) => {
            return seq(p)(many(p))(tup => {
                let hd = tup["0"];
                let tl = tup["1"];
                tl.unshift(hd);
                return tl;
            })(istream);
        };
    }
    Primitives.many1 = many1;
    /**
     * str yields a parser for the given string.
     * @param s A string
     */
    // TODO: this should actually be a sequence of parsers constructed
    // from the string s
    function str(s) {
        return (istream) => {
            // escape regex metacharacters
            // (this likely needs work)
            let s2 = s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            let re = new RegExp("^" + s2);
            if (istream.toString().match(re)) {
                const rem = istream.substring(s.length, istream.length());
                const res = istream.substring(0, s.length);
                return new Success(rem, res);
            }
            else {
                return new Failure(istream);
            }
        };
    }
    Primitives.str = str;
    /**
     * Returns a parser that succeeds only if the end of the
     * input has been reached.
     */
    function eof() {
        return (istream) => {
            if (istream.isEOF()) {
                return new Success(istream, Primitives.EOF);
            }
            else {
                return new Failure(istream);
            }
        };
    }
    Primitives.eof = eof;
    /**
     * fresult returns a parser that applies the parser p,
     * and if p succeeds, returns the value x.
     * @param p a parser
     */
    function fresult(p) {
        return (x) => {
            return (istream) => {
                return bind(p)((t) => result(x))(istream);
            };
        };
    }
    Primitives.fresult = fresult;
    /**
     * left returns a parser that applies the parser p,
     * then the parser q, and if both are successful,
     * returns the result of p.
     * @param p a parser
     */
    function left(p) {
        return (q) => {
            return (istream) => {
                return bind(p)((t) => fresult(q)(t))(istream);
            };
        };
    }
    Primitives.left = left;
    /**
     * right returns a parser that applies the parser p,
     * then the parser q, and if both are successful,
     * returns the result of q.
     * @param p a parser
     */
    function right(p) {
        return (q) => {
            return (istream) => {
                return bind(p)(_ => q)(istream);
            };
        };
    }
    Primitives.right = right;
    /**
     * between returns a parser that applies the parser
     * popen, p, and pclose in sequence, and if all are
     * successful, returns the result of p.
     * @param popen the first parser
     */
    function between(popen) {
        return (pclose) => {
            return (p) => {
                let l = left(p)(pclose);
                let r = right(popen)(l);
                return r;
            };
        };
    }
    Primitives.between = between;
    /**
     * The debug parser takes a parser p and a debug string,
     * printing the debug string as a side-effect before
     * applying p to the input.
     * @param p a parser
     */
    function debug(p) {
        return (label) => {
            return (istream) => {
                console.log("apply: " + label);
                let o = p(istream);
                switch (o.tag) {
                    case "success":
                        console.log("success: " + label + ", startpos: " + istream.startpos + ", endpos: " + istream.endpos);
                        break;
                    case "failure":
                        console.log("failure: " + label + ", startpos: " + istream.startpos + ", endpos: " + istream.endpos);
                        break;
                }
                return o;
            };
        };
    }
    Primitives.debug = debug;
    let wschars = choice(sat(c => c == ' ' || c == '\t'))(nl());
    /**
     * ws matches zero or more of the following whitespace characters:
     * ' ', '\t', '\n', or '\r\n'
     * ws returns matched whitespace in a single CharStream result.
     */
    function ws() {
        return (istream) => {
            let o = many(wschars)(istream);
            switch (o.tag) {
                case "success":
                    return new Success(o.inputstream, charstream_1.CharUtil.CharStream.concat(o.result));
                // ws never fails
            }
        };
    }
    Primitives.ws = ws;
    /**
     * ws1 matches one or more of the following whitespace characters:
     * ' ', '\t', '\n', or '\r\n'
     * ws1 returns matched whitespace in a single CharStream result.
     */
    function ws1() {
        return (istream) => {
            let o = many1(wschars)(istream);
            switch (o.tag) {
                case "success":
                    return new Success(o.inputstream, charstream_1.CharUtil.CharStream.concat(o.result));
                case "failure":
                    return o;
            }
        };
    }
    Primitives.ws1 = ws1;
    /**
     * nl matches and returns a newline.
     */
    function nl() {
        return Primitives.choice(Primitives.str("\n"))(Primitives.str("\r\n"));
    }
    Primitives.nl = nl;
    function groupBy(list, keyGetter) {
        let m = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            if (!m.has(key)) {
                m.set(key, []);
            }
            let collection = m.get(key);
            collection.push(item);
        });
        return m;
    }
    function strSat(strs) {
        // sort strings first by length, and then lexicograpically;
        // slice() called here so as not to modify original array
        let smap = groupBy(strs, s => s.length);
        let sizes = [];
        // find size classes;
        // also sort each set of equivalent-length values
        smap.forEach((vals, key, m) => {
            sizes.push(key);
            vals.sort();
        });
        sizes.sort();
        return (istream) => {
            // start with the smallest size class       
            for (let peekIndex = 0; peekIndex < sizes.length; peekIndex++) {
                // for each size class, try matching all of
                // the strings; if one is found, return the
                // appropriate CharStream; if not, fail.
                let peek = istream.peek(sizes[peekIndex]);
                let tail = istream.seek(sizes[peekIndex]);
                let candidates = smap.get(sizes[peekIndex]);
                for (let cIndex = 0; cIndex < candidates.length; cIndex++) {
                    if (candidates[cIndex] === peek.toString()) {
                        return new Success(tail, peek);
                    }
                }
            }
            return new Failure(istream);
        };
    }
    Primitives.strSat = strSat;
})(Primitives = exports.Primitives || (exports.Primitives = {}));

},{"./charstream":86}],89:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var lift_1 = require("../lift");
/**
 * Converts an Array-like object (such as an arguments or NodeList instance) to a regular Array
 */
function fromArrayLike(arrayLike) {
    return new lift_1.ArrayOps([].slice.call(arrayLike));
}
exports.fromArrayLike = fromArrayLike;

},{"../lift":94}],90:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var lift_1 = require("../lift");
/*
* Returns a number[] wrapper with all numbers from start to stop (inclusive),
* incremented or decremented by step.
*/
function range(start, stop, step) {
    if (arguments.length === 1) {
        stop = arguments[0] - 1;
        start = 0;
    }
    step = step || 1;
    var result = [];
    var increasing = step > 0;
    var next = start;
    while ((increasing && next <= stop) || (!increasing && next >= stop)) {
        result.push(next);
        next = next + step;
    }
    return new lift_1.ArrayOps(result);
}
exports.range = range;

},{"../lift":94}],91:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function tuple(arr) {
    return arr;
}
exports.tuple = tuple;

},{}],92:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var is_1 = require("../object/is");
var currentMemoId = 0;
/**
 * Memoizes a function of arbitrary arity.
 * This has two main uses:
 *   1) Reducing the CPU time taken by expensive calculations at the cost of some memory overhead
 *   2) Producing stable references for a given set of arguments. Useful when relying on reference equality.
 *
 * Memoized functions keep internal state. If you wish to clear that state entirely, you can recreate the function.
 */
function memoize(fun, options) {
    // The unique property name used by this memoize function instance.
    // This is used to store the id/reference of object arguments, as Weak maps/sets are very limited.
    var memoKey = "__memo__" + currentMemoId++;
    var lastArgKeys = [];
    var cacheSize = (options && options.cacheSize) || 30;
    var keyFunction = options && options.key;
    // The unique ids/references of objects inside the arityNCache cache
    var objId = 0;
    var arity0Cache;
    var arityNCache;
    var keyCache;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // 0 arguments edge-case
        if (args.length === 0) {
            if (!arity0Cache)
                arity0Cache = fun();
            return arity0Cache;
        }
        // custom key function
        else if (keyFunction) {
            keyCache = keyCache || {};
            var key = keyFunction.apply(null, args);
            var result = keyCache[key];
            if (!result) {
                lastArgKeys.push(key);
                limitCacheSize(keyCache, lastArgKeys, cacheSize);
                result = keyCache[key] = fun.apply(null, args);
            }
            return result;
        }
        // N arguments
        else {
            arityNCache = arityNCache || {};
            var key = '';
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                var argKey = void 0;
                if (is_1.object(arg)) {
                    argKey = arg[memoKey];
                    if (!argKey) {
                        // Non enumerable
                        Object.defineProperty(arg, memoKey, { value: "obj" + objId++ });
                        argKey = arg[memoKey];
                    }
                }
                else {
                    argKey = arg;
                }
                key += (argKey + '_');
            }
            var result = arityNCache[key];
            if (!result) {
                lastArgKeys.push(key);
                limitCacheSize(arityNCache, lastArgKeys, cacheSize);
                result = arityNCache[key] = fun.apply(null, args);
            }
            return result;
        }
    };
}
exports.memoize = memoize;
function limitCacheSize(cache, lastArgKeys, size) {
    if (lastArgKeys.length === size + 1) {
        var key = lastArgKeys.shift();
        delete cache[key];
    }
}

},{"../object/is":95}],93:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var lift_1 = require("./lift");
exports["default"] = lift_1["default"];
var lift_2 = require("./lift");
exports.ArrayOps = lift_2.ArrayOps;
exports.ObjectOps = lift_2.ObjectOps;
exports.NumberOps = lift_2.NumberOps;
exports.StringOps = lift_2.StringOps;
exports.DateOps = lift_2.DateOps;
exports.getValue = lift_2.getValue;
var immupdate_1 = require("immupdate");
exports.update = immupdate_1.update;
exports.deepUpdate = immupdate_1.deepUpdate;
exports.DELETE = immupdate_1.DELETE;
var option_1 = require("./option");
exports.Option = option_1.Option;
exports.None = option_1.None;
exports.Some = option_1.Some;
var result_1 = require("./result");
exports.Result = result_1.Result;
exports.Ok = result_1.Ok;
exports.Err = result_1.Err;
var range_1 = require("./array/range");
exports.range = range_1.range;
var fromArrayLike_1 = require("./array/fromArrayLike");
exports.fromArrayLike = fromArrayLike_1.fromArrayLike;
var tuple_1 = require("./array/tuple");
exports.tuple = tuple_1.tuple;
var set_1 = require("./object/set");
exports.Set = set_1.Set;
var memoize_1 = require("./function/memoize");
exports.memoize = memoize_1.memoize;
var isType = require("./object/is");
exports.is = isType;

},{"./array/fromArrayLike":89,"./array/range":90,"./array/tuple":91,"./function/memoize":92,"./lift":94,"./object/is":95,"./object/set":96,"./option":97,"./result":98,"immupdate":85}],94:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var lift = function (obj) {
    if (obj instanceof Array)
        return new exports.ArrayOps(obj);
    if (obj instanceof Date)
        return new exports.DateOps(obj);
    if (typeof obj === 'string')
        return new exports.StringOps(obj);
    if (typeof obj === 'number')
        return new exports.NumberOps(obj);
    return new exports.ObjectOps(obj);
};
exports["default"] = lift;
function getValue(input) {
    return input && input['_isLiftWrapper']
        ? input.value()
        : input;
}
exports.getValue = getValue;
function makeOps() {
    var Ops = /** @class */ (function () {
        function Ops(_value) {
            this._value = _value;
            this._isLiftWrapper = true;
        }
        Ops.prototype.value = function () { return this._value; };
        return Ops;
    }());
    return Ops;
}
exports.ArrayOps = makeOps();
exports.ObjectOps = makeOps();
exports.NumberOps = makeOps();
exports.StringOps = makeOps();
exports.DateOps = makeOps();

},{}],95:[function(require,module,exports){
"use strict";
exports.__esModule = true;
/** Returns whether an object is an Array */
exports.array = Array.isArray;
/** Returns whether this object is a function */
function func(obj) {
    return (typeof obj === 'function');
}
exports.func = func;
/** Returns whether this object is a string */
function string(obj) {
    return (typeof obj === 'string');
}
exports.string = string;
/** Returns whether this object is a number */
function number(obj) {
    return (typeof obj === 'number');
}
exports.number = number;
/** Returns whether this object is a boolean */
function boolean(obj) {
    return (typeof obj === 'boolean');
}
exports.boolean = boolean;
/** Returns whether this value is an object (e.g not a primitive: dates, arrays, functions, objects, regexes, `new Number(0)`, and `new String('')) */
function object(obj) {
    var type = typeof obj;
    return (type == 'object' || type == 'function');
}
exports.object = object;

},{}],96:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var lift_1 = require("../lift");
/**
 * Creates a Set-like object (string keys, true values) from a list of keys
 */
function Set() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    var result = {};
    keys.forEach(function (key) { return result[key] = true; });
    return new lift_1.ObjectOps(result);
}
exports.Set = Set;

},{"../lift":94}],97:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var lift_1 = require("../lift");
// The Option factory / static object
var OptionObject = function (value) {
    return isDef(value) ? Some(value) : exports.None;
};
OptionObject.all = function (arr) {
    var values = [];
    for (var i = 0; i < arr.length; i++) {
        var value = arr[i];
        if (exports.Option.isOption(value))
            value = value.get();
        if (!isDef(value))
            return exports.None;
        values.push(value);
    }
    return Some(values);
};
OptionObject.isOption = function (value) {
    return !!value && (value.type === 'some' || value.type === 'none');
};
function makeNone() {
    var self = {};
    function returnNone() { return exports.None; }
    self.type = 'none';
    self.get = function () { return undefined; };
    self.isDefined = function () { return false; };
    self.forEach = function () { };
    self.map = returnNone;
    self.flatMap = returnNone;
    self.filter = returnNone;
    self.fold = function (ifEmpty) { return ifEmpty(); };
    self.orElse = function (alt) { return alt(); };
    self.getOrElse = function (alt) { return alt; };
    self.toArray = function () { return lift_1["default"]([]); };
    self.toString = function () { return 'None'; };
    self.toJSON = function () { return null; };
    return self;
}
function _Some(value) {
    this.value = value;
}
_Some.prototype = {
    type: 'some',
    get: function () {
        return this.value;
    },
    isDefined: function () {
        return true;
    },
    forEach: function (fn) {
        fn(this.value);
    },
    map: function (fn) {
        return exports.Option(lift_1.getValue(fn(this.value)));
    },
    flatMap: function (fn) {
        return fn(this.value);
    },
    filter: function (fn) {
        return fn(this.value) ? this : exports.None;
    },
    fold: function (ifEmpty, ifDefined) {
        return ifDefined(this.value);
    },
    orElse: function () {
        return this;
    },
    getOrElse: function () {
        return this.value;
    },
    toArray: function () {
        return lift_1["default"]([this.value]);
    },
    toString: function () {
        return "Some(" + this.value + ")";
    },
    toJSON: function () {
        return this.value;
    }
};
function isDef(value) {
    return value !== null && value !== undefined;
}
exports.Option = OptionObject;
/** Creates a new Some instance using a non nullable value */
// extends {} to prevent null and undefined being passed
function Some(value) {
    return new _Some(value);
}
exports.Some = Some;
exports.None = makeNone();

},{"../lift":94}],98:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var lift_1 = require("../lift");
var ResultObject = {};
ResultObject.all = function (arr) {
    var okValues = [];
    var currentResult;
    for (var i = 0; i < arr.length; i++) {
        var currentResult_1 = arr[i];
        if (!currentResult_1.isOk())
            return currentResult_1;
        okValues.push(currentResult_1.get());
    }
    return Ok(okValues);
};
ResultObject.isResult = function (value) {
    return !!value && (value.type === 'ok' || value.type === 'err');
};
function _Ok(value) {
    this._value = value;
}
_Ok.prototype = {
    type: 'ok',
    isOk: function () {
        return true;
    },
    map: function (fn) {
        return Ok(lift_1.getValue(fn(this._value)));
    },
    mapError: function (fn) {
        return this;
    },
    flatMap: function (fn) {
        return fn(this._value);
    },
    fold: function (ifErr, ifOk) {
        return ifOk(this._value);
    },
    toString: function () {
        return "Ok(" + this._value + ")";
    },
    get: function () {
        return this._value;
    }
};
function _Err(error) {
    this._error = error;
}
_Err.prototype = {
    type: 'err',
    isOk: function () {
        return false;
    },
    map: function (fn) {
        return this;
    },
    mapError: function (fn) {
        return Err(fn(this._error));
    },
    flatMap: function (fn) {
        return this;
    },
    fold: function (ifErr, ifOk) {
        return ifErr(this._error);
    },
    toString: function () {
        return "Err(" + this._error + ")";
    },
    get: function () {
        return this._error;
    }
};
exports.Result = ResultObject;
function Ok(value) {
    return new _Ok(value);
}
exports.Ok = Ok;
function Err(error) {
    return new _Err(error);
}
exports.Err = Err;

},{"../lift":94}]},{},[80])