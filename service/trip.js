const Grid = require('../model/grid');

const movesX = [0, 0, -1, 1];
const movesY = [-1, 1, 0, 0];

/**
 * A function to calculate the largest amount of gas collected in the shortest path
 * 
 * @param {number} startX - the x position of the starting grid
 * @param {number} startY - the y position of the starting grid
 * @param {number} destX - the x position of the destination grid
 * @param {number} destY - the y position of the destination grid
 * @param {number} N - the height of the grid map
 * @param {number} M - the width of the grid map
 * @param {number[][]} map - the gas value in each cell of the map
 * @returns {number|string} - a number of the total gas collected or a Mission Impossible string
 */
function startTrip(startX, startY, destX, destY, N, M, map) {
    let queue = [];
    // track visited grids
    let visited = map.map((row) => {
        return row.map(n => false);
    });
    // track distance between grids and the starting point 
    let dists = map.map((row) => {
        return row.map(n => 0);
    });
    // track maximum gas collected in each grid
    let maxTotalGas = map.map((row) => {
        return row.map(n => -1);
    });
    // track all parents at the same level of a grid
    let parents = new Map();

    const start = new Grid(startX, startY);
    queue.push(start);
    visited[startX][startY] = true;
    maxTotalGas[startX][startY] = map[startX][startY];
    
    // build parents map
    while (queue.length > 0) {
        const curr = queue.shift();
        const x = curr.x;
        const y = curr.y;

        if (x === destX && y === destY) {
            break;
        }
        for (let i = 0; i < movesX.length; i++) {
            const x1 = x + movesX[i];
            const y1 = y + movesY[i];
            const grid = new Grid(x1, y1);

            if (_valid(x1, y1, N, M, map)) {
                if (x1 === startX && y1 === startY) {
                    continue;
                }
                if (!parents.has(grid.toString())) {
                    parents.set(grid.toString(), []);
                }
                const p = parents.get(grid.toString());
                if (!visited[x1][y1]) {
                    visited[x1][y1] = true;
                    dists[x1][y1] = dists[x][y] + 1;
                    queue.push(new Grid(x1, y1));
                    parents.get(grid.toString()).push(curr);
                } else if (dists[x][y] === dists[p[0].x][p[0].y]) {
                    parents.get(grid.toString()).push(curr);
                }
            }
        }
    }
    
    // fill maxTotalGas of each grid by tracking down their parents
    // using a bottom-up dynamic programming solution
    for (let [key, value] of parents) {
        const parentGas = value.map(v => maxTotalGas[v.x][v.y]);
        const maxParentGas = Math.max.apply(null, parentGas);

        const kX = parseInt(key.split(", ")[0]);
        const kY = parseInt(key.split(", ")[1]);
        maxTotalGas[kX][kY] = maxParentGas + map[kX][kY];
    }

    return maxTotalGas[destX][destY] >= 0 ? maxTotalGas[destX][destY] : 'Mission Impossible.';
}

/**
 * A helper function to validate if a given cell is reachable
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} N 
 * @param {number} M 
 * @param {number[][]} map - the gas value in each cell of the map
 * @returns {boolean} - a boolean value indicating whether the cell is reachable or not
 */
function _valid(x, y, N, M, map) {
    if (x < 0 || y < 0 || x >= N || y >= M || map[x][y] < 0) {
        return false;
    }
    return true;
}

module.exports = {
    startTrip: startTrip
};