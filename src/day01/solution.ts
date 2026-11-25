import assert from "node:assert/strict";

import { readLines } from "#lib/input.ts";

const solutionDir = import.meta.dirname;

type Direction = "L" | "R";
type Line = { direction: Direction; distance: number };

const processInput = (file: string): Line[] => {
  return readLines(`${solutionDir}/${file}`).map((line) => {
    if (line[0] === "L") {
      return { direction: "L", distance: -1 * Number(line.slice(1)) };
    } else if (line[0] === "R") {
      return { direction: "R", distance: Number(line.slice(1)) };
    } else {
      throw new Error("Invalid line");
    }
  });
};

const part1 = (file: string): number => {
  const lines = processInput(file);

  let pos = 50;
  let password = 0;

  for (const line of lines) {
    const { distance } = line;
    pos = (pos + distance) % 100;

    if (pos === 0) {
      password += 1;
    }
  }

  return password;
};

/**
 * Group positions into zones, in such a way that crossing into a different zone is equivalent to
 * landing on zero.
 *
 * When turning right, zones will be 0 to 99, 100 to 199, etc.
 * When turning left, zones will be 1 to 100, -99 to 0, -199 to -100, etc.
 */
const getZone = (pos: number, direction: Direction): number => {
  if (direction === "R") {
    return Math.floor(pos / 100);
  } else {
    return Math.floor((pos - 1) / 100);
  }
};

const part2 = (file: string): number => {
  const lines = processInput(file);

  let pos = 50;
  let password = 0;

  for (const line of lines) {
    const { direction, distance } = line;

    const oldZone = getZone(pos, direction);

    const newPos = pos + distance;
    const newZone = getZone(newPos, direction);

    password += Math.abs(newZone - oldZone);

    pos = newPos;
  }

  return password;
};

console.log("p1 test", part1("test-input.txt"));
console.log("p1     ", part1("input.txt"));
console.log("p2 test", part2("test-input.txt"));
console.log("p2     ", part2("input.txt"));

// Answers
assert(part1("test-input.txt") === 3);
assert(part1("input.txt") === 1147);
assert(part2("test-input.txt") === 6);
assert(part2("input.txt") === 6789);
