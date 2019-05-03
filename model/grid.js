/**
 * @class Grid
 * 
 * A Grid class that contains the x and y position of a grid
 */
class Grid {
    /**
     * Create a new Grid object with x and y coordination
     * 
     * @param {number} x - the x position of the grid
     * @param {number} y - the y position of the grid
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * A function to return the string representation of the Grid object
     * 
     * @returns {string} - a string that rpresents the corresponding object with x and y position value
     */
    toString() {
        return `${this.x}, ${this.y}`;
    }
}

module.exports = Grid;