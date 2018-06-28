"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReturnError extends Error {
    constructor(retVal, ID) {
        super(ID);
        this.retVal = retVal;
        this.ID = ID;
        Object.setPrototypeOf(this, ReturnError.prototype);
    }
}
exports.ReturnError = ReturnError;
