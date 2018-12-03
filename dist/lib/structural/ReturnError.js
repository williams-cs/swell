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
//# sourceMappingURL=ReturnError.js.map