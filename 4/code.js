const fs = require("fs");
const inputFile = fs.readFileSync("input.txt", "utf-8").split("\r\n\r\n");

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]; //cid

let passports = [];
let validPassports = 0;
inputFile.forEach((line, idx) => {
    let passport = {};
    let parsedLine = line.replace(/(?:\r\n|\r|\n)/g, " ").split(" ");
    let requiredFieldCounter = 0;
    parsedLine.forEach(row => {
        let split = row.split(":");
        passport[split[0]] = split[1];
        if (requiredFields.includes(split[0])) {
            requiredFieldCounter++;
        }
    });
    if (requiredFieldCounter >= 7) {
        passports.push(passport);
    }
});

// pt 2

passports.forEach(passport => {
    let valid = true;
    for (let i = 0; i < Object.keys(passport).length; i++) {
        const key = Object.keys(passport)[i];
        const value = passport[key];

        if (!validator(key, value)) {
            valid = false;
            break;
        }
    }
    if (valid) {
        validPassports++;
    }
});

console.log("Number of valid passports: ", validPassports);


function validator(key, value) {
    let isValid = true;
    const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

    switch (key) {
        case "byr":
            isValid = value.length === 4 && value >= 1920 && value <= 2002;
            break;
        case "iyr":
            isValid = value.length === 4 && value >= 2010 && value <= 2020;

            break;
        case "eyr":
            isValid = value.length === 4 && value >= 2020 && value <= 2030;
            
            break;
        case "hgt":
            isValid = (value.split("cm").length === 2 && value.split("cm")[0] <= 193 && value.split("cm")[0] >= 150) ||
                (value.split("in").length === 2 && value.split("in")[0] <= 76 && value.split("in")[0] >= 59);

            break;
        case "hcl":
            isValid = value.split("#").length === 2 && value.split("#")[1].length === 6 && /^[a-fA-F0-9]+$/.test(value.split("#")[1]);
            
            break;
        case "ecl":
            isValid = validEyeColors.includes(value);
            
            break;
        case "pid":
            isValid = value.length === 9;
            
            break;
        default:
            break;
    }
    // if(isValid) console.log(key, value);
    return isValid;
}