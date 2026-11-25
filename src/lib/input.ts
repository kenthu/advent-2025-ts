import { readFileSync } from "node:fs";

export const readFile = (filename: string): string => {
  return readFileSync(filename, "utf8");
};

export const readLines = (filename: string): string[] => {
  return readFile(filename).trim().split("\n");
};

export const readGrid = (filename: string): string[][] => {
  return readLines(filename).map((line) => line.split(""));
};

const isPair = <T>(arr: T[]): arr is [T, T] => arr.length === 2;

export const splitNumberPair = (s: string, separator: string): [number, number] => {
  const parts = s.split(separator).map(Number);
  if (!isPair(parts)) {
    throw new Error(`Expected 2 parts separated by ${separator}: ${s}`);
  }
  return parts;
};
