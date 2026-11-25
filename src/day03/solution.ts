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

const getMaxFrom13 = (numString: string): number => {
  let currentMax = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < numString.length; i++) {
    currentMax = Math.max(currentMax, Number(`${numString.slice(0, i)}${numString.slice(i + 1)}`));
  }

  return currentMax;
};

/**
 * Strategy:
 *   Initial: Take the first 12 digits. This is the current maximum number for 12 digits.
 *   Each step: Take into account the next digit. Calculate the new maximum from those 13 digits.
 */
const part2 = (file: string): number => {
  const banks = processInput(file);

  let totalJoltage = 0;

  for (const bank of banks) {
    let currentMax = Number(bank.slice(0, 12));

    for (let i = 12; i < bank.length; i++) {
      // 13 digits to find next maximum on
      const nextToTest = `${currentMax}${bank[i]}`;
      currentMax = Math.max(currentMax, getMaxFrom13(nextToTest));
    }

    totalJoltage += currentMax;
  }

  return totalJoltage;
};

console.log("p1 test", part1("test-input.txt"));
console.log("p1     ", part1("input.txt"));
console.log("p2 test", part2("test-input.txt"));
console.log("p2     ", part2("input.txt"));

// Answers
assert.equal(part1("test-input.txt"), 357);
assert.equal(part1("input.txt"), 17330);
assert.equal(part2("test-input.txt"), 3121910778619);
assert.equal(part2("input.txt"), 171518260283767);
