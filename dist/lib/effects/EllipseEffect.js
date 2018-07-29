"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaintEvent_1 = require("../logging/PaintEvent");
const DragEvent_1 = require("../logging/DragEvent");
const ResizeEvent_1 = require("../logging/ResizeEvent");
const NumberNode_1 = require("../prims/NumberNode");
const ClickEvent_1 = require("../logging/ClickEvent");
class EllipseEffect {
    constructor(circle) {
        this._corner = 0;
        this._isSelected = false; // Private bools
        //private _isListening: boolean = false;
        this._isDragging = false;
        this._isResizing = false;
        this._isSelectingMultiple = false;
        this._dragoffx = 0;
        this._dragoffy = 0;
        this._initDistance = 0;
        this._myState = {
            dragoffx: 0,
            dragoffy: 0,
            initDistance: 0,
            selection: null,
            dragging: false,
            resizing: false
        };
        this._mouse = {
            x: 0,
            y: 0
        };
        this._circle = circle;
    }
    draw(context, dims, ast) {
        if (context.canvas.isDefined()) {
            this._dims = dims;
            this._ast = ast;
            this._canvas = context.canvas.get();
            this._context = context;
            this._myState = context.myState;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this.update();
        }
        // logging
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
    }
    update() {
        this._ctx.beginPath();
        this._ctx.arc(this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val, this._dims.radius.eval(this._context).val, 0, Math.PI * 2, false);
        this._ctx.strokeStyle = "black";
        this._ctx.stroke();
        if (this._isSelected) {
            this.drawGuides(this._dims.x.eval(this._context).val - this._dims.radius.eval(this._context).val, this._dims.y.eval(this._context).val - this._dims.radius.eval(this._context).val, this._dims.radius.eval(this._context).val * 2, this._dims.radius.eval(this._context).val * 2, this._corner);
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
    contains(mx, my) {
        return distance(mx, my, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val) < this._dims.radius.eval(this._context).val;
    }
    guideContains(mx, my) {
        let xdif = mx - (this._dims.x.eval(this._context).val - this._dims.radius.eval(this._context).val);
        let ydif = my - (this._dims.y.eval(this._context).val - this._dims.radius.eval(this._context).val);
        if (xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5) {
            return 1;
        }
        xdif = mx - (this._dims.x.eval(this._context).val + this._dims.radius.eval(this._context).val);
        if (xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5) {
            return 2;
        }
        xdif = mx - (this._dims.x.eval(this._context).val + this._dims.radius.eval(this._context).val);
        ydif = my - (this._dims.y.eval(this._context).val + this._dims.radius.eval(this._context).val);
        if (xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5) {
            return 3;
        }
        xdif = mx - (this._dims.x.eval(this._context).val - this._dims.radius.eval(this._context).val);
        if (xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5) {
            return 4;
        }
        else
            return 0;
    }
    //draws the guides for different objects
    drawGuides(x, y, w, h, corner) {
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if (corner !== 0) {
            switch (corner) { //colors the correct guide blue
                case 1:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'blue');
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white');
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white');
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white');
                    break;
                case 2:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white');
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white');
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue');
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white');
                    break;
                case 3:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white');
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'blue');
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white');
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white');
                    break;
                case 4:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white');
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white');
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white');
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'blue');
                    break;
            }
        }
        else {
            this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white');
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white');
            this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white');
            this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white');
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
    onMouseMove(event) {
        this.getMousePosition();
        if (this._isDragging && this._isSelected) {
            this.modifyDrag();
        }
        else if (this._isResizing && this._isSelected) {
            this.modifyResize(this._dims.radius.eval(this._context).val < 10);
        }
    }
    onMouseDown(event) {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y) > 0, this.contains(this._mouse.x, this._mouse.y));
    }
    onMouseUp(event) {
        //console.log("I'm an ellipse!");
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
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    modifyResize(isTooSmall) {
        if (isTooSmall) {
            this._dims.radius.eval(this._context).val = 15;
            let widthAndHeight = new NumberNode_1.NumberNode(Math.round(this._dims.radius.eval(this._context).val * 2));
            this._circle.width = widthAndHeight;
            this._circle.height = widthAndHeight;
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this._dims.radius.eval(this._context).val += newDistance - this._initDistance;
                widthAndHeight = new NumberNode_1.NumberNode(Math.round(this._dims.radius.eval(this._context).val * 2));
                this._circle.width = widthAndHeight;
                this._circle.height = widthAndHeight;
                this._initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this._dims.radius.eval(this._context).val += newDistance - this._initDistance;
            let widthAndHeight = new NumberNode_1.NumberNode(Math.round(this._dims.radius.eval(this._context).val * 2));
            this._circle.width = widthAndHeight;
            this._circle.height = widthAndHeight;
            this._initDistance = newDistance;
        }
    }
    modifyState(guideContains, contains) {
        if (guideContains) {
            this._isSelected = true;
            this._isResizing = true;
            this._context.eventLog.push(this.logClick());
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._myState.selection = this;
            this._dragoffx = this._dims.x.eval(this._context).val;
            this._dragoffy = this._dims.y.eval(this._context).val;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
            this._myState.resizing = true;
            this._size1 = this._dims.radius.eval(this._context).val; // saving old font size
        }
        else if (contains || this._myState.dragging) {
            if (this._isSelectingMultiple) {
                this._myState.dragging = true;
            }
            else {
                this._myState.dragging = false;
            }
            this._x1 = this._dims.x.eval(this._context).val; // Saving original x and y
            this._y1 = this._dims.y.eval(this._context).val;
            this._isSelected = true;
            this._isDragging = true;
            this._context.eventLog.push(this.logClick());
            //this._myState.dragging = true;
            this._myState.selection = this;
            this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
            this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
        }
    }
    modifyReset() {
        if (this._isDragging && this._isSelected) { // probs only need dragging but oh well
            this._isDragging = false;
            if (Math.abs(this._x1 - this._dims.x.eval(this._context).val) > 1 || Math.abs(this._y1 - this._dims.y.eval(this._context).val) > 1) {
                this._context.eventLog.push(this.logMove());
            }
        }
        else if (this._isResizing && this._isSelected) {
            this._isResizing = false;
            if (Math.abs(this._size1 - this._dims.radius.eval(this._context).val) > 0) {
                this._context.eventLog.push(this.logResize());
            }
        }
        this._myState.dragging = false;
        this._myState.resizing = false;
        this._corner = 0;
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
            this._myState.dragging = false;
            this._myState.resizing = false;
            this._isSelected = false;
            this._corner = 0;
        }
    }
    ast() {
        return this._ast;
    }
    logPaint() {
        return new PaintEvent_1.PaintEvent("ellipse", this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }
    logMove() {
        //console.log("x1,y1,x,y: " + this._x1 + " " + this._y1 + " " + this._dims.x + " " + this._dims.y);
        return new DragEvent_1.DragEvent("ellipse", this._x1, this._y1, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }
    logResize() {
        return new ResizeEvent_1.ResizeEvent("ellipse", this._size1, this._dims.radius.eval(this._context).val);
    }
    logClick() {
        return new ClickEvent_1.ClickEvent("ellipse at ", this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }
    updateAST() {
        throw new Error("Not implemented");
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
}
exports.EllipseEffect = EllipseEffect;
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
//# sourceMappingURL=EllipseEffect.js.map