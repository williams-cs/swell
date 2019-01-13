import { Parser } from '../../index';
import { Effect, Expression, Scope, ClearEvent, LogEvent, DragEvent, SelectEvent, IDEvent, CodeEvent, Module, ModuleGenerator } from '../../index';
import { LessonOneCpOne, LessonOneCpTwo, LessonOneCpThree, LessonOneCpFour } from '../../index';
import { LessonTwoCpOne, LessonTwoCpTwo, LessonTwoCpThree, LessonTwoCpFour, LessonTwoCpFive, LessonTwoCpSix, LessonTwoCpSeven } from '../../index';
import { LessonThreeCpOne, LessonThreeCpTwo, LessonThreeCpThree, LessonThreeCpFour, LessonThreeCpFive, LessonThreeCpSix } from '../../index';
import { LessonFourCpOne, LessonFourCpTwo } from '../../index';
import { Option, Some, None } from 'space-lift';
import { diffChars, IDiffResult } from 'diff';
import CodeMirror from 'codemirror';

(function() {
    let editor: CodeMirror.Editor = ((e: any) => { return e.CodeMirror })(document.getElementById("input"));
    let editorDoc: CodeMirror.Doc = editor.getDoc();
    let editorWrapper = editor.getWrapperElement();
    let canvas = document.querySelector("canvas");
    let popUp = document.getElementById("popup");
    let ctx = canvas.getContext("2d");
    let lastCursorPos: any = editorDoc.getCursor();
    let lastProgram: string = ""; // Used for comparing and highlighting diffs

    let effects: Effect<any>[] = [];
    let ast: Expression<any>;
    let context: Scope;
    let masterLog: LogEvent<any>[] = [];
    let alreadyLogged: boolean = false;
    let numLogged: number = 0;
    let selectedElems: Effect<any>[] = [];
    let selected: number = 0; // the number of selected effects if multiply selecting

    let isCanvasSelected: boolean = false; // Check if mouse is clicked on canvas
    let isDoingDM: boolean = false; // Check if direct manipulating effects
    let checkpoint: Module = null;
    let modGen = new ModuleGenerator();
    let checkpointIsActive: boolean = false;
    let canvasIsDisabled: boolean = false;

    let globalID: number = 1;
    let highlightTimer: any = null;
    let parseTimer: any = null;
    let logTimer: any = null;

    let uid: string = localStorage.getItem("swell_uuid");
    if (uid == null) {
        uid = "someUUID";
    }

    let codeEvent = new CodeEvent('CodeEvent');
    let checkpointName = 'l0c0';
    let parses = false;
    let doNotLog = localStorage.getItem("data_collection") != "1";

    /* Logging, parsing & rendering */

    function logDM() {
        for (let elem of masterLog) {
            console.log(elem.assembleLog());
            if (checkpoint != null) {
                checkpointName = checkpoint._name;
            }
            elem.logRemotely(uid, editor.getValue(), checkpointName, parses, doNotLog);
        }
        masterLog = [];
    }

    function logCodeEvent() {
        if (checkpoint != null) {
            checkpointName = checkpoint._name;
        }
        codeEvent.logRemotely(uid, editor.getValue(), checkpointName, parses, doNotLog);
    }

    function parse() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
        clearEditorMarkers();

        // get program
        let inputText = editor.getValue();

        // parse program text
        let outcome = Parser.parseWithOutcome(inputText);

        // clear effects array
        effects.length = 0;

        // check for parser outcome
        switch (outcome.tag) {
            case "success":
                try {
                    parses = true;
                    // get AST
                    ast = outcome.result;

                    // init context
                    context = new Scope(null, effects, masterLog);
                    context.canvas = Some(canvas);

                    // evaluate (this is where objects appear on screen)
                    ast.eval(context);

                } catch (e) {
                    console.log(e);
                }

                break;

            case "failure":
                parses = false;
                ast = undefined;
                let startpos = outcome.inputstream.furthestFailure;
                let endpos = (startpos + 3) < outcome.inputstream.length()
                    ? (startpos + 3) : outcome.inputstream.length();
                // mark region
                editorDoc.markText(
                    editorDoc.posFromIndex(startpos),
                    editorDoc.posFromIndex(endpos),
                    { className: "err" }
                );

                break;
        }

        // log to console
        logDM();
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
                context.eventLog.push(new DragEvent(effects[i]));
                masterLog.push(context.eventLog[context.eventLog.length - 1]);
                effects[i].setJustDragged(false);
            }
            if (effects[i].idObj == undefined) { // Gives object an ID if it doesn't have one
                effects[i].initID(globalID);
                context.eventLog.push(new IDEvent(effects[i])); // Logs ID
                globalID++;
            }
        }
        // at this point, have iterated through all effects and have complete list to log
        if (selected != numLogged) { // if selections have changed, should log again
            alreadyLogged = false;
        }
        if (!alreadyLogged && selected >= 2) { // logs if hasn't already
            numLogged = selected;
            context.eventLog.push(new SelectEvent(selectedElems));
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
        let newProgram: string = ast.toString();
        if (lastProgram != newProgram) {
            editor.setValue(newProgram);
            highlightDiff(newProgram);
            lastProgram = newProgram;
        } else if (!isCanvasSelected) {
            isDoingDM = false;
        }
    }

    /**
     * Highlight diffs in editor
     * @param newProgram New program text to highlight
     * @param update Whether or not to update last program with new program
     */
    function highlightDiff(newProgram: string, update?: boolean) {
        let curLine: number = 0;
        let curChar: number = 0;

        diffChars(lastProgram, newProgram).forEach((result: IDiffResult) => {
            let lines: Array<string> = result.value.split(/\r?\n/g);
            let endLine: number = result.removed ? curLine : curLine + lines.length - 1;
            let endChar: number = result.removed ? curChar :
                ((endLine == curLine ? curChar : 0) + lines[lines.length - 1].length);

            if (result.added || result.removed) {
                // Extends the highlighted section all the way to the left
                let startHighlightChar: number = curChar;
                let firstLine: string = editorDoc.getLine(curLine);
                while (startHighlightChar >= 1) {
                    // Check if alphanumeric
                    if (!/^[a-z0-9]+$/i.test(firstLine[startHighlightChar - 1])) {
                        break;
                    }
                    startHighlightChar--;
                }

                // Extends to the right
                let endHightLightChar: number = endChar;
                let lastLine: string = editorDoc.getLine(endLine);
                while (endHightLightChar < lastLine.length) {
                    if (!/^[a-z0-9]+$/i.test(lastLine[endHightLightChar])) {
                        break;
                    }
                    endHightLightChar++;
                }

                editorDoc.markText( // Highlight text
                    { line: curLine, ch: startHighlightChar }, // Starting point
                    { line: endLine, ch: endHightLightChar }, // Inclusive line, exclusive char
                    { className: "highlighted-text" }
                );
            }
            curLine = endLine;
            curChar = endChar;
        });

        // Set the clear highlight timer
        if (highlightTimer != null) {
            clearTimeout(highlightTimer);
        }
        highlightTimer = setTimeout(function() {
            clearEditorMarkers(); // Clear markers
            logDM(); // user stopped doing DM; log now
        }, 500);

        // Update last program if necessary
        if (update) {
            lastProgram = newProgram;
        }
    }

    /**
     * Clear all text markers
     **/
    function clearEditorMarkers() {
        editorDoc.getAllMarks().forEach((mark: CodeMirror.TextMarker) => {
            mark.clear();
        });
    }

    /* Event listeners */
    editor.on("keyup", function() {
        // Check if editor has been modified, only parses if modified
        if (editorDoc.isClean()) {
            return;
        } else {
            editorDoc.markClean();
        }

        if (parseTimer != null) {
            clearTimeout(parseTimer);
        }
        parseTimer = setTimeout(parse, 200);

        if (logTimer != null) {
            clearTimeout(logTimer);
        }
        logTimer = setTimeout(logCodeEvent, 5000);
    });

    editor.on("blur", function() {
        lastCursorPos = editorDoc.getCursor();
    });

    // Window event
    window.addEventListener('mousedown', function(event: any) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        // Check if canvas is selected
        let rect = canvas.getBoundingClientRect();
        if (canvasIsDisabled && mouseX > rect.left && mouseX < rect.right &&
            mouseY > rect.top && mouseY < rect.bottom) {
            popUp.style.display = 'block';
        } else {
            popUp.style.display = 'none';
        }
    });
    window.addEventListener("keydown", function(event: any) {
        if (!editor.hasFocus()) {
            isDoingDM = true;
        }
    });
    window.addEventListener("keyup", function(event: any) {
        isDoingDM = false;
    });

    // Canvas mouse events
    canvas.addEventListener("mousedown", function() {
        isCanvasSelected = true;
        isDoingDM = true;
    });
    canvas.addEventListener("mouseup", function() {
        isCanvasSelected = false;
    });

    /* Palette */

    let paletteButtons: string[] = [
        "ellipse", "rect", "string", "number",
        "line", "curve",
        "happy", "sad", "angry", "cool"
    ];

    for (let buttonName of paletteButtons) {
        let paletteButton = document.getElementById(buttonName);
        paletteButton.onclick = () => insertNode(buttonName);
    }

    /**
     * Insert new node at the current cursor position and update the cursor
     **/
    function insertNode(buttonName: string): string {
        let newNode: string = "";
        switch (buttonName) {
            case "ellipse":
                newNode = "\nprint(ellipse(100, 100));";
                break;
            case "rect":
                newNode = "\nprint(rect(100, 100));";
                break;
            case "string":
                newNode = '\nprint("newWord");';
                break;
            case "number":
                newNode = "\nprint(10);";
                break;
            case "line":
                newNode = "\nprint(line(100, 100));";
                break;
            case "curve":
                newNode = "\nprint(curve(100, 100, 100));";
                break;
            case "happy": case "sad": case "angry": case "cool":
                newNode = '\nprint(emoji("' + buttonName + '", 100, 100));';
                break;
            default:
                console.log("Problem with " + buttonName);
                return;
        }

        // compute insertion position
        let endIdx = editor.getValue().length;
        let posInsert = editorDoc.posFromIndex(endIdx + 1);
        let lastLineNum = editorDoc.lastLine();

        // Insert at the end of the document & highlight changes
        editorDoc.replaceRange(newNode, posInsert);
        highlightDiff(editor.getValue(), true);

        // Update cursor & refocus editor
        lastCursorPos.line = lastLineNum + 2;
        lastCursorPos.ch = 0;
        editor.focus();
        editorDoc.setCursor(lastCursorPos);

        // parse
        parse();
    }

    /* Modules */

    /* Maps to help initialize the Checkpoint sidebar.
    * The first map is for non-dm case, the second for the dm case.
    */
    let sidebarPlans = [
      [
          ['l1c1','l1c3','l1c4'],
          ['l2c1','l2c3','l2c4','l2c5','l2c7'],
          ['l3c1','l3c2','l3c3','l3c4','l3c5','l3c6']
      ],
      [
          ['l1c1','l1c2','l1c3','l1c4'],
          ['l2c1','l2c2','l2c3','l2c4','l2c5','l2c6','l2c7'],
          ['l3c1','l3c2','l3c3','l3c4','l3c5','l3c6']
      ]
    ]

    //retrieve survey choice for dm or non-dm
    let dm = 1;
    let val = localStorage.getItem('dm');
    if (val != null) {
        dm = parseInt(val);
    }
    if (dm == 0) {
        canvas.style.pointerEvents = "none";
    }

    //set up Checkpoint sidebar
    let lessons = sidebarPlans[dm];
    let cpNames = [].concat(...lessons);
    let lessonAccordion = document.getElementById("lesson-accordion");
    for (var x = 0; x < lessons.length; x++) {
        let lessonID: string = "collapse" + x + 1;

        let lessonLabel = document.createElement("div");
        lessonLabel.className = "row";
        let lessonLabelBtn = document.createElement("button");
        lessonLabelBtn.className = "btn btn-block lesson-btn";
        lessonLabelBtn.setAttribute("type", "button");
        lessonLabelBtn.setAttribute("data-toggle", "collapse");
        lessonLabelBtn.setAttribute("data-target", "#" + lessonID);
        lessonLabelBtn.innerHTML = "Lesson " + (x + 1);
        lessonLabel.append(lessonLabelBtn);
        lessonAccordion.append(lessonLabel);

        let lesson = document.createElement("div");
        lesson.id = lessonID;
        lesson.className = "collapse";
        lesson.setAttribute("data-parent", "#lesson-accordion")

        let cps = lessons[x];
        let i = 1;
        for (let cp of cps) {
            var div = document.createElement('div');
            div.className = 'row';
            var btn = document.createElement('button');
            btn.id = cp;
            btn.className = "checkpoint btn btn-block";
            btn.innerHTML = "Checkpoint " + i++;
            btn.onclick = function() {
                lastProgram = "";
                initCheckpoint(cp);
            }

            div.appendChild(btn);
            lesson.appendChild(div);
        }

        lessonAccordion.append(lesson);
    }

    //reset checkpoint button
    let resetButton = document.getElementById('reset');
    resetButton.onclick = function() {
        if (checkpoint._starterCode != null) {
            editor.setValue(checkpoint._starterCode);
            parse();
        }
        context.eventLog.push(new ClearEvent());
        masterLog.push(context.eventLog[context.eventLog.length - 1]); // Does this actually work?
        logDM();
    };

    let instructions = document.getElementById('goal');
    let rewardBox = document.getElementById('reward-container');
    let rewardText = document.getElementById('reward-text');
    let rewardImg: HTMLImageElement = document.getElementById('reward-image') as HTMLImageElement;
    let nextButton = document.getElementById('next');

    //Map maintaining code last used at a checkpoint
    let cpCode: Map<string, string> = new Map([]);
    //Map maintaining whether a checkpoint has been completed
    let cpCompletion: Map<string, boolean> = new Map([]);
    cpNames.forEach((cp: string) => {
        cpCode.set(cp, "");
        cpCompletion.set(cp, false);
    });

    /* keeping track of and displaying user's progress */
    let starCount: number = 0;
    let starBox = document.getElementById("achievement");
    updateStarBox();

    /**
     * Creates a module corresponding to a checkpoint passed in.
     * Sets up the instruction, CODE area, and goal box accordingly.
     * @param cp the name of the checkpoint
     */
    function initCheckpoint(cp: string) {
        //store code written of old checkpoint
        if (checkpoint != null) {
            cpCode.set(checkpoint._name, editor.getValue());
        }

        console.log("Initiating checkpoint " + cp);
        checkpoint = modGen.createModule(cp, ctx, editor);
        instructions.innerHTML = checkpoint._instructions;

        //freeze/unfreeze the CODE and CANVAS areas
        if (dm == 1) {
            if (checkpoint._constraint == 'code') {
                editor.setOption("readOnly", true);
                editorWrapper.style.opacity = '0.5';
                canvas.style.pointerEvents = "auto";
                canvas.style.background = 'white';
                canvasIsDisabled = false;

            } else {
                editor.setOption("readOnly", false);
                editorWrapper.style.opacity = "1.0";
                if (checkpoint._constraint == "canvas") {
                    canvas.style.pointerEvents = "none";
                    canvas.style.background = "#C0C0C0";
                    canvasIsDisabled = true;
                } else {
                    canvas.style.pointerEvents = "auto";
                    canvas.style.background = "white";
                    canvasIsDisabled = false;
                }
            }
        }

        //restore previous code written in this checkpoint
        if (cpCode.get(checkpoint._name) !== "") {
            editor.setValue(cpCode.get(checkpoint._name));
            parse();
        }

        //restore latest instruction at this checkpoint
        popUp.style.display = 'none';
        let curInstruction = document.getElementById("instruction");
        if (curInstruction != null) {
            curInstruction.remove();
        }

        if (checkpoint.numInstructions > 0) {
            checkpoint.renderInstruction(document);
        }

        //set up the instruction and goal boxes
        if (cpCompletion.get(cp)) {
            updateRewardBox();
        } else {
            //initialize starter code if this is the first time this checkpoint is reached
            if (checkpoint._starterCode != null && cpCode.get(checkpoint._name) === "") {
                editor.setValue(checkpoint._starterCode);
                parse();
            }

            //set up the instruction and goal boxes
            rewardBox.style.background = '#C0C0C0';
            rewardText.style.color = 'black';
            rewardText.innerHTML = 'Complete goal to earn a star!';
            rewardImg.src = 'pics/greystar.svg';
            rewardImg.alt = 'a star to be earned';
            nextButton.style.display = 'none';

            instructions.scrollTop = 0;
            checkpointIsActive = true;
        }

        resetButton.style.display = "block";
    }

    function checkpointChecksGoal() {
        if (checkpoint.checkGoal(document, effects)) {
            cpCompletion.set(checkpoint._name, true);
            updateRewardBox();
            updateStarBox();
            instructions.innerHTML = "";
        }
    }

    function updateRewardBox() {
        let isFinished = true;
        for (var val  of cpCompletion.values()) {
            if (!val) {
                isFinished = false;
                break;
            }
        }

        rewardBox.style.background = '#673AB7';
        rewardText.style.color = '#D8D8D8';
        rewardText.innerHTML = isFinished
            ? "Congratulations! You have finished everything!"
            : "Goal met! Click 'Next' to go to the next checkpoint!";

        rewardImg.src = 'pics/star.svg';
        rewardImg.alt = 'star earned';
        nextButton.style.display = 'block';
        resetButton.style.display = "none";
        if (isFinished) {
            nextButton.innerHTML = "Finish"
        }

        instructions.scrollTop = instructions.scrollHeight;
        checkpointIsActive = false;
    }

    nextButton.onclick = function() {
        let isFinished = true;
        for (var val  of cpCompletion.values()) {
            if (!val) {
                isFinished = false;
                break;
            }
        }
        if (isFinished) {
            nextButton.style.display = "none";
            rewardText.innerHTML = "Code away!";
            rewardText.style.color = "black";
            rewardBox.style.background = '#C0C0C0';
            rewardImg.style.display = "none";
            return;
        }

        let cpName = checkpoint._name;
        let curCpIndex = cpNames.indexOf(cpName);
        if (curCpIndex < 0) {
            return;
        }
        let nextCpIndex = -1; // Next unfinished lesson
        for (let i = curCpIndex + 1; i < cpNames.length; i++) {
            if (!cpCompletion.get(cpNames[i])) {
                nextCpIndex = i;
                break;
            }
        }
        if (nextCpIndex != -1)  {
            initCheckpoint(cpNames[nextCpIndex]);
            return;
        }
        let previousCpIndex = -1; // Previous, earliest unfinished lesson
        for (let i = 0; i < curCpIndex; i++) {
            if (!cpCompletion.get(cpNames[i])) {
                previousCpIndex = i;
                break;
            }
        }
        if (previousCpIndex != -1)  {
            initCheckpoint(cpNames[previousCpIndex]);
            return;
        } else {
            console.log("Error: Cannot find unfinished checkpoint"); // Can't happen
        }
    }

    let prevButton = document.getElementById('prev');
    if (dm == 1) {
        prevButton.onclick = function() {
            let cpName = checkpoint._name;
            let i = cpNames.indexOf(cpName);
            if (i > 0 && i < cpNames.length) {
                initCheckpoint(cpNames[i - 1]);
            }
        }
    }

    function updateStarBox() {
        starCount = 0;
        for (var val of cpCompletion.values()) {
            if (val) {
                starCount++;
            }
        }
        starBox.innerHTML = starCount + "/" + cpNames.length;
    }

    //call to animate
    animate();
})();
