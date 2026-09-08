import { describe, expect, it } from "vitest";

import { buildTeams, clampPosition, getInitials, parseStoredTeams } from ".";

describe("team setup", () => {
  it("builds normalized teams", () => {
    expect(
      buildTeams([
        { name: " Quick Thinkers ", colour: "#f5d547" },
        { name: "Fast Talkers", colour: "#56cfe1" },
      ]),
    ).toEqual([
      { id: "team-1", name: "Quick Thinkers", colour: "#f5d547", boardPosition: 0 },
      { id: "team-2", name: "Fast Talkers", colour: "#56cfe1", boardPosition: 0 },
    ]);
  });

  it("rejects duplicate and missing names", () => {
    expect(() => buildTeams([{ name: "Same", colour: "#000000" }, { name: "same", colour: "#ffffff" }])).toThrow("unique");
    expect(() => buildTeams([{ name: "", colour: "#000000" }, { name: "Other", colour: "#ffffff" }])).toThrow("every team");
  });
});

describe("stored game parsing", () => {
  it("recovers valid teams and bounds positions", () => {
    const parsed = parseStoredTeams(JSON.stringify([
      { id: "a", name: "Aces", colour: "#f5d547", boardPosition: 99 },
      { id: "b", name: "Brains", colour: "#56cfe1", boardPosition: -2 },
    ]));
    expect(parsed.map((team) => team.boardPosition)).toEqual([34, 0]);
  });

  it("rejects malformed or incomplete storage", () => {
    expect(parseStoredTeams("not-json")).toEqual([]);
    expect(parseStoredTeams(JSON.stringify([{ id: "a" }]))).toEqual([]);
  });
});

describe("board helpers", () => {
  it("clamps positions and creates readable initials", () => {
    expect(clampPosition(35)).toBe(34);
    expect(clampPosition(-1)).toBe(0);
    expect(getInitials("Quick Thinkers")).toBe("QT");
    expect(getInitials("Aces")).toBe("AE");
  });
});
