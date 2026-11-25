import assert from "node:assert/strict";

import { readLines, splitNumberPair } from "#lib/input.ts";

const solutionDir = import.meta.dirname;

type Range = { min: number; max: number };

const processInput = (file: string): { ranges: Range[]; ingredients: number[] } => {
  const lines = readLines(`${solutionDir}/${file}`);

  const ranges: Range[] = [];
  const ingredients: number[] = [];

  for (const line of lines) {
    if (line === "") continue;

    if (line.includes("-")) {
      const [min, max] = splitNumberPair(line, "-");
      ranges.push({ min, max });
    }

    if (Number.isInteger(Number(line))) {
      ingredients.push(Number(line));
    }
  }

  return { ingredients, ranges };
};

const part1 = (file: string): number => {
  const { ranges, ingredients } = processInput(file);

  let numFresh = 0;

  for (const ingredient of ingredients) {
    if (ranges.some((range) => ingredient >= range.min && ingredient <= range.max)) {
      numFresh++;
    }
  }

  return numFresh;
};

// const part2 = (file: string): number => {
//   const lines = processInput(file);
//   return -1;
// };

console.log("p1 test", part1("test-input.txt"));
console.log("p1     ", part1("input.txt"));
// console.log("p2 test", part2("test-input.txt"));
// console.log("p2     ", part2("input.txt"));

// Answers
assert.equal(part1("test-input.txt"), 3);
assert.equal(part1("input.txt"), 652);
// assert.equal(part2("test-input.txt"), -1);
// assert.equal(part2("input.txt"), -1);
