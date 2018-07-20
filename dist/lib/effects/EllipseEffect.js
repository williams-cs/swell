"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaintEvent_1 = require("../logging/PaintEvent");
class EllipseEffect {
    constructor(circle) {
        this._radius = 30;
        this._corner = 0;
        this._selected = false;
        this._mouse = {
            x: 0,
            y: 0
        };
        this._circle = circle;
    }
    draw(context, x, y) {
        if (context.canvas.isDefined()) {
            this._canvas = context.canvas.get();
            this._myState = context.myState;
            this._x = x;
            this._y = y;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            ctx.beginPath();
            ctx.arc(x, y, this._radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = "black";
            ctx.stroke();
            if (this._selected) {
                this.drawGuides(this._x - this._radius, this._y - this._radius, this._radius * 2, this._radius * 2, this._corner);
            }
        }
        if (!context.effects.includes(this)) {
            context.effects.push(this);
        }
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    }
    contains(mx, my) {
        return distance(mx, my, this._x, this._y) < this._radius;
    }
    guideContains(mx, my) {
        let xdif = mx - (this._x - this._radius);
        let ydif = my - (this._y - this._radius);
        if (xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5) {
            return 1;
        }
        xdif = mx - (this._x + this._radius);
        if (xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5) {
            return 2;
        }
        xdif = mx - (this._x + this._radius);
        ydif = my - (this._y + this._radius);
        if (xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5) {
            return 3;
        }
        xdif = mx - (this._x - this._radius);
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
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
        if (this._myState.dragging && this._selected) {
            this._x = this._mouse.x - this._myState.dragoffx;
            this._y = this._mouse.y - this._myState.dragoffy;
        }
        else if (this._myState.resizing && this._selected) {
            if (this._radius >= 10) {
                let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
                this._radius += newDistance - this._myState.initDistance;
                this._myState.initDistance = newDistance;
            }
            else {
                this._radius = 10;
                let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
                if (newDistance - this._myState.initDistance > 0) {
                    this._radius += newDistance - this._myState.initDistance;
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
        }
        else if (this.contains(this._mouse.x, this._mouse.y)) {
            console.log(true);
            this._selected = true;
            this._myState.selection = this;
            this._myState.dragoffx = this._mouse.x - this._x;
            this._myState.dragoffy = this._mouse.y - this._y;
            this._myState.dragging = true;
        }
        else {
            this._selected = false;
        }
    }
    onMouseUp(event) {
        this._myState.dragging = false;
        this._myState.resizing = false;
        this._corner = 0;
    }
    ast() {
        throw new Error("Not implemented");
    }
    logPaint() {
        let paint = new PaintEvent_1.PaintEvent("ellipse at " + this._x + ", " + this._y);
        return paint.assembleLog();
    }
    updateAST() {
        throw new Error("Not implemented");
    }
    x() {
        return this._x;
    }
    y() {
        return this._y;
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