// @ts-ignore
import { Names } from "fantasy-content-generator";
import { range } from "ramda";
import { Achievement } from "../model";
import { random } from "../utils";
import * as Item from "./items";

const achievements: Achievement[] = range(0, 10).map((id) => ({
  id: String(id),
  name: Names.generate().name,
  conditions: random.shuffle(Item.getAll()).slice(0, 2).map((item) => ({
    itemID: item.id,
    count: random.integer(0, 10),
  })),
}));

export function getAll() {
  return achievements;
}
