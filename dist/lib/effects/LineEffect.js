"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const PaintEvent_1 = require("../logging/PaintEvent");
const ResizeEvent_1 = require("../logging/ResizeEvent");
const ClickEvent_1 = require("../logging/ClickEvent");
class LineEffect {
    constructor(line) {
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
        this._line = line;
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
        this._ctx.beginPath();
        this._ctx.moveTo(x, y);
        this._ctx.lineTo(x + width, y + height);
        this._ctx.strokeStyle = "#673AB7";
        this._ctx.stroke();
        if (this._isSelected) {
            this.drawGuides(x, y, width, height, this._corner);
        }
    }
    /**
     * Adds all the necessary event listeners in one fell swoop
     */
    addEventListeners() {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this)); // bind in order to maintain the meaning of 'this'
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    }
    /**
     * Removes all the necessary event listeners in another fell swoop
     */
    removeEventListeners() {
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
        if (corner !== 0 && corner <= 4) { // a corner guide is selected
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
        else if (corner !== 0) { // a middle guide is selected
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
        else { //if no guides are selected, colors everything white
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
    /**
     * Simple method that draws a rectangle
     * @param x x coordinate for the top left corner of the rectangle
     * @param y y coordinate for the top left corner of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param color color of the rectangle's fill
     */
    drawSquare(x, y, w, h, color) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }
    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
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
    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event) {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y), this.contains(this._mouse.x, this._mouse.y));
    }
    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    onMouseUp(event) {
        this.modifyReset();
    }
    /**
     * Called whenever a key is pressed down
     * Toggles the isSelectingMultiple boolean if the key pressed is the shift key
     * @param event the keydown event
     */
    onShiftDown(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }
    /**
     * Called whenever a key is released
     * Toggles the isSelectingMultiple boolean if the key released is the shift key
     * @param event the keydown event
     */
    onShiftUp(event) {
        if (event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }
    /* Modification functions */
    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    modifyDrag() {
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }
    /**
     * Changes the size of the object when called (when a corner guide is clicked and dragged).
     *
     * If any of width or height is too small, it sets them equal to 10 and the other equal to
     * 10 divided or multiplied by the ratio of width/height to keep it the same.
     *
     * The work of changing the size is done by calling the helper method modifyResizeHelper.
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyResize(widthTooSmall, heightTooSmall) {
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._line.dx = new NumberNode_1.NumberNode(10); // set for the prodirect manipulation
            this._dims.height.eval(this._context).val = 10 / this._ratio;
            this._line.dy = new NumberNode_1.NumberNode(Math.round(10 / this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if (newDistance - this._initDistance > 0) {
                this.modifyResizeHelper(newDistance);
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._line.dy = new NumberNode_1.NumberNode(10); // set for the prodirect manipulation
            this._dims.width.eval(this._context).val = 10 * this._ratio;
            this._line.dx = new NumberNode_1.NumberNode(Math.round(10 * this._ratio));
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
    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 1, 2, or 4 are selected
     *
     * @param newDistance the distance between the mouse and the location opposite to it
     * (if top right guide is clicked, the distance between that and the bottom left guide is newDistance)
     */
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
        this._line.dx = new NumberNode_1.NumberNode(Math.round(this.w));
        this._dims.height.eval(this._context).val += (newDistance - this._initDistance) / this._ratio;
        this._line.dy = new NumberNode_1.NumberNode(Math.round(this.h));
        this._initDistance = newDistance;
    }
    /**
     * Changes the dimensions of the object when called.
     * If any of width or height is too small, it sets them equal to 10.
     * Calls modifyChangeDimsHelper to actually do the work
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyChangeDims(widthTooSmall, heightTooSmall) {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        if (widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._line.dx = new NumberNode_1.NumberNode(10);
            if (newDistance - this._initDistance > 0) {
                this.modifyChangeDimsHelper();
            }
        }
        if (heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._line.dy = new NumberNode_1.NumberNode(10);
            if (newDistance - this._initDistance > 0) {
                this.modifyChangeDimsHelper();
            }
        }
        else {
            this.modifyChangeDimsHelper();
        }
    }
    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 5 or 8 are selected
     */
    modifyChangeDimsHelper() {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        switch (this._corner) {
            case 5:
                if (this.h > 10) { //as long as the height is > 10
                    this._dims.y.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._line.dy = new NumberNode_1.NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 6:
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._line.dx = new NumberNode_1.NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 7:
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._line.dy = new NumberNode_1.NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
            case 8:
                if (this.w > 10) { // as long as width is > 10
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._line.dx = new NumberNode_1.NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
                break;
        }
    }
    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains, contains) {
        this._justDragged = false;
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        if (this._isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
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
            switch (this._corner) { // sets the offsets depending on which corner is selected
                case 1: // top left
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h);
                    this._dragoffx = x + w; // offset is bottom right
                    this._dragoffy = y + h;
                    break;
                case 2: // top right
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h);
                    this._dragoffx = x;
                    this._dragoffy = y + h; // offset is bottom left, etc
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
        }
        else if (guideContains > 4) { //changing shape dimensions
            this._isSelected = true;
            this._isChangingDims = true;
            this._corner = guideContains;
            switch (this._corner) { // sets the offsets depending on which middle guide is selected
                case 5: // top middle
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y + h);
                    this._dragoffx = x + w / 2; // offset is bottom middle
                    this._dragoffy = y + h;
                    break;
                case 6: //right middle
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h / 2);
                    this._dragoffx = x;
                    this._dragoffy = y + h / 2; // offset is left middle etc
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
        else if (contains) { // dragging
            this._x1 = x; // Saving original x and y
            this._y1 = y;
            this._context.eventLog.push(this.logClick());
            this._isSelected = true;
            this._isDragging = true;
            this._dragoffx = this._mouse.x - x;
            this._dragoffy = this._mouse.y - y;
        }
        else if (!this._isSelectingMultiple) { // not selected
            this._isSelected = false;
            this._isDragging = false;
        }
    }
    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
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
    /**
     * Gets the current x and y coordinates of the mouse
     */
    getMousePosition() {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }
    /**
     * Sets isDragging, isResizing, isChangingDims, and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    isMouseOutside(event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = this._canvas.getBoundingClientRect();
        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            this._isDragging = false;
            this._isResizing = false;
            this._isChangingDims = false;
            this._isSelected = false;
            this._corner = 0;
        }
    }
    /**
     * Logs a rectangle paint event
     */
    logPaint() {
        return new PaintEvent_1.PaintEvent("rectangle", this.x, this.y);
    }
    /**
     * Logs a rectangle resize event
     */
    logResize() {
        return new ResizeEvent_1.ResizeEvent("rectangle with ID " + this.getID().toString(), Math.round(this._width1 * 100) / 100, Math.round(this._height1 * 100) / 100, Math.round(this.w * 100) / 100, Math.round(this.h * 100) / 100);
    }
    /**
     * Logs a rectangle click event
     */
    logClick() {
        return new ClickEvent_1.ClickEvent("rectangle with ID " + this.getID().toString(), this.x, this.y);
    }
    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id) {
        this.idObj = { _id: id };
    }
    ast() {
        throw new Error("Method not implemented.");
    }
    /**
     * Returns the x position of the rect
     */
    get x() {
        return this._dims.x.eval(this._context).val;
    }
    /**
     * Returns the y position of the rect
     */
    get y() {
        return this._dims.y.eval(this._context).val;
    }
    /**
     * Returns the width of the rect
     */
    get w() {
        return this._dims.width.eval(this._context).val;
    }
    /**
     * Returns the height of the rect
     */
    get h() {
        return this._dims.height.eval(this._context).val;
    }
    /**
     * Returns the Dimensions object
     */
    get dims() {
        return this._dims;
    }
    /**
     * Returns whether or not the rect is selected
     */
    get selected() {
        return this._isSelected;
    }
    /**
     * Returns the ID of the rect
     */
    getID() {
        return this.idObj._id;
    }
    /**
     * Returns whether or not the rect has just been dragged
     */
    getJustDragged() {
        return this._justDragged;
    }
    /**
     * Sets whether or not the rect has just been dragged
     * @param val The value to be assigned
     */
    setJustDragged(val) {
        this._justDragged = val;
    }
    /**
     * Returns whether or not the rect is dragging
     */
    get isDragging() {
        return this._isDragging;
    }
    /**
     * Assembles a string for selection events
     */
    toSelString() {
        return " rectangle with ID " + this.getID().toString() + " at " + this.x + ", " + this.y;
    }
    /**
    * Assembles a string for drag events
    */
    toDragString() {
        return ("rectangle with ID " + this.getID().toString() + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }
    /**
     * Assembles a string for ID assignment events
     */
    toIDString() {
        return (this.idObj._id.toString() + " to rectangle at " + this.x + ", " + this.y);
    }
}
exports.LineEffect = LineEffect;
/**
 * Gets the mouse x and y coordinates in relation to the canvas
 * @param canvas the canvas object
 * @param event the mousemove event
 */
function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
/**
 * Computes the distance between two points
 * @param x1 x coordinate of first point
 * @param y1 y coordinate of first point
 * @param x2 x coordinate of second point
 * @param y2 y coordinate of second point
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
//# sourceMappingURL=LineEffect.js.map