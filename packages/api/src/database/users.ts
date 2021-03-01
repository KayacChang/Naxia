import { prop, propEq, range } from "ramda";
import { draw, fakePastTime, fakeUserName, randomNumber, uuid } from "../utils";
import { User } from "../model";
import * as Items from "./items";
import * as Achievements from "./achievements";

const items = Items.all();
const achievements = Achievements.all();

function Avatar(uuid: string) {
  return `https://i.pravatar.cc/150?u=${uuid}`;
}

function generate(): User {
  const id = uuid();

  return {
    id,
    name: fakeUserName(),
    avatar: Avatar(id),
    created: fakePastTime(),
    balance: randomNumber({ min: 1000, max: 100000 }),
    achievements: draw(achievements, randomNumber({ min: 1, max: 10 })).map(
      prop("id"),
    ),
    repository: draw(items, randomNumber({ min: 0, max: 30 })).map((item) => ({
      itemID: item.id,
      count: randomNumber({ min: 0, max: 10 }),
    })),
  };
}

const COUNT = 100;
const users = range(0, COUNT).map(generate);

export function findByID(id: string) {
  return users.find(propEq("id", id));
}

export function all() {
  return Array.from(users);
}
