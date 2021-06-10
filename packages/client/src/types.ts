type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export type Tasks = { name: string; url: string }[];

export interface Item {
  count: number;
  id: number;
  img: string;
  name: string;
  point?: number;
  quality: number;
  description?: string;
  type: "card" | "frag";
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

export interface NPC {
  id: number;
  name: string;
  img: string;
  dialog: string[];
}

export interface DungeonBetStatus {
  currentBet?: number;
  historyBet?: number;
}

export interface Dungeon extends DungeonBetStatus {
  id: number;
  name: string;
  img: string;
  room: string;
  stream: string;
  location: Vector;
  lock: boolean;
  bets: number[];
  skills: SkillSet;
  dungeonImg?: string;
  preview?: string;
}

export interface Condition {
  type: "item" | "point";
  item: string | null;
  count: number;
  accumulate: number;
  achieve: boolean;
}

export type SkillOption =
  | "banker"
  | "player"
  | "tie"
  | "bank_pair"
  | "player_pair";

export interface Round {
  id: number;
  results: SkillOption[];
}

export interface Skill {
  img: string;
  name: string;
}

export type SkillSet = Record<SkillOption, Skill>;

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

export type Order = PartialRecord<SkillOption, number>;

export interface Boss {
  id: number;
  name: string;
  spine: string;
  spine_json: string;
  spine_atlas: string;
  hp: number;
  rate: string;
}

export interface RankingRecord {
  name: string;
  avatar: number;
  value: number;
  rank: number;
}

export interface Ranking {
  achievement: {
    data: RankingRecord[];
    current: RankingRecord;
    updated: string;
  };
  sp: {
    data: RankingRecord[];
    current: RankingRecord;
    updated: string;
  };
  exp: {
    data: RankingRecord[];
    current: RankingRecord;
    updated: string;
  };
}

export interface Achievement {
  name: string;
  type: "card" | "other";
  count: number;
  done: boolean;
  description: string;
  img: string;
  cardImg: string;
}

export interface RequireItem {
  type: "item";
  count: number;
  item_id: number;
  item_name: string;
  accumulate: number;
}

export interface RequirePoint {
  type: "point";
  count: number;
  item_id: null;
  item_name: null;
  accumulate: number;
}

export type Requirement = RequireItem | RequirePoint;

export interface StoreItem {
  id: number;
  name: string;
  category: "card" | "other";
  item_type: "item" | "point";
  item_name: string | null;
  item_count: number;
  item_img: string | null;
  requirements: Requirement[];
}
