import { propEq, range } from "ramda";
import { Record } from "../model";
import { fakePastTime, pick, randomNumber, uuid } from "../utils";
import * as Users from "./users";

const users = Users.all();

function generate(): Record {
  return {
    id: uuid(),
    userID: pick(users).id,
    bet: randomNumber({ min: 0, max: 1000 }),
    created: fakePastTime(),
  };
}

const COUNT = 100;
const history = range(0, COUNT).map(generate);

export function findByID(id: string) {
  return history.find(propEq("id", id));
}

export function findByUserID(userID: string) {
  return history.filter(propEq("userID", userID));
}

export function all() {
  return Array.from(history);
}
