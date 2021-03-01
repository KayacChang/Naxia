import { range } from "ramda";
import { Item } from "../model";
import { fakeMagicItem, pick, randomNumber, uuid } from "../utils";

function randomItemImage() {
  const id = randomNumber({ min: 1, max: 256 });

  return `/items/images/${String(id).padStart(3, "0")}.png`;
}

function generateItem(): Item {
  const id = uuid();
  const name = fakeMagicItem().formattedData.title;
  const level = randomNumber({ min: 0, max: 99 });
  const img = randomItemImage();
  const price = randomNumber({ min: 0, max: 2000 });

  return { id, type: pick(["card", "chip"]), name, level, img, price };
}

const COUNT = 100;
const items = range(0, COUNT).map(generateItem);

export function getByID(id: string) {
  return items.find((item) => item.id === id);
}

export function getAll() {
  return Array.from(items);
}
