"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaintEvent_1 = require("../logging/PaintEvent");
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
        this._isChangingDims = false;
        this._isSelectingMultiple = false;
        this._justDragged = false; // Has this object just been dragged?
        this._ratio = 0;
        this._dragoffx = 0;
        this._dragoffy = 0;
        this._initDistance = 0;
        this._mouse = {
            x: 0,
            y: 0
        };
        this._circle = circle;
        this.idObj.setID = false;
    }
    draw(context, dims, ast) {
        if (context.canvas.isDefined()) {
            this._dims = dims;
            this._ast = ast;
            this._canvas = context.canvas.get();
            this._context = context;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
            this.update();
        }
        // logging
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
    }
    update() {
        let x = this._dims.x.eval(this._context).val;
        let y = this._dims.y.eval(this._context).val;
        let w = this._dims.width.eval(this._context).val;
        let h = this._dims.height.eval(this._context).val;
        this._ctx.beginPath();
        this._ctx.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2, false);
        this._ctx.strokeStyle = "black";
        this._ctx.stroke();
        if (this._isSelected) {
            this.drawGuides(x - w / 2, y - h / 2, w, h, this._corner);
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
        return Math.pow(mx - x, 2) / Math.pow(w / 2, 2) + Math.pow(my - y, 2) / Math.pow(h / 2, 2) <= 1;
    }
    guideContains(mx, my) {
        let x = this._dims.x.eval(this._context).val;
        let y = this._dims.y.eval(this._context).val;
        let w = this._dims.width.eval(this._context).val;
        let h = this._dims.height.eval(this._context).val;
        let xdif = mx - (x - w / 2);
        let ydif = my - (y - h / 2);
        /* Corner Guides */
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top left
            return 1;
        }
        xdif = mx - (x + w / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top right
            return 2;
        }
        xdif = mx - (x + w / 2);
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom right
            return 3;
        }
        xdif = mx - (x - w / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom left
            return 4;
        }
        /* Middle Guides */
        xdif = mx - x;
        ydif = my - (y - h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top middle
            return 5;
        }
        xdif = mx - (x + w / 2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle right
            return 6;
        }
        xdif = mx - x;
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom middle
            return 7;
        }
        xdif = mx - (x - w / 2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle left
            return 8;
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
        if (corner !== 0 && corner <= 4) {
            switch (corner) { //colors the correct guide blue
                case 1:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'blue'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 2:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 3:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 4:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
            }
        }
        else if (corner !== 0 && corner > 4) {
            switch (corner) { //colors the correct guide blue
                case 5:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'blue'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 6:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 7:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 8:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle left
                    break;
            }
        }
        else {
            this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
            this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
            this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
            this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
            this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
            this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
            this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
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
            this.modifyResize(this._dims.width.eval(this._context).val < 14, this._dims.height.eval(this._context).val < 14);
        }
        else if (this._isChangingDims && this._isSelected) {
            this.modifyChangeDims(this._dims.width.eval(this._context).val < 14, this._dims.height.eval(this._context).val < 14);
        }
    }
    onMouseDown(event) {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y), this.contains(this._mouse.x, this._mouse.y));
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
        //console.log("ellipse dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    modifyResize(widthTooSmall, heightTooSmall) {
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 14;
            this._circle.width = new NumberNode_1.NumberNode(14);
            this._dims.height.eval(this._context).val = 14 / this._ratio;
            this._circle.height = new NumberNode_1.NumberNode(Math.round(14 / this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                this._circle.width = new NumberNode_1.NumberNode(Math.round(this._dims.width.eval(this._context).val));
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                this._circle.height = new NumberNode_1.NumberNode(Math.round(this._dims.height.eval(this._context).val));
                this._initDistance = newDistance;
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 14;
            this._circle.height = new NumberNode_1.NumberNode(14);
            this._dims.width.eval(this._context).val = 14 * this._ratio;
            this._circle.width = new NumberNode_1.NumberNode(Math.round(14 * this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                this._circle.width = new NumberNode_1.NumberNode(Math.round(this._dims.width.eval(this._context).val));
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                this._circle.height = new NumberNode_1.NumberNode(Math.round(this._dims.height.eval(this._context).val));
                this._initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
            this._circle.width = new NumberNode_1.NumberNode(Math.round(this._dims.width.eval(this._context).val));
            this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
            this._circle.height = new NumberNode_1.NumberNode(Math.round(this._dims.height.eval(this._context).val));
            this._initDistance = newDistance;
        }
    }
    modifyChangeDims(widthTooSmall, heightTooSmall) {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        if (this._corner == 5 || this._corner == 7) {
            if (!heightTooSmall) {
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                this._circle.height = new NumberNode_1.NumberNode(Math.round(this._dims.height.eval(this._context).val));
                this._initDistance = newDistance;
                this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
            }
            else {
                this._dims.height.eval(this._context).val = 14;
                this._circle.height = new NumberNode_1.NumberNode(14);
                this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                if (newDistance - this._initDistance > 0) {
                    this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                    this._circle.height = new NumberNode_1.NumberNode(Math.round(this._dims.height.eval(this._context).val));
                    this._initDistance = newDistance;
                    this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                }
            }
        }
        else {
            if (!widthTooSmall) {
                this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                this._circle.width = new NumberNode_1.NumberNode(Math.round(this._dims.width.eval(this._context).val));
                this._initDistance = newDistance;
                this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
            }
            else {
                this._dims.width.eval(this._context).val = 14;
                this._circle.width = new NumberNode_1.NumberNode(14);
                this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                if (newDistance - this._initDistance > 0) {
                    this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                    this._circle.width = new NumberNode_1.NumberNode(Math.round(this._dims.width.eval(this._context).val));
                    this._initDistance = newDistance;
                    this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                }
            }
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
            // this._isSelected = true;
            // this._isDragging = true; // originally had if else with if(contains), but they were the same except for isSelected
            // this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
            // this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
        }
        else if (guideContains > 0 && guideContains <= 4) { //resizing
            this._isSelected = true;
            this._isResizing = true;
            this._context.eventLog.push(this.logClick());
            this._corner = guideContains;
            this._dragoffx = this._dims.x.eval(this._context).val;
            this._dragoffy = this._dims.y.eval(this._context).val;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
            this._size1 = Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2)); // saving old size
        }
        else if (guideContains > 4) { //changing shape dimensions
            this._isSelected = true;
            this._isChangingDims = true;
            this._corner = guideContains;
            this._dragoffx = this._dims.x.eval(this._context).val;
            this._dragoffy = this._dims.y.eval(this._context).val;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
        }
        else if (contains) { //simply selecting the shape
            this._x1 = this.x; // Saving original x and y
            this._y1 = this.y;
            this._isSelected = true;
            this._isDragging = true;
            this._context.eventLog.push(this.logClick());
            this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
            this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
        }
    }
    // on mouse up
    modifyReset() {
        if (this._isDragging && this._isSelected) { // probs only need dragging but oh well | isSel || selMul?
            this._isDragging = false;
            if (Math.abs(this._x1 - this._dims.x.eval(this._context).val) > 1 || Math.abs(this._y1 - this._dims.y.eval(this._context).val) > 1) {
                this._justDragged = true;
                //this._context.eventLog.push(this.logMove());
            }
        }
        else if ((this._isResizing || this._isChangingDims) && this._isSelected) {
            //console.log("resizing ellipse");
            this._isResizing = false;
            let size2 = Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2));
            //console.log("Size diff: " + Math.abs(this._size1 - size2));
            if (Math.abs(this._size1 - size2) > 0) {
                this._context.eventLog.push(this.logResize());
            }
        }
        // if(this._isSelectingMultiple){
        //     if(Math.abs(this._x1 - this._dims.x.eval(this._context).val) > 1 || Math.abs(this._y1 - this._dims.y.eval(this._context).val) > 1) {
        //         this._context.eventLog.push(this.logMove());
        //     }
        // }
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
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
            this._isDragging = false;
            this._isResizing = false;
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
    // logMove(): LogEvent<any> {
    //     //console.log("x1,y1,x,y: " + this._x1 + " " + this._y1 + " " + this._dims.x + " " + this._dims.y);
    //     return new DragEvent("ellipse", this._x1, this._y1, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    // }
    logResize() {
        return new ResizeEvent_1.ResizeEvent("ellipse", this._size1, Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2)));
    }
    logClick() {
        return new ClickEvent_1.ClickEvent("ellipse", this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }
    updateAST() {
        throw new Error("Not implemented");
    }
    initID(id) {
        if (!this.idObj.setID)
            this.idObj = { _id: id, setID: true };
    }
    get x() {
        return this._dims.x.eval(this._context).val;
    }
    get y() {
        return this._dims.y.eval(this._context).val;
    }
    get w() {
        return this._dims.width.eval(this._context).val;
    }
    get h() {
        return this._dims.height.eval(this._context).val;
    }
    get dims() {
        return this._dims;
    }
    get selected() {
        return this._isSelected;
    }
    get id() {
        return this.idObj._id;
    }
    get setID() {
        return this.idObj.setID;
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
    toSelString() {
        return (" ellipse at " + this.x + ", " + this.y);
    }
    toDragString() {
        return ("ellipse from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }
    equalsVal(right) {
        if (right instanceof EllipseEffect) {
            return (this.w === right.w && this.h === right.h);
        }
        return false;
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