import type { ReactNode } from "react";

export interface WrapperProps {
  children: ReactNode;
}

export interface MetaProps {
  title?: string;
  description?: string;
  url?: string;
}

export interface TeamDraft {
  name: string;
  colour: string;
}

export interface Team extends TeamDraft {
  id: string;
  boardPosition: number;
}

export interface TeamEditorProps {
  index: number;
  team: TeamDraft;
  onChange: (index: number, team: TeamDraft) => void;
}

export interface BoardProps {
  teams: Team[];
  onMove: (teamId: string, amount: number) => void;
}
