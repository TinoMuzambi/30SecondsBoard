import type { Team, TeamDraft } from "../interfaces";

export const BASE_URL = "https://30-seconds-board.vercel.app";
export const TEAM_STORAGE_KEY = "30-seconds-game";
export const LAST_POSITION = 34;

const VALID_COLOUR = /^#[0-9a-f]{6}$/i;

export function clampPosition(position: number): number {
  return Math.min(LAST_POSITION, Math.max(0, Math.round(position)));
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) {
    const word = parts[0];
    return (word[0] + (word[Math.floor(word.length / 2)] ?? "")).toUpperCase();
  }
  return (parts[0][0] + parts.at(-1)![0]).toUpperCase();
}

export function buildTeams(drafts: TeamDraft[]): Team[] {
  if (drafts.length < 2) throw new Error("Add at least two teams to start.");

  const names = drafts.map((team) => team.name.trim());
  if (names.some((name) => !name)) throw new Error("Give every team a name.");
  if (new Set(names.map((name) => name.toLocaleLowerCase())).size !== names.length) {
    throw new Error("Team names must be unique.");
  }

  return drafts.map((team, index) => ({
    id: `team-${index + 1}`,
    name: team.name.trim(),
    colour: VALID_COLOUR.test(team.colour) ? team.colour : "#f5d547",
    boardPosition: 0,
  }));
}

export function parseStoredTeams(raw: string | null): Team[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value) || value.length < 2 || value.length > 10) return [];
    const parsed = value.filter(
      (team): team is Team =>
        typeof team === "object" &&
        team !== null &&
        typeof (team as Team).id === "string" &&
        typeof (team as Team).name === "string" &&
        Boolean((team as Team).name.trim()) &&
        typeof (team as Team).colour === "string" &&
        VALID_COLOUR.test((team as Team).colour) &&
        typeof (team as Team).boardPosition === "number" &&
        Number.isFinite((team as Team).boardPosition),
    );
    if (parsed.length !== value.length) return [];
    return parsed.map((team) => ({
      ...team,
      name: team.name.trim().slice(0, 24),
      boardPosition: clampPosition(team.boardPosition),
    }));
  } catch {
    return [];
  }
}
