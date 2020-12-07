const fs = require("fs");

const inputFile = fs.readFileSync("input.json");
const input = Array.from(JSON.parse(inputFile));

let firstPasswordCounter = 0;
let secondPasswordCounter = 0;
input.forEach(validator);

// Answers
console.log(`Number of correct passwords (first answer): ${firstPasswordCounter}`);
console.log(`Number of correct passwords (second answer): ${secondPasswordCounter}`);

function validator(pwObj) {
    let key = Object.keys(pwObj)[0];
    let password = pwObj[key];

    let splitKey = key.split(" ");
    let minOccurence = splitKey[0].split("-")[0]; // Also first occurence
    let maxOccurence = splitKey[0].split("-")[1]; // Also where it cant be
    let letter = splitKey[1];

    if (password.includes(letter)) {
        let letterCount = countInstances(letter, password);
        if (letterCount >= minOccurence && letterCount <= maxOccurence) {
            firstPasswordCounter++;
        }

        if (password.charAt(minOccurence - 1) === letter && (password.charAt(maxOccurence - 1) !== letter) ||
            password.charAt(minOccurence - 1) !== letter && (password.charAt(maxOccurence - 1) === letter)) {
            console.log(`Password: ${password}, letter: ${letter}, first: ${password.charAt(minOccurence - 1)}, second: ${password.charAt(maxOccurence - 1)}`);
            secondPasswordCounter++;
        }
    }
}

function countInstances(candidate, word) {
    return word.split(candidate).length - 1;
}