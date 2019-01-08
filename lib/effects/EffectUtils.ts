// ---------- Utility functions for Effects -----------

export let EffectUtils = {
    /**
     * Get's the mouse x and y coordinates in relation to the canvas
     * @param canvas the canvas object
     * @param event the mousemove event
     */
    getMouseCanvasPos: function (canvas: HTMLCanvasElement, event: MouseEvent): {x: number, y: number} {
        let rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    },

    /**
     * Computes the rounded distance between two points
     * @param x1 x coordinate of first point
     * @param y1 y coordinate of first point
     * @param x2 x coordinate of second point
     * @param y2 y coordinate of second point
     */
    calcDistance: function (x1: number, y1: number, x2: number, y2: number): number {
        return Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
    }
}
