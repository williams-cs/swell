"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaintEvent_1 = require("../logging/PaintEvent");
const DragEvent_1 = require("../logging/DragEvent");
class StringEffect {
    constructor(str) {
        this._fontSize = 20;
        this._corner = 0;
        this._selected = false;
        this._mouse = {
            x: 0,
            y: 0
        };
        this._str = str;
    }
    draw(context, x, y) {
        if (context.canvas.isDefined()) {
            this._context = context;
            this._canvas = context.canvas.get();
            this._myState = context.myState;
            this._x = x;
            this._y = y;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            let fontDeets = this._fontSize + "px Arial";
            ctx.font = fontDeets;
            ctx.fillStyle = 'black';
            ctx.fillText(this._str.val, x, y);
            let dims = ctx.measureText(this._str.val);
            this._w = dims.width;
            this._h = this._fontSize;
            // logging
            this._context.eventLog.push(this.logPaint()); // this.context or context?
            if (!context.effects.includes(this)) {
                context.effects.push(this);
            }
            if (this._selected) {
                this.drawTextGuides(this._x, this._y - this._fontSize, this._w, this._h, this._corner);
            }
            this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
            this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        }
        else {
            console.log("canvas is NOT defined");
        }
    }
    contains(mx, my) {
        return (this._x <= mx) && (this._x + this._w >= mx) &&
            (this._y - this._fontSize <= my) && (this._y >= my);
    }
    guideContains(mx, my) {
        let xdif = mx - (this._x + this._w);
        let ydif = my - (this._y - this._fontSize);
        if (xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5) {
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
    onMouseMove(event) {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
        if (this._myState.dragging && this._selected) {
            this._x = this._mouse.x - this._myState.dragoffx;
            this._y = this._mouse.y - this._myState.dragoffy;
        }
        else if (this._myState.resizing && this._selected) {
            if (this._fontSize >= 15) {
                let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
                this._fontSize += newDistance - this._myState.initDistance;
                this._myState.initDistance = newDistance;
            }
            else {
                this._fontSize = 15;
                let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
                if (newDistance - this._myState.initDistance > 0) {
                    this._fontSize += newDistance - this._myState.initDistance;
                    this._myState.initDistance = newDistance;
                }
            }
        }
    }
    onMouseDown(event) {
        if (this.guideContains(this._mouse.x, this._mouse.y) > 0) {
            this._selected = true;
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._myState.selection = this;
            this._myState.dragoffx = this._x;
            this._myState.dragoffy = this._y;
            this._myState.initDistance = distance(this._mouse.x, this._mouse.y, this._x, this._y);
            this._myState.resizing = true;
            // insert resize log here
        }
        else if (this.contains(this._mouse.x, this._mouse.y)) {
            console.log(true);
            this._selected = true;
            this._myState.selection = this;
            this._myState.dragoffx = this._mouse.x - this._x;
            this._myState.dragoffy = this._mouse.y - this._y;
            this._myState.dragging = true;
            this._x1 = this._x; // Saving original x and y
            this._y1 = this._y;
        }
        else {
            this._selected = false;
        }
    }
    onMouseUp(event) {
        this._myState.dragging = false;
        this._myState.resizing = false;
        this._corner = 0;
        this._context.eventLog.push(this.logMove());
    }
    logPaint() {
        let paint = new PaintEvent_1.PaintEvent(this._str.val);
        return paint.assembleLog();
    }
    logMove() {
        let moveStr = new DragEvent_1.DragEvent(this._str.val, this._x1, this._y1, this._x, this._y);
        return moveStr.assembleLog();
    }
    ast() {
        throw new Error("Not implemented");
    }
    updateAST() {
        throw new Error("Not implemented");
    }
    get canvas() {
        return this._canvas;
    }
    set canvas(canvas) {
        this._canvas = canvas;
    }
    x() {
        return this._x;
    }
    y() {
        return this._y;
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