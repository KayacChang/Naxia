export interface Item {
  count: number;
  id: number;
  img: string;
  name: string;
  point: number;
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
  result: "Banker" | "Player" | "Tie" | "BankPair" | "PlayerPair";
  createdAt: Date;
}

export interface Skill {
  img: string;
  name: string;
}
export interface DungeonInfo extends Dungeon {
  bets: number[];
  skills: {
    banker: Skill;
    player: Skill;
    tie: Skill;
    bankPair: Skill;
    playerPair: Skill;
  };
}

export interface Vector {
  x: number;
  y: number;
}
