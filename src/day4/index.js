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

function pt2(filename) {
  const contents = openFile(`./src/day4/${filename}`).split("\n");

  const map = {};

  contents.forEach((game) => {
    const [, id] = game
      .split(":")[0]
      .trim()
      .split(" ")
      .filter((r) => r.length);
    if (map[id]) {
      map[id]++;
    } else {
      map[id] = 1;
    }
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

    let matched = 0;

    numbers.forEach((num) => {
      if (!winNumbers.includes(num)) {
        return;
      }
      matched++;
    });

    for (let i = 0; i < matched; i++) {
      const idx = parseInt(id) + i + 1;
      if (map[idx]) {
        map[idx] += map[id];
      } else {
        map[idx] = map[id];
      }
    }
  });

  const result = Object.values(map).reduce((acc, curr) => acc + curr, 0);

  console.log(`Result for ${filename}: ${result}`);
}

export default function main() {
  console.log("-------Day 4-------");
  pt1("example");
  pt1("input");
  pt2("example");
  pt2("input");
}
