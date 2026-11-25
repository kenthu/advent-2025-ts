import assert from "node:assert/strict";

import { readFile, splitNumberPair } from "#lib/input.ts";

const solutionDir = import.meta.dirname;

const processInput = (file: string): [number, number][] => {
  const rangeStrings = readFile(`${solutionDir}/${file}`).split(",");

  return rangeStrings.map((rangeString) => {
    return splitNumberPair(rangeString, "-");
  });
};

const isInvalid = (num: number): boolean => {
  const asString = String(num);
  const length = asString.length;

  if (length % 2 === 1) return false;

  return asString.slice(0, length / 2) === asString.slice(length / 2);
};

const part1 = (file: string): number => {
  const ranges = processInput(file);
  let total = 0;

  // Brute force it
  for (const [min, max] of ranges) {
    for (let i = min; i <= max!; i++) {
      if (isInvalid(i)) {
        total += i;
      }
    }
  }

  return total;
};

// const part2 = (file: string): number => {
//   const lines = processInput(file);
//   return lines.length;
// };

console.log("p1 test", part1("test-input.txt"));
console.log("p1     ", part1("input.txt"));
// console.log("p2 test", part2("test-input.txt"));
// console.log("p2     ", part2("input.txt"));

// Answers
assert(part1("test-input.txt") === 1227775554);
assert(part1("input.txt") === 28146997880);
// assert(part2("test-input.txt") === 6);
// assert(part2("input.txt") === 6789);
