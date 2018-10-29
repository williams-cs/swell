import { Module } from "./Module";
import { Effect } from "../effects/Effect";

export class SnowmanMod implements Module {
    readonly _name: string = "Do You Want to Build a Snowman?";
    readonly _nextModule: string = '';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string = "Draw three ellipses to make a snowman!";

    /**
     * Constructor for the Snowman module
     */
    constructor(){}

    /**
     * Checks goals and returns true if fulfilled, false otherwise
     * Goals: Three ellipses, circular, not too far away
     * @param document
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let inputbox = document.getElementById('input') as HTMLInputElement;
        let inputtext = inputbox.value;
        let goal1: boolean = false;
        let goal2: boolean = false;
        let hits = inputtext.match(new RegExp("\\b" + "print(ellipse("));
        if(hits.length === 3) goal1 = true;
        var numbers = inputtext.match(/\d+/g).map(Number);
        if(numbers.length >= 12){
            let dist1 = this.dist(numbers[2],numbers[3],numbers[6],numbers[7]) < 0.8*(numbers[2] + numbers[5])/2; // if distances between ellipses is within threshold, correct
            let dist2 = this.dist(numbers[6],numbers[7],numbers[10],numbers[11]) < 0.8*(numbers[5] + numbers[9])/2;
            if (dist1 && dist2) goal2 = true; // If dist between top and bottom
        }
        return(goal1 && goal2);
    }

    /**
     * Returns the distance between two (x,y) points
     * @param x1 The first point x coordinate
     * @param y1 The first point y coordinate
     * @param x2 The second point x coordinate
     * @param y2 The second point y coordinate
     */
    dist(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
    }
}
