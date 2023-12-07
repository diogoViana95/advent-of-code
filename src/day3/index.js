import { isNumber, openFile, parseInt10 } from "../utils.js";

function pt1(filename) {
  const contents = openFile(`./src/day3/${filename}`).split("\n");
  let result = 0;
  const getIndexesAsNumber = (i, row) => {
    const indexes = [i];
    for (let j = i + 1; j < row.length; j++) {
      if (isNumber(row[j])) indexes.push(j);
      else break;
    }
    return indexes;
  };
  const getCoordsToCheck = (indexes, i) => {
    return indexes
      .map((idx, pos) => {
        const rows = [
          [idx, i - 1],
          [idx, i + 1],
        ]; // by default top and bottom are always checked;
        if (pos === 0) {
          rows.push([idx - 1, i]); // left
          rows.push([idx - 1, i - 1]); // top left
          rows.push([idx - 1, i + 1]); // bottom left
        }
        if (pos === indexes.length - 1) {
          rows.push([idx + 1, i]); // right
          rows.push([idx + 1, i - 1]); // top right
          rows.push([idx + 1, i + 1]); // bottom right
        }

        return rows;
      })
      .flat();
  };
  for (let i = 0; i < contents.length; i++) {
    const row = contents[i];
    let j = 0;
    while (j < row.length) {
      const char = row[j];

      if (!isNumber(char)) {
        j++;
        continue;
      }
      const indexes = getIndexesAsNumber(j, row);
      const coordsToCheck = getCoordsToCheck(indexes, i);

      for (const [x, y] of coordsToCheck) {
        const value = contents[y]?.[x];
        if (value === undefined || isNumber(value) || value === ".") continue;
        result += parseInt10(indexes.map((idx) => row[idx]).join(""));
      }
      j += indexes.length;
    }
  }

  console.log(`Result for ${filename}: ${result}`);
}

function pt2(filename) {
  const contents = openFile(`./src/day3/${filename}`).split("\n");
  const gears = []; // { x, y, value1, value2 }
  const getIndexesAsNumber = (i, row) => {
    const indexes = [i];
    for (let j = i + 1; j < row.length; j++) {
      if (isNumber(row[j])) indexes.push(j);
      else break;
    }
    return indexes;
  };
  const getCoordsToCheck = (indexes, i) => {
    return indexes
      .map((idx, pos) => {
        const rows = [
          [idx, i - 1],
          [idx, i + 1],
        ]; // by default top and bottom are always checked;
        if (pos === 0) {
          rows.push([idx - 1, i]); // left
          rows.push([idx - 1, i - 1]); // top left
          rows.push([idx - 1, i + 1]); // bottom left
        }
        if (pos === indexes.length - 1) {
          rows.push([idx + 1, i]); // right
          rows.push([idx + 1, i - 1]); // top right
          rows.push([idx + 1, i + 1]); // bottom right
        }

        return rows;
      })
      .flat();
  };
  for (let i = 0; i < contents.length; i++) {
    const row = contents[i];
    let j = 0;
    while (j < row.length) {
      const char = row[j];

      if (!isNumber(char)) {
        j++;
        continue;
      }
      const indexes = getIndexesAsNumber(j, row);
      const coordsToCheck = getCoordsToCheck(indexes, i);

      const gearsCreatedForThisNumber = [];

      for (const [x, y] of coordsToCheck) {
        const value = contents[y]?.[x];
        if (value !== "*") continue;
        const num = parseInt10(indexes.map((idx) => row[idx]).join(""));

        const idx = gears.findIndex((g) => g.x === x && g.y === y);

        if (idx === -1) {
          gears.push({ x, y, value1: num, value2: 0 });
          gearsCreatedForThisNumber.push({ x, y });
        } else {
          if (
            gearsCreatedForThisNumber.findIndex(
              ({ x, y }) => x === x && y === y
            ) === -1
          )
            gears[idx].value2 = num;
        }
      }
      j += indexes.length;
    }
  }

  const result = gears.reduce(
    (acc, { value1, value2 }) => acc + value1 * value2,
    0
  );

  console.log(`Result for ${filename}: ${result}`);
}

export default function main() {
  console.log("-------Day 3-------");
  pt1("example");
  pt1("input");
  pt2("example");
  pt2("input");
}
