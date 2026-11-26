import assert from "node:assert/strict";

import { readGrid } from "#lib/input.ts";

const solutionDir = import.meta.dirname;

const processInput = (file: string) => {
  return readGrid(`${solutionDir}/${file}`);
};

const part1 = (file: string): number => {
  const grid = processInput(file);
  const initialBeamColumn = grid[0].findIndex((cell) => cell === "S");
  const currentBeamColumns = new Set([initialBeamColumn]);

  let numSplits = 0;
  for (let row = 0; row < grid.length; row++) {
    for (const column of currentBeamColumns) {
      if (grid[row][column] === "^") {
        numSplits++;
        currentBeamColumns.delete(column);
        currentBeamColumns.add(column - 1);
        currentBeamColumns.add(column + 1);
      }
    }
  }

  return numSplits;
};

// const part2 = (file: string): number => {
//   const lines = processInput(file);
//   return -1;
// };

if (import.meta.main) {
  console.log("p1 test", part1("test-input.txt"));
  console.log("p1     ", part1("input.txt"));
  // console.log("p2 test", part2("test-input.txt"));
  // console.log("p2     ", part2("input.txt"));

  // Answers
  assert.equal(part1("test-input.txt"), 21);
  assert.equal(part1("input.txt"), 1690);
  // assert.equal(part2("test-input.txt"), 0);
  // assert.equal(part2("input.txt"), 0);
}
