import { Next, Request, Response } from "restify";
import { random } from "../utils";
import * as Item from "../database/items";

export function getByID(req: Request, res: Response, next: Next) {
  if (req.params.id) {
    const item = Item.getByID(req.params.id);

    res.send(item);
  }

  return next();
}

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
