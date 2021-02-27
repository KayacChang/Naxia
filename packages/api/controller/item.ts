import { Next, Request, Response } from "restify";
import { Random } from "random-js";
import * as Item from "../data/items";

const random = new Random();

export function getAll(req: Request, res: Response, next: Next) {
  res.send(Item.getAll());

  return next();
}

export function getRandom(req: Request, res: Response, next: Next) {
  const item = random.pick(Item.getAll());

  res.send(item);

  return next();
}
