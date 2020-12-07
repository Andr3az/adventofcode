const fs = require("fs");
const inputFile = fs.readFileSync("input.json");
const input = Array.from(JSON.parse(inputFile));

const tree = "#";

let secondResult = countTrees(input, 1, 1);
let firstResult = countTrees(input, 3, 1);
let thirdResult = countTrees(input, 5, 1);
let fourthResult = countTrees(input, 7, 1);
let fifthResult = countTrees(input, 1, 2);


console.log(`Found ${secondResult} trees`);
console.log(`Found ${firstResult} trees`);
console.log(`Found ${thirdResult} trees`);
console.log(`Found ${fourthResult} trees`);
console.log(`Found ${fifthResult} trees`);

console.log(`Endresult : ${firstResult * secondResult * thirdResult * fourthResult * fifthResult}`);
function countTrees(track, right, down) {
    let treecounter = 0;
    let colIndex = 0;
    let downCounter = 0;

    track.forEach((row, idx) => {

        if (downCounter === down) {

            colIndex += right;
            if (colIndex >= row.length) {
                colIndex -= row.length;
            }

            if (row.charAt(colIndex) == tree) {
                treecounter++;
            }

            downCounter = 0;
        }
        downCounter++;
    });

    return treecounter;
}