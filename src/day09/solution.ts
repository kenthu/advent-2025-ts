import assert from "node:assert/strict";

import { readLines, splitNumberPair } from "#lib/input.ts";

const solutionDir = import.meta.dirname;

const processInput = (file: string) => {
  return readLines(`${solutionDir}/${file}`).map((line) => {
    const [col, row] = splitNumberPair(line, ",");
    return { row, col };
  });
};

const part1 = (file: string): number => {
  const redTiles = processInput(file);

  let maxArea = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < redTiles.length; i++) {
    for (let j = i + 1; j < redTiles.length; j++) {
      const tile1 = redTiles[i];
      const tile2 = redTiles[j];
      const currentArea =
        (Math.abs(tile1.row - tile2.row) + 1) * (Math.abs(tile1.col - tile2.col) + 1);
      maxArea = Math.max(maxArea, currentArea);
    }
  }

  return maxArea;
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
  // assert.equal(part1("test-input.txt"), 0);
  // assert.equal(part1("input.txt"), 0);
  // assert.equal(part2("test-input.txt"), 0);
  // assert.equal(part2("input.txt"), 0);
}
