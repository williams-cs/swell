import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonTwoCpSeven implements Module {
    readonly _name: string = "l2c7";
    readonly _nextModule: string = 'l2c7';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> Changing one circle changes c, which will then in turn change the other circle! </p>
    <p> Now let's put all we have learned to practice. </p>
    <p> Create a circle, and print out the size of that circle in the given box. </p>
    <p> IF we ever change the circle, we want the number in the box to change, too! </p>
    <p> CHALLENGE: Create a circle and print its size in the given box. </p>`;

    constructor(){
    }

    x: number = 10;
    y: number = 430;

    drawGuides(ctx: CanvasRenderingContext2D): void {
      ctx.beginPath();
      ctx.rect(this.x, this.y, 100, 100);
      ctx.strokeStyle = '#6C6C6C';
      ctx.stroke();

      ctx.font = 20 + "px Courier New";
      ctx.fillStyle = '#6C6C6C';
      ctx.fillText("Put circle's size", this.x, 390);
      ctx.fillText("in here", this.x, 410);
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
      return false;
    }

    /**
     * Returns the module name
     */
    get name(): string {
        return this._name;
    }
    /**
     * Returns the module instructions
     */
    get instructions(): string {
        return this._instructions;
    }
}
