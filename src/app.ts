#!/usr/bin/env node

import axios    from "axios";
import yargs    from "yargs";
import chalk    from "chalk";

import {
  generateRandomNumber,
  writeToTxt }  from "./utils/utils";


const options = yargs
 .usage("Usage: -s <search>")
 .option("s", { alias: "search", describe: "Search keyword", type: "string", demandOption: true })
 .argv;


if (!options.search) {
    console.log(`${chalk.red('Please provide a valid search word.')}`);
  } else {
    // The url depends on searching or not
    const url = `https://icanhazdadjoke.com/search?term=${options.search}`;

    axios.get(url, { headers: { Accept: "application/json" } })
    .then(res => {
      if (options.search) {
        console.log(`Searching for jokes about ${options.search}...`);
        const jokesArray = res.data.results;
        // search for jokes, if there are more than one fetch a random one from that array
        if (jokesArray.length !== 0) {
          const jokesIndex = generateRandomNumber(0, jokesArray.length-1);
          console.log(`${chalk.green('Your joke:')}`);
          console.log(`${jokesArray[jokesIndex]['joke']}`);
          writeToTxt(options.search ,jokesArray[jokesIndex]['joke']);
        } else {
          console.log(`${chalk.yellow('No jokes found, please try a different word.')}`);
        }
      }
    })
    .catch(err => {
      console.log(`${chalk.red('Something went wrong, error: ' + `${err}`)}`);
    });
  }
