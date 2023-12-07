import { openFile } from "../utils.js";

function pt1(filename) {
  const contents = openFile(`./src/day4/${filename}`).split("\n");
  let result = 0;
  contents.forEach((game) => {
    const [winNumbers, numbers] = game
      .split(":")[1]
      .trim()
      .split("|")
      .map((r) =>
        r
          .trim()
          .split(" ")
          .filter((r) => r.length)
      );

    let res = 0;

    numbers.forEach((num) => {
      if (!winNumbers.includes(num)) {
        return;
      }

      if (res === 0) {
        res = 1;
      } else {
        res *= 2;
      }
    });

    result += res;
  });

  console.log(`Result for ${filename}: ${result}`);
}

export default function main() {
  console.log("-------Day 4-------");
  pt1("example");
  pt1("input");
}
