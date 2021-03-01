import { Achievement } from "./achievement";
import { Item } from "./item";

export interface User {
  id: string;
  name: string;
  avatar: string;
  created: Date;

  balance: number;
  achievements: Achievement["id"][];

  repository: {
    itemID: Item["id"];
    count: number;
  }[];
}
