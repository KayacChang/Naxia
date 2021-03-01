import { range } from "ramda";
import { Achievement } from "../model";
import { draw, randomNumber, randomWord, uuid } from "../utils";
import * as Item from "./items";

const items = Item.getAll();

function generateAchievement(): Achievement {
  const id = uuid();
  const name = randomWord();
  const conditions = draw(items, 2).map((item) => ({
    itemID: item.id,
    count: randomNumber({ min: 0, max: 10 }),
  }));

  return { id, name, conditions };
}

const COUNT = 10;
const achievements = range(0, COUNT).map(generateAchievement);

export function getByID(id: string) {
  return achievements.find((achievement) => achievement.id === id);
}

export function getAll() {
  return Array.from(achievements);
}
