import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { StringNode } from '../prims/StringNode';
import { Dimensions } from '../structural/Dimensions';
export declare class EmojiNode implements Expression<EmojiNode> {
    private _width;
    private _height;
    private _name;
    private _newLine;
    private _ws;
    /**
     * Constructor for an Emoji Node
     * @param name The name of the EmojiNode
     * @param width The width of the EmojiNode
     * @param height The height of the EmojiNode
     * @param ws Preceding whitespace
     */
    constructor(name: Expression<StringNode>, width: Expression<NumberNode>, height: Expression<NumberNode>, ws?: string);
    /**
     * Returns this EmojiNode
     * @param context The current program context
     */
    eval(context: Scope): EmojiNode;
    /**
     * Draws the rectangle using EmojiEffect
     * @param context The current program context
     * @param dims The rectangle dimensions
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Returns whether this EmojiNode equals another (if their widths and heights are equal)
     * @param right The right side of the equality (must be an EmojiNode)
     */
    equalsVal(right: Expression<any>): boolean;
    move(): void;
    /**
     * Returns a string representation of the EmojiNode
     */
    toString(): string;
    /**
     * Returns the name of the EmojiNode
     */
    /**
    * Sets the name of the EmojiNode
    */
    name: Expression<StringNode>;
    /**
     * Returns the width of the EmojiNode
     */
    /**
    * Sets the width of the EmojiNode
    */
    width: Expression<NumberNode>;
    /**
     * Returns the height of the EmojiNode
     */
    /**
    * Sets the height of the EmojiNode
    */
    height: Expression<NumberNode>;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
