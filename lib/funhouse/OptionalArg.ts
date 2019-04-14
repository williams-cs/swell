import { Argument } from "./Argument";

export class OptionalArg<T> extends Argument<T> {
    constructor(
        value: T = null,
        alwaysVisible: boolean = false,
        preArgNameWS: string = " ",
        preEqualWS: string = " ",
        postExprWS: string = ""
    ) {
        super(value, false, alwaysVisible, preArgNameWS, preEqualWS, postExprWS);
    }
}
