import { Expression } from "../Expression";
export class Argument<T> {

    // Used for optional arg to check whether or not it has been modified or explicitly initialized
    private _isModified: boolean = false;

    /**
     * The constructor for Argument
     * @param value The value for the argument
     * @param isPositional Whether or not the argument is positional
     */
    constructor(
        private _value: T = null,
        private _isPositional: boolean = true,
        private _alwaysVisible: boolean = false,
        private _preArgNameWS: string = " ",
        private _preEqualWS: string = " ",
        private _postExprWS: string = "",
    ) {}

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }

    get isPositional(): boolean {
        return this._isPositional;
    }

    set isPositional(val: boolean) {
        this._isPositional = val;
    }

    get isModified(): boolean {
        return this._isModified;
    }

    set isModified(val: boolean) {
        this._isModified = val;
    }

    get alwaysVisible(): boolean {
        return this._alwaysVisible;
    }

    set alwaysVisible(val: boolean) {
        this._alwaysVisible = val;
    }

    get preArgNameWS(): string{
        return this._preArgNameWS;
    }

    set preArgNameWS(ws: string) {
        this._preArgNameWS = ws;
    }

    get preEqualWS(): string {
        return this._preEqualWS;
    }

    set preEqualWS(ws: string) {
        this._preEqualWS = ws;
    }

    get postExprWS(): string {
        return this._postExprWS;
    }

    set postExprWS(ws: string){
        this._postExprWS = ws;
    }
}
