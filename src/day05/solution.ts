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

export const sortRanges = (ranges: Range[]): Range[] =>
  ranges.toSorted((a, b) => a.min - b.min || a.max - b.max);

export const combineRanges = (sortedRanges: Range[]): Range[] =>
  sortedRanges.slice(1).reduce(
    (acc, range) => {
      const last = acc[acc.length - 1];
      if (last.max >= range.min) {
        // Combine
        acc[acc.length - 1].max = Math.max(last.max, range.max);
      } else {
        // No overlap, so add as new range
        acc.push(range);
      }

      return acc;
    },
    sortedRanges.slice(0, 1),
  );

const part2 = (file: string): number => {
  const { ranges } = processInput(file);

  const sortedRanges = sortRanges(ranges);
  const combinedRanges = combineRanges(sortedRanges);

  return combinedRanges.map((range) => range.max - range.min + 1).reduce((acc, i) => acc + i, 0);
};

if (import.meta.main) {
  console.log("p1 test", part1("test-input.txt"));
  console.log("p1     ", part1("input.txt"));
  console.log("p2 test", part2("test-input.txt"));
  console.log("p2     ", part2("input.txt"));

  // Answers
  assert.equal(part1("test-input.txt"), 3);
  assert.equal(part1("input.txt"), 652);
  assert.equal(part2("test-input.txt"), 14);
  assert.equal(part2("input.txt"), 341753674214273);
}
