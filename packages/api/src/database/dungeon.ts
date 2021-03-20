import { propEq, range } from "ramda";
import { Dungeon } from "../model";
import { randomNumber, randomWord, uuid } from "../utils";

function generate(): Dungeon {
  return {
    id: uuid(),
    name: randomWord(),
    image: "",
    position: {
      x: randomNumber({ min: 0, max: 1920 }),
      y: randomNumber({ min: 0, max: 1080 }),
    },
  };
}

const COUNT = 10;
const dungeons = range(0, COUNT).map(generate);

export function all() {
  return Array.from(dungeons);
}

export function findByID(id: string) {
  return dungeons.find(propEq("id", id));
}
