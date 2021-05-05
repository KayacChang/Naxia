export interface Item {
  count: number;
  id: number;
  img: string;
  name: string;
  point?: number;
  quality: number;
}

export interface User {
  avatar: string;
  balance: number;
  id: number;
  ip: string;
  level: number;
  name: string;
  uid: string;
}

export interface Map {
  id: number;
  name: string;
  status: number;
  img: string;
}

export interface Dungeon {
  id: number;
  name: string;
  img: string;
  room: string;
  stream: string;
  location: Vector;
}

export interface Condition {
  type: "item" | "point";
  item: string | null;
  count: number;
  accumulate: number;
  achieve: boolean;
}

export interface Round {
  id: number;
  result: "banker" | "player" | "tie" | "bank_pair" | "player_pair";
  createdAt: Date;
}

export interface Skill {
  img: string;
  name: string;
}
export interface SkillSet {
  banker: Skill;
  player: Skill;
  tie: Skill;
  bank_pair: Skill;
  player_pair: Skill;
}

export interface DungeonInfo extends Dungeon {
  bets: number[];
  skills: SkillSet;
}

export interface Vector {
  x: number;
  y: number;
}

export enum RoomStatus {
  Change = 0,
  Start,
  Stop,
  Result,
}

export type Order = {
  [k in keyof SkillSet]: number;
};

export interface Boss {
  id: number;
  name: string;
  spine: string;
  spine_json: string;
  spine_atlas: string;
  hp: number;
  rate: string;
}
