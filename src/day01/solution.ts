import { readLines } from "#lib/input.ts";

const dir = import.meta.dirname;

const parse = (file: string) => readLines(`${dir}/${file}`);

const part1 = (file: string): number => {
  const lines = parse(file);
  return lines.length;
};

const part2 = (file: string): number => {
  const lines = parse(file);
  return lines.length;
};

console.log("p1 test", part1("test-input.txt"));
console.log("p1     ", part1("input.txt"));
console.log("p2 test", part2("test-input.txt"));
console.log("p2     ", part2("input.txt"));
