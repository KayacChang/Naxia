import { Item } from "./item";

interface Condition {
  itemID: Item["id"];
  count: number;
}

export interface Achievement {
  id: string;
  name: string;
  conditions: Condition[];
}
