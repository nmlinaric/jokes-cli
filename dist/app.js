#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var yargs_1 = __importDefault(require("yargs"));
var chalk_1 = __importDefault(require("chalk"));
var utils_1 = require("./utils/utils");
var options = yargs_1.default
    .usage("Usage: -s <search>")
    .option("s", { alias: "search", describe: "Search keyword", type: "string", demandOption: true })
    .argv;
if (!options.search) {
    console.log("" + chalk_1.default.red('Please provide a valid search word.'));
}
else {
    // The url depends on searching or not
    var url = "https://icanhazdadjoke.com/search?term=" + options.search;
    axios_1.default.get(url, { headers: { Accept: "application/json" } })
        .then(function (res) {
        if (options.search) {
            console.log("Searching for jokes about " + options.search + "...");
            var jokesArray = res.data.results;
            // search for jokes, if there are more than one fetch a random one from that array
            if (jokesArray.length !== 0) {
                var jokesIndex = utils_1.generateRandomNumber(0, jokesArray.length - 1);
                console.log("" + chalk_1.default.green('Your joke:'));
                console.log("" + jokesArray[jokesIndex]['joke']);
                utils_1.writeToTxt(options.search, jokesArray[jokesIndex]['joke']);
            }
            else {
                console.log("" + chalk_1.default.yellow('No jokes found, please try a different word.'));
            }
        }
    })
        .catch(function (err) {
        console.log("" + chalk_1.default.red('Something went wrong, error: ' + ("" + err)));
    });
}
