import { propEq, range } from "ramda";
import { Achievement } from "../model";
import { draw, randomNumber, randomWord, uuid } from "../utils";
import * as Item from "./items";

const items = Item.all();

function generate(): Achievement {
  return {
    id: uuid(),
    name: randomWord(),
    conditions: draw(items, 2).map((item) => ({
      itemID: item.id,
      count: randomNumber({ min: 0, max: 10 }),
    })),
  };
}

const COUNT = 10;
const achievements = range(0, COUNT).map(generate);

export function findByID(id: string) {
  return achievements.find(propEq("id", id));
}

export function all() {
  return Array.from(achievements);
}
