export declare class ReturnError<T> extends Error {
    retVal: T;
    ID: string;
    constructor(retVal: T, ID: string);
}
