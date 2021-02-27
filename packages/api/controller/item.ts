import { Next, Request, Response } from "restify";
import { random } from "../utils";
import * as Item from "../database/items";

export function getAll(req: Request, res: Response, next: Next) {
  res.send(Item.getAll());

  return next();
}

export function getRandom(req: Request, res: Response, next: Next) {
  const count = req.query.count || 1;

  const items = random.shuffle(Item.getAll()).slice(0, count);

  res.send(items);

  return next();
}
