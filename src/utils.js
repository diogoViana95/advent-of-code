import fs from "fs";

export function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export function openFile(filename) {
  return fs.readFileSync(filename, "utf-8").trim();
}

export function parseInt10(str) {
  return parseInt(str.trim(), 10);
}

export function isNumber(str) {
  return !isNaN(parseInt10(str));
}
