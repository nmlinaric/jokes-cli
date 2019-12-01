import fs       from 'fs';

 // function for generating a random integer between min and max values provided (both included)
 export function generateRandomNumber (min: number, max: number): number {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

// function for writing the jokes to a .txt file
export function writeToTxt (inputWord: any, joke: Object): void {
  const formattedJoke = `Input Word:\t${inputWord}\nJoke: ${joke}\n` + '-'.repeat(100) + '\n';
  fs.appendFile('./jokes/jokes.txt', formattedJoke, function (err) {
    if(err) {
      console.log(err);
      throw err;
    }
  });
}
