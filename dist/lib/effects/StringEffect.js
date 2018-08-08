"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaintEvent_1 = require("../logging/PaintEvent");
const ResizeEvent_1 = require("../logging/ResizeEvent");
const ClickEvent_1 = require("../logging/ClickEvent");
const SelectEvent_1 = require("../logging/SelectEvent");
class StringEffect {
    constructor(str) {
        this._fontSize = 20;
        //private _size2: number;
        this._corner = 0;
        this._isSelected = false; // Private bools
        this._isEditing = false;
        this._isListening = false;
        this._isDragging = false;
        this._isResizing = false;
        this._isSelectingMultiple = false;
        this._justDragged = false; // Has this object just been dragged?
        //private _log: string[];
        this._dragoffx = 0;
        this._dragoffy = 0;
        this._initDistance = 0;
        this._mouse = {
            x: 0,
            y: 0
        };
        this._textMetrics = {
            width: 0,
            height: 0,
            interval: 0,
            str: "",
            initMousePos: 0,
            cursorPos: 0
        };
        this._str = str;
    }
    draw(context, dims, ast) {
        if (context.canvas.isDefined()) {
            this._ast = ast;
            this._context = context;
            this._canvas = context.canvas.get();
            this._dims = dims;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this.update();
            // logging
            this._context.eventLog.push(this.logPaint()); // this.context or context?
            context.effects.push(this);
            this.addEventListeners();
        }
        else {
            console.log("canvas is NOT defined");
        }
    }
    update() {
        let fontDeets = this._fontSize + "px Courier New";
        this._ctx.font = fontDeets;
        this._ctx.fillStyle = 'black';
        this._ctx.fillText(this._str.val, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
        let textDims = this._ctx.measureText(this._str.val);
        this._textMetrics.width = textDims.width;
        this._textMetrics.height = this._fontSize;
        this._textMetrics.str = this._str.val;
        this._textMetrics.interval = this._textMetrics.width / this._textMetrics.str.length;
        if (this._isSelected) {
            this.drawTextGuides(this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val - this._fontSize, this._textMetrics.width, this._textMetrics.height, this._corner);
        }
        if (this._isEditing) {
            this.modifyTextCursor();
        }
    }
    addEventListeners() {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    }
    /* Event listener functions */
    onMouseMove(event) {
        this.getMousePosition();
        if (this._isSelected && this._isDragging) {
            //console.log(this._str.val + " is being dragged.");
            this.modifyDrag();
        }
        else if (this._isResizing && this._isSelected) {
            this.modifyResize(this._fontSize < 15);
        }
    }
    onMouseDown(event) {
        if (!this._isSelectingMultiple && this._isSelected && this.contains(this._mouse.x, this._mouse.y)) { //text editing
            if (!this._isListening) {
                window.addEventListener('keydown', this.modifyText.bind(this));
            }
            this._isListening = true;
            this._isEditing = true;
            this._isDragging = false;
            //console.log(this._str.val + " is setting dragging to false");
            this._textMetrics.initMousePos = this._mouse.x;
            this.modifyTextCursor();
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isEditing = false;
        }
        else {
            this._isEditing = false;
        }
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y) > 0, this.contains(this._mouse.x, this._mouse.y));
    }
    onMouseUp(event) {
        this.modifyReset();
    }
    onShiftDown(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }
    onShiftUp(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }
    /* Modification functions */
    modifyDrag() {
        //("string dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    modifyTextCursor() {
        let leftWall = this._dims.x.eval(this._context).val;
        let xDif = this._textMetrics.initMousePos - leftWall;
        let interval = this._textMetrics.interval;
        let moveFactor = 0;
        if (xDif >= interval / 2 && xDif <= interval) {
            moveFactor = leftWall + interval;
            this._textMetrics.cursorPos = interval;
        }
        else if (xDif <= interval / 2) {
            moveFactor = leftWall;
            this._textMetrics.cursorPos = 0;
        }
        else if (xDif % interval >= interval / 2) {
            moveFactor = leftWall + interval * Math.ceil(xDif / interval);
            this._textMetrics.cursorPos = interval * Math.ceil(xDif / interval);
        }
        else if (xDif % interval < interval / 2) {
            moveFactor = leftWall + interval * Math.floor(xDif / interval);
            this._textMetrics.cursorPos = interval * Math.floor(xDif / interval);
        }
        this._ctx.moveTo(moveFactor, this._dims.y.eval(this._context).val - this._fontSize);
        this._ctx.lineTo(moveFactor, this._dims.y.eval(this._context).val);
        this._ctx.strokeStyle = "grey";
        this._ctx.stroke();
    }
    modifyText(event) {
        if (this._isEditing) {
            let firstHalf;
            let secondHalf;
            let breakPoint = this._textMetrics.cursorPos / this._textMetrics.interval;
            firstHalf = this._str.val.substring(0, breakPoint);
            secondHalf = this._str.val.substring(breakPoint);
            if (event.keyCode == 37 && this._textMetrics.initMousePos > this._dims.x.eval(this._context).val + this._textMetrics.interval / 2) {
                this._textMetrics.initMousePos -= this._textMetrics.interval;
                this.modifyTextCursor();
            }
            else if (event.keyCode == 39 && this._textMetrics.initMousePos < this._dims.x.eval(this._context).val + this._textMetrics.width) {
                this._textMetrics.initMousePos += this._textMetrics.interval;
                this.modifyTextCursor();
            }
            else if (event.keyCode == 8 && this._str.val.length > 0) {
                firstHalf = firstHalf.substring(0, firstHalf.length - 1);
                this._str.str = firstHalf + secondHalf;
                this._textMetrics.initMousePos -= this._textMetrics.interval;
                this.modifyTextCursor();
                console.log("backspace");
            }
            else {
                let keyName = event.key;
                if (keyName.length == 1) {
                    firstHalf += keyName;
                    this._str.str = firstHalf + secondHalf;
                    this._textMetrics.initMousePos += this._textMetrics.interval;
                    this.modifyTextCursor();
                }
            }
        }
    }
    modifyResize(isTooSmall) {
        if (isTooSmall) {
            this._fontSize = 15;
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this._fontSize += (newDistance - this._initDistance) * 0.2;
                this._initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this._fontSize += (newDistance - this._initDistance) * 0.2;
            this._initDistance = newDistance;
        }
    }
    // on mouse down
    modifyState(guideContains, contains) {
        this._justDragged = false;
        if (this._isSelectingMultiple) {
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
                this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
            }
            else {
                this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
                this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
                this._isDragging = true;
            }
            // if(this._context.mulSelected.mulSel){
            //     console.log("string effect mulSelected: " + this._context.mulSelected.mulSel);
            //     //if(this._context.mulSelected.val){
            //     this._context.eventLog.push(this.logSelected());
            //     //this.logSelected();
            // }
        }
        else if (guideContains) { //if the corner guides contain the mouse we are resizing 
            this._isSelected = true;
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._context.eventLog.push(this.logClick());
            //console.log(this._str.val + "is selected?" + this._selected);
            //console.log("state selection is " + this._str.val);
            this._dragoffx = this._dims.x.eval(this._context).val;
            this._dragoffy = this._dims.y.eval(this._context).val;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
            this._isResizing = true;
            this._size1 = this._fontSize; // saving old font size
        }
        else if (contains) {
            this._x1 = this.x; // Saving original x and y
            this._y1 = this.y;
            this._isSelected = true;
            this._context.eventLog.push(this.logClick());
            //console.log(this._str.val + "is selected?" + this._selected);
            //console.log("state selection is " + this._str.val);
            this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
            this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
            if (!this._isEditing) {
                this._isDragging = true;
                //console.log(this._str.val + " is dragging? " + this._isDragging);
            }
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
            this._isEditing = false;
        }
    }
    modifyReset() {
        //console.log(this._str.val + " just released");
        //console.log(this._str.val + " is dragging? " + this._myState.dragging);
        if (this._isDragging && this._isSelected) {
            //console.log(this._str.val + " logging drag");
            this._isDragging = false;
            if (Math.abs(this._x1 - this._dims.x.eval(this._context).val) > 1 || Math.abs(this._y1 - this._dims.y.eval(this._context).val) > 1) {
                this._justDragged = true;
                //this._context.eventLog.push(this.logMove());
            }
        }
        else if (this._isResizing && this._isSelected) {
            //console.log(this._str.val + " logging resize");
            this._isResizing = false;
            if (Math.abs(this._size1 - this._fontSize) > 0) {
                this._context.eventLog.push(this.logResize());
            }
        }
        this._isDragging = false;
        this._isResizing = false;
        this._corner = 0;
        // console.log("string effect mulSelected: " + this._context.mulSelected.val);
        // if(this._context.mulSelected.val){
        //     this.logSelected();
        // }
        // if(this.isMultipleSelected){
        //     context.eventLog.push(new SelectEvent(selectedElems));
        //     masterLog.push(context.eventLog[context.eventLog.length - 1]);
        //     //console.log("multiple selected");
        // }
        // //this._context.eventLog.push(this.logMove());
    }
    getMousePosition() {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }
    isMouseOutside(event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = this._canvas.getBoundingClientRect();
        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            this._isDragging = false;
            this._isResizing = false;
            this._isSelected = false;
            this._isEditing = false;
            this._corner = 0;
        }
    }
    contains(mx, my) {
        return (this._dims.x.eval(this._context).val <= mx) && (this._dims.x.eval(this._context).val + this._textMetrics.width >= mx) &&
            (this._dims.y.eval(this._context).val - this._fontSize <= my) && (this._dims.y.eval(this._context).val >= my);
    }
    guideContains(mx, my) {
        let xdif = mx - (this._dims.x.eval(this._context).val + this._textMetrics.width);
        let ydif = my - (this._dims.y.eval(this._context).val - this._fontSize);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) {
            this._isEditing = false;
            return 2;
        }
        else
            return 0;
    }
    drawTextGuides(x, y, w, h, corner) {
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if (corner !== 0) {
            switch (corner) { //colors the guide blue if selected
                case 2:
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue');
                    break;
            }
        }
        else {
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white');
        }
    }
    drawSquare(x, y, w, h, color) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }
    logPaint() {
        return new PaintEvent_1.PaintEvent(this._str.val, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }
    // logMove(): LogEvent<any> {
    //     return new DragEvent(this._str.val, this._x1, this._y1, this.x, this.y);
    // }
    logResize() {
        return new ResizeEvent_1.ResizeEvent(this._str.val, this._size1, this._fontSize);
    }
    logClick() {
        return new ClickEvent_1.ClickEvent(this._str.val, this.x, this.y);
    }
    logSelected() {
        console.log("Logging selected!!");
        return new SelectEvent_1.SelectEvent(this._context.mulSelArray);
    }
    ast() {
        return this._ast;
    }
    get canvas() {
        return this._canvas;
    }
    set canvas(canvas) {
        this._canvas = canvas;
    }
    get x() {
        return this._dims.x.eval(this._context).val;
    }
    get y() {
        return this._dims.y.eval(this._context).val;
    }
    get dims() {
        return this._dims;
    }
    getJustDragged() {
        return this._justDragged;
    }
    setJustDragged(val) {
        this._justDragged = val;
    }
    get isDragging() {
        return this._isDragging;
    }
    get selected() {
        return this._isSelected;
    }
    toSelString() {
        return " " + this._str.val + " at " + this.x + ", " + this.y;
    }
    toDragString() {
        return (this._str.val + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }
}
exports.StringEffect = StringEffect;
//allows us to get the mouse position in relation to the canvas!
//see mousemove event listener
function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
//computes the distance between two points
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
//# sourceMappingURL=StringEffect.js.map