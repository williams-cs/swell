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
//# sourceMappingURL=VariableNode.js.map