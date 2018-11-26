"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const index_2 = require("../../index");
const index_3 = require("../../index");
const index_4 = require("../../index");
const index_5 = require("../../index");
const index_6 = require("../../index");
const space_lift_1 = require("space-lift");
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");
let inputBox = document.getElementById('input');
let lastWorkingInputText = "";
//the effects array that holds all the text, ellipses, and rectangles
let effects = [];
let ast;
let context;
let showDebug = true; // flag to show or hide debug button
let masterLog = [];
let selectedElems = [];
let textBoxSelected; //sees if the text box is selected
let isPainting; //tests to see if you're painting to the canvas
let checkpointIsActive = false;
let checkpoint = null;
let canvasIsDisabled = false;
let selected = 0; //the number of selected effects if multiply selecting
let alreadyLogged = false;
let numLogged = 0;
let globalID = 1;
let eph;
/*
let bugButton = document.getElementById('debug');
if(!showDebug){
    bugButton.style.visibility='hidden';
}

bugButton.onclick = function(){
    printLog();
}
*/
/**
 * <div class="col-item">
 *  <button id='paint' style="background-color:#DFB534"> Run </button>
 * </div>
 *
 * Put this in html file for Run button's styling
 */
//let paintButton = document.getElementById('paint');
/**
 * makes the paint button paint text from the textarea to the canvas!
 */
/*
paintButton.onclick = function () {
    effects.length = 0; // slightly sketch clearing method to maintain reference to original array
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    isPainting = true;
    let inputText = inputBox.value;

    let astOpt = Parser.parse(inputText);
    if(astOpt.isDefined()){
        ast = astOpt.get();
        context = new Scope(null, effects, masterLog);
        context.canvas = Some(canvas);
        ast.eval(context); //this is where we draw the objects to the screen
    } else {
        let error = "error text";
        alert("Quan: so something with this syntax error: " + error);
    }

    //let paintEvt = new PaintEvent(inputText); // will need to get from ast when that's implemented

    // Adding context log to master log
    //logEvent.push(paintEvt.assembleLog());
    printLog();
    //event1.logItem();
    // }
};
*/
//clears the canvas!
let resetButton = document.getElementById('reset');
resetButton.onclick = function () {
    if (checkpoint._starterCode != null) {
        textBoxSelected = true;
        inputBox.value = checkpoint._starterCode;
    }
    context.eventLog.push(new index_2.ClearEvent());
    masterLog.push(context.eventLog[context.eventLog.length - 1]); // Does this actually work?
    printLog();
    //let clearEvt = new ClearEvent();
    //logEvent.push(clearEvt.assembleLog());
    //console.log("Log: " + logEvent);
};
let timer = null;
inputBox.onkeydown = function () {
    if (timer != null) {
        clearTimeout(timer);
    }
    timer = setTimeout(parse, 200);
};
function parse() {
    effects.length = 0; // slightly sketch clearing method to maintain reference to original array
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let inputText = inputBox.value;
    let astOpt = index_1.Parser.parse(inputText);
    if (astOpt.isDefined()) {
        ast = astOpt.get();
        context = new index_2.Scope(null, effects, masterLog);
        context.canvas = space_lift_1.Some(canvas);
        ast.eval(context); //this is where we draw the objects to the screen
        lastWorkingInputText = inputText;
    }
    //let paintEvt = new PaintEvent(inputText); // will need to get from ast when that's implemented
    // Adding context log to master log
    //logEvent.push(paintEvt.assembleLog());
    printLog();
    //event1.logItem();
    // }
}
/**
 * The animation function that basically recursively calls itself, clearing and
 * redrawing to the canvas at 60fps.
 */
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears canvas
    selected = 0;
    for (let i = 0; i < effects.length; i++) {
        effects[i].update();
        if (effects[i].selected) {
            selectedElems.push(effects[i]);
            selected++;
        }
        if (effects[i].getJustDragged()) { // Logs drag event
            context.eventLog.push(new index_2.DragEvent(effects[i]));
            masterLog.push(context.eventLog[context.eventLog.length - 1]);
            effects[i].setJustDragged(false);
        }
        if (effects[i].idObj == undefined) { // Gives object an ID if it doesn't have one
            effects[i].initID(globalID);
            context.eventLog.push(new index_2.IDEvent(effects[i])); // Logs ID
            globalID++;
            //console.log(effects[i].getID());
        }
        // if(((effects[i] as EllipseEffect).justDragged)){
        //     //context.eventLog.push(new DragEvent(effects[i]));
        // }
    }
    // at this point, have iterated through all effects and have complete list to log
    if (selected != numLogged) { // if selections have changed, should log again
        alreadyLogged = false;
    }
    if (!alreadyLogged && selected >= 2) { // logs if hasn't already
        numLogged = selected;
        context.eventLog.push(new index_2.SelectEvent(selectedElems));
        masterLog.push(context.eventLog[context.eventLog.length - 1]);
        alreadyLogged = true;
    }
    //This does the prodirect manipulation, passing the new strings to the text box
    let inputText = inputBox.value;
    if (textBoxSelected && inputText !== lastWorkingInputText) {
        /*      effects.length = 0; // slightly sketch clearing method to maintain reference to original array
              ctx.clearRect(0, 0, canvas.width, canvas.height);
        
              //isPainting = true;
              //let inputText = inputBox.value;
        
              let astOpt = Parser.parse(inputText);
              if(astOpt.isDefined()){
                  ast = astOpt.get();
                  context = new Scope(null, effects, masterLog);
                  context.canvas = Some(canvas);
                  ast.eval(context); //this is where we draw the objects to the screen
                  lastWorkingInputText = inputText;
              } /*else {
                  let error = "error text";
                  alert("Quan: so something with this syntax error: " + error);
              }*/
        //let paintEvt = new PaintEvent(inputText); // will need to get from ast when that's implemented
        // Adding context log to master log
        //logEvent.push(paintEvt.assembleLog());
        printLog();
        //event1.logItem();
        // }
    }
    else if (ast != undefined && !textBoxSelected /* && !isPainting */) {
        let newInput = ast.toString();
        inputBox.value = newInput;
    }
    if (checkpointIsActive) {
        checkpointChecksGoal();
    }
    if (checkpoint != null && checkpoint.drawGuides != null) {
        checkpoint.drawGuides(ctx);
        /*
              if (checkpoint._name == "l1c3") {
                ctx.beginPath();
                ctx.rect(10, 430, 100, 100);
                ctx.strokeStyle = '#6C6C6C';
                ctx.stroke();
        
                ctx.font = 20 + "px Courier New";
                ctx.fillStyle = '#6C6C6C';
                ctx.fillText("Put text", 10, 390);
                ctx.fillText("in here", 10, 410);
              }
        */
    }
    selectedElems = [];
}
//checks to see whether the text box is selected
window.addEventListener('mousedown', isInputBoxSelected);
/**
 * This function manages the state of the UI when the text box is selected and when it isn't.
 * If it is inside the text box, isPainting is false and textBoxSelected is true.
 * If it's not, if it's inside the paint button, then isPainting = true.
 * @param event the mouse down event
 */
function isInputBoxSelected(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let rect = inputBox.getBoundingClientRect();
    if (mouseX > rect.left && mouseX < rect.right && mouseY > rect.top && mouseY < rect.bottom) {
        //isPainting = false;
        textBoxSelected = true;
    }
    else {
        /*
          let paintButton = document.getElementById('paint');
          rect = paintButton.getBoundingClientRect();
          if(mouseX > rect.left && mouseX < rect.right && mouseY > rect.top && mouseY < rect.bottom) {
              isPainting = true;
          }
          else {
              isPainting = false;
          }
          */
        textBoxSelected = false;
    }
}
//checks to see whether the text box is selected
window.addEventListener('mousedown', disabledCanvasIsSelected);
/**
 * This function handles the case when a disabled canvas is selected.
 * @param event the mouse down event
 */
function disabledCanvasIsSelected(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let rect = canvas.getBoundingClientRect();
    let popUp = document.getElementById('popup');
    if (canvasIsDisabled && mouseX > rect.left && mouseX < rect.right && mouseY > rect.top && mouseY < rect.bottom) {
        popUp.style.display = 'block';
    }
    else {
        popUp.style.display = 'none';
    }
}
function printLog() {
    console.log("Log: ");
    for (let elem of masterLog) {
        console.log(elem.assembleLog());
    }
}
let paletteButtons = [
    "ellipse", "rect", "string", "number",
    "line", "curve"
];
for (let buttonName of paletteButtons) {
    let paletteButton = document.getElementById(buttonName);
    paletteButton.onclick = function () {
        textBoxSelected = true;
        printNewNode(buttonName);
    };
}
function printNewNode(buttonName) {
    let printLine = "";
    switch (buttonName) {
        case "ellipse":
            printLine = "print(ellipse(100,100));";
            break;
        case "rect":
            printLine = "print(rect(100,100));";
            break;
        case "string":
            printLine = 'print("newWord");';
            break;
        case "number":
            printLine = "print(10);";
            break;
        case "line":
            printLine = "print(line(100,100));";
            break;
        case "curve":
            printLine = "print(curve(100,100,100));";
            break;
        default:
            console.log("Problem with " + buttonName);
    }
    inputBox.value += printLine;
    parse();
}
let instructions = document.getElementById('instructions');
let goalBox = document.getElementById('goal-container');
let instrLabel = document.getElementById('instr-label');
//Map maintaining code last used at a checkpoint
let cpCode = new Map([
    ['l1c1', ""],
    ['l1c2', ""],
    ['l1c3', ""],
    ['l1c4', ""],
    ['l2c1', ""],
    ['l2c2', ""],
    ['l2c3', ""],
    ['l2c4', ""],
    ['l2c5', ""],
    ['l2c6', ""],
    ['l2c7', ""],
    ['l3c1', ""],
    ['l3c2', ""],
    ['l3c3', ""],
    ['l3c4', ""],
    ['l3c5', ""],
    ['l3c6', ""],
    ['l4c1', ""],
    ['l4c2', ""]
]);
//Map maintaining whether a checkpoint has been completed
let cpCompletion = new Map([
    ['l1c1', false],
    ['l1c2', false],
    ['l1c3', false],
    ['l1c4', false],
    ['l2c1', false],
    ['l2c2', false],
    ['l2c3', false],
    ['l2c4', false],
    ['l2c5', false],
    ['l2c6', false],
    ['l2c7', false],
    ['l3c1', false],
    ['l3c2', false],
    ['l3c3', false],
    ['l3c4', false],
    ['l3c5', false],
    ['l3c6', false],
    ['l4c1', false],
    ['l4c2', false]
]);
let checkpoints = new Map([
    ['l1c1', () => new index_3.LessonOneCpOne()],
    ['l1c2', () => new index_3.LessonOneCpTwo()],
    ['l1c3', () => new index_3.LessonOneCpThree()],
    ['l1c4', () => new index_3.LessonOneCpFour()],
    ['l2c1', () => new index_4.LessonTwoCpOne()],
    ['l2c2', () => new index_4.LessonTwoCpTwo()],
    ['l2c3', () => new index_4.LessonTwoCpThree()],
    ['l2c4', () => new index_4.LessonTwoCpFour()],
    ['l2c5', () => new index_4.LessonTwoCpFive()],
    ['l2c6', () => new index_4.LessonTwoCpSix()],
    ['l2c7', () => new index_4.LessonTwoCpSeven()],
    ['l3c1', () => new index_5.LessonThreeCpOne()],
    ['l3c2', () => new index_5.LessonThreeCpTwo()],
    ['l3c3', () => new index_5.LessonThreeCpThree()],
    ['l3c4', () => new index_5.LessonThreeCpFour()],
    ['l3c5', () => new index_5.LessonThreeCpFive()],
    ['l3c6', () => new index_5.LessonThreeCpSix()],
    ['l4c1', () => new index_6.LessonFourCpOne()],
    ['l4c2', () => new index_6.LessonFourCpTwo()]
]);
for (let cp of checkpoints.keys()) {
    let cpButton = document.getElementById(cp);
    cpButton.onclick = function () {
        initCheckpoint(cp);
    };
}
/**
 * Creates a module corresponding to a checkpoint passed in.
 * Sets up the instruction, CODE area, and goal box accordingly.
 * @param cp: the name of the checkpoint
 */
function initCheckpoint(cp) {
    if (checkpoints.has(cp)) {
        if (checkpoint != null) {
            cpCode.set(checkpoint._name, inputBox.value);
        }
        console.log("Initiating checkpoint " + cp);
        checkpoint = checkpoints.get(cp)();
        instrLabel.innerHTML = cp + " - INSTRUCTIONS";
        instructions.innerHTML = checkpoint._instructions;
        //set up the CODE and CANVAS areas
        if (checkpoint._constraint == 'code') {
            inputBox.setAttribute('disabled', 'disabled');
            inputBox.style.opacity = '0.5';
            canvas.style.pointerEvents = "auto";
            canvas.style.background = '#EBEBEB';
            canvasIsDisabled = false;
        }
        else if (checkpoint._constraint == 'canvas') {
            inputBox.removeAttribute('disabled');
            inputBox.style.opacity = '1.0';
            canvas.style.pointerEvents = "none";
            canvas.style.background = '#C0C0C0';
            canvasIsDisabled = true;
        }
        else {
            inputBox.removeAttribute('disabled');
            inputBox.style.opacity = '1.0';
            canvas.style.pointerEvents = "auto";
            canvas.style.background = '#EBEBEB';
            canvasIsDisabled = false;
        }
        let popUp = document.getElementById('popup');
        popUp.style.display = 'none';
        if (cpCode.get(checkpoint._name) !== "") {
            textBoxSelected = true;
            inputBox.value = cpCode.get(checkpoint._name);
        }
        //set up the instruction and goal boxes
        if (cpCompletion.get(cp)) {
            updateGoalBox();
        }
        else {
            if (checkpoint._starterCode != null) {
                textBoxSelected = true;
                inputBox.value = checkpoint._starterCode;
            }
            goalBox.style.background = '#C0C0C0';
            let goalText = document.getElementById('goal-text');
            goalText.style.color = 'black';
            goalText.innerHTML = 'Complete goal to earn a star!';
            let goalImg = document.getElementById('goal-image');
            goalImg.src = 'pics/greystar.svg';
            goalImg.alt = 'a star to be earned';
            let nextBtn = document.getElementById('next');
            nextBtn.style.display = 'none';
            instructions.scrollTop = 0;
            checkpointIsActive = true;
        }
    }
}
function checkpointChecksGoal() {
    if (checkpoint.checkGoal(document, effects)) {
        updateGoalBox();
        cpCompletion.set(checkpoint._name, true);
    }
}
function updateGoalBox() {
    goalBox.style.background = '#673AB7';
    console.log(document);
    let goalText = document.getElementById('goal-text');
    goalText.style.color = '#D8D8D8';
    goalText.innerHTML = 'Goal met!';
    let goalImg = document.getElementById('goal-image');
    goalImg.src = 'pics/star.svg';
    goalImg.alt = 'star earned';
    let nextBtn = document.getElementById('next');
    nextBtn.style.display = 'block';
    instructions.innerHTML += "\nHooray! Goal met! Click 'Next' to proceed to next checkpoint!";
    instructions.scrollTop = instructions.scrollHeight;
    checkpointIsActive = false;
}
let nextButton = document.getElementById('next');
nextButton.onclick = function () {
    let nextModule = checkpoint._nextModule;
    if (nextModule != '') {
        initCheckpoint(nextModule);
    }
};
let prevButton = document.getElementById('prev');
prevButton.onclick = function () {
    let prevModule = checkpoint._prevModule;
    if (prevModule != '') {
        initCheckpoint(prevModule);
    }
};
//call to animate
animate();
//--------------------------------------------------------------
/* test lines of S.W.E.L.L. code

print("hello world", 180, 421);
print(ellipse(75, 50), 100, 100);
print(rect(60, 70), 250, 250);

print("hello");
print("world");

Our sample program
print("hello world");
print(ellipse(130, 100));
*/
//# sourceMappingURL=ui.js.map