import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpOne implements Module {
    readonly _name: string = "Lesson 1 Checkpoint 1: Saying Hi";
    readonly _goal: any;
    readonly _instructions: string =
    `<p> To begin, let’s tell the computer to write something on the CANVAS! </p>
    <p> ……… </p>
    <p> HINT: write in the CODE box print("Hello, world!") </p>`;

    constructor(){
    }

    /**
     * A lesson to print a string
     * goals: write any string on canvas
     * @param document The HTML document
     */
    checkGoal2(document: Document, effects: Effect<any>[]): boolean {
        console.log("checkGoal2 called");
        console.log("legnth of effects: " + effects.length);
        for (let effect of effects) {
          console.log("Checking: " + effect.getID());
          console.log(effect instanceof StringEffect);
          if (effect instanceof StringEffect) {
            if (effect.str !== "") {
              console.log("goal checked!");
              return true;
            }
          }
        }
        return false;
    }

    /**
     * A lesson to print a string
     * goals: write any string on canvas
     * @param document The HTML document
     */
    checkGoal(document: Document): boolean {
        let input = document.getElementById('input') as HTMLInputElement;
        let inputtext = input.value;
        let goal1: boolean = false;
        let goal2: boolean = false;
        let numbers;
        if(inputtext != null){
            //let hits = inputtext.match(new RegExp("\\^print\\(ellipse\\("));
            //console.log("hits: " + hits);
            //if(hits != null && hits.length === 1) {
            if(inputtext.includes("print(ellipse(") && inputtext.includes(");")){ // rough way of checking
                goal1 = true;
                console.log("goal 1 met");
            }
            var nums = inputtext.match(/\d+/g)
            if(nums != null) {
                numbers = nums.map(Number);
            }
            if(numbers !=  null && numbers[0] === numbers[1] && 150 <= numbers[2] && 350 >= numbers[2]
                && 150 <= numbers[3] && 350 >= numbers[3]) {
                    console.log("goal 2 met");
                    goal2 = true;
                }
            return(goal1 && goal2);
        }
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
