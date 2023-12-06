import { openFile, parseInt10 } from "../utils.js";
const pt1Cubes = {
  blue: 14,
  green: 13,
  red: 12,
};

function pt1(filename) {
  const contents = openFile(`./src/day2/${filename}`).split("\n");

  let totalSumValidGames = 0;

  contents.forEach((game) => {
    const [, gameId] = game.split(":")[0].split(" ");
    const valid = game
      .split(":")[1]
      .trim()
      .split(";")
      .map((r) => r.split(","))
      .flat()
      .map((r) => r.trim())
      .filter((r) => r.length)
      .map((r) => r.split(" "))
      .every(([num, color]) => pt1Cubes[color] >= num);

    if (valid) {
      totalSumValidGames += parseInt10(gameId);
    }
  });

  console.log(`Result for ${filename}: ${totalSumValidGames}`);
}

function pt2(filename) {
  const contents = openFile(`./src/day2/${filename}`).split("\n");

  let result = 0;

  contents.forEach((game) => {
    const rolls = game
      .split(":")[1]
      .trim()
      .split(";")
      .map((r) => r.split(","))
      .flat()
      .map((r) => r.trim())
      .filter((r) => r.length)
      .map((r) => r.split(" "));

    let red = 0;
    let green = 0;
    let blue = 0;

    rolls.forEach(([num, color]) => {
      switch (color) {
        case "red":
          red = Math.max(red, +num);
          break;
        case "green":
          green = Math.max(green, +num);
          break;
        case "blue":
          blue = Math.max(blue, +num);
          break;
      }
    });
    result += red * green * blue;
  });

  console.log(`Result for ${filename}: ${result}`);
}

export default function main() {
  console.log("-------Day 2-------");
  pt1("example");
  pt1("input");
  pt2("example");
  pt2("input");
}
