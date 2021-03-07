export interface Item {
  id: number;
  type: "card" | "chip";
  img: string;
  level: number;
  name: string;
  price: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  balance: number;
  achievements: string[];
  repository: { itemID: string; count: number }[];
}
