"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringEffect {
    constructor(str) {
        this._fontSize = 20;
        this.mouse = {
            x: 0,
            y: 0
        };
        this._str = str;
    }
    draw(context, x, y) {
        if (context.canvas.isDefined()) {
            let ctx = context.canvas.get().getContext("2d");
            this._canvas = context.canvas.get();
            this._ctx = ctx;
            let fontDeets = this._fontSize + "px Arial";
            ctx.font = fontDeets;
            ctx.fillStyle = 'black';
            ctx.fillText(this._str.val, x, y);
            let dims = ctx.measureText(this._str.val);
            this._w = dims.width;
            this._h = this._fontSize;
            context.effects.push(this);
            this._canvas.addEventListener('mousemove', this.onMouseMove);
        }
        else {
            console.log("canvas is NOT defined");
        }
    }
    onMouseMove(event) {
        this.mouse.x = getMousePos(this._canvas, event).x;
        this.mouse.y = getMousePos(this._canvas, event).y;
        console.log("x: " + this.mouse.x);
        console.log("y: " + this.mouse.y);
    }
    ast() {
        throw new Error("Not implemented");
    }
    updateAST() {
        throw new Error("Not implemented");
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
//# sourceMappingURL=StringEffect.js.map