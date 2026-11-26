import assert from "node:assert/strict";
import { test } from "node:test";

import { combineRanges, sortRanges } from "./solution.ts";

test("sortRanges", () => {
  const input = [
    { min: 9, max: 23 },
    { min: 9, max: 10 },
    { min: 3, max: 30 },
    { min: 3, max: 7 },
    { min: 1, max: 7 },
    { min: 1, max: 9 },
  ];

  const expected = [
    { min: 1, max: 7 },
    { min: 1, max: 9 },
    { min: 3, max: 7 },
    { min: 3, max: 30 },
    { min: 9, max: 10 },
    { min: 9, max: 23 },
  ];

  assert.deepStrictEqual(sortRanges(input), expected);
});

test("combineRanges", () => {
  const input = [
    { min: 1, max: 7 },
    { min: 1, max: 9 },
    { min: 1, max: 20 },
    { min: 3, max: 7 },
    { min: 21, max: 23 },
    { min: 22, max: 25 },
    { min: 24, max: 27 },
    { min: 27, max: 43 },
  ];

  const expected = [
    { min: 1, max: 20 },
    { min: 21, max: 43 },
  ];

  assert.deepStrictEqual(combineRanges(input), expected);
});
