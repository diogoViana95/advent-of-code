import { isNumber, openFile, parseInt10 } from "../utils.js";
const NUMBERS_SPELLED = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
function pt1(filename) {
  const contents = openFile(`./src/day1/${filename}`).split("\n");

  const result = contents
    .map((line) => {
      const numbers = line.split("").filter(isNumber);
      if (numbers.length === 0) return 0;
      return parseInt10(`${numbers[0]}${numbers[numbers.length - 1]}`);
    })
    .reduce((acc, curr) => acc + curr, 0);

  console.log(`Result for ${filename}: ${result}`);
}

function pt2(filename) {
  const contents = openFile(`./src/day1/${filename}`).split("\n");

  const result = contents
    .map((line) => {
      let numbers = "";
      for (let i = 0; i < line.length; i++) {
        for (let j = 0; j < NUMBERS_SPELLED.length; j++) {
          const num = NUMBERS_SPELLED[j];
          if (
            i + num.length <= line.length &&
            line.substring(i, i + num.length) === num
          ) {
            numbers += j + 1;
            break;
          }
        }
        if (isNumber(line[i])) {
          numbers += line[i];
        }
      }
      if (numbers.length === 0) return 0;
      return parseInt10(`${numbers[0]}${numbers[numbers.length - 1]}`);
    })
    .reduce((acc, curr) => acc + curr, 0);

  console.log(`Result for ${filename}: ${result}`);
}

export default function main() {
  console.log("-------Day 1-------");
  pt1("example1");
  pt1("input");
  pt2("example2");
  pt2("input");
}
