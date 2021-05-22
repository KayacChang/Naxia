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

export interface Dungeon {
  id: number;
  name: string;
  img: string;
  room: string;
  stream: string;
  location: Vector;
  lock: boolean;
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
  createdAt: Date;
}

export interface Skill {
  img: string;
  name: string;
}

export type SkillSet = Record<SkillOption, Skill>;

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

export interface ItemDataProps {
  title: string;
  itemImg: string;
  cardImg: string;
  gemCurrentNumber: number;
  gemTotalNumber: number;
  cardCurrentNumber: number;
  cardTotalNumber: number;
}
