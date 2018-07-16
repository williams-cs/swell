import {UnaryOperation, Expression, Scope, NumberNode} from '../..';

export class NegOp extends UnaryOperation<NumberNode>{
    constructor(val: Expression<NumberNode>){
        super(val);
    }

    draw(context: Scope, x: number, y: number): void {
    
    }
    
    eval(context: Scope): NumberNode{
        let v = this.val.eval(context);
        return new NumberNode(-v.val);
    }

    // put in UnaryOp class
    /*
    get value(): number{
        return this.val;
    }
    set value(value: number){
        this.val = value;
    }
    */
}