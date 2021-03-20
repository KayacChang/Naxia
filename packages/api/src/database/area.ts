import { propEq, range } from "ramda";
import { Area } from "../model";
import { draw, randomWord, uuid } from "../utils";
import * as Dungeon from "./dungeon";

const dungeons = Dungeon.all();

function generate(): Area {
  return {
    id: uuid(),
    name: randomWord(),
    image: "",
    dungeons: draw(dungeons, 3).map(({ id }) => id),
  };
}

const COUNT = 10;
const areas = range(0, COUNT).map(generate);

export function all() {
  return Array.from(areas);
}

export function findByID(id: string) {
  return areas.find(propEq("id", id));
}
