import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { StringNode } from '../prims/StringNode';
import { Dimensions } from '../structural/Dimensions';
import { EmojiEffect } from '../effects/EmojiEffect';

export class EmojiNode implements Expression<EmojiNode> {
    private _width: Expression<NumberNode>;
    private _height: Expression<NumberNode>;
    private _name: Expression<StringNode>;
    private _newLine: boolean = false;
    private _ws: string;

    /**
     * Constructor for an Emoji Node
     * @param name The name of the EmojiNode
     * @param width The width of the EmojiNode
     * @param height The height of the EmojiNode
     * @param ws Preceding whitespace
     */
    constructor(name: Expression<StringNode>, width: Expression<NumberNode>, height: Expression<NumberNode>, ws?: string){
        this._width = width;
        this._height = height;
        this._name = name;
        this._ws = ws;
        if (ws == undefined) {
            this._ws= "";
        }
    }

    /**
     * Returns this EmojiNode
     * @param context The current program context
     */
    eval(context: Scope): EmojiNode {
        return this;
    }

    /**
     * Draws the rectangle using EmojiEffect
     * @param context The current program context
     * @param dims The rectangle dimensions
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        dims.width = new NumberNode(this._width.eval(context).val, "");
        dims.height = new NumberNode(this._height.eval(context).val, "");
        let e = new EmojiEffect(this);
        e.draw(context, dims, ast);
    }

    /**
     * Returns whether this EmojiNode equals another (if their widths and heights are equal)
     * @param right The right side of the equality (must be an EmojiNode)
     */
    equalsVal(right: Expression<any>): boolean{
        if(right instanceof EmojiNode){
            return (this.name.equalsVal(right.name) && this.width.equalsVal(right.width) && this.height.equalsVal(right.height));
        }
        return false;
    }

    move(): void{}

    /**
     * Returns a string representation of the EmojiNode
     */
    toString(): string {
        return this._ws + "emoji(" + this._name.toString() + ", " + this._width.toString() + ", " + this._height.toString() + ")";
    }

    /**
     * Returns the name of the EmojiNode
     */
    get name(): Expression<StringNode>{
        return this._name;
    }
    /**
     * Sets the name of the EmojiNode
     */
    set name(width: Expression<StringNode>){
        this._name = name;
    }

    /**
     * Returns the width of the EmojiNode
     */
    get width(): Expression<NumberNode>{
        return this._width;
    }
    /**
     * Sets the width of the EmojiNode
     */
    set width(width: Expression<NumberNode>){
        this._width = width;
    }

    /**
     * Returns the height of the EmojiNode
     */
    get height(): Expression<NumberNode>{
        return this._height;
    }
    /**
     * Sets the height of the EmojiNode
     */
    set height(height: Expression<NumberNode>){
        this._height = height;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}
