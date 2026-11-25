import assert from "node:assert/strict";

import { readLines } from "#lib/input.ts";

const solutionDir = import.meta.dirname;

const processInput = (file: string) => {
  return readLines(`${solutionDir}/${file}`);
};

// For each position, store the max of all digits on or after that position
const getMaxDigits = (numString: string): number[] => {
  const maxDigits: number[] = [];
  let currentMax = Number.MIN_SAFE_INTEGER;

  for (let i = numString.length - 1; i >= 0; i--) {
    currentMax = Math.max(currentMax, Number(numString[i]!));
    maxDigits[i] = currentMax;
  }

  return maxDigits;
};

const part1 = (file: string): number => {
  const banks = processInput(file);

  let totalJoltage = 0;

  for (const bank of banks) {
    let currentMax = Number.MIN_SAFE_INTEGER;

    const maxDigits = getMaxDigits(bank);
    for (let i = 0; i < bank.length - 1; i++) {
      const maxToTest = Number(`${bank[i]}${maxDigits[i + 1]}`);
      currentMax = Math.max(currentMax, maxToTest);
    }

    totalJoltage += currentMax;
  }

  return totalJoltage;
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
assert.equal(part1("test-input.txt"), 357);
assert.equal(part1("input.txt"), 17330);
// assert.equal(part2("test-input.txt"), -1);
// assert.equal(part2("input.txt"), -1);
