const fs = require('fs');
const readline = require('readline');
const tripService = require('../service/trip');

/**
 * The main function to run the trip app
 * 
 * @param {string} inputFile - the name and path of the input file
 * @param {string} outputFile - the name and path of the output file
 */
function run(inputFile, outputFile) {
    const rl = readline.createInterface({
        input: fs.createReadStream(inputFile),
        crlfDelay: Infinity
    });
    
    const output = fs.createWriteStream(outputFile, {flags: 'a'});
    
    let lineCount = 0;
    let T = 0;
    let start = 1;
    let sX = 0, sY = 0, dX = 0, dY = 0;
    let N = 0, M = 0;
    let map = [];
    let testCount = 0;
    let splited;
    
    rl.on('line', (line) => {
        if (lineCount === 0) {
            T = parseInt(line);
        } else if (lineCount === start) {
            splited = line.split(/\s+/);
            N = parseInt(splited[0]);
            M = parseInt(splited[1]);
        } else if (lineCount === start + 1) {
            splited = line.split(/\s+/);
            sX = parseInt(splited[0]);
            sY = parseInt(splited[1]);
            dX = parseInt(splited[2]);
            dY = parseInt(splited[3]);
        } else {
            map.push(line.split(/\s+/).map(s => parseInt(s)));
            if (lineCount > start + N) {
                // run a test case
                let result = tripService.startTrip(sX, sY, dX, dY, N, M, map);
                let writeLine = `Case #${++testCount}: ${result}`;
                output.write(writeLine + '\n', (err) => {
                    if (err) {
                        console.error(`Fail to write ${writeLine}. Error: ${err}`);
                    }
    
                    if (testCount >= T) {
                        rl.close();
                    }
                });
    
                map = [];
                start = lineCount + 1;
            }
        }
    
        lineCount++;
    });
    
    rl.on('close', () => {
        console.log('File written finished.');
    });
}

module.exports = {
    run: run
};