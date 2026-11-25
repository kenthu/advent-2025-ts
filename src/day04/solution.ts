import assert from "node:assert/strict";

import { readGrid } from "#lib/input.ts";

const solutionDir = import.meta.dirname;

const processInput = (file: string) => {
  return readGrid(`${solutionDir}/${file}`);
};

const adjacentRolls = (grid: string[][], row: number, col: number): number => {
  return (
    (grid[row - 1]?.[col - 1] === "@" ? 1 : 0) +
    (grid[row - 1]?.[col] === "@" ? 1 : 0) +
    (grid[row - 1]?.[col + 1] === "@" ? 1 : 0) +
    (grid[row]?.[col - 1] === "@" ? 1 : 0) +
    (grid[row]?.[col + 1] === "@" ? 1 : 0) +
    (grid[row + 1]?.[col - 1] === "@" ? 1 : 0) +
    (grid[row + 1]?.[col] === "@" ? 1 : 0) +
    (grid[row + 1]?.[col + 1] === "@" ? 1 : 0)
  );
};

const part1 = (file: string): number => {
  const grid = processInput(file);
  let numAccessibleRolls = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r]!.length; c++) {
      if (grid[r]?.[c] === "@" && adjacentRolls(grid, r, c) < 4) {
        numAccessibleRolls++;
      }
    }
  }

  return numAccessibleRolls;
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
assert.equal(part1("test-input.txt"), 13);
assert.equal(part1("input.txt"), 1493);
// assert.equal(part2("test-input.txt"), -1);
// assert.equal(part2("input.txt"), -1);
