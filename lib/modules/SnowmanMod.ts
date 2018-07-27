import { Module } from "./Module";

export class SnowmanMod implements Module {
    readonly _name: string = "Do You Want to Build a Snowman?";
    readonly _goal: any;
    readonly _instructions: string = "Draw three ellipses to make a snowman!";
    constructor(){

    }

    checkGoal(document: Document, canvas: HTMLCanvasElement): boolean {
        let inputbox = document.getElementById('input') as HTMLInputElement;
        let inputtext = inputbox.value;
        let goal1: boolean = false;
        let goal2: boolean = false;
        let hits = inputtext.match(new RegExp("\\b" + "ellipse("));
        if(hits.length === 3) goal1 = true;
        var numbers = inputtext.match(/\d+/g).map(Number);
        if(numbers.length >= 12){
            let dist1 = this.dist(numbers[2],numbers[3],numbers[6],numbers[7]) < 0.8*(numbers[2] + numbers[5])/2; // if distances between ellipses is within threshold, correct
            let dist2 = this.dist(numbers[6],numbers[7],numbers[10],numbers[11]) < 0.8*(numbers[5] + numbers[9])/2;
            if (dist1 && dist2) goal2 = true; // If dist between top and bottom
        }
        return(goal1 && goal2);
        // if math works out
    }

    dist(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
    }
}