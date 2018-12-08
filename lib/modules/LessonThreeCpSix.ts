import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpSix implements Module {
    readonly _name: string = "l3c6";
    readonly _nextModule: string = 'l4c1';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> Now that you know how to use if/else statements, let's put them all together! </p>
    <p> Above we have the CODE to draw 2 circles: circle A has height and width a, and circle B has height and width b. </p>
    <p> However, currently the claim that "Circle A is smaller than circle B." regardless of the circles' actual sizes. </p>
    <p> Create an if/else statement to print "Circle A is smaller than circle B." when it is actually so, and print "Circle A is bigger than circle B" otherwise. </p>
    <p> CHALLENGE: Create an if/else statement to print the correct claim about the sizes of the 2 circles. </p>`;

    readonly _starterCode: string =
    `a = 200;
print(a, 111, 103);
print(ellipse(a, a), 131, 263);
b = 100;
print(b, 337, 104);
print(ellipse(b, b), 371, 248);
print("Circle A is smaller than circle B.", 45, 453);
`;

    constructor(){
    }


    xA: number = 20;
    yA: number = 150;

    xB: number = this.xA + 225 + 10;
    yB: number = 150;

    drawGuides(ctx: CanvasRenderingContext2D): void {
      ctx.beginPath();
      ctx.rect(this.xA, this.yA, 225, 225);
      ctx.strokeStyle = '#6C6C6C';
      ctx.stroke();

      ctx.font = 20 + "px Courier New";
      ctx.fillStyle = '#6C6C6C';
      ctx.fillText("Circle A", this.xA, this.yA - 20);

      ctx.beginPath();
      ctx.rect(this.xB, this.yB, 225, 225);
      ctx.stroke();

      ctx.fillText("Circle B", this.xB, this.yB - 20);
    }

    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = (document.getElementById("input") as HTMLInputElement).value;
        if (code != null) {
          /*
          if(a < b) {
            print("Circle A is smaller than circle B.", 45, 453);
          } else {
            print("Circle A is bigger than circle B.", 45, 453);
          }*/
            let regex1: RegExp = /if\s*\(\s*a\s*[<>]\s*b\s*\)/;
            let regex2: RegExp = /if\s*\(\s*b\s*[<>]\s*a\s*\)/;
            let match1 = code.match(regex1);
            let match2 = code.match(regex2);
            codeIsCorrect = (match1 != null && match1.length > 0) || (match2 != null && match2.length > 0);
        }

        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        let circleA = null;
        let circleB = null;

        //look for circles A and B
        for (let effect of effects) {
          if (effect instanceof EllipseEffect) {
            if (effect.x > this.xA && effect.x < this.xA + 225 && effect.y > this.yA && effect.y < this.yA + 225) {
              circleA = effect;
            } else if (effect.x > this.xB && effect.x < this.xB + 225 && effect.y > this.yB && effect.y < this.yB + 225) {
              circleB = effect;
            }
          }
        }

        if (circleA != null && circleB != null) {
          for (let effect of effects) {
            if (effect instanceof StringEffect) {
              let str = effect.str;
              if ((str === "Circle A is smaller than circle B." && circleA.w < circleB.w && circleA.h < circleB.h)
                  || (str === "Circle A is bigger than circle B." && circleA.w > circleB.w && circleA.h > circleB.h)) {
                canvasIsCorrect = true;
                break;
              }
            }
          }
        }



        return codeIsCorrect && canvasIsCorrect;
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
