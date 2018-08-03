import { Module } from "./Module";

export class CircleMod implements Module {
    readonly _name: string = "The Circle";
    readonly _goal: any;
    readonly _instructions: string = "Draw a circle in the middle of the screen!";
    constructor(){}

    // goals: width = height and x and y are between 150 and 350
    checkGoal(document: Document): boolean {
        let inputbox = document.getElementById('input') as HTMLInputElement;
        let inputtext = inputbox.value;
        let goal1: boolean = false;
        let goal2: boolean = false;
        let hits = inputtext.match(new RegExp("\\b" + "print(ellipse("));
        if(hits.length === 1) goal1 = true;
        var numbers = inputtext.match(/\d+/g).map(Number);
        if(numbers[0] === numbers[1] && 150 <= numbers[2] && 350 >= numbers[2]
            && 150 <= numbers[3] && 350 >= numbers[3])
        return(goal1 && goal2);
        // if math works out
    }

    dist(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
    }

    get name(): string {
        return this._name;
    }
    get instructions(): string {
        return this._instructions;
    }
}