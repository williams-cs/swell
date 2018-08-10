import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';

export class ColorNode implements Expression<string>{
    private _red: number;
    private _green: number;
    private _blue: number;
    private _newLine : boolean = false;

    constructor(red: number, green: number, blue: number){
        this._red = red;
        this._green = green;
        this._blue = blue;
    };

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }

    equalsVal(right: Expression<any>): boolean{
        if(right instanceof ColorNode){
            return (this.red === right.red && this.green === right.green && this.blue === right.blue);
        }
        return false;
    }

    toString() :string {
        return "";
    }

    eval(context: Scope){
        return this._red + " " + this._green + " " + this._blue;
    }

    get red(): number{
        return this._red;
    }
    set red(red: number){
        this._red = red;
    }

    get green(): number{
        return this._green;
    }
    set green(green: number){
        this._green = green;
    }

    get blue(): number{
        return this._blue;
    }
    set blue(blue: number){
        this._blue = blue;
    }

    newLine() : boolean {
        return this._newLine;
    }
}