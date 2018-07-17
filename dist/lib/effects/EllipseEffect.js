"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EllipseEffect {
    constructor(circle) {
        this._radius = 10;
        this._circle = circle;
    }
    draw(context, x, y) {
        if (context.canvas.isDefined()) {
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            ctx.beginPath();
            ctx.arc(x, y, this._radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
        //context.effects.push(this);
    }
    ast() {
        throw new Error("Not implemented");
    }
    updateAST() {
        throw new Error("Not implemented");
    }
}
exports.EllipseEffect = EllipseEffect;
//# sourceMappingURL=EllipseEffect.js.map