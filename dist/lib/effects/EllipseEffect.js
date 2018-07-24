"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaintEvent_1 = require("../logging/PaintEvent");
class EllipseEffect {
    constructor(circle) {
        this._corner = 0;
        this._selected = false;
        this._isNew = true;
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
            this._myState = context.myState;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this.update();
        }
        if (!context.effects.includes(this)) {
            context.effects.push(this);
        }
        if (this._isNew) { //prevents adding event listeners repeatedly
            this.addEventListeners();
            this._isNew = false;
        }
    }
    update() {
        this._ctx.beginPath();
        this._ctx.arc(this._dims.x, this._dims.y, this._dims.radius, 0, Math.PI * 2, false);
        this._ctx.strokeStyle = "black";
        this._ctx.stroke();
        if (this._selected) {
            this.drawGuides(this._dims.x - this._dims.radius, this._dims.y - this._dims.radius, this._dims.radius * 2, this._dims.radius * 2, this._corner);
        }
    }
    addEventListeners() {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    }
    contains(mx, my) {
        return distance(mx, my, this._dims.x, this._dims.y) < this._dims.radius;
    }
    guideContains(mx, my) {
        let xdif = mx - (this._dims.x - this._dims.radius);
        let ydif = my - (this._dims.y - this._dims.radius);
        if (xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5) {
            return 1;
        }
        xdif = mx - (this._dims.x + this._dims.radius);
        if (xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5) {
            return 2;
        }
        xdif = mx - (this._dims.x + this._dims.radius);
        ydif = my - (this._dims.y + this._dims.radius);
        if (xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5) {
            return 3;
        }
        xdif = mx - (this._dims.x - this._dims.radius);
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
        if (this._myState.dragging && this._selected) {
            this.modifyDrag();
        }
        else if (this._myState.resizing && this._selected) {
            this.modifyResize(this._dims.radius < 10);
        }
    }
    onMouseDown(event) {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y) > 0, this.contains(this._mouse.x, this._mouse.y));
    }
    onMouseUp(event) {
        this.modifyReset();
    }
    /* Modification functions */
    modifyDrag() {
        this._dims.x = this._mouse.x - this._myState.dragoffx;
        this._dims.y = this._mouse.y - this._myState.dragoffy;
    }
    modifyResize(isTooSmall) {
        if (isTooSmall) {
            this._dims.radius = 15;
            let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
            if (newDistance - this._myState.initDistance > 0) {
                this._dims.radius += newDistance - this._myState.initDistance;
                this._myState.initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
            this._dims.radius += newDistance - this._myState.initDistance;
            this._myState.initDistance = newDistance;
        }
    }
    modifyState(guideContains, contains) {
        if (guideContains) {
            this._selected = true;
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._myState.selection = this;
            this._myState.dragoffx = this._dims.x;
            this._myState.dragoffy = this._dims.y;
            this._myState.initDistance = distance(this._mouse.x, this._mouse.y, this._dims.x, this._dims.y);
            this._myState.resizing = true;
        }
        else if (contains) {
            this._selected = true;
            this._myState.selection = this;
            this._myState.dragoffx = this._mouse.x - this._dims.x;
            this._myState.dragoffy = this._mouse.y - this._dims.y;
            this._myState.dragging = true;
        }
        else {
            this._selected = false;
        }
    }
    modifyReset() {
        this._myState.dragging = false;
        this._myState.resizing = false;
        this._corner = 0;
    }
    getMousePosition() {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }
    ast() {
        return this._ast;
    }
    logPaint() {
        let paint = new PaintEvent_1.PaintEvent("ellipse at " + this._dims.x + ", " + this._dims.y);
        return paint.assembleLog();
    }
    updateAST() {
        throw new Error("Not implemented");
    }
    get x() {
        return this._dims.x;
    }
    get y() {
        return this._dims.y;
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