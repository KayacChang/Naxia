import { propEq, range } from "ramda";
import { Item } from "../model";
import { fakeMagicItem, pick, randomNumber, uuid } from "../utils";

function randomItemImage() {
  const id = randomNumber({ min: 1, max: 256 });

  return `/items/images/${String(id).padStart(3, "0")}.png`;
}

function generate(): Item {
  return {
    id: uuid(),
    type: pick(["card", "chip"]),
    name: fakeMagicItem().formattedData.title,
    level: randomNumber({ min: 0, max: 99 }),
    img: randomItemImage(),
    price: randomNumber({ min: 0, max: 2000 }),
  };
}

const COUNT = 100;
const items = range(0, COUNT).map(generate);

export function findByID(id: string) {
  return items.find(propEq("id", id));
}

export function all() {
  return Array.from(items);
}
