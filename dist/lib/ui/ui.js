"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const index_2 = require("../../index");
const space_lift_1 = require("space-lift");
const diff_1 = require("diff");
(function () {
    let editor = ((e) => { return e.CodeMirror; })(document.getElementById("input"));
    let editorWrapper = editor.getWrapperElement();
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let lastCursorPos = editor.getCursor();
    let lastProgram = ""; // Used for comparing and highlighting diffs
    let effects = [];
    let ast;
    let context;
    let masterLog = [];
    let alreadyLogged = false;
    let numLogged = 0;
    let selectedElems = [];
    let selected = 0; // the number of selected effects if multiply selecting
    let isCanvasSelected = false; // Check if mouse is clicked on canvas
    let isDoingDM = false; // Check if direct manipulating effects
    let checkpoint = null;
    let modGen = new index_2.ModuleGenerator();
    let checkpointIsActive = false;
    let canvasIsDisabled = false;
    let globalID = 1;
    let highlightTimer = null;
    let parseTimer = null;
    /* Logging, parsing & rendering */
    function printLog() {
        console.log("Log: ");
        for (let elem of masterLog) {
            console.log(elem.assembleLog());
        }
    }
    function parse() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let inputText = editor.getValue();
        let astOpt = index_1.Parser.parse(inputText);
        effects.length = 0; // slightly sketch clearing method to maintain reference to original array
        if (astOpt.isDefined()) {
            ast = astOpt.get();
            context = new index_2.Scope(null, effects, masterLog);
            context.canvas = space_lift_1.Some(canvas);
            ast.eval(context); //this is where we draw the objects to the screen
        }
        else {
            ast = undefined;
        }
        printLog();
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
            }
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
        selectedElems = [];
        updateProgramText(); // ProDirect Manipulation
        // Draw check points
        if (checkpointIsActive) {
            checkpointChecksGoal();
        }
        if (checkpoint != null && checkpoint.drawGuides != null) {
            checkpoint.drawGuides();
        }
    }
    /**
     * Update the program text and highlight all the changes
    **/
    function updateProgramText() {
        if (!ast || !isDoingDM) {
            return;
        }
        let newProgram = ast.toString();
        if (lastProgram != newProgram) {
            editor.setValue(newProgram);
            highlightDiff(newProgram);
        }
        else if (!isCanvasSelected) {
            isDoingDM = false;
        }
    }
    /**
     * Highlight diffs in editor
     * @param newProgram New program text to highlight
     * @param update Whether or not to update last program with new program
     */
    function highlightDiff(newProgram, update) {
        let curLine = 0;
        let curChar = 0;
        diff_1.diffChars(lastProgram, newProgram).forEach((result) => {
            if (result.removed) {
                return;
            }
            let lines = result.value.split(/\r?\n/g);
            let endLine = curLine + lines.length - 1;
            let endChar = (endLine == curLine ? curChar : 0) + lines[lines.length - 1].length;
            if (result.added) {
                // Extends the highlighted section all the way to the left
                let startHighlightChar = curChar;
                let firstLine = editor.getLine(curLine);
                while (startHighlightChar >= 1) {
                    // Check if alphanumeric
                    if (!/^[a-z0-9]+$/i.test(firstLine[startHighlightChar - 1])) {
                        break;
                    }
                    startHighlightChar--;
                }
                // Extends to the right
                let endHightLightChar = endChar;
                let lastLine = editor.getLine(endLine);
                while (endHightLightChar < lastLine.length) {
                    if (!/^[a-z0-9]+$/i.test(lastLine[endHightLightChar])) {
                        break;
                    }
                    endHightLightChar++;
                }
                editor.markText(// Highlight text
                { line: curLine, ch: startHighlightChar }, // Starting point
                { line: endLine, ch: endHightLightChar }, // Inclusive line, exclusive char
                { className: "highlighted-text" });
            }
            curLine = endLine;
            curChar = endChar;
        });
        // Set the clear highlight timer
        if (highlightTimer != null) {
            clearTimeout(highlightTimer);
        }
        highlightTimer = setTimeout(function () {
            editor.getAllMarks().forEach((mark) => {
                mark.clear();
            });
        }, 500);
        // Update last program if necessary
        if (update) {
            lastProgram = newProgram;
        }
    }
    /* Event listeners */
    editor.on("keyup", function () {
        // Check if editor has been modified, only parses if modified
        if (editor.isClean()) {
            return;
        }
        else {
            editor.markClean();
        }
        if (parseTimer != null) {
            clearTimeout(parseTimer);
        }
        parseTimer = setTimeout(parse, 200);
    });
    editor.on("blur", function () {
        lastCursorPos = editor.getCursor();
    });
    //Mousedown event for window element
    window.addEventListener('mousedown', function (event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        // Check if canvas is selected
        let rect = canvas.getBoundingClientRect();
        if (canvasIsDisabled && mouseX > rect.left && mouseX < rect.right &&
            mouseY > rect.top && mouseY < rect.bottom) {
            popUp.style.display = 'block';
        }
        else {
            popUp.style.display = 'none';
        }
    });
    // Canvas mouse events
    let popUp = document.getElementById('popup');
    canvas.addEventListener("mousedown", function () {
        lastProgram = editor.getValue();
        isCanvasSelected = true;
        isDoingDM = true;
    });
    canvas.addEventListener("mouseup", function () {
        lastProgram = editor.getValue();
        isCanvasSelected = false;
    });
    /* Palette */
    let paletteButtons = [
        "ellipse", "rect", "string", "number",
        "line", "curve"
    ];
    for (let buttonName of paletteButtons) {
        let paletteButton = document.getElementById(buttonName);
        paletteButton.onclick = () => insertNode(buttonName);
    }
    /**
     * Insert new node at the current cursor position and update the cursor
     **/
    function insertNode(buttonName) {
        let newNode = "";
        switch (buttonName) {
            case "ellipse":
                newNode = "print(ellipse(100, 100));\n";
                break;
            case "rect":
                newNode = "print(rect(100, 100));\n";
                break;
            case "string":
                newNode = 'print("newWord");\n';
                break;
            case "number":
                newNode = "print(10);\n";
                break;
            case "line":
                newNode = "print(line(100, 100));\n";
                break;
            case "curve":
                newNode = "print(curve(100, 100, 100));\n";
                break;
            default:
                console.log("Problem with " + buttonName);
                return;
        }
        // Insert at cursor position & highlight changes
        editor.replaceRange(newNode, lastCursorPos);
        highlightDiff(editor.getValue(), true);
        // Update cursor & refocus editor
        lastCursorPos.line++;
        lastCursorPos.ch = 0;
        editor.focus();
        editor.setCursor(lastCursorPos);
        // Parse
        parse();
    }
    //reset checkpoint
    let resetButton = document.getElementById('reset');
    resetButton.onclick = function () {
        if (checkpoint._starterCode != null) {
            editor.setValue(checkpoint._starterCode);
            parse();
        }
        context.eventLog.push(new index_2.ClearEvent());
        masterLog.push(context.eventLog[context.eventLog.length - 1]); // Does this actually work?
        printLog();
    };
    /* Modules */
    let instructions = document.getElementById('goal');
    let rewardBox = document.getElementById('reward-container');
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
    let cpNames = [
        'l1c1', 'l1c2', 'l1c3', 'l1c4',
        'l2c1', 'l2c2', 'l2c3', 'l2c4', 'l2c5', 'l2c6', 'l2c7',
        'l3c1', 'l3c2', 'l3c3', 'l3c4', 'l3c5', 'l3c6'
    ];
    //this is for testing tutorials
    let workingCp = [
        'l1c1', 'l1c2', 'l1c3', 'l1c4', 'l2c1'
    ];
    for (let cp of cpNames) {
        let cpButton = document.getElementById(cp);
        cpButton.onclick = function () {
            lastProgram = "";
            initCheckpoint(cp);
        };
    }
    /**
     * Creates a module corresponding to a checkpoint passed in.
     * Sets up the instruction, CODE area, and goal box accordingly.
     * @param cp: the name of the checkpoint
     */
    function initCheckpoint(cp) {
        //store CODE of old checkpoint
        if (checkpoint != null) {
            cpCode.set(checkpoint._name, editor.getValue());
        }
        console.log("Initiating checkpoint " + cp);
        checkpoint = modGen.createModule(cp, ctx, editor);
        instrLabel.innerHTML = cp + " - GOAL";
        instructions.innerHTML = checkpoint._instructions;
        //set up the CODE and CANVAS areas
        if (checkpoint._constraint == 'code') {
            editor.setOption("readOnly", true);
            editorWrapper.style.opacity = '0.5';
            canvas.style.pointerEvents = "auto";
            canvas.style.background = 'white';
            canvasIsDisabled = false;
        }
        else if (checkpoint._constraint == 'canvas') {
            editor.setOption("readOnly", false);
            editorWrapper.style.opacity = '1.0';
            canvas.style.pointerEvents = "none";
            canvas.style.background = '#C0C0C0';
            canvasIsDisabled = true;
        }
        else {
            editor.setOption("readOnly", false);
            editorWrapper.style.opacity = '1.0';
            canvas.style.pointerEvents = "auto";
            canvas.style.background = 'white';
            canvasIsDisabled = false;
        }
        let popUp = document.getElementById('popup');
        popUp.style.display = 'none';
        if (cpCode.get(checkpoint._name) !== "") {
            editor.setValue(cpCode.get(checkpoint._name));
            parse();
        }
        //set up the instruction and goal boxes
        if (cpCompletion.get(cp)) {
            updateRewardBox();
        }
        else {
            if (checkpoint._starterCode != null) {
                editor.setValue(checkpoint._starterCode);
                parse();
            }
            let curInstruction = document.getElementById("instruction");
            if (curInstruction != null) {
                curInstruction.remove();
            }
            if (checkpoint.numInstructions > 0) {
                checkpoint.renderInstruction(document);
            }
            rewardBox.style.background = '#C0C0C0';
            let reward = document.getElementById('reward-text');
            reward.style.color = 'black';
            reward.innerHTML = 'Complete goal to earn a star!';
            let rewardImg = document.getElementById('reward-image');
            rewardImg.src = 'pics/greystar.svg';
            rewardImg.alt = 'a star to be earned';
            let nextBtn = document.getElementById('next');
            nextBtn.style.display = 'none';
            instructions.scrollTop = 0;
            checkpointIsActive = true;
        }
    }
    function checkpointChecksGoal() {
        if (checkpoint.checkGoal(document, effects)) {
            updateRewardBox();
            cpCompletion.set(checkpoint._name, true);
        }
    }
    function updateRewardBox() {
        rewardBox.style.background = '#673AB7';
        console.log(document);
        let rewardText = document.getElementById('reward-text');
        rewardText.style.color = '#D8D8D8';
        rewardText.innerHTML = "Goal met! Click 'Next' to go to next checkpoint!";
        let rewardImg = document.getElementById('reward-image');
        rewardImg.src = 'pics/star.svg';
        rewardImg.alt = 'star earned';
        let nextBtn = document.getElementById('next');
        nextBtn.style.display = 'block';
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
})();
//# sourceMappingURL=ui.js.map