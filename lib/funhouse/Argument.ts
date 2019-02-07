import { Expression } from "../Expression";

export class Argument<T> {

    constructor(
        private _value: Expression<T> = undefined,
        private _positional: boolean = true,
    ) {}

    get value(): Expression<T> {
        return this._value;
    }

    set value(value: Expression<T>) {
        this._value = value;
    }

    get positional(): boolean {
        return this._positional;
    }

    set positional(val: boolean) {
        this._positional = val;
    }
}
