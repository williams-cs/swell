import { Effect } from "./Effect";
import { FloatNode } from "../prims/FloatNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { PaintEvent } from "../logging/PaintEvent";
import { DragEvent } from "../logging/DragEvent";
import { ResizeEvent } from "../logging/ResizeEvent";
import { LogEvent } from "../logging/LogEvent";
import { ClickEvent } from "../logging/ClickEvent";
import { EffectUtils } from "./EffectUtils";

export class FloatEffect implements Effect<FloatNode> {

    private _ast: Expression<any>;
    private _context: Scope;
    private _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _num: FloatNode;
    private _str: string;
    private _dims: Dimensions;

    private _fontSize: number = 20;
    private _x: number;
    private _y: number;
    private _size1: number; // Original scale for resize logging
    private _corner: number = 0;

    //private _w: number;
    //private _h: number;
    private _isSelected: boolean;
    private _isEditing: boolean = false;
    private _isListening: boolean = false;
    private _isDragging: boolean = false;
    private _isResizing: boolean = false;
    private _isSelectingMultiple: boolean = false;

    private _justDragged: boolean;

    private _dragoffx: number = 0;
    private _dragoffy: number = 0;
    private _initDistance: number = 0;

    idObj: {readonly _id: number};

    private _mouse: {
        x: number,
        y: number
    } = {
        x: 0,
        y: 0
    };

    private _numberMetrics: { // all the details of the number on the canvas
        width: number,
        height: number,
        interval: number,
        str: string,
        initMousePos: number,
        cursorPos: number
    } = {
        width: 0,
        height: 0,
        interval: 0,
        str: "",
        initMousePos: 0,
        cursorPos: 0
    }

    constructor(num: FloatNode) {
        this._num = num;
    }

    /**
     * The method that is called when evaluating nodes (StringNode, EllipseNode, etc)
     * This method assigns all params to private variables and draws the initial object to the canvas
     * by calling update()
     * @param context The parent Scope that contains the canvas among other things
     * @param dims The object's dimensions including x and y position
     * @param ast Unnecessary now, used to be the parent AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        if (context.canvas != undefined) {
          this._context = context;
          this._canvas = context.canvas.get();
          this._dims = dims;
          let ctx = context.canvas.get().getContext("2d");
          this._ctx = ctx;

          this.update();

          // logging
          this._context.eventLog.push(this.logPaint()); // this.context or context?

          context.effects.push(this);

          this.addEventListeners();

        } else {
          console.log("canvas is NOT defined");
        }
    }


    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update(): void {
      let fontDeets: string = this._fontSize + "px Courier New";
      this._ctx.font = fontDeets;
      this._ctx.fillStyle = "#673AB7";
      let str: string = this._num.toString();

      this._ctx.fillText(str, this.x, this.y);

      let numberDims = this._ctx.measureText(str);
      this._numberMetrics.width = numberDims.width;
      this._numberMetrics.height = this._fontSize;
      this._numberMetrics.str = str;
      this._numberMetrics.interval = this._numberMetrics.width / this._numberMetrics.str.length;

      if(this._isSelected) {
          this.drawTextGuides(this.x, this.y - this._fontSize, this._numberMetrics.width, this._numberMetrics.height, this._corner);
      }
      if(this._isEditing) {
          this.modifyTextCursor();
      }
    }

    /**
     * Adds all the necessary event listeners in one fell swoop
     */
    addEventListeners(): void {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this)); // bind in order to maintain the meaning of 'this'
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
    }

    /**
     * Removes all the necessary event listeners in another fell swoop
     */
    removeEventListeners(): void {
    }

    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx: number, my: number): boolean {
        return  (this.x <= mx) && (this.x + this._numberMetrics.width >= mx) &&
          (this.y - this._fontSize <= my) && (this.y >= my);
    }

    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx: number, my: number): number {
        let xdif = mx - (this.x + this._numberMetrics.width);
        let ydif = my - (this.y - this._fontSize);
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){
            this._isEditing = false;
            return 2;
        }
        else return 0;
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
    drawTextGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 2 or 0
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if(corner !== 0){
            switch (corner) { //colors the guide blue if selected
                case 2:
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'blue');
                    break;
            }
        }
        else {
            this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white');
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
    drawSquare(x: number, y: number, w: number, h: number, color: string) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }

    /* Event listener functions */

    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event: any): void {
        this.getMousePosition(event);
        if(this._isSelected && this._isDragging){
            this.modifyDrag();
        }
        else if(this._isResizing && this._isSelected){
            this.modifyResize(this._fontSize < 15);
        }
    }

    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event: any): void {
        if(!this._isSelectingMultiple && this._isSelected && this.contains(this._mouse.x, this._mouse.y)){ //text editing
            if(!this._isListening){
                window.addEventListener('keydown', this.modifyText.bind(this));
            }
            this._isListening = true;
            this._isEditing = true;
            this._isDragging = false;
            this._numberMetrics.initMousePos = this._mouse.x;
            this.modifyTextCursor();
        } else if (!this._isSelectingMultiple){
            this._isSelected = false;
            this._isEditing = false;
        }  else {
            this._isEditing = false;
        }
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y) > 0, this.contains(this._mouse.x, this._mouse.y));
    }

    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    onMouseUp(event: any) {
        this.modifyReset();
    }

    /**
     * Called whenever a key is pressed down
     * Toggles the isSelectingMultiple boolean if the key pressed is the shift key
     * @param event the keydown event
     */
    onShiftDown(event: any) {
        if(event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }

    /**
     * Called whenever a key is released
     * Toggles the isSelectingMultiple boolean if the key released is the shift key
     * @param event the keydown event
     */
    onShiftUp(event: any) {
        if(event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }

    /* Modification functions */

    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    modifyDrag(): void {
        //("string dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }

    /**
     * Creates and moves the text edit cursor based on where the mouse is clicked
     */
    modifyTextCursor(): void {
        let leftWall: number = this.x; // the x position of the left most side of the bounding rectangle
        let xDif: number = this._numberMetrics.initMousePos - leftWall; // difference between mouse x and left wall
        let interval: number = this._numberMetrics.interval; // the text width divided by the length of the string
        let moveFactor: number = 0;
        if(xDif >= interval / 2 && xDif <= interval){
            moveFactor = leftWall + interval;
            this._numberMetrics.cursorPos = interval;
        }
        else if(xDif <= interval / 2) {
            moveFactor = leftWall;
            this._numberMetrics.cursorPos = 0;
        }
        else if(xDif % interval >= interval / 2) {
            moveFactor = leftWall + interval * Math.ceil(xDif / interval);
            this._numberMetrics.cursorPos = interval * Math.ceil(xDif / interval);
        }
        else if(xDif % interval < interval / 2) {
            moveFactor = leftWall + interval * Math.floor(xDif / interval);
            this._numberMetrics.cursorPos = interval * Math.floor(xDif / interval);
        }
        this._ctx.moveTo(moveFactor, this.y - this._fontSize);
        this._ctx.lineTo(moveFactor, this.y);
        this._ctx.strokeStyle = "grey";
        this._ctx.stroke();
    }

    /**
     * This edits the string when editing text
     * @param event keydown event
     */
    modifyText(event: any): void {
        if(this._isEditing) {
            let firstHalf: string;
            let secondHalf: string;
            let str: string = this._num.toString();
            let breakPoint: number = this._numberMetrics.cursorPos / this._numberMetrics.interval;

            firstHalf = str.substring(0, breakPoint);
            secondHalf = str.substring(breakPoint);
            if(event.keyCode == 37 && this._numberMetrics.initMousePos > this.x + this._numberMetrics.interval / 2) {
                this._numberMetrics.initMousePos -= this._numberMetrics.interval;
                this.modifyTextCursor();
            }
            else if(event.keyCode == 39 && this._numberMetrics.initMousePos < this.x + this._numberMetrics.width) {
                this._numberMetrics.initMousePos += this._numberMetrics.interval;
                this.modifyTextCursor();
            }
            else if(event.keyCode == 8 && str.length > 0) {
                firstHalf = firstHalf.substring(0, firstHalf.length - 1);
                str = firstHalf + secondHalf;
                this._num.val = Number(str);
                this._numberMetrics.initMousePos -= this._numberMetrics.interval;
                this.modifyTextCursor();
            }
            else {
                let keyName = event.key;
                if(keyName.length == 1){
                    firstHalf += keyName;
                    str = firstHalf + secondHalf;
                    this._num.val = Number(str);
                    this._numberMetrics.initMousePos += this._numberMetrics.interval;
                    this.modifyTextCursor();
                }
            }
        }
    }

    /**
     * Modifies the font size of the text
     * If the text font is smaller than 15pt, it set's it equal to 15pt
     * @param isTooSmall true if the font size is < 15
     */
    modifyResize(isTooSmall: boolean): void {
        if(isTooSmall){
            this._fontSize = 15;
            let newDistance = EffectUtils.calcDistance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if(newDistance - this._initDistance > 0){
                this._fontSize += (newDistance - this._initDistance) * 0.2;
                this._initDistance = newDistance;
            }
        }
        else {
            let newDistance = EffectUtils.calcDistance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this._fontSize += (newDistance - this._initDistance) * 0.2;
            this._initDistance = newDistance;
        }
    }

    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains: boolean, contains: boolean): void {
        this._justDragged = false;

        if (this._isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this._x = this.x;
                this._y = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - this.x;
                this._dragoffy = this._mouse.y - this.y;
            }
            else {
                this._dragoffx = this._mouse.x - this.x;
                this._dragoffy = this._mouse.y - this.y;
                this._isDragging = true;
            }

            // if(this._context.mulSelected.mulSel){
            //     console.log("string effect mulSelected: " + this._context.mulSelected.mulSel);
            //     //if(this._context.mulSelected.val){
            //     this._context.eventLog.push(this.logSelected());
            //     //this.logSelected();
            // }

        } else if (guideContains || contains) {
            let effects = this._context.effects;
            let curID = this.getID();
            for (let effect of effects) {
                let effectID = effect.getID();
                if (effectID == curID) {
                    continue;
                } else if (effectID > curID && (effect.guideContains(this._mouse.x, this._mouse.y) > 0 || effect.contains(this._mouse.x, this._mouse.y))) {
                    this._isSelected = false;
                    this._isDragging = false;
                    this._isEditing = false;
                    return;
                }
            }

            if (guideContains) { //if the corner guides contain the mouse we are resizing
                this._isSelected = true;
                this._corner = this.guideContains(this._mouse.x, this._mouse.y);

                this._context.eventLog.push(this.logClick());

                this._dragoffx = this.x;
                this._dragoffy = this.y;
                this._initDistance = EffectUtils.calcDistance(this._mouse.x, this._mouse.y, this.x, this.y);
                this._isResizing = true;
                this._size1 = this._fontSize; // saving old font size

            } else if (contains) {
                this._x = this.x; // Saving original x and y
                this._y = this.y;
                this._isSelected = true;

                this._context.eventLog.push(this.logClick());

                this._dragoffx = this._mouse.x - this.x;
                this._dragoffy = this._mouse.y - this.y;
                if(!this._isEditing){
                    this._isDragging = true;
                }
            }

        } else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
            this._isEditing = false;
        }
    }

    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset(): void {
        if(this._isDragging && this._isSelected){
            this._isDragging = false;
            if(Math.abs(this._x - this.x) > 1 || Math.abs(this._y - this.y) > 1) {
                this._justDragged = true;
                //this._context.eventLog.push(this.logMove());
            }
        } else if (this._isResizing && this._isSelected){
            this._isResizing = false;
            if(Math.abs(this._size1 - this._fontSize) > 0){
                this._context.eventLog.push(this.logResize());
            }
        }
        this._isDragging = false;
        this._isResizing = false;
        this._corner = 0;

        // console.log("string effect mulSelected: " + this._context.mulSelected.val);
        // if(this._context.mulSelected.val){
        //     this.logSelected();
        // }
        // if(this.isMultipleSelected){
        //     context.eventLog.push(new SelectEvent(selectedElems));
        //     masterLog.push(context.eventLog[context.eventLog.length - 1]);
        //     //console.log("multiple selected");
        // }
        // //this._context.eventLog.push(this.logMove());
    }

    /**
     * Gets the current x and y coordinates of the mouse
     * NOTE: in Firefox, window.event is not global. Need to be passed in here as a paramater.
     * @param event the mousedown event
     */
    getMousePosition(event: any): void {
        this._mouse.x = EffectUtils.getMouseCanvasPos(this._canvas, event).x;
        this._mouse.y = EffectUtils.getMouseCanvasPos(this._canvas, event).y;
    }

    /**
     * Sets isDragging, isResizing, isChangingDims, and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    isMouseOutside(event: any): void {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = this._canvas.getBoundingClientRect();
        if(mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            this._isDragging = false;
            this._isResizing = false;
            this._isSelected = false;
            this._isEditing = false;
            this._corner = 0;
        }
    }

    /**
     * Logs a paint event
     */
    logPaint(): LogEvent<any> {
        return new PaintEvent(this._num.toString(), this.x, this.y);
    }

    /**
     * Logs a resize event
     */
    logResize(): LogEvent<any> {
        return new ResizeEvent(this._num.toString() + " with ID " + this.getID().toString(), Math.round(this._size1*100)/100, Math.round(this._fontSize*100)/100);
    }

    /**
     * Logs a click event
     */
    logClick(): LogEvent<any>{
        return new ClickEvent(this._num.toString() + " with ID " + this.getID().toString(), this.x, this.y);
    }

    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id: number){
        this.idObj = {_id: id,};
    }

    /**
     * Returns the canvas
     */
    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    /**
     * Sets the canvas
     * @param canvas The canvas to be assigned
     */
    set canvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
    }

    ast(): Expression<FloatNode> {
        throw new Error("Method not implemented.");
    }

    /**
     * Returns the x position of the number
     */
    get x(): number {
        return this._dims.x.eval(this._context).val;
    }
    /**
     * Returns the y position of the number
     */
    get y(): number {
        return this._dims.y.eval(this._context).val;
    }

    /**
     * Returns the Dimensions object
     */
    get dims(): Dimensions {
        return this._dims;
    }

    /**
    * Returns whether or not the ellipse has just been dragged
    */
   getJustDragged(): boolean {
       return this._justDragged;
   }

   /**
    * Sets whether or not the ellipse has just been dragged
    * @param val The value to be assigned
    */
   setJustDragged(val: boolean) {
       this._justDragged = val;
   }

   /**
    * Returns whether or not the ellipse is dragging
    */
   get isDragging(): boolean {
       return this._isDragging;
   }

   /**
    * Returns whether or not this is selected
    */
   get selected(): boolean {
       return this._isSelected;
   }

   /**
    * Returns the number
    */
   get num(): number {
       return this._num.val;
   }

   /**
    * Returns the object ID
    */
   getID(): number{
       return this.idObj._id;
   }

   /**
    * Assembles a string for selection events
    */
   toSelString(): string {
       return " " + this._num.toString() + " with ID " + this.getID().toString() + " at " + this.x + ", " + this.y;
   }

   /**
   * Assembles a string for drag events
   */
   toDragString(): string{
       return(this._num.toString() + " with ID " + this.getID().toString() + " from " + this._x + ", " + this._y + " to " + this.x + ", " + this.y);
   }

   /**
    * Assembles a string for ID assignment events
    */
   toIDString(): string {
       return (this.idObj._id.toString() + " to " + this._num.toString() + " at " + this.x + ", " + this.y);
   }
}
