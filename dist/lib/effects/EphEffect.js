"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const PaintEvent_1 = require("../logging/PaintEvent");
const ResizeEvent_1 = require("../logging/ResizeEvent");
const ClickEvent_1 = require("../logging/ClickEvent");
class EphEffect {
    constructor(eph) {
        this._corner = 0;
        this._isSelected = false; // private bools
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._isSelectingMultiple = false;
        this._justDragged = false;
        this._ratio = 0;
        this._dragoffx = 0;
        this._dragoffy = 0;
        this._initDistance = 0;
        this._mouse = {
            x: 0,
            y: 0
        };
        this._eph = eph;
    }
    /**
     * The method that is called when evaluating nodes (StringNode, EllipseNode, etc)
     * This method assigns all params to private variables and draws the initial object to the canvas
     * by calling update()
     * @param context The parent Scope that contains the canvas among other things
     * @param dims The object's dimensions including x and y position
     * @param ast Unnecessary now, used to be the parent AST
     */
    draw(context, dims, ast) {
        if (context.canvas.isDefined()) {
            this._dims = dims;
            this._canvas = context.canvas.get();
            this._context = context;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this._ephImg = new Image();
            this._ephImg.src = '../pics/demoncow.png';
            this._ratio = this.w / this.h;
            this.update();
        }
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
    }
    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update() {
        let x = this.x;
        let y = this.y;
        let width = this.w;
        let height = this.h;
        //this._ephImg.onload = function(){
        this._ctx.drawImage(this._ephImg, this.x, this.y);
        this._ephImg.width = width;
        this._ephImg.height = height;
        //}
        if (this._isSelected) {
            this.drawGuides(x, y, width, height, this._corner);
        }
    }
    /**
     * Adds all the necessary event listeners in one fell swoop
     */
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
    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx, my) {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        if (mx > x && mx < x + w && my > y && my < y + h) {
            return true;
        }
        else
            return false;
    }
    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx, my) {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        let xdif = mx - x;
        let ydif = my - y;
        /* Corner Guides */
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top left
            return 1;
        }
        xdif = mx - (x + w);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top right
            return 2;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom right
            return 3;
        }
        xdif = mx - x;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom left
            return 4;
        }
        /* Middle Guides */
        xdif = mx - (x + w / 2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top middle
            return 5;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle right
            return 6;
        }
        xdif = mx - (x + w / 2);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom middle
            return 7;
        }
        xdif = mx - x;
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle left
            return 8;
        }
        else
            return 0;
    }
    /**
     * Draws the bounding rectangle and guides for the object when the object is selected
     * If one of the guides is selected, it colors that guide blue
     * @param x the x coordinate for where the rectangle will originate from (top left corner)
     * @param y the y coordinate for where the rectangle will originate from (top left corner)
     * @param w the width of the bounding rectangle
     * @param h the height of the bounding rectangle
     * @param corner the number of the corner to be colored blue (if any at all, if 0, all are white)
     */
    drawGuides(x, y, w, h, corner) {
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if (corner !== 0 && corner <= 4) {
            switch (corner) { //colors the coreph guide blue
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
        else if (corner !== 0) {
            switch (corner) { //colors the coreph guide blue
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
            this.modifyResize(this.w < 10, this.h < 10);
        }
        else if (this._isChangingDims && this._isSelected) {
            this.modifyChangeDims(this.w < 10, this.h < 10);
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
    /**
     * @param event
     */
    onShiftUp(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }
    /* Modification functions */
    modifyDrag() {
        //console.log("ephangle dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    modifyResize(widthTooSmall, heightTooSmall) {
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._eph.width = new NumberNode_1.NumberNode(10);
            this._dims.height.eval(this._context).val = 10 / this._ratio;
            this._eph.height = new NumberNode_1.NumberNode(Math.round(10 / this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this.modifyResizeHelper(newDistance);
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._eph.height = new NumberNode_1.NumberNode(10);
            this._dims.width.eval(this._context).val = 10 * this._ratio;
            this._eph.width = new NumberNode_1.NumberNode(Math.round(10 * this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this.modifyResizeHelper(newDistance);
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this.modifyResizeHelper(newDistance);
        }
    }
    modifyResizeHelper(newDistance) {
        if (this.w > 10 && this.h > 10) {
            switch (this._corner) {
                case 1:
                    this._dims.y.eval(this._context).val -= Math.round((newDistance - this._initDistance) / this._ratio);
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                    break;
                case 2:
                    this._dims.y.eval(this._context).val -= Math.round((newDistance - this._initDistance) / this._ratio);
                    break;
                case 4:
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                    break;
            }
        }
        this._dims.width.eval(this._context).val += newDistance - this._initDistance;
        this._eph.width = new NumberNode_1.NumberNode(Math.round(this.w));
        this._dims.height.eval(this._context).val += (newDistance - this._initDistance) / this._ratio;
        this._eph.height = new NumberNode_1.NumberNode(Math.round(this.h));
        this._initDistance = newDistance;
    }
    modifyChangeDims(widthTooSmall, heightTooSmall) {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._eph.width = new NumberNode_1.NumberNode(10);
            if (newDistance - this._initDistance > 0) {
                this.modifyChangeDimsHelper();
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._eph.height = new NumberNode_1.NumberNode(10);
            if (newDistance - this._initDistance > 0) {
                this.modifyChangeDimsHelper();
            }
        }
        else {
            this.modifyChangeDimsHelper();
        }
    }
    modifyChangeDimsHelper() {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        switch (this._corner) {
            case 5:
                if (this.w > 10 && this.h > 10) {
                    this._dims.y.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._eph.height = new NumberNode_1.NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 6:
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._eph.width = new NumberNode_1.NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 7:
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._eph.height = new NumberNode_1.NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 8:
                if (this.w > 10 && this.h > 10) {
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._eph.width = new NumberNode_1.NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
        }
    }
    /**
     *
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains, contains) {
        this._justDragged = false;
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        if (this._isSelectingMultiple) {
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - x;
                this._dragoffy = this._mouse.y - y;
            }
            else {
                this._dragoffx = this._mouse.x - x;
                this._dragoffy = this._mouse.y - y;
                this._isDragging = true;
            }
        }
        else if (guideContains > 0 && guideContains <= 4) { //resizing
            this._isSelected = true;
            this._isResizing = true;
            this._context.eventLog.push(this.logClick());
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._height1 = this.h;
            this._width1 = this.w;
            //this._size1 = Math.sqrt(Math.pow(w,2) + Math.pow(h,2)); // size is diagonal length
            switch (this._corner) {
                case 1:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h);
                    this._dragoffx = x + w;
                    this._dragoffy = y + h;
                    break;
                case 2:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h);
                    this._dragoffx = x;
                    this._dragoffy = y + h;
                    break;
                case 3:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y);
                    this._dragoffx = x;
                    this._dragoffy = y;
                    break;
                case 4:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y);
                    this._dragoffx = x + w;
                    this._dragoffy = y;
                    break;
            }
            //this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y + h / 2);
        }
        else if (guideContains > 4) { //changing shape dimensions
            this._isSelected = true;
            this._isChangingDims = true;
            this._corner = guideContains;
            switch (this._corner) {
                case 5:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y + h);
                    this._dragoffx = x + w / 2;
                    this._dragoffy = y + h;
                    break;
                case 6:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h / 2);
                    this._dragoffx = x;
                    this._dragoffy = y + h / 2;
                    break;
                case 7:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y);
                    this._dragoffx = x + w / 2;
                    this._dragoffy = y;
                    break;
                case 8:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h / 2);
                    this._dragoffx = x + w;
                    this._dragoffy = y + h / 2;
                    break;
            }
        }
        else if (contains) {
            this._x1 = x; // Saving original x and y
            this._y1 = y;
            this._context.eventLog.push(this.logClick());
            this._isSelected = true;
            this._isDragging = true;
            this._dragoffx = this._mouse.x - x;
            this._dragoffy = this._mouse.y - y;
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
        }
    }
    modifyReset() {
        if (this._isDragging && this._isSelected) {
            this._isDragging = false;
            if (Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
                this._justDragged = true;
            }
        }
        else if ((this._isResizing || this._isChangingDims) && this._isSelected) {
            this._isResizing = false;
            let size2 = Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2));
            if ((Math.abs(this._width1 - this.w) > 0) || (Math.abs(this._height1 - this.h) > 0)) {
                this._context.eventLog.push(this.logResize());
            }
        }
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
        let eph = this._canvas.getBoundingClientRect();
        if (mouseX < eph.left || mouseX > eph.right || mouseY < eph.top || mouseY > eph.bottom) {
            this._isDragging = false;
            this._isResizing = false;
            this._isSelected = false;
            this._corner = 0;
        }
    }
    logPaint() {
        return new PaintEvent_1.PaintEvent("eph", this.x, this.y);
    }
    logResize() {
        return new ResizeEvent_1.ResizeEvent("eph with ID " + this.getID().toString(), Math.round(this._width1 * 100) / 100, Math.round(this._height1 * 100) / 100, Math.round(this.w * 100) / 100, Math.round(this.h * 100) / 100);
    }
    logClick() {
        return new ClickEvent_1.ClickEvent("eph with ID " + this.getID().toString(), this.x, this.y);
    }
    initID(id) {
        this.idObj = { _id: id };
    }
    ast() {
        throw new Error("Not implemented");
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
    get image() {
        return this._ephImg;
    }
    getID() {
        return this.idObj._id;
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
        return " eph with ID " + this.getID().toString() + " at " + this.x + ", " + this.y;
    }
    toDragString() {
        return ("eph with ID " + this.getID().toString() + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }
    toIDString() {
        return (this.idObj._id.toString() + " to eph at " + this.x + ", " + this.y);
    }
}
exports.EphEffect = EphEffect;
//allows us to get the mouse position in relation to the canvas!
//see mousemove event listener
function getMousePos(canvas, event) {
    let eph = canvas.getBoundingClientRect();
    return {
        x: event.clientX - eph.left,
        y: event.clientY - eph.top
    };
}
//computes the distance between two points
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
//# sourceMappingURL=EphEffect.js.map