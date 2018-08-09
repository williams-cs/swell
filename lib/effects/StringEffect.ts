import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { PrintNode } from "../structural/PrintNode";
import { PaintEvent } from "../logging/PaintEvent";
import { DragEvent } from "../logging/DragEvent";
import { ResizeEvent } from "../logging/ResizeEvent";
import { LogEvent } from "../logging/LogEvent";
import { ClickEvent } from "../logging/ClickEvent";
import { SelectEvent } from "../logging/SelectEvent";

export class StringEffect implements Effect<StringNode> {

    private _ast: Expression<any>;
    private _context: Scope;
    private _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _str: StringNode;
    private _dims: Dimensions;
    private _fontSize: number = 20;
    private _x1: number; // Original position for drag logging
    private _y1: number;
    private _size1: number; // Original scale for resize logging
    //private _size2: number;
    private _corner: number = 0;
    idObj: {readonly _id: number};
    


    private _isSelected: boolean = false; // Private bools
    private _isEditing: boolean = false;
    private _isListening: boolean = false;
    private _isDragging: boolean = false;
    private _isResizing: boolean = false;
    private _isSelectingMultiple: boolean = false;

    private _justDragged: boolean = false; // Has this object just been dragged?

    //private _log: string[];

    private _dragoffx: number = 0;
    private _dragoffy: number = 0;
    private _initDistance: number = 0;

    private _mouse: {
        x: number,
        y: number
    } = {
        x: 0,
        y: 0
    };
    private _textMetrics: {
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

    constructor(str: StringNode) {
        this._str = str;
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        if (context.canvas.isDefined()) {
            this._ast = ast;
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
        }
        else {
            console.log("canvas is NOT defined");
        }
    }

    update(): void {
        let fontDeets: string = this._fontSize + "px Courier New";
        this._ctx.font = fontDeets;
        this._ctx.fillStyle = 'black';
        this._ctx.fillText(this._str.val, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
        let textDims = this._ctx.measureText(this._str.val);
        this._textMetrics.width = textDims.width;
        this._textMetrics.height = this._fontSize;
        this._textMetrics.str = this._str.val;
        this._textMetrics.interval = this._textMetrics.width / this._textMetrics.str.length;
        if(this._isSelected) {
            this.drawTextGuides(this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val - this._fontSize, this._textMetrics.width, this._textMetrics.height, this._corner);
        }
        if(this._isEditing) {
            this.modifyTextCursor();
        }
    }

    addEventListeners(): void {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
    }

    /* Event listener functions */
    onMouseMove(event: any): void {
        this.getMousePosition();
        if(this._isSelected && this._isDragging){
            //console.log(this._str.val + " is being dragged.");
            this.modifyDrag();
        }
        else if(this._isResizing && this._isSelected){
            this.modifyResize(this._fontSize < 15);
        }
    }

    onMouseDown(event: any): void {
        if(!this._isSelectingMultiple && this._isSelected && this.contains(this._mouse.x, this._mouse.y)){ //text editing
            if(!this._isListening){
                window.addEventListener('keydown', this.modifyText.bind(this));
            }
            this._isListening = true;
            this._isEditing = true;
            this._isDragging = false;
            //console.log(this._str.val + " is setting dragging to false");
            this._textMetrics.initMousePos = this._mouse.x;
            this.modifyTextCursor();
        } else if (!this._isSelectingMultiple){
            this._isSelected = false;
            this._isEditing = false;
        }  else {
            this._isEditing = false;
        }
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y) > 0, this.contains(this._mouse.x, this._mouse.y));
    }

    onMouseUp(event: any) {
        this.modifyReset();
    }

    onShiftDown(event: any) {
        if(event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }

    onShiftUp(event: any) {
        if(event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }

    /* Modification functions */
    modifyDrag(): void {
        //("string dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }

    modifyTextCursor(): void {
        let leftWall: number = this._dims.x.eval(this._context).val;
        let xDif: number = this._textMetrics.initMousePos - leftWall;
        let interval: number = this._textMetrics.interval;
        let moveFactor: number = 0;
        if(xDif >= interval / 2 && xDif <= interval){
            moveFactor = leftWall + interval;
            this._textMetrics.cursorPos = interval;
        }
        else if(xDif <= interval / 2) {
            moveFactor = leftWall;
            this._textMetrics.cursorPos = 0;
        }
        else if(xDif % interval >= interval / 2) {
            moveFactor = leftWall + interval * Math.ceil(xDif / interval);
            this._textMetrics.cursorPos = interval * Math.ceil(xDif / interval);
        }
        else if(xDif % interval < interval / 2) {
            moveFactor = leftWall + interval * Math.floor(xDif / interval);
            this._textMetrics.cursorPos = interval * Math.floor(xDif / interval);
        }
        this._ctx.moveTo(moveFactor, this._dims.y.eval(this._context).val - this._fontSize);
        this._ctx.lineTo(moveFactor, this._dims.y.eval(this._context).val);
        this._ctx.strokeStyle = "grey";
        this._ctx.stroke();
    }

    modifyText(event: any): void {
        if(this._isEditing) {
            let firstHalf: string;
            let secondHalf: string;
            let breakPoint: number = this._textMetrics.cursorPos / this._textMetrics.interval;
            firstHalf = this._str.val.substring(0, breakPoint);
            secondHalf = this._str.val.substring(breakPoint);
            if(event.keyCode == 37 && this._textMetrics.initMousePos > this._dims.x.eval(this._context).val + this._textMetrics.interval / 2) {
                this._textMetrics.initMousePos -= this._textMetrics.interval;
                this.modifyTextCursor();
            }
            else if(event.keyCode == 39 && this._textMetrics.initMousePos < this._dims.x.eval(this._context).val + this._textMetrics.width) {
                this._textMetrics.initMousePos += this._textMetrics.interval;
                this.modifyTextCursor();
            }
            else if(event.keyCode == 8 && this._str.val.length > 0) {
                firstHalf = firstHalf.substring(0, firstHalf.length - 1);
                this._str.str = firstHalf + secondHalf;
                this._textMetrics.initMousePos -= this._textMetrics.interval;
                this.modifyTextCursor();
                console.log("backspace");
            }
            else {
                let keyName = event.key;
                if(keyName.length == 1){
                    firstHalf += keyName;
                    this._str.str = firstHalf + secondHalf;
                    this._textMetrics.initMousePos += this._textMetrics.interval;
                    this.modifyTextCursor();
                }
            }
        }
    }

    modifyResize(isTooSmall: boolean): void {
        if(isTooSmall){
            this._fontSize = 15;
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if(newDistance - this._initDistance > 0){
                this._fontSize += (newDistance - this._initDistance) * 0.2;
                this._initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this._fontSize += (newDistance - this._initDistance) * 0.2;
            this._initDistance = newDistance;
        }
    }

    // on mouse down
    modifyState(guideContains: boolean, contains: boolean): void {
        this._justDragged = false;

        if (this._isSelectingMultiple) {
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
                this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
            } else {
                this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
                this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
                this._isDragging = true;
            }

            // if(this._context.mulSelected.mulSel){
            //     console.log("string effect mulSelected: " + this._context.mulSelected.mulSel);
            //     //if(this._context.mulSelected.val){
            //     this._context.eventLog.push(this.logSelected());
            //     //this.logSelected();
            // }
        } else if (guideContains) { //if the corner guides contain the mouse we are resizing 
            this._isSelected = true;
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);

            this._context.eventLog.push(this.logClick());

            //console.log(this._str.val + "is selected?" + this._selected);
            //console.log("state selection is " + this._str.val);

            this._dragoffx = this._dims.x.eval(this._context).val;
            this._dragoffy = this._dims.y.eval(this._context).val;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
            this._isResizing = true;
            this._size1 = this._fontSize; // saving old font size
        } else if (contains) {
            this._x1 = this.x; // Saving original x and y
            this._y1 = this.y;
            this._isSelected = true;

            this._context.eventLog.push(this.logClick());

            //console.log(this._str.val + "is selected?" + this._selected);
            //console.log("state selection is " + this._str.val);

            this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
            this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
            if(!this._isEditing){
                this._isDragging = true;
                //console.log(this._str.val + " is dragging? " + this._isDragging);
            }
        } else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
            this._isEditing = false;
        }
    }

    modifyReset(): void {
        //console.log(this._str.val + " just released");
        //console.log(this._str.val + " is dragging? " + this._myState.dragging);
        if(this._isDragging && this._isSelected){
            //console.log(this._str.val + " logging drag");
            this._isDragging = false;
            if(Math.abs(this._x1 - this._dims.x.eval(this._context).val) > 1 || Math.abs(this._y1 - this._dims.y.eval(this._context).val) > 1) {
                this._justDragged = true;
                //this._context.eventLog.push(this.logMove());
            }
        } else if (this._isResizing && this._isSelected){
            //console.log(this._str.val + " logging resize");
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

    getMousePosition(): void {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }

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

    contains(mx: number, my: number): boolean {
        return  (this._dims.x.eval(this._context).val <= mx) && (this._dims.x.eval(this._context).val + this._textMetrics.width >= mx) &&
          (this._dims.y.eval(this._context).val - this._fontSize <= my) && (this._dims.y.eval(this._context).val >= my);
    }

    guideContains(mx: number, my: number): number {
        let xdif = mx - (this._dims.x.eval(this._context).val + this._textMetrics.width);
        let ydif = my - (this._dims.y.eval(this._context).val - this._fontSize);
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){
            this._isEditing = false;
            return 2;
        }
        else return 0;
    }

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

    drawSquare(x: number, y: number, w: number, h: number, color: string) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }

    logPaint(): LogEvent<any> {
        return new PaintEvent(this._str.val, this.x, this.y);
    }
    
    // logMove(): LogEvent<any> {
    //     return new DragEvent(this._str.val, this._x1, this._y1, this.x, this.y);
    // }

    logResize(): LogEvent<any> {
        return new ResizeEvent(this._str.val + " with ID " + this.getID().toString(), Math.round(this._size1*100)/100, Math.round(this._fontSize*100)/100);
    }

    logClick(): LogEvent<any>{
        return new ClickEvent(this._str.val + " with ID " + this.getID().toString(), this.x, this.y);
    }

    // logSelected(): LogEvent<any>{
    //     //console.log("Logging selected!!");
    //     return new SelectEvent(this._context.mulSelArray);
    // }

    ast(): Expression<StringNode> {
        return this._ast;
    }

    initID(id: number){
        this.idObj = {_id: id,};
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    set canvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
    }

    get x(): number {
        return this._dims.x.eval(this._context).val;
    }
    get y(): number {
        return this._dims.y.eval(this._context).val;
    }

    get dims(): Dimensions {
        return this._dims;
    }

    getJustDragged(): boolean {
        return this._justDragged;
    }
    setJustDragged(val: boolean) {
        this._justDragged = val;
    }
    get isDragging(): boolean {
        return this._isDragging;
    }

    get selected(): boolean {
        return this._isSelected;
    }

    get str(): string {
        return this._str.val;
    }

    getID(): number{
        return this.idObj._id;
    }

    toSelString(): string {
        return " " + this._str.val + " with ID " + this.getID().toString() + " at " + this.x + ", " + this.y;
    }

    toDragString(): string{
        return(this._str.val + " with ID " + this.getID().toString() + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }

    toIDString(): string {
        return (this.idObj._id.toString() + " to " + this._str.val + " at " + this.x + ", " + this.y);
    }

    equalsVal(right: Effect<any>): boolean{
        if(right instanceof StringEffect){
            return this.str === right.str;
        }
        return false;
    }
}

//allows us to get the mouse position in relation to the canvas!
//see mousemove event listener
function getMousePos(canvas: any, event: any): {x: number, y: number} {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//computes the distance between two points
function distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
}