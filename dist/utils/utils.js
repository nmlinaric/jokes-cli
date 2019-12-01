"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
// function for generating a random integer between min and max values provided (both included)
function generateRandomNumber(min, max) {
    var result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
}
exports.generateRandomNumber = generateRandomNumber;
// function for writing the jokes to a .txt file
function writeToTxt(inputWord, joke) {
    var formattedJoke = "Input Word:\t" + inputWord + "\nJoke: " + joke + "\n" + '-'.repeat(100) + '\n';
    fs_1.default.appendFile('./jokes/jokes.txt', formattedJoke, function (err) {
        if (err) {
            console.log(err);
            throw err;
        }
    });
}
exports.writeToTxt = writeToTxt;
