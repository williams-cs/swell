import { Argument } from "./Argument";

export class PositionalArg<T> extends Argument<T> {
    constructor(
        value: T = null,
        alwaysVisible: boolean = false,
        preArgNameWS: string = " ",
        preEqualWS: string = "",
        postExprWS: string = ""
    ) {
        super(value, true, alwaysVisible, preArgNameWS, preEqualWS, postExprWS);
    }
}
