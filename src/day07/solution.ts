import assert from "node:assert/strict";

import { sum } from "lodash-es";

import { createGrid, printGrid } from "#lib/grid.ts";
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

const part2 = (file: string): number => {
  // Strategy: For each cell in grid, how many different ways are there to get there? If we can
  // calculate this as we go down, when we get to the bottom row, we can add it all up.

  const grid = processInput(file);
  const initialBeamColumn = grid[0].findIndex((cell) => cell === "S");

  const timelineCountGrid = createGrid(grid.length, grid[0].length, 0);
  timelineCountGrid[0][initialBeamColumn] = 1;

  for (let row = 1; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "^") {
        timelineCountGrid[row][col - 1] += timelineCountGrid[row - 1][col];
        timelineCountGrid[row][col + 1] += timelineCountGrid[row - 1][col];
      } else {
        timelineCountGrid[row][col] += timelineCountGrid[row - 1][col];
      }
    }
  }

  return sum(timelineCountGrid[timelineCountGrid.length - 1]);
};

if (import.meta.main) {
  console.log("p1 test", part1("test-input.txt"));
  console.log("p1     ", part1("input.txt"));
  console.log("p2 test", part2("test-input.txt"));
  console.log("p2     ", part2("input.txt"));

  // Answers
  assert.equal(part1("test-input.txt"), 21);
  assert.equal(part1("input.txt"), 1690);
  assert.equal(part2("test-input.txt"), 40);
  assert.equal(part2("input.txt"), 221371496188107);
}
