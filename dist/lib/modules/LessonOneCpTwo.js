"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Checkpoint_1 = require("./Checkpoint");
const Instruction_1 = require("./Instruction");
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpTwo extends Checkpoint_1.Checkpoint {
    constructor() {
        super();
        this._name = "l1c2";
        this._nextModule = 'l1c3';
        this._constraint = 'code';
        this._instructions = `<p> GOAL: Move the words you just created to explore how it affects your code. </p>`;
        this._starterCode = `print("Hello", 100, 100)`;
        this._latestInstrIndex = 1;
        this.x = 390;
        this.y = 100;
        let content = "Notice the numbers added inside the () of your print statement? They specify where your computer should write the word on the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = "To understand what they do, first click on the word currently on the CANVAS and drag it around.";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
        content = "Now drag the word into the bottom-right box on the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "80%", "10%"));
        content = "Did you notice that the numbers inside the print statement change? Now drag the word into the top-left box on the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = 'These numbers indicate the location on the CANVAS where the computer should draw the word! The first number changes when the word moves left and right. The second number changes when the word moves up and down.';
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
    }
    drawGuides(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 100, 100);
        ctx.strokeStyle = '#6C6C6C';
        ctx.stroke();
        ctx.font = 20 + "px Courier New";
        ctx.fillStyle = '#6C6C6C';
        ctx.fillText("Drag word", this.x, this.y + 120);
        ctx.fillText("in here", this.x, this.y + 140);
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        /*
          for (let effect of effects) {
            if (effect instanceof StringEffect && effect.str !== "") {
              if (effect.x > this.x && effect.x < this.x + 100 && effect.y > this.y && effect.y < this.y + 100) {
                return true;
              }
            }
          }
          return false;
          */
        let input = document.getElementById('input');
        console.log("instrIndex in checkGoal: " + this._instrIndex);
        switch (this._latestInstrIndex) {
            case 0:
                return false;
                break;
            case 1:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str !== "" && effect.selected) {
                        this._latestInstrIndex++;
                        this.renderLatestInstruction(document);
                    }
                }
                return false;
                break;
            case 2:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str !== "") {
                        if (effect.x > this.x && effect.x < this.x + 100 && effect.y > this.y && effect.y < this.y + 100) {
                            this.x = 10;
                            this.y = 10;
                            this._latestInstrIndex++;
                            this.renderLatestInstruction(document);
                        }
                    }
                }
                return false;
                break;
            case 3:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str !== "") {
                        if (effect.x > this.x && effect.x < this.x + 100 && effect.y > this.y && effect.y < this.y + 100) {
                            this._latestInstrIndex++;
                            this.renderLatestInstruction(document);
                        }
                    }
                }
                return false;
                break;
            default:
                return true;
                break;
        }
        return false;
    }
    /**
     * Returns the module name
     */
    get name() {
        return this._name;
    }
    /**
     * Returns the module instructions
     */
    get instructions() {
        return this._instructions;
    }
}
exports.LessonOneCpTwo = LessonOneCpTwo;
//# sourceMappingURL=LessonOneCpTwo.js.map