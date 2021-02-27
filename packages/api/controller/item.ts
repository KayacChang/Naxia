import { Next, Request, Response } from "restify";
import { random } from "../utils";
import * as Item from "../database/items";

export function getAll(req: Request, res: Response, next: Next) {
  res.send(Item.getAll());

  return next();
}

export function getRandom(req: Request, res: Response, next: Next) {
  const item = random.pick(Item.getAll());

  res.send(item);

  return next();
}
