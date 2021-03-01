// @ts-ignore
import { MagicItems } from "fantasy-content-generator";
import { Random } from "random-js";
import faker from "faker";
import { is } from "ramda";

const random = new Random();

export function uuid() {
  return faker.random.uuid();
}

export function fakeUserName() {
  return faker.name.findName();
}

export function fakePastTime() {
  return faker.date.past();
}

interface MagicItem {
  seed: string;
  formattedData: {
    title: string;
  };
}

export function fakeMagicItem(): MagicItem {
  return MagicItems.generate();
}

export function randomWord() {
  return faker.lorem.word();
}

type RandomNumberOption = {
  min: number;
  max: number;
};
export function randomNumber(option?: RandomNumberOption) {
  const min = -0x20000000000000;
  const max = 0x20000000000000;

  if (option && is(Object, option)) {
    const { min, max } = option;

    return random.integer(min, max);
  }

  return random.integer(min, max);
}

export function pick<T>(array: ArrayLike<T>) {
  return random.pick(array);
}

export function shuffle<T>(array: T[]) {
  return random.shuffle(array);
}

export function draw<T>(array: T[], count = 1) {
  return shuffle(array).slice(0, count);
}
