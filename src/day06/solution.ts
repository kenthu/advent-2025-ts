import assert from "node:assert/strict";

import { unzip } from "lodash-es";

import { readLines } from "#lib/input.ts";

const solutionDir = import.meta.dirname;

type Operator = "*" | "+";

const processInput = (file: string): { operandsGrid: number[][]; operators: Operator[] } => {
  const lines = readLines(`${solutionDir}/${file}`);

  const operandsGrid: number[][] = [];

  for (const line of lines.slice(0, lines.length - 1)) {
    const operands = line.split(" ").filter(Boolean);
    operandsGrid.push(operands.map(Number));
  }

  return {
    operandsGrid,
    operators: lines[lines.length - 1].split(" ").filter(Boolean) as Operator[],
  };
};

const part1 = (file: string): number => {
  const { operandsGrid, operators } = processInput(file);

  let total = 0;

  // Tranpose using unzip
  unzip(operandsGrid).forEach((operands, i) => {
    if (operators[i] === "+") {
      total += operands.reduce((acc, operand) => acc + operand, 0);
    } else {
      total += operands.reduce((acc, operand) => acc * operand, 1);
    }
  });

  return total;
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
  assert.equal(part1("test-input.txt"), 4277556);
  assert.equal(part1("input.txt"), 5873191732773);
  // assert.equal(part2("test-input.txt"), 0);
  // assert.equal(part2("input.txt"), 0);
}
