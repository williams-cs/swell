// An abstract class for binary operations. 
// Todo: generics? Issue that left and right could be any binop

export abstract class BinaryOperation{
    constructor(op: BinaryOperation, left: number | BinaryOperation, right: number | BinaryOperation){};
    abstract eval(): any;
}