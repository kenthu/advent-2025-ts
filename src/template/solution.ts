import { readLines } from "#lib/input.ts";

const solutionDir = import.meta.dirname;

const processInput = (file: string) => {
  return readLines(`${solutionDir}/${file}`);
};

const part1 = (file: string): number => {
  const lines = processInput(file);
  return lines.length;
};

const part2 = (file: string): number => {
  const lines = processInput(file);
  return lines.length;
};

console.log("p1 test", part1("test-input.txt"));
console.log("p1     ", part1("input.txt"));
console.log("p2 test", part2("test-input.txt"));
console.log("p2     ", part2("input.txt"));
