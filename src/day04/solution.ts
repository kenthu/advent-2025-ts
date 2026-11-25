import assert from "node:assert/strict";

import { createGrid } from "#lib/grid.ts";
import { readGrid } from "#lib/input.ts";

const solutionDir = import.meta.dirname;

const processInput = (file: string) => {
  return readGrid(`${solutionDir}/${file}`);
};

const adjacentRolls = (grid: string[][], row: number, col: number): number => {
  let total = 0;
  for (const { rOffset, cOffset } of ADJACENT_OFFSETS) {
    const rAdjacent = row + rOffset;
    const cAdjacent = col + cOffset;
    if (grid[rAdjacent]?.[cAdjacent] === "@") total++;
  }
  return total;
};

const part1 = (file: string): number => {
  const grid = processInput(file);
  let numAccessibleRolls = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r]?.[c] === "@" && adjacentRolls(grid, r, c) < 4) {
        numAccessibleRolls++;
      }
    }
  }

  return numAccessibleRolls;
};

const ADJACENT_OFFSETS = [
  { rOffset: -1, cOffset: -1 },
  { rOffset: -1, cOffset: 0 },
  { rOffset: -1, cOffset: 1 },
  { rOffset: 0, cOffset: -1 },
  { rOffset: 0, cOffset: 1 },
  { rOffset: 1, cOffset: -1 },
  { rOffset: 1, cOffset: 0 },
  { rOffset: 1, cOffset: 1 },
];

const decrementAdjacentCounts = (adjacentCountGrid: number[][], r: number, c: number): void => {
  for (const { rOffset, cOffset } of ADJACENT_OFFSETS) {
    const rAdjacent = r + rOffset;
    const cAdjacent = c + cOffset;
    if (
      rAdjacent >= 0 &&
      rAdjacent < adjacentCountGrid.length &&
      cAdjacent >= 0 &&
      cAdjacent < adjacentCountGrid[0].length
    ) {
      adjacentCountGrid[rAdjacent][cAdjacent]--;
    }
  }
};

const part2 = (file: string): number => {
  const grid = processInput(file);

  const adjacentCountGrid = createGrid(grid.length, grid[0]?.length ?? 0, 0);
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      adjacentCountGrid[r][c] = adjacentRolls(grid, r, c);
    }
  }

  let rollsRemoved = 0;
  while (true) {
    let didRemoveRoll = false;
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === "@" && adjacentCountGrid[r][c] < 4) {
          grid[r][c] = ".";
          decrementAdjacentCounts(adjacentCountGrid, r, c);
          rollsRemoved++;
          didRemoveRoll = true;
        }
        adjacentCountGrid[r][c] = adjacentRolls(grid, r, c);
      }
    }
    if (!didRemoveRoll) break;
  }

  return rollsRemoved;
};

console.log("p1 test", part1("test-input.txt"));
console.log("p1     ", part1("input.txt"));
console.log("p2 test", part2("test-input.txt"));
console.log("p2     ", part2("input.txt"));

// Answers
assert.equal(part1("test-input.txt"), 13);
assert.equal(part1("input.txt"), 1493);
assert.equal(part2("test-input.txt"), 43);
assert.equal(part2("input.txt"), 9194);
