import { prop, range } from "ramda";
import {
  fakePastTime,
  fakeUserName,
  randomNumber,
  shuffle,
  uuid,
} from "../utils";
import { User } from "../model";
import * as Achievements from "./achievements";

function Avatar(uuid: string) {
  return `https://i.pravatar.cc/150?u=${uuid}`;
}

function generateUser(): User {
  const id = uuid();
  const name = fakeUserName();
  const avatar = Avatar(id);
  const createdAt = fakePastTime();
  const balance = randomNumber({ min: 1000, max: 100000 });

  const achievements = shuffle(Achievements.getAll()).slice(
    0,
    randomNumber({ min: 1, max: 10 }),
  ).map(prop("id"));

  return { id, name, avatar, createdAt, balance, achievements };
}

const COUNT = 100;
const users = range(0, COUNT).map(generateUser);

export function getByID(id: string) {
  return users.find((user) => user.id === id);
}

export function getAll() {
  return Array.from(users);
}
