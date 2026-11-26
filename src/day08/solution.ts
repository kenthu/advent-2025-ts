import assert from "node:assert/strict";

import { readLines } from "#lib/input.ts";

const solutionDir = import.meta.dirname;

type CircuitId = number;

interface JunctionBox {
  boxId: number;
  x: number;
  y: number;
  z: number;
  circuitId: CircuitId;
}

interface JunctionBoxPair {
  box1: JunctionBox;
  box2: JunctionBox;
  distance: number;
}

const processInput = (file: string): JunctionBox[] => {
  return readLines(`${solutionDir}/${file}`).map((line, i) => {
    const triple = line.split(",").map(Number);
    return { boxId: i, x: triple[0], y: triple[1], z: triple[2], circuitId: 10000 + i };
  });
};

const calculateDistances = (junctionBoxes: JunctionBox[]): JunctionBoxPair[] => {
  const pairs: JunctionBoxPair[] = [];
  for (const box1 of junctionBoxes) {
    for (const box2 of junctionBoxes) {
      if (box1.boxId >= box2.boxId) continue;
      pairs.push({
        box1,
        box2,
        distance: Math.hypot(box2.x - box1.x, box2.y - box1.y, box2.z - box1.z),
      });
    }
  }

  // Sort by distance, ascending
  pairs.sort(
    (a, b) => a.distance - b.distance || a.box1.boxId - b.box1.boxId || a.box2.boxId - b.box2.boxId,
  );

  return pairs;
};

const part1 = (file: string, numConnections: number): number => {
  // Counts
  // - 1000 junction boxes
  //
  // Strategy
  // - Precalculate all distances and order them to get the 1000 closest ones

  const junctionBoxes = processInput(file);
  const pairs = calculateDistances(junctionBoxes);

  // Initialize mapping of circuitId to set of junctionBoxes in that circuit
  const circuits: Record<CircuitId, Set<JunctionBox>> = {};
  for (const junctionBox of junctionBoxes) {
    circuits[junctionBox.circuitId] = new Set([junctionBox]);
  }

  for (let i = 0; i < numConnections; i++) {
    const { box1, box2 } = pairs[i];

    if (box1.circuitId === box2.circuitId) continue;

    // Combine the two circuits
    // - Update circuitId for all boxes in 2nd circuit;
    // - Update `circuits`
    const finalCircuitId = box1.circuitId;
    const donorCircuitId = box2.circuitId;

    for (const boxToMove of circuits[donorCircuitId]) {
      boxToMove.circuitId = finalCircuitId;
      circuits[finalCircuitId].add(boxToMove);
    }
    delete circuits[donorCircuitId];
  }

  return (
    Object.values(circuits)
      .map((circuit) => circuit.size)
      // Sort numeric, descending
      .toSorted((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, size) => acc * size, 1)
  );
};

// const part2 = (file: string): number => {
//   const lines = processInput(file);
//   return -1;
// };

if (import.meta.main) {
  console.log("p1 test", part1("test-input.txt", 10));
  console.log("p1     ", part1("input.txt", 1000));
  // console.log("p2 test", part2("test-input.txt"));
  // console.log("p2     ", part2("input.txt"));

  // Answers
  assert.equal(part1("test-input.txt", 10), 40);
  assert.equal(part1("input.txt", 1000), 50760);
  // assert.equal(part2("test-input.txt"), 0);
  // assert.equal(part2("input.txt"), 0);
}
