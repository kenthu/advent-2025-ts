import assert from "node:assert/strict";

import { readLines } from "#lib/input.ts";

const solutionDir = import.meta.dirname;

const processInput = (file: string) => {
  return readLines(`${solutionDir}/${file}`);
};

/**
 * Find the maximum possible value from removing any single digit
 */
const getMaxFromRemovingDigit = (numString: string): number => {
  let currentMax = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < numString.length; i++) {
    currentMax = Math.max(currentMax, Number(`${numString.slice(0, i)}${numString.slice(i + 1)}`));
  }

  return currentMax;
};

const getMaxJoltageFromBank = (bank: string, numDigits: number): number => {
  let currentMax = Number(bank.slice(0, numDigits));

  for (let i = numDigits; i < bank.length; i++) {
    const nextToTest = `${currentMax}${bank[i]}`;
    currentMax = Math.max(currentMax, getMaxFromRemovingDigit(nextToTest));
  }

  return currentMax;
};

const part1 = (file: string): number => {
  const banks = processInput(file);

  let totalJoltage = 0;

  for (const bank of banks) {
    totalJoltage += getMaxJoltageFromBank(bank, 2);
  }

  return totalJoltage;
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
    totalJoltage += getMaxJoltageFromBank(bank, 12);
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
