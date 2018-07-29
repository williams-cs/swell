"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const PaintEvent_1 = require("../logging/PaintEvent");
const ResizeEvent_1 = require("../logging/ResizeEvent");
const DragEvent_1 = require("../logging/DragEvent");
const ClickEvent_1 = require("../logging/ClickEvent");
class RectangleEffect {
    constructor(rect) {
        this._corner = 0;
        this._isSelected = false; // private bools
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
        this._rect = rect;
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
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
    }
    update() {
        let x = this._dims.x.eval(this._context).val;
        let y = this._dims.y.eval(this._context).val;
        let width = this._dims.width.eval(this._context).val;
        let height = this._dims.height.eval(this._context).val;
        this._ctx.beginPath();
        this._ctx.rect(x, y, width, height);
        this._ctx.strokeStyle = "black";
        this._ctx.stroke();
        if (this._isSelected) {
            this.drawGuides(x, y, width, height, this._corner);
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
        let x = this._dims.x.eval(this._context).val;
        let y = this._dims.y.eval(this._context).val;
        let w = this._dims.width.eval(this._context).val;
        let h = this._dims.height.eval(this._context).val;
        if (mx > x && mx < x + w && my > y && my < y + h) {
            return true;
        }
        else
            return false;
    }
    guideContains(mx, my) {
        let x = this._dims.x.eval(this._context).val;
        let y = this._dims.y.eval(this._context).val;
        let w = this._dims.width.eval(this._context).val;
        let h = this._dims.height.eval(this._context).val;
        let xdif = mx - (x + w);
        let ydif = my - (y + h);
        if (xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5) {
            return 3;
        }
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
                case 3:
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'blue');
                    break;
            }
        }
        else {
            this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white');
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
        /*
        if(this._myState.dragging) {
            this._isDragging = true;
        }*/
        if (this._isDragging && this._isSelected) {
            this.modifyDrag();
        }
        else if (this._isResizing && this._isSelected) {
            this.modifyResize(this._dims.width.eval(this._context).val < 5, this._dims.height.eval(this._context).val < 5);
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
        console.log("rectangle dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    modifyResize(widthTooSmall, heightTooSmall) {
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 5;
            this._rect.width = new NumberNode_1.NumberNode(5);
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                let ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._rect.width = new NumberNode_1.NumberNode(Math.round(this._dims.width.eval(this._context).val));
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) / ratio;
                this._rect.height = new NumberNode_1.NumberNode(Math.round(this._dims.height.eval(this._context).val));
                this._initDistance = newDistance;
            }
        }
        else if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 5;
            this._rect.height = new NumberNode_1.NumberNode(5);
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                let ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._rect.width = new NumberNode_1.NumberNode(Math.round(this._dims.width.eval(this._context).val));
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) / ratio;
                this._rect.height = new NumberNode_1.NumberNode(Math.round(this._dims.height.eval(this._context).val));
                this._initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            let ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
            this._dims.width.eval(this._context).val += newDistance - this._initDistance;
            this._rect.width = new NumberNode_1.NumberNode(Math.round(this._dims.width.eval(this._context).val));
            this._dims.height.eval(this._context).val += (newDistance - this._initDistance) / ratio;
            this._rect.height = new NumberNode_1.NumberNode(Math.round(this._dims.height.eval(this._context).val));
            this._initDistance = newDistance;
        }
    }
    modifyState(guideContains, contains) {
        if (this._isSelectingMultiple) {
            if (contains) {
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
        }
        else if (guideContains) {
            this._isSelected = true;
            this._isResizing = true;
            this._context.eventLog.push(this.logClick());
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            //this._myState.selection = this;
            this._dragoffx = this._dims.x.eval(this._context).val + this._dims.width.eval(this._context).val / 2;
            this._dragoffy = this._dims.y.eval(this._context).val + this._dims.height.eval(this._context).val / 2;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this._dims.x.eval(this._context).val + this._dims.width.eval(this._context).val / 2, this._dims.y.eval(this._context).val + this._dims.height.eval(this._context).val / 2);
            //this._myState.resizing = true;
            this._size1 = Math.sqrt((this._dims.width.eval(this._context).val) ^ 2 + (this._dims.height.eval(this._context).val) ^ 2); // size is diagonal length
        }
        else if (contains) {
            this._myState.dragging = false;
            this._x1 = this._dims.x.eval(this._context).val; // Saving original x and y
            this._y1 = this._dims.y.eval(this._context).val;
            this._context.eventLog.push(this.logClick());
            this._isSelected = true;
            this._isDragging = true;
            //this._myState.selection = this;
            this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
            this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
            //this._myState.dragging = true;
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
            this._myState.dragging = false;
        }
    }
    modifyReset() {
        if (this._isDragging && this._isSelected) {
            this._isDragging = false;
            if (Math.abs(this._x1 - this._dims.x.eval(this._context).val) > 1 || Math.abs(this._y1 - this._dims.y.eval(this._context).val) > 1) {
                this._context.eventLog.push(this.logMove());
            }
        }
        else if (this._isResizing && this._isSelected) {
            this._isResizing = false;
            let size2 = Math.sqrt(Math.pow(this._dims.width.eval(this._context).val, 2) + Math.pow(this._dims.height.eval(this._context).val, 2));
            if (Math.abs(this._size1 - size2) > 0) {
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
    /*logPaint(): LogEvent<any> {
        //return new PaintEvent(this._str);
    }*/
    // logMove(): string {
    //     let moveStr = new DragEvent(this._str, this._x1, this._y1, this._dims.x, this._dims.y);
    //     return moveStr.assembleLog();
    // }
    // logResize(): string {
    //     let sizeStr = new ResizeEvent(this._str, this._size1, this._fontSize);
    //     return sizeStr.assembleLog();
    // }
    logPaint() {
        return new PaintEvent_1.PaintEvent("rectangle", this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }
    logMove() {
        //console.log("x1,y1,x,y: " + this._x1 + " " + this._y1 + " " + this._dims.x + " " + this._dims.y);
        return new DragEvent_1.DragEvent("rectangle", this._x1, this._y1, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }
    logResize() {
        return new ResizeEvent_1.ResizeEvent("rectangle", this._size1, this._dims.width.eval(this._context).val);
    }
    logClick() {
        return new ClickEvent_1.ClickEvent("rectangle at ", this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }
    ast() {
        throw new Error("Not implemented");
    }
    updateAST() {
        throw new Error("Not implemented");
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get dims() {
        return this._dims;
    }
}
exports.RectangleEffect = RectangleEffect;
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
//# sourceMappingURL=RectangleEffect.js.map